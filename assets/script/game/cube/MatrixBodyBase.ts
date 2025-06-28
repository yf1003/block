import * as cc from "cc";
import ContextComponent from "../../common/tool/context/ContextComponent";
import RowCol from "../../expand/matrix/RowCol";

const { ccclass, property } = cc._decorator;
@ccclass
export default class MatrixBodyBase extends ContextComponent {
    /**
     *   位置信息
     */
    protected mRowCol: RowCol = RowCol.Init;
    public set RowCol(rowCol: RowCol) {
        this.mRowCol.setRowCol(rowCol);
        this.onRowColChange();
    }
    public get RowCol(): RowCol {
        return this.mRowCol;
    }

    /**
     * 横
     */
    public set Row(row: number) {
        this.mRowCol.Row = row;
        this.onRowColChange();
    }
    public get Row(): number {
        return this.mRowCol.Row;
    }

    /**
     * 纵
     */
    public set Col(col: number) {
        this.mRowCol.Col = col;
        this.onRowColChange();
    }
    public get Col(): number {
        return this.mRowCol.Col;
    }

    public onRowColChange(): void {

    }
}
