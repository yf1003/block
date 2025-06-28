import * as cc from "cc";
import RowCol from "./RowCol";
import MatrixLayer, { MatrixPos, MatrixRect } from "./MatrixLayer";

export default class MatrixCreateLayer extends MatrixLayer {
    protected mBeginPos: cc.Vec2 = cc.Vec2.ZERO;
    public set BeginPos(pos: cc.Vec2) {
        this.mBeginPos = pos.clone();
    }
    public get BeginPos(): cc.Vec2 {
        return this.mBeginPos;
    }

    protected mMatrixWidth: number = 0;
    public set MatrixWidth(width: number) {
        this.mMatrixWidth = width;
    }
    public get MatrixWidth(): number {
        return this.mMatrixWidth;
    }

    protected mMatrixHeight: number = 0;
    public set MatrixHeight(height: number) {
        this.mMatrixHeight = height;
    }
    public get MatrixHeight(): number {
        return this.mMatrixHeight;
    }

    protected mCenter: cc.Vec2 = cc.Vec2.ZERO;
    public get Center(): cc.Vec2 {
        return this.mCenter;
    }

    public initMatrix(size: cc.Size, beginPos: cc.Vec2): boolean {
        this.mMatrixWidth = size.width;
        this.mMatrixHeight = size.height;
        this.mBeginPos = beginPos.clone();

        this.initMatrixPosList();
        this.initMatrixPosRect();
        this.initCenter();
        return true;
    }

    private initCenter() {
        var pos = cc.v2(this.mBeginPos.x, this.mBeginPos.y);
        pos.x = pos.x + this.mMatrixWidth * (this.mMaxRow / 2);
        pos.y = pos.y - this.mMatrixHeight * (this.mMaxCol / 2) + this.mMatrixHeight;
        this.mCenter = pos.clone();
    }


    private initMatrixPosList() {
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let pos = this.mBeginPos.clone();
                pos.x = pos.x + this.mMatrixWidth * i + this.mMatrixWidth / 2;
                pos.y = pos.y + this.mMatrixHeight * j + this.mMatrixHeight / 2;

                let matrixPos = <MatrixPos>{};
                matrixPos.isRight = true;
                matrixPos.RowCol = new RowCol(i, j);
                matrixPos.Position = pos;
                this.setMatrixPos(i, j, matrixPos);
            }
        }
    }

    private initMatrixPosRect() {
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let isPos = this.getMatrixPos(i, j);
                if (isPos.isRight) {

                    let matrixRect = <MatrixRect>{};
                    matrixRect.isRight = true;
                    matrixRect.RowCol = new RowCol(i, j);

                    let rect = cc.rect();
                    rect.x = isPos.Position.x;
                    rect.y = isPos.Position.y;
                    rect.x -= this.mMatrixWidth / 2;
                    rect.y -= this.mMatrixHeight / 2;
                    rect.size = cc.size(this.mMatrixWidth, this.mMatrixHeight);
                    matrixRect.Rect = rect;
                    this.setMatrixRect(i, j, matrixRect);
                }
            }
        }
    }

    public getRowColFromMatrixByRect(pos: cc.Vec2): RowCol {

        let createRect = cc.rect();
        createRect.x = pos.x - this.mMatrixWidth / 2;
        createRect.y = pos.y - this.mMatrixHeight / 2;
        createRect.size = cc.size(this.mMatrixWidth, this.mMatrixHeight);

        let containMatrixPosList: Array<MatrixPos> = [];

        for (let i = this.mMaxRow - 1; i >= 0; i--) {
            for (let j = this.mMaxCol - 1; j >= 0; j--) {
                let matrixRect = this.getMatrixRect(i, j);
                if (matrixRect && matrixRect.Rect.intersects(createRect)) {
                    let matrixPos = this.getMatrixPos(i, j);
                    if (matrixPos) {
                        containMatrixPosList.push(matrixPos);
                    }
                }
            }
        }

        if (containMatrixPosList.length > 0) {
            containMatrixPosList.sort((a, b) => {

                let lengthA = pos.subtract(a.Position).clone().length();
                let lengthB = pos.subtract(b.Position).clone().length();
                if (lengthA > lengthB)
                    return 1;
                else
                    return -1;
            });

            let minMatrixPos = containMatrixPosList[0];

            let rowCol = new RowCol();
            rowCol.setRowCol(minMatrixPos.RowCol);
            return rowCol;
        }
        return new RowCol();
    }
}
