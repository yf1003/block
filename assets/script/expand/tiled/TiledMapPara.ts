
export enum MapParaType {
    /**
     * 空位置
     */
    Null = 1,
    /**
     * 普通
     */
    Normal = 2,
    /**
     * 分裂
     */
    Split = 3,
    /**
     * Boss1
     */
    Boss1 = 4,
    /**
     * Boss2
     */
    Boss2 = 5,
    /**
     * Boss3
     */
    Boss3 = 6,
}

export interface MapParaStruct {
    Index: number,
    Type: MapParaType,
    Row: number,
    Col: number,
}
export default class TiledMapPara {
    public static MapParaList: Array<MapParaStruct> = [
        { Index: 0, Type: MapParaType.Null, Row: -1, Col: -1 },
        { Index: 1, Type: MapParaType.Normal, Row: -1, Col: -1 },
        { Index: 2, Type: MapParaType.Split, Row: -1, Col: -1 },
        { Index: 3, Type: MapParaType.Boss1, Row: -1, Col: -1 },
        { Index: 4, Type: MapParaType.Boss2, Row: -1, Col: -1 },
        { Index: 5, Type: MapParaType.Boss3, Row: -1, Col: -1 },
    ]
    public static getParaByType(type: MapParaType): MapParaStruct {
        TiledMapPara.MapParaList.forEach((data) => {
            if (data.Type === type)
                return data;
        });
        return TiledMapPara.MapParaList[0];
    }

    public static getParaByIndex(index: number): MapParaStruct {
        for (let para of TiledMapPara.MapParaList) {
            if (para.Index === index)
                return para;
        }
        return TiledMapPara.MapParaList[0];
    }
}
