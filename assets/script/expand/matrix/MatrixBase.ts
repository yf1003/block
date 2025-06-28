
import GameTool from "../../common/tool/GameTool";
import LogTool from "../../common/tool/LogTool";
import RandTool from "../../common/tool/RandTool";
import BasicesData from "../base/BasicesData";
import ValueData from "../base/ValueData";
import RowCol from "./RowCol";

export default class MatrixBase extends BasicesData {
    protected mMaxRow: number = -1;
    public set MaxRow(row: number) {
        this.mMaxRow = row;
    }
    public get MaxRow(): number {
        return this.mMaxRow;
    }

    protected mMaxCol: number = -1;
    public get MaxCol(): number {
        return this.mMaxCol;
    }

    public get MaxRowCol(): RowCol {
        return new RowCol(this.mMaxRow, this.mMaxCol);
    }
    /**
     * 左下角
     */
    public get LeftDownCorner(): RowCol {
        return new RowCol(0, 0);
    }
    /**
     * 左上角
     */
    public get LeftUpCorner(): RowCol {
        return new RowCol(0, this.mMaxCol - 1);
    }
    /**
     * 右下角
     */
    public get RigthDownCorner(): RowCol {
        return new RowCol(this.mMaxRow - 1, 0);
    }
    /**
     * 左下角
     */
    public get RightUpCorner(): RowCol {
        return new RowCol(this.mMaxRow - 1, this.mMaxCol - 1);
    }

    constructor(key: string, row: number = 0, col: number = 0) {
        super(key);
        this.mMaxRow = row;
        this.mMaxCol = col;
    }

    /**
     * 获取所有横坐标
     * @returns 横坐标数组
     */
    public getRowArray(): Array<number> {
        let rowArray = [];
        for (let i = 0; i < this.mMaxRow; i++) {
            rowArray.push(i);
        }
        return rowArray;
    }
    /**
     * 获取所有纵坐标
     * @returns 纵坐标数组
     */
    public getColArray(): Array<number> {
        let colArray = [];
        for (let i = 0; i < this.mMaxCol; i++) {
            colArray.push(i);
        }
        return colArray;
    }

    /**
     * 行是否是偶数
     * @returns 结果
     */
    public isEvenMaxRow(): boolean {
        if (GameTool.IsEvennumber(this.mMaxRow))
            return true;
        return false;
    }

    /**
     * 列是否是偶数
     * @returns 结果
     */
    public isEvenMaxCol(): boolean {
        if (GameTool.IsEvennumber(this.mMaxCol))
            return true;
        return false;
    }

    /**
     * 获取矩阵范围
     * @returns number
     */
    public getMatixArea(): number {
        return this.MaxRowCol.getArea();
    }

    /**
     * 检测是否安全
     * @param checkRow 横
     * @param checkCol 列
     * @returns 结果
     */
    public isValidBound(checkRow: number, checkCol: number) {
        if (checkRow < 0 || checkRow >= this.mMaxRow)
            return false;
        if (checkCol < 0 || checkCol >= this.mMaxCol)
            return false;
        return true;
    }

    /**
     * 获取中心点
     * @returns 
     */
    public getMidRowCol(): RowCol {
        return new RowCol(ValueData.AsInt(this.mMaxRow / 2), ValueData.AsInt(this.mMaxCol / 2));
    }

    /**
     * 获取中心顶点
     * @returns 
     */
    public getMidTopRowCol(): RowCol {
        let midRowCol = this.getMidRowCol();
        midRowCol.Col = this.mMaxCol - 1;
        return midRowCol;
    }

    /**
     * 获取中心底点
     * @returns 
     */
    public getMidDownRowCol(): RowCol {
        let midRowCol = this.getMidRowCol();
        midRowCol.Row = midRowCol.Row - 1;
        midRowCol.Col = 0;
        return midRowCol;
    }

    /**
     * 获取中心左方点
     * @returns 
     */
    public getMidLeftRowCol(): RowCol {
        let midRowCol = this.getMidRowCol();
        midRowCol.Row = 0;
        midRowCol.Col = midRowCol.Col - 1;
        return midRowCol;
    }

