import * as cc from "cc";
import MatrixBase from "./MatrixBase";
import RowCol from "./RowCol";
export default class MatrixData extends MatrixBase {
    protected mMatrixDataArray: Array<Array<cc.Node>> = [];
    public get MatrixDataArray() {
        return this.mMatrixDataArray;
    }

    constructor(key: string, row: number, col: number) {
        super(key, row, col);
        this.initMatrixData();
    }
    public initMatrixData() {
        for (var i = 0; i < this.mMaxRow; i++) {
            this.mMatrixDataArray.push([]);
        }
        for (var i = 0; i < this.mMaxRow; i++) {
            for (var j = 0; j < this.mMaxCol; j++) {
                this.mMatrixDataArray[i].push(null);
            }
        }
    }

    /**
     * 插入
     * @param item 元素节点 
     * @param row 横
     * @param col 列
     * @returns 结果
     */
    public insert(item: cc.Node, row: number, col: number): boolean {
        if (!this.isValidBound(row, col))
            return false;
        if (this.mMatrixDataArray[row][col]) {
            throw ("被强制替换了");
        }
        this.mMatrixDataArray[row][col] = item;
        return true;
    }

    /**
     * 插入
     * @param item 元素节点
     * @param rowCol 坐标
     * @returns 结果
     */
    public insertByRowCol(item: cc.Node, rowCol: RowCol): boolean {
        return this.insert(item, rowCol.Row, rowCol.Col);
    }

    /**
     * 删除
     * @param removeItem 删除节点
     * @returns 结果
     */
    public removeByItem(removeItem: cc.Node): boolean {
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let item = this.mMatrixDataArray[i][j];
                if (removeItem === item) {
                    return this.remove(i, j);
                }
            }
        }
        return false;
    }

    /**
     * 删除
     * @param rowCol 坐标 
     * @returns 结果
     */
    public removeByRowCol(rowCol: RowCol) {
        return this.remove(rowCol.Row, rowCol.Col);
    }

    /**
     * 删除
     * @param row 横
     * @param col 列
     * @returns 结果
     */
    public remove(row: number, col: number): boolean {
        if (!this.isValidBound(row, col))
            return false;
        this.mMatrixDataArray[row][col] = null;
        return true;
    }
    /**
     * 交换
     * @param aRow 横
     * @param aCol 列
     * @param bRow 横
     * @param bCol 列
     * @returns 
     */
    public swap(aRow: number, aCol: number, bRow: number, bCol: number): boolean {
        if (!this.isValidBound(aRow, aCol))
            return false;
        if (!this.isValidBound(bRow, bCol))
            return false;

        let nodeA = this.get(aRow, aCol);
        let nodeB = this.get(bRow, bCol);
        this.mMatrixDataArray[aRow][aCol] = nodeB;
        this.mMatrixDataArray[bRow][bCol] = nodeA;
        return true;
    }

    public swapByRowCol(aRowCol: RowCol, bRowCol: RowCol): boolean {
        return this.swap(aRowCol.Row, aRowCol.Col, bRowCol.Row, bRowCol.Col);
    }

    /**
     * 获取节点
     * @param row 横
     * @param col 列
     * @returns 结果
     */
    public get(row: number, col: number): cc.Node {
        if (!this.isValidBound(row, col))
            return null;
        return this.mMatrixDataArray[row][col];
    }

    /**
     * 获取
     * @param rowCol 坐标
     * @returns 结果
     */
    public getByRowCol(rowCol: RowCol) {
        return this.get(rowCol.Row, rowCol.Col);
    }

    /**
     * 获取所有
     * @returns 结果 
     */
    public getAll(): Array<cc.Node> {
        let searchList = [];
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let node = this.mMatrixDataArray[i][j];
                if (node)
                    searchList.push(node);
            }
        }
        return searchList;
    }

    /**
     * 获取所有空位置
     */
    public getNull(): Array<RowCol> {
        let searchArray = [];
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let node = this.mMatrixDataArray[i][j];
                if (node === null)
                    searchArray.push(new RowCol(i, j));
            }
        }
        return searchArray;
    }

    /**
     * 是否没有空位
     * @returns 结果
     */
    public isFull(): boolean {
        for (var i = 0; i < this.mMaxRow; i++) {
            for (var j = 0; j < this.mMaxCol; j++) {
                if (this.mMatrixDataArray[i][j] == null)
                    return false;
            }
        }
        return true;
    }
}
