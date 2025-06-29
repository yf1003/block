import BaseManager, { SystemType } from "../../common/important/BaseManager";
import GameThemeData from "./GameThemeData";
class GameManager extends BaseManager {
    public static readonly instance = new GameManager();

    protected mGameThemeData: GameThemeData = null;
    public get GameThemeData(): GameThemeData {
        return this.mGameThemeData;
    }
    constructor() {
        super(SystemType.GameManager);
    }
    public init(): boolean {
        this.mGameThemeData = new GameThemeData();
        return true;
    }
    public start(): void {
        this.mGameThemeData.read();
    }
    public ready(): void {
        this.mGameThemeData.read();
    }
    public close(): void {
    }
}
export default (GameManager.instance);