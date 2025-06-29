import * as cc from "cc";
import { DirectionType } from "../../common/GameCommon";
import ContextComponent from "../../common/tool/context/ContextComponent";
import ContextPool from "../../common/tool/context/ContextPool";
import RandTool from "../../common/tool/RandTool";
import { CubeColorType, CubeDirectionType, GroupType } from "../config/LocalCommon";
import ModelCube from "../cube/ModelCube";
import GameManager from "../manager/GameManager";
import BlockGroupData from "./BlockGroupData";
import { UserData } from "../UserData";
import { XTween } from "mvplayable";
const { ccclass, property } = cc._decorator;
@ccclass
export default class BlockGroups extends ContextComponent {
    @property(cc.Node)
    public NodeRotation: cc.Node = null;

    @property(cc.Prefab)
    public ModelCube: cc.Prefab = null;
    @property(cc.Node)
    public itemLayer: cc.Node = null;
    @property(cc.Node)
    public displayEffect: cc.Node = null;

    protected mIsGray: boolean = false;
    public set IsGray(is: boolean) {
        this.mIsGray = is;
    }
    public get IsGray(): boolean {
        return this.mIsGray;
    }

    /**
     * 组类型
     */
    protected mGroupType: GroupType = GroupType.Null;
    public set GroupType(type: GroupType) {
        this.mGroupType = type;
    }
    public get GroupType(): GroupType {
        return this.mGroupType;
    }


    /**
     * 方向
     */
    private mCubeDirectionType: CubeDirectionType = CubeDirectionType.Up;
    public set CubeDirectionType(type: CubeDirectionType) {
        this.mCubeDirectionType = type;
    }
    public get CubeDirectionType(): CubeDirectionType {
        return this.mCubeDirectionType;
    }


    /**
    * 颜色类型
    */
    private mCubeColorType: CubeColorType = CubeColorType.Color1;
    public set CubeColorType(type: CubeColorType) {
        this.mCubeColorType = type;
    }
    public get CubeColorType(): CubeColorType {
        return this.mCubeColorType;
    }

    protected mBlockGroupData: BlockGroupData = null;
    protected mModeDataList: Array<ModelCube> = [];
    protected mInitPositon: cc.Vec3 = cc.v3();

    public init(content: ContextPool): boolean {
        super.init(content);
        this.mBlockGroupData = this.getContext(BlockGroupData);
        this.mIsGray = false;

        this.initRotation();
        this.createAllModel();
        this.putDown();
        this.mInitPositon = this.node.position.clone();
        return true;
    }
    public initRotation() {
        this.NodeRotation.getComponent(cc.Sprite).color = GameManager.GameThemeData.getUIColor();
        this.NodeRotation.setSiblingIndex(1000)

        // let rotation1 = cc.rotateBy(0.5, 90);
        // let time = cc.delayTime(1.1);
        // let seq = cc.sequence(rotation1, time);

        // this.NodeRotation.runAction(cc.repeatForever(seq));
    }

    public createAllModel() {
        for (let i = 0; i < this.mBlockGroupData.MaxNumber; i++) {
            let model = cc.instantiate(this.ModelCube);
            let modelCube = model.getComponent(ModelCube);
            this.itemLayer.addChild(model);

            model.active = false;
            model.position = cc.v3(0, 0);
            this.mModeDataList.push(modelCube);
        }
    }

    public randGroupType(): void {
        this.GroupType = UserData.getGroupType();
    }
    public randCubeColorType(): void {
        this.CubeColorType = RandTool.RandIncludeAll(CubeColorType.Color1, CubeColorType.Color9);
    }
    public randCubeDirection(): void {
        this.CubeDirectionType = RandTool.RandIncludeAll(CubeDirectionType.Up, CubeDirectionType.Left);
    }


    public createNewGroup() {
        this.randGroupType();
        this.randCubeColorType();
        this.randCubeDirection();

        this.loadModelGroup();
        this.showRotationTip();
    }

    public runBackAction() {
        let targetPos = this.mInitPositon;
        let postarget = cc.v3(targetPos.x, targetPos.y);

        XTween
            .to(this.node, 0.1, { position: postarget })
            .play()
    }


    public runInsertAction(): void {
        this.node.setPosition(this.mInitPositon)
        this.displayEffect.active = true

        const particle1 = this.displayEffect.getComponent(cc.ParticleSystem)
        particle1.clear()
        particle1.play()

        const particle2 = this.displayEffect.children[0].getComponent(cc.ParticleSystem)
        particle2.clear()
        particle2.play()

        const defaultScale = 0.6
        this.node.setScale(0, 0, 1)
        XTween
            .to(this.node, 0.15, { scale: cc.v3(1.1 * defaultScale, 1.1 * defaultScale, 1) })
            .to(0.05, { scale: cc.v3(defaultScale, defaultScale, 1) })
            .call(() => {
                this.displayEffect.active = false
            })
            .play()
    }


