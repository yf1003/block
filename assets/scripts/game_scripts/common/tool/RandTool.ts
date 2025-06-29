import * as cc from "cc";
import List from "./List";
export default class RandTool {
    /**
     * 随机不包含两边
     * @param min 最小值
     * @param max 最大值
     * @returns 结果
     */
    public static RandNumber(min: number, max: number): number {
        let rand = Math.floor(Math.random() * (max - min - 1));
        return rand + min + 1;
    }

    /**
     * 随机包含最小
     * @param min 最小值
     * @param max 最大值
     * @returns 结果
     */
    public static RandIncludeMin(min: number, max: number): number {
        let rand = Math.floor(Math.random() * (max - min));
        return rand + min;
    }

    /**
     * 随机包含最大
     * @param min 最小值
     * @param max 最大值
     * @returns 结果
     */
    public static RandIncludeMax(min: number, max: number): number {
        let rand = Math.floor(Math.random() * (max - min));
        return rand + min + 1;
    }

    /**
     * 随机包含最大最小
     * @param min 最小值
     * @param max 最大值
     * @returns 结果
     */
    public static RandIncludeAll(min: number, max: number): number {
        let rand = Math.floor(Math.random() * (max - min + 1));
        return rand + min;
    }

    /**
     * 随机正反(抛硬币)
     * @returns 结果
     */
    public static RandPlusOrMinus(): number {
        if (RandTool.RandIncludeAll(0, 1) == 0)
            return -1;
        return 1;
    }

    /**
     * 随机正反(抛硬币)
     * @returns 结果
     */
    public static RandPlusOrMinusAsBool(): boolean {
        if (RandTool.RandIncludeAll(0, 1) === 0)
            return false;
        return true;
    }

    /**
     * 打乱列表
     * @param array 
     * @returns 
     */
    public static RandArray(array: Array<any>): boolean {
        if (array && array.length > 0) {
            array.sort(function () {
                return 0.5 - Math.random();
            });
            return true;
        }
        return false;
    }

    /**
     * 随机获取一种颜色
     * @param a 透明度
     * @returns 结果
     */
    public static GetRandColor(a: number = 255): cc.Color {
        var r = RandTool.RandIncludeAll(0, 255);
        var g = RandTool.RandIncludeAll(0, 255);
        var b = RandTool.RandIncludeAll(0, 255);
        return cc.color(r, g, b, a);
    }

    /**
     * 获取数组随机索引
     * @param array 
     * @returns 索引
     */
    public static GetArrayRandIndex(array: Array<any>): number {
        if (array == null)
            return -1;
        if (array.length <= 0)
            return -1;
        if (array.length === 0)
            return 0;
        return RandTool.RandIncludeMin(0, array.length);
    }

    /**
     * 在数组里面随机取指定数量数据
     * @param array 
     * @param count 
     * @returns 
     */
    public static GetRandDataInArray(array: Array<any>, count: number): Array<any> {
        if (array.length <= count)
            return array;
        var randArray = [];
        for (let rand of array) {
            randArray.push(rand);
        }
        RandTool.RandArray(randArray);
        var resultArray = [];
        for (var i = 0; i < count; i++) {
            resultArray.push(randArray[i]);
        }
        return resultArray;
    }

    /**
     * 获取随机抽奖结果
     * @param array 
     * @returns 
     */
    public static GetLotteryResult(array: RandResultData[]): number {
        if (array === null)
            return -1;
        if (array.length <= 0)
            return -1;
        let addMax = 0;
        let areaDataList = new List<RandAreaData>();
        for (let i = 0; i < array.length; i++) {
            let areaData = new RandAreaData();
            areaData.Min = addMax;
            addMax = array[i].Ratio + addMax;
            areaData.Max = addMax;
            areaData.Index = i;
            areaDataList.add(areaData);
        }
        let randNum = RandTool.RandIncludeMin(0, addMax);
        for (var area of areaDataList) {
            if (randNum >= area.Min && randNum < area.Max)
                return area.Index;
        }
        return -1;
    }
}

export class RandResultData {
    public Key: number;
    public Ratio: number;

    constructor(key: number, raito: number) {
        this.Key = key;
        this.Ratio = raito;
    }
}


export class RandAreaData {

    /**
     * 下限
     */
    public Min: number;

    /**
     * 上限
     */
    public Max: number;

    /**
     * 索引
     */
    public Index: number;
}
