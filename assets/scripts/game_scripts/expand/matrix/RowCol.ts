import * as cc from "cc";
import LogTool from "../../common/tool/LogTool";
export default class RowCol {
    public set RowCol(rowCol: RowCol) {
        this.mRow = rowCol.Row;
        this.mCol = rowCol.Col;
    }
    public get RowCol(): RowCol {
        return this;
    }
    protected mRow: number = -1;
    public get Row(): number {
        return this.mRow;
    }
    public set Row(row: number) {
        this.mRow = row;
    }

    protected mCol: number = -1;
    public get Col(): number {
        return this.mCol;
    }

    public set Col(col: number) {
        this.mCol = col;
    }

    /**
     *  Up
     */
    public get Up(): RowCol {
        return new RowCol(this.mRow, this.mCol + 1);
    }

    /**
     *  Down
     */
    public get Down(): RowCol {
        return new RowCol(this.mRow, this.mCol - 1);
    }

    /**
     *  Left
     */
    public get Left(): RowCol {
        return new RowCol(this.mRow - 1, this.mCol);
    }

    /**
     *  Right
     */
    public get Right(): RowCol {
        return new RowCol(this.mRow + 1, this.mCol);
    }

    constructor(row: number = -1, col: number = -1) {
        this.mRow = row;
        this.mCol = col;
    }

    public setRowCol(rowCol: RowCol): void {
        this.mRow = rowCol.Row;
        this.mCol = rowCol.Col;
    }

    /**
     * 是否有误(未初始化)
     * @returns 结果
     */
    public isWrong(): boolean {
        if (this.mRow < 0 || this.mCol < 0)
            return true;
        return false;
    }

    /**
     * 横是否大于列
     * @returns 结果
     */
    public isRowLarger(): boolean {
        if (this.mRow > this.mCol)
            return true;
        return false;
    }

    /**
     * 列是否大于横
     * @returns 结果
     */
    public isColLarger(): boolean {
        if (this.mCol > this.mRow)
            return true;
        return false;
    }

    /**
     * 横列相同
     * @returns 
     */
    public isRowColSame(): boolean {
        if (this.mRow === this.mCol)
            return true;
        return false;
    }

    /**
     * 获取范围
     * @returns 结果
     */
    public getArea(): number {
        return this.mRow * this.mCol;
    }

    /**
     * 是否相同
     * @param rowCol 
     * @returns 结果
     */
    public isSame(rowCol: RowCol): boolean {
        if (this.mRow === rowCol.mRow
            && this.mCol === rowCol.mCol)
            return true;
        return false;
    }

    /**
     * 自加
     * @param rowCol 
     */
    public add(rowCol: RowCol): void {
        this.mRow = this.mRow + rowCol.Row;
        this.mCol = this.mCol + rowCol.Col;
    }

    /**
     * 自减
     * @param rowCol 
     */
    public reduce(rowCol: RowCol): void {
        this.mRow = this.mRow - rowCol.Row;
        this.mCol = this.mCol - rowCol.Col;
    }

    /**
     * 拷贝自己
     * @returns 结果
     */
    public clone(): RowCol {
        return new RowCol(this.mRow, this.mCol);;
    }

    /**
     *  清理
     */
    public clear(): void {
        this.mRow = -1;
        this.mCol = -1;
    }

    /**
     *  输出
     */
    public log(): void {
        LogTool.Log("RowCol =", this.mRow, this.mCol);
    }

    /**
     *  Zero
     */
    public static get Zero(): RowCol {
        return new RowCol(0, 0);
    }

    /**
     *  Wrong
     */
    public static get Init(): RowCol {
        return new RowCol(-1, -1);
    }

    /**
     * 克隆
     * @param a 
     * @returns 结果
     */
    public static Clone(a: RowCol): RowCol {
        return new RowCol(a.Row, a.Col);
    }

    /**
     * 靠近
     * @param a 
     * @param b 
     * @param dis 距离 
     * @returns 结果
     */
    public static IsNear(a: RowCol, b: RowCol, dis: number = 1): boolean {
        if (a.isWrong())
            return false;
        if (b.isWrong())
            return false;
        if (a.Row === b.Row && a.Col !== b.Col) {
            if (Math.abs(a.Col - b.Col) == dis)
                return true;
        }
        else if (a.Col === b.Col && a.Row !== b.Row) {
            if (Math.abs(a.Row - b.Row) == dis)
                return true;
        }
        return false;
    }

    /**
     * 相等
     * @param a 
     * @param b 
     * @returns 结果
     */
    public static Same(a: RowCol, b: RowCol): boolean {
        if (a.Row === b.Row && a.Col === b.Col)
            return true;
        return false;
    }

    /**
     * 加法
     * @param a 
     * @param b 
     * @returns a + b
     */
    public static Add(a: RowCol, b: RowCol): RowCol {
        return new RowCol(a.Row + b.Row, a.Col + b.Col);
    }

    /**
     * 减法
     * @param a 
     * @param b 
     * @returns a - b 
     */
    public static Reduce(a: RowCol, b: RowCol): RowCol {
        return new RowCol(a.Row - b.Row, a.Col - b.Col);
    }

    /**
     * 乘法
     * @param a 
     * @param b 
     * @returns a * b 
     */
    public static Multiply(a: RowCol, b: RowCol): RowCol {
        return new RowCol(a.Row * b.Row, a.Col * b.Col);
    }
}
