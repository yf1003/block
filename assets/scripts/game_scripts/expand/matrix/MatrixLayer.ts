import * as cc from "cc";
import MatrixBase from "./MatrixBase";
import RowCol from "./RowCol";
/**
 *  矩阵位置
 */
export interface MatrixPos {
    /**
     *  是否正确
     */
    isRight: boolean;
    /**
     *  横列
     */
    RowCol: RowCol;
    /**
     *  位置
     */
    Position: cc.Vec2;
}

export interface MatrixRect {
    /**
     *  是否正确
     */
    isRight: boolean;
    /**
     *  横列
     */
    RowCol: RowCol;
    /**
     *  范围
     */
    Rect: cc.Rect;
}

export default class MatrixLayer extends MatrixBase {
    protected mMatrixNode: cc.Node = null;
    public set MatrixNode(node: cc.Node) {
        this.mMatrixNode = node;
    }
    public get MatrixNode(): cc.Node {
        return this.mMatrixNode;
    }

    protected mMatrixPosList: Array<Array<MatrixPos>> = [];
    protected mMatrixRectList: Array<Array<MatrixRect>> = [];

    constructor(key: string, row: number, col: number) {
        super(key, row, col);
        this.initMatrixData();
    }

    public initMatrixData() {
        for (let i = 0; i < this.mMaxRow; i++) {
            this.mMatrixPosList.push([]);
            this.mMatrixRectList.push([]);
        }

        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let matrixPos = <MatrixPos>{};
                matrixPos.isRight = false;
                matrixPos.RowCol = new RowCol(i, j);
                matrixPos.Position = cc.Vec2.ZERO.clone();
                this.mMatrixPosList[i].push(matrixPos);

                let matrixRect = <MatrixRect>{};
                matrixRect.isRight = false;
                matrixRect.RowCol = new RowCol(i, j);
                matrixRect.Rect = cc.rect();
                this.mMatrixRectList[i].push(matrixRect);
            }
        }
    }

    public setMatrixPos(row: number, col: number, matrixPos: MatrixPos): boolean {
        if (!this.isValidBound(row, col))
            return false;
        this.mMatrixPosList[row][col].isRight = matrixPos.isRight;
        this.mMatrixPosList[row][col].RowCol.setRowCol(matrixPos.RowCol);
        this.mMatrixPosList[row][col].Position.x = matrixPos.Position.x;
        this.mMatrixPosList[row][col].Position.y = matrixPos.Position.y;
        return true;
    }

    public getMatrixPos(row: number, col: number): MatrixPos {
        if (!this.isValidBound(row, col)) {
            let matrixPos = <MatrixPos>{};
            matrixPos.isRight = false;
            matrixPos.RowCol = new RowCol(row, col);
            matrixPos.Position = cc.v2(0, 0);
            return matrixPos;
        }
        return this.mMatrixPosList[row][col];
    }

    public setMatrixRect(row: number, col: number, matrixRect: MatrixRect): boolean {
        if (!this.isValidBound(row, col))
            return false;
        this.mMatrixRectList[row][col].isRight = matrixRect.isRight;
        this.mMatrixRectList[row][col].RowCol.setRowCol(matrixRect.RowCol);
        this.mMatrixRectList[row][col].Rect = matrixRect.Rect.clone();
        return true;
    }

    public getMatrixRect(row: number, col: number): MatrixRect {
        if (!this.isValidBound(row, col)) {
            let matrixRect = <MatrixRect>{};
            matrixRect.isRight = false;
            matrixRect.RowCol = new RowCol(row, col);
            matrixRect.Rect = cc.rect();
            return matrixRect;
        }
        return this.mMatrixRectList[row][col];
    }

    /**
     * 获取指定位置数据
     * @param pos 位置
     * @returns 横列
     */
    public getRowColByPos(pos: cc.Vec2): RowCol {
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let matrixRect = this.getMatrixRect(i, j);
                if (matrixRect.isRight && matrixRect.Rect.contains(pos)) {
                    return new RowCol(i, j);
                }
            }
        }
        return new RowCol();
    }
}