    /**
     * 获取中心右方点
     * @returns 
     */
    public getMidRightRowCol(): RowCol {
        let midRowCol = this.getMidRowCol();
        midRowCol.Col = midRowCol.Col - 1;
        return midRowCol;
    }

    /**
     * 获取对应标签
     * @param row 横
     * @param col 列
     * @returns 标签
     */
    public getIndexByRowCol(row: number, col: number): number {
        return row + col * this.mMaxRow;
    }

    /**
     * 根据标签获取 横列
     * @param index 标签
     * @returns 横列
     */
    public getRowColByIndex(index: number): RowCol {
        let col = ValueData.AsInt(index / this.mMaxRow);
        let row = ValueData.AsInt(index % this.mMaxRow);
        return new RowCol(row, col);
    }

    /**
     * 获取四方位数据
     * @param row 横
     * @param col 列
     * @returns 
     */
    public getAroundRowColArray(row: number, col: number): Array<RowCol> {
        let rowColArray: Array<RowCol> = [];
        if (this.isValidBound(row, col) == false)
            return rowColArray;

        if (this.isValidBound(row, col - 1))
            rowColArray.push(new RowCol(row, col - 1));

        if (this.isValidBound(row, col + 1))
            rowColArray.push(new RowCol(row, col + 1));

        if (this.isValidBound(row - 1, col))
            rowColArray.push(new RowCol(row - 1, col));

        if (this.isValidBound(row + 1, col))
            rowColArray.push(new RowCol(row + 1, col));

        return rowColArray;
    }

    /**
     * 获取八方位数据
     * @param row 横
     * @param col 列
     * @returns 
     */
    public getSudokuRoundRowColArray(row: number, col: number): Array<RowCol> {
        let rowColArray: Array<RowCol> = [];
        if (this.isValidBound(row, col) == false)
            return rowColArray;
        // -- Down
        if (this.isValidBound(row, col - 1))
            rowColArray.push(new RowCol(row, col - 1));
        // -- Up
        if (this.isValidBound(row, col + 1))
            rowColArray.push(new RowCol(row, col + 1));
        // -- Left
        if (this.isValidBound(row - 1, col))
            rowColArray.push(new RowCol(row - 1, col));
        // -- Left Up
        if (this.isValidBound(row - 1, col + 1))
            rowColArray.push(new RowCol(row - 1, col + 1));
        // -- Left Down
        if (this.isValidBound(row - 1, col - 1))
            rowColArray.push(new RowCol(row - 1, col - 1));
        // -- Right
        if (this.isValidBound(row + 1, col))
            rowColArray.push(new RowCol(row + 1, col));
        // -- Right Up
        if (this.isValidBound(row + 1, col + 1))
            rowColArray.push(new RowCol(row + 1, col + 1));
        // -- Right Down
        if (this.isValidBound(row + 1, col - 1))
            rowColArray.push(new RowCol(row + 1, col - 1));
        return rowColArray;
    }

