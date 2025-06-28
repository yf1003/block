import BaseManager, { SystemType } from "../../common/important/BaseManager";
import List from "../../common/tool/List";
import { IManager } from "../../expand/interface/IManager";
import { ItemType } from "../config/LocalCommon";
import ItemRecord from "./item/ItemRecord";
import RecordBase from "./RecordBase";
class GameDataManager extends BaseManager {
    public static readonly instance = new GameDataManager();

    /**
     * 元素记录
     */
    private mItemRecord: ItemRecord = null;
    public get ItemRecord(): ItemRecord {
        return this.mItemRecord;
    }


    protected mRecordList: List<RecordBase> = new List<RecordBase>();

    constructor() {
        super(SystemType.GameDataManager)
        let version = 1;
        
        // -- 元素记录
        this.mItemRecord = new ItemRecord("Item" + version);
        this.mRecordList.add(this.mItemRecord)
    }

    public init(): boolean {
        this.mRecordList.forEach((record) => {
            record.init();
        });
        return true;
    }
    public close(): void {
        this.mRecordList.forEach((record) => {
            record.close();
        });
    }
    public start(): void {
        this.mRecordList.forEach((record) => {
            record.start();
        });
    }
    public ready(): void {
        this.mRecordList.forEach((record) => {
            record.ready();
        });
    }

    /**
     * 清空数据
     */
    public clear(): void {
        this.mRecordList.forEach((record) => {
            record.clear();
        });
    }

    /**
     * 保存数据
     */
    public save(): void {
        this.mRecordList.forEach((record) => {
            record.save();
        });
    }
}
export default (GameDataManager.instance);