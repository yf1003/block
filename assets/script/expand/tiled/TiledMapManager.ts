import BaseManager, { SystemType } from "../../common/important/BaseManager";
import TiledMapData from "./TiledMapData";
import * as cc from "cc";

class TiledMapManager extends BaseManager {
    public static readonly instance = new TiledMapManager(SystemType.TiledMap);
    private mTiledMapDataArray: Array<TiledMapData> = [];
    public init(): boolean {
        return true;
    }
    public start(): void {
    }
    public close(): void {
    }
    public ready(): void {
    }
    public processMapData(data: cc.TiledMap): boolean {
        let mapData = new TiledMapData(data);
        this.mTiledMapDataArray.push(mapData);
        return true;
    }
    
    // -- Map
    public getMapDataByIndex(index: number): TiledMapData {
        if (index < 0 || index >= this.mTiledMapDataArray.length)
            return this.mTiledMapDataArray[0];
        return this.mTiledMapDataArray[index];
    }
    public getAllMapData(): Array<TiledMapData> {
        return this.mTiledMapDataArray;
    }
    public getMapCount(): number {
        return this.mTiledMapDataArray.length;
    }
}
export default (TiledMapManager.instance);
