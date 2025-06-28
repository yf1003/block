
import RowCol from "../matrix/RowCol";

export enum AstarType {
    Null = 0,    // 空的

    StopMin,
    Stone,       // 石头
    StopMax,

    OpenMin,
    Level1,      // 级别
    Level2,
    Level3,
    Level4,
    OpenMax,
}

export default class AstarPoint {
    private mF: number = 0;
    public set F(value: number) {
        this.mF = value;
    }
    public get F(): number {
        return this.mF;
    }
    private mG: number = 0;
    public set G(value: number) {
        this.mG = value;
    }
    public get G(): number {
        return this.mG;
    }
    private mH: number = 0;
    public set H(value: number) {
        this.mH = value;
    }
    public get H(): number {
        return this.mH;
    }
    private mD: number = 0;
    public set D(value: number) {
        this.mD = value;
    }
    public get D(): number {
        return this.mD;
    }

    private mAstarType: AstarType = AstarType.Null;
    public set AstarType(value: AstarType) {
        this.mAstarType = value;
    }
    public get AstarType(): AstarType {
        return this.mAstarType;
    }
    private mRowCol: RowCol = new RowCol();
    public set RowCol(value: RowCol) {
        this.mRowCol = value;
    }
    public get RowCol(): RowCol {
        return this.mRowCol;
    }

    private mParent: AstarPoint = null;
    public set Parent(point: AstarPoint) {
        this.mParent = point;
    }
    public get Parent(): AstarPoint {
        return this.mParent;
    }

    constructor(row: number, col: number, type: AstarType) {
        this.mRowCol.Row = row;
        this.mRowCol.Col = col;
        this.mAstarType = type;
    }

    public isSameValue(type: AstarType): boolean {
        if (this.mAstarType == type)
            return true;
        return false;
    }

    public isStop(): boolean {
        if (this.mAstarType > AstarType.StopMin && this.mAstarType < AstarType.StopMax)
            return true;
        return false;
    }

    public isOpen(): boolean {
        if (this.mAstarType > AstarType.OpenMin && this.mAstarType < AstarType.OpenMax)
            return true;
        return false;
    }

}