    public roateModelGroup(): void {
        if (!this.isShowRotation()) return

        if (this.mCubeDirectionType + 1 > CubeDirectionType.Left)
            this.mCubeDirectionType = CubeDirectionType.Up;
        else
            this.mCubeDirectionType++;
        this.loadModelGroup();
    }


    public loadModelGroup(): void {
        this.clearAllModel();
        let posList = this.mBlockGroupData.MapBlockGroupData.get(this.mGroupType);

        for (let i = 0; i < posList.length; i++) {
            let directionList = posList[this.mCubeDirectionType];
            if (directionList.length <= 0) {
                if (this.mCubeDirectionType + 1 > CubeDirectionType.Left)
                    this.mCubeDirectionType = CubeDirectionType.Up;
                else
                    this.mCubeDirectionType++;
                continue;
            }
            else {
                for (let j = 0; j < directionList.length; j++) {
                    let postion = directionList[j];
                    let model = this.mModeDataList[j];
                    model.ColorType = this.mCubeColorType;

                    model.node.active = true;
                    model.node.position = cc.v3(postion.x, postion.y);
                }
                break;
            }
        }
    }


    public clearAllModel() {
        for (const model of this.mModeDataList) {
            model.node.active = false;
        }
    }


    public getModelCubePos(addPostion: cc.Vec2): Array<cc.Vec2> {
        let modelList: Array<cc.Vec2> = [];
        for (let i = 0; i < this.mModeDataList.length; i++) {
            let modelNode = this.mModeDataList[i].node;
            if (modelNode.active) {
                let pos = cc.v2(modelNode.position.x + addPostion.x, modelNode.position.y + addPostion.y);
                pos.x += this.node.position.x;
                pos.y += this.node.position.y;
                modelList.push(pos);
            }
        }
        return modelList;
    }

    public getAdjustModelsPos(): Array<Array<cc.Vec2>> {
        let xie = Math.sqrt(10 * 10 + 10 * 10);
        let addPos = [cc.v2(0, 0), cc.v2(0, 10), cc.v2(0, -10), cc.v2(10, 0), cc.v2(-10, 0), cc.v2(xie, -xie), cc.v2(xie, xie), cc.v2(-xie, xie), cc.v2(-xie, -xie)];
        let modelList = new Array();
        for (var i = 0; i < addPos.length; i++) {
            modelList.push(this.getModelCubePos(addPos[i]));
        }
        return modelList;
    }

    public getGroupPosArray(): Array<cc.Vec2> {
        return this.getGroupPosByDirectionType(this.mCubeDirectionType);
    }

    public getGroupPosByDirectionType(directionType: CubeDirectionType) {
        let groupPostionData = this.mBlockGroupData.MapBlockGroupData.get(this.mGroupType);
        return groupPostionData[directionType];
    }


    public getModelsPosOnMatrix(emptyPos: cc.Vec3, directionType: CubeDirectionType): Array<cc.Vec2> {
        let modelList: Array<cc.Vec2> = [];
        let nodepos = cc.v2(0, 0);
        let dataList = this.getGroupPosByDirectionType(directionType);
        if (dataList.length <= 0)
            return modelList;

        nodepos.x = emptyPos.x - dataList[0].x;
        nodepos.y = emptyPos.y - dataList[0].y;

        for (let i = 0; i < this.mModeDataList.length; i++) {
            if (this.mModeDataList[i].node.active) {
                let pos = cc.v2(this.mModeDataList[i].node.position.x, this.mModeDataList[i].node.position.y);
                pos.x += nodepos.x;
                pos.y += nodepos.y;
                modelList.push(pos);
            }
        }
        return modelList;
    }

    public isShowRotation() {
        return false
        let groupPostionData = this.mBlockGroupData.MapBlockGroupData.get(this.mGroupType);
        if (groupPostionData) {
            let index = 0;
            for (let data of groupPostionData) {
                if (data.length > 0) {
                    index++;
                    if (index >= 2)
                        return true;
                }
            }
        }
        return false;
    }

    public showRotationTip() {
        this.NodeRotation.active = this.isShowRotation();
    }

    public hideRotationTip() {
        this.NodeRotation.active = false;
    }

    public pickUp(): void {
        this.node.setScale(1, 1, 1);
        for (let model of this.mModeDataList) {
            model.pickUp();
        }
        this.hideRotationTip();
    }

    public putDown(): void {
        this.node.setScale(0.6, 0.6, 1);
        for (let model of this.mModeDataList) {
            model.putDown();
        }

        this.showRotationTip();
    }

    public showGray(): void {
        this.mIsGray = true;
        for (const model of this.mModeDataList) {
            model.IsGray = true;
        }

        this.hideRotationTip();
    }

    public hideGray(): void {
        this.mIsGray = false;
        for (const model of this.mModeDataList) {
            model.IsGray = false;
        }
        this.showRotationTip();
    }
}
