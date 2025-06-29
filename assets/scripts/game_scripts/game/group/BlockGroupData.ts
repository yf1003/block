import * as cc from "cc";
import ContextComponent from "../../common/tool/context/ContextComponent";
import ContextPool from "../../common/tool/context/ContextPool";
import { GroupType } from "../config/LocalCommon";
import BlockMap from "./BlockMap";

const { ccclass, property } = cc._decorator;
@ccclass
export default class BlockGroupData extends ContextComponent {
    @property(cc.Prefab)
    public PrefabGroupZ: cc.Prefab = null;
    @property(cc.Prefab)
    public PrefabGroupT: cc.Prefab = null;
    @property(cc.Prefab)
    public PrefabGroupJ: cc.Prefab = null;
    @property(cc.Prefab)
    public PrefabGroupLine: cc.Prefab = null;
    @property(cc.Prefab)
    public PrefabGroupStone: cc.Prefab = null;
    @property(cc.Prefab)
    public PrefabGroupLineDouble: cc.Prefab = null;


    @property(cc.Prefab)
    public PrefabGroupLineSmall1: cc.Prefab = null;
    @property(cc.Prefab)
    public PrefabGroupLineSmall2: cc.Prefab = null;
    @property(cc.Prefab)
    public PrefabGroupStone2: cc.Prefab = null;
    @property(cc.Prefab)
    public PrefabGroupStone3: cc.Prefab = null;
    @property(cc.Prefab)
    public PrefabGroupStone4: cc.Prefab = null;


    protected mMapBlockGroupData: Map<GroupType, Array<Array<cc.Vec3>>> = new Map<GroupType, Array<Array<cc.Vec3>>>();
    public get MapBlockGroupData(): Map<GroupType, Array<Array<cc.Vec3>>> {
        return this.mMapBlockGroupData;
    }

    protected mMaxNumber: number = 0;
    public get MaxNumber(): number {
        return this.mMaxNumber;
    }


    public init(content: ContextPool): boolean {
        super.init(content);
        this.loadGroupData();
        return true;
    }

    public loadGroupData(): void {
        this.mMapBlockGroupData.set(GroupType.Z, this.getGroupData(this.PrefabGroupZ));
        this.mMapBlockGroupData.set(GroupType.T, this.getGroupData(this.PrefabGroupT));
        this.mMapBlockGroupData.set(GroupType.J, this.getGroupData(this.PrefabGroupJ));
        this.mMapBlockGroupData.set(GroupType.Line, this.getGroupData(this.PrefabGroupLine));
        this.mMapBlockGroupData.set(GroupType.Stone, this.getGroupData(this.PrefabGroupStone));
        this.mMapBlockGroupData.set(GroupType.LineDouble, this.getGroupData(this.PrefabGroupLineDouble));
        this.mMapBlockGroupData.set(GroupType.LineSmall1, this.getGroupData(this.PrefabGroupLineSmall1));
        this.mMapBlockGroupData.set(GroupType.LineSmall2, this.getGroupData(this.PrefabGroupLineSmall2));
        this.mMapBlockGroupData.set(GroupType.Stone2, this.getGroupData(this.PrefabGroupStone2));
        this.mMapBlockGroupData.set(GroupType.Stone3, this.getGroupData(this.PrefabGroupStone3));
        this.mMapBlockGroupData.set(GroupType.Stone4, this.getGroupData(this.PrefabGroupStone4));
    }

    public getGroupData(prefab: cc.Prefab): Array<Array<cc.Vec3>> {
        let pointList: Array<Array<cc.Vec3>> = [];
        let node = cc.instantiate(prefab);
        let map = node.getComponent(BlockMap);
        if (map) {
            map.init();
            pointList = map.CubePositonArray;
        }
        for (var i = 0; i < pointList.length; i++) {
            if (this.mMaxNumber < pointList[i].length)
                this.mMaxNumber = pointList[i].length;
        }
        return pointList;
    }
}