    /**
     * 获取相同横坐标
     * @param row 横
     * @returns 
     */
    public getRowColArrayByRow(row: number): Array<RowCol> {
        let searchArray: Array<RowCol> = [];
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                if (i === row)
                    searchArray.push(new RowCol(i, j));
            }
        }
        return searchArray;
    }

    /**
     * 获取纵相同位置
     * @param col 纵
     * @returns 
     */
    public getRowColArrayByCol(col: number): Array<RowCol> {
        let searchArray: Array<RowCol> = [];
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                if (j === col)
                    searchArray.push(new RowCol(i, j));
            }
        }
        return searchArray;
    }

    /**
     * 获取指定横组所有坐标
     * @param rowList 
     * @returns 
     */
    public getMoreRowRowCol(rowList: Array<number>): Array<RowCol> {
        let searchArray: Array<RowCol> = [];
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                if (GameTool.IsContains(rowList, i))
                    searchArray.push(new RowCol(i, j));
            }
        }
        return searchArray;
    }

    /**
     * 获取指定列组所有坐标
     * @param colList 
     * @returns 
     */
    public getMoreColRowCol(colList: Array<number>): Array<RowCol> {
        let searchArray: Array<RowCol> = [];
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                if (GameTool.IsContains(colList, j))
                    searchArray.push(new RowCol(i, j));
            }
        }
        return searchArray;
    }

    /**
     * 随机获取
     * @returns 
     */
    public getRandRowCol(): RowCol {
        let randRow = RandTool.RandIncludeMin(0, this.mMaxRow);
        let randCol = RandTool.RandIncludeMax(0, this.mMaxCol);
        return new RowCol(randRow, randCol);
    }

    /**
     * 获取所有
     * @returns 
     */
    public getAllRowColArray(): Array<RowCol> {
        let rowColArray = [];
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let rowCol = new RowCol(i, j);
                rowColArray.push(rowCol);
            }
        }
        return rowColArray;
    }

    /**
     * 获取指定位置坐标顶部位置组
     * @param row 横
     * @param col 列
     * @returns 
     */
    public getUpGroup(row: number, col: number): Array<RowCol> {
        let rowColArray = [];
        if (!this.isValidBound(row, col))
            return rowColArray;
        for (let i = col + 1; i < this.mMaxCol; i++) {
            rowColArray.push(new RowCol(row, i));
        }
        return rowColArray;
    }

    /**
     * 获取指定位置坐标底部位置组
     * @param row 横
     * @param col 列
     * @returns 
     */
    public getDownGroup(row: number, col: number): Array<RowCol> {
        let rowColArray = [];
        if (!this.isValidBound(row, col))
            return rowColArray;
        for (let i = col - 1; i >= 0; i--) {
            rowColArray.push(new RowCol(row, i));
        }
        return rowColArray;
    }

    /**
     * 获取指定坐标左边位置组
     * @param row 横
     * @param col 列
     * @returns 
     */
    public getLeftGroup(row: number, col: number): Array<RowCol> {
        let rowColArray = [];
        if (!this.isValidBound(row, col))
            return rowColArray;
        for (let i = row - 1; i >= 0; i--) {
            rowColArray.push(new RowCol(i, col));
        }
        return rowColArray;
    }

    /**
     * 获取指定位置坐标右边位置组
     * @param row 横
     * @param col 列
     * @returns 
     */
    public getRightGroup(row: number, col: number): Array<RowCol> {
        let rowColArray = [];
        if (!this.isValidBound(row, col))
            return rowColArray;
        for (let i = row + 1; i < this.mMaxCol; i++) {
            rowColArray.push(new RowCol(i, col));
        }
        return rowColArray;
    }

    /**
     * 获取边角位置
     * @returns 
     */
    public getCornerGroup(): Array<RowCol> {
        return [this.LeftDownCorner, this.LeftUpCorner, this.RightUpCorner, this.RigthDownCorner]
    }

    /**
     *  获取环绕坐标组
     * @returns 
     */
    public getAroundGroup(): Array<RowCol> {
        let rowColArray = [];
        let minRow = this.mMaxRow - 1;
        let minCol = this.mMaxCol - 1;
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                if (i == minRow || j == minCol || i == 0 || j == 0)
                    rowColArray.push(new RowCol(i, j));
            }
        }
        return rowColArray;
    }
    /**
     *  获取顺时针环绕坐标组
     * @returns 
     */
    public getClockwiseAroundGroup(): Array<RowCol> {
        let resultArray = [];
        /**
         * Up
         */
        for (let i = 1; i < this.mMaxRow; i++) {
            resultArray.push(new RowCol(i, 0));
        }
        /**
         * Left
         */
        for (let i = 1; i < this.mMaxCol; i++) {
            resultArray.push(new RowCol(this.mMaxRow - 1, i));
        }
        /**
         * Down
         */
        if (this.mMaxRow - 2 > 0) {
            for (let i = this.mMaxRow - 2; i >= 0; i--) {
                resultArray.push(new RowCol(i, this.mMaxCol - 1));
            }
        }
        /**
         * Right
         */
        if (this.mMaxCol - 2 > 0) {
            for (let i = this.mMaxCol - 2; i >= 0; i--) {
                resultArray.push(new RowCol(0, i));
            }
        }
        return resultArray;
    }

    public log(): void {
        LogTool.Log("MaxRow = " + this.mMaxRow + "/" + "MaxCol = " + this.mMaxCol);
    }


    public toString(): string {
        return "{MaxRow:" + this.mMaxRow + "," + "MaxCol:" + this.mMaxCol + "}";
    }
}
