import * as cc from "cc";
import RowCol from "../matrix/RowCol";
export default class TiledMapData {
    /**
     *  瓦片数据
     */
    protected mMapData: cc.TiledMap = null;
    public get MapData(): cc.TiledMap {
        return this.mMapData;
    }
    /**
     * 横
     */
    protected mMapRow: number = -1;
    public get MapRow(): number {
        return this.mMapRow;
    }
    /**
     * 列
     */
    protected mMapCol: number = -1;
    public get MapCol(): number {
        return this.mMapCol;
    }

    /**
     * 坐标
     */
    public get RowCol(): RowCol {
        return new RowCol(this.mMapRow, this.mMapCol);
    }
    /**
     * 元素长
     */
    protected mItemWidth: number = 0;
    public get ItemWidth(): number {
        return this.mItemWidth;
    }
    /**
     * 元素宽
     */
    protected mItemHeight: number = 0;
    public get ItemHeight(): number {
        return this.mItemHeight;
    }
    /**
     * 元素大小
     */
    public get ItemSize(): cc.Size {
        return cc.size(this.mItemWidth, this.mItemHeight);
    }

    constructor(mapData: cc.TiledMap) {
        this.mMapData = mapData;

        let mapSize = this.mMapData.getMapSize();
        this.mMapRow = mapSize.width;
        this.mMapCol = mapSize.height;

        let itemSize = this.mMapData.getTileSize();
        this.mItemWidth = itemSize.width;
        this.mItemHeight = itemSize.height;
    }

    public isValidBound(checkRow: number, checkCol: number): boolean {
        if (checkRow < 0 || checkRow >= this.mMapRow)
            return false;
        if (checkCol < 0 || checkCol >= this.mMapCol)
            return false;
        return true;
    }
}
