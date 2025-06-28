import SaveManager from "../save/SaveManager";
import BaseManager, { SystemType } from "./BaseManager";
class DataManager extends BaseManager {
    public static readonly SaveScoreKey: string = "SaveScoreKey";

    public static readonly instance: DataManager = new DataManager();
    protected mScore: number = 0;
    public get Score(): number {
        return this.mScore;
    }
    public set Score(score: number) {
        if (this.mScore <= score) {
            this.mScore = score;
        }
        SaveManager.setData(DataManager.SaveScoreKey, this.mScore);
        SaveManager.save();
    }



    constructor() {
        super(SystemType.Data);
    }

    public init(): boolean {
        return true;
    }

    public start(): void {
        this.mScore = SaveManager.getData(DataManager.SaveScoreKey, this.mScore);
    }

    public ready(): void {
        this.mScore = SaveManager.getData(DataManager.SaveScoreKey, this.mScore);
    }

    public close(): void {
        SaveManager.setData(DataManager.SaveScoreKey, this.mScore);
    }

}
export default (DataManager.instance);