import * as cc from "cc";
import CommonEvent from "../../common/CommonEvent";
import EventNotice from "../../common/tool/EventNotice";
import GameTool from "../../common/tool/GameTool";
import IRegisterEvent from "../interface/IRegisterEvent";
import BaseScene from "./BaseScene";
const { ccclass, property } = cc._decorator;
/**
 * 主界面 zIndx 
 */
export enum MainZindex {
    /**
     *  下限
     */
    Min = -1,

    /**
     *  游戏
     */
    Main = 200,
    /**
     *  Other
     */
    Other = 300,

    /**
     * 顶部
     */
    Top = 600,

    /**
     *  商店
     */
    Shop = 1000,

    /**
     * 游戏特效
     */
    Effect = 1200,

    /**
     *  提示
     */
    Tip = 1500,


    /**
     * 加载
     */
    Loading = 1400,

    /**
     *  网络遮罩
     */
    Shadow = 1501,

    /**
     *   引导
     */
    Guide = 2000,

    /**
     * 测试
     */
    Debug = 3000,

    /**
     * 上限
     */
    MAX = 9999,
}

export enum LayerType {

    /**
     * 层
     */
    Layer = 0,

    /**
     * 对话框
     */

    Dialog = 1,

    /**
     * 扩展...
     */
    DialogCloseButton = 2,
}

export enum LayerShowType {
    /**
     * 普通规则
     */
    Normal,

    /**
     * 常驻
     */
    Always,
}

@ccclass
export default class LayerBase extends cc.Component implements IRegisterEvent {
    /**
     * 层展示类型
     */
    protected mLayerShowType: LayerShowType = LayerShowType.Normal;
    public set LayerShowType(value: LayerShowType) {
        this.mLayerShowType = value;
    }
    public get LayerShowType(): LayerShowType {
        return this.mLayerShowType;
    }

    /**
     *  层类型
     */
    protected mLayerType: LayerType = LayerType.Layer;
    public get LayerType() {
        return this.mLayerType;
    }
    public set LayerType(type: LayerType) {
        this.mLayerType = type;
    }

    public isLayer(): boolean {
        return LayerType.Layer === this.mLayerType;
    }

    public isDialog(): boolean {
        return LayerType.Dialog === this.mLayerType;
    }


    /**
     *  关闭
     */
    public close() {
        let scene = cc.director.getScene();
        let canvas = scene.getChildByName('Canvas');
        let baseScene = canvas.getComponent(BaseScene);

        if (!baseScene.remove(this))
            GameTool.DestoryNode(this);
    }

    /**
     *  发送层级打开
     */
    public sendShow(): void {
        EventNotice.emit(CommonEvent.COMMON_EVENT_LAYER_SHOW, this.name);
    }

    /**
     *  发送层级关闭
     */
    public sendClose(): void {
        EventNotice.emit(CommonEvent.COMMON_EVENT_LAYER_CLOSE, this.name);
    }

    /**
     * 创建
     * @param resPath 路径
     * @param zIndex 层级
    */
    public static CreateRes(resPath: string, zIndex: MainZindex = MainZindex.Other): void {
        let nowScene = cc.director.getScene();
        let canvas = nowScene.getChildByName('Canvas');
        let baseScene = canvas.getComponent(BaseScene);
        if (baseScene) {
            cc.loader.loadRes(resPath, cc.Prefab, (err, prefab: cc.Prefab) => {
                if (err)
                    return;
                let layer = cc.instantiate(prefab).getComponent(LayerBase);
                baseScene.insert(layer, zIndex);
            });
        }
    }

    /**
     * 创建
     * @param type 类型
     * @param prefab 预制体
     * @param zIndex 层级
     * @returns 
     */
    public static Create<T extends LayerBase>(type: { prototype: T }, prefab: cc.Prefab, zIndex: MainZindex = MainZindex.Other): T {
        let nowScene = cc.director.getScene();
        let canvas = nowScene.getChildByName('Canvas');
        let baseScene = canvas.getComponent(BaseScene);
        if (baseScene) {
            let layer = cc.instantiate(prefab).getComponent(LayerBase);
            baseScene.insert(layer, zIndex);
            if (layer instanceof <any>type)
                return layer as T;
            if (Object.getPrototypeOf(layer) === type)
                return layer as T;
        }
        return null;
    }

    /**
     *  注册监听
     */
    public onRegisterEvent(): void {

    }

    /**
     *  取消监听
     */
    public onCancelEvent(): void {

    }

    /**
     *  展示
     */
    public show(): void {
        this.node.active = true;
        const opCom = this.node.getComponent(cc.UIOpacity) || this.node.addComponent(cc.UIOpacity)
        opCom.opacity = 255;
    }

    /**
     *  隐藏
     */
    public hide(): void {
        const opCom = this.node.getComponent(cc.UIOpacity) || this.node.addComponent(cc.UIOpacity)
        opCom.opacity = 0;
        this.node.active = false;
    }

    /**
     * 安卓返回键
     * @returns 是否处理完毕
     */
    public onKeyDown(): boolean {
        return false;
    }

    /**
     *  初始化
     */
    public  init(): boolean{return true}
}
