
import LogTool from "../../../common/tool/LogTool";
import { ItemType } from "../../config/LocalCommon";
import RecordBase from "../RecordBase";
import ItemSaveData from "./ItemSaveData";

export default class ItemRecord extends RecordBase {
    /**
     *  存储数据
     */
    private mItemDataMap: Map<ItemType, ItemSaveData> = new Map<ItemType, ItemSaveData>();
    public get Map(): Map<ItemType, ItemSaveData> {
        return this.mItemDataMap;
    }

    constructor(key: string) {
        super(key);
        this.mItemDataMap = new Map<ItemType, ItemSaveData>();
        this.mItemDataMap.clear();

        //@ts-ignore
        Object.values(ItemType).forEach((type) => {
            let initNumber = 0;
            //@ts-ignore
            this.mItemDataMap.set(ItemType[type], new ItemSaveData(ItemType[type], initNumber));
        });
    }

    public read(): void {
        this.mItemDataMap.forEach((value, key) => {
            let saveMessage = this.getSaveData(ItemType[key], value.pack());
            value.unPack(saveMessage);
        });
    }

    /**
     * 获取数据
     * @param type 元素类型 
     * @returns 数据
     */
    public getData(type: ItemType): ItemSaveData {
        if (this.mItemDataMap.has(type))
            return this.mItemDataMap.get(type);
        LogTool.LogWarning("没有查询到类型 Type = " + type + "存储数据");
        return null;
    }

    /**
     * 增加元素
     * @param type 元素类型
     * @param add 数量
     * @returns 是否成功
     */
    public add(type: ItemType, add: number = 1): boolean {
        let data = this.getData(type);
        if (!data)
            return false;
        if (data.add(add)) {
            this.setSaveData(ItemType[type], data.pack());
            // -- 建议直接保存
            this.save();
            return true;
        }
        return false;
    }

    /**
     * 减少元素
     * @param type 元素类型 
     * @param reudce 数量
     * @returns 是否成功
     */
    public reduce(type: ItemType, reudce: number): boolean {
        let data = this.getData(type);
        if (!data)
            return false;
        if (data.reduce(reudce)) {
            this.setSaveData(ItemType[type], data.pack());
            // -- 建议直接保存
            this.save();
            return true;
        }
        return false;
    }

    /**
     * 是否足够
     * @param type 元素类型
     * @param cost 数量
     * @returns 是否足够
     */
    public isEnough(type: ItemType, cost: number): boolean {
        let data = this.getData(type);
        if (!data)
            return false;
        return data.isEnough(cost);
    }
}
