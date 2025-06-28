import GameSaveTool from "./GameSaveTool";
import ISaveRecord from "./ISaveRecord";
export default abstract class RecordBase implements ISaveRecord {
    protected mGameSaveTool: GameSaveTool = null;
    public get SaveTool(): GameSaveTool {
        return this.mGameSaveTool;
    }
    constructor(key: string) {
        this.mGameSaveTool = new GameSaveTool(key);
    }
    public init(): boolean {
        this.mGameSaveTool.init();
        return true;
    }

    public start(): void {
        this.mGameSaveTool.start();

    }

    public ready(): void {
        this.mGameSaveTool.ready();
        this.read();
    }

    public close(): void {
        this.save();
        this.mGameSaveTool.close();
    }
    public save(): void {
        this.mGameSaveTool.save();
    }

    public clear(): void {
        this.mGameSaveTool.clear();
    }

    /**
     * 获取存储数据
     * @param key 
     * @param defaultValue 
     * @returns 
     */
    protected getSaveData(key: string, defaultValue: any): any {
        return this.mGameSaveTool.getData(key, defaultValue);
    }

    /**
     * 设置存储数据
     * @param key 
     * @param value 
     * @returns 
     */
    protected setSaveData(key: string, value: any): boolean {
        return this.mGameSaveTool.setData(key, value);
    }

    public abstract read(): void;
}
