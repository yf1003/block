import * as cc from "cc";
import AddtionCenter from "../../common/multiPlatform/MultiPlatformManager";
import GameTool from "../../common/tool/GameTool";
import LogTool from "../../common/tool/LogTool";
import LayerBase, { LayerShowType, MainZindex } from "./LayerBase";

const { ccclass, property } = cc._decorator;
@ccclass
export default  class BaseScene extends cc.Component {
    protected mLayerList: Array<LayerBase> = [];
    protected mAlwayList: Array<LayerBase> = [];
    protected mTag: string = "";

    public init(tag: string): boolean {
        this.mTag = tag;
        this.mLayerList = [];

        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        /**
         * 处理切到后台的事件
         */
        cc.game.on(cc.Game.EVENT_HIDE, () => {
            this.onGameHideCallBack();
        });

        /**
         * 处理切到前台的事件
         */
        cc.game.on(cc.Game.EVENT_SHOW, () => {
            this.onGameShowCallBack();
        });
        return true;
    }

    protected onDestroy(): void {
        // cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    public onKeyDown(): void {
        LogTool.Log("点击返回键");
        if (!this.isEmpty()) {
            this.closeTop();
            return;
        }
        if (this.onKeyDownCallBack())
            AddtionCenter.close();
    }

    public insert(layer: LayerBase, zIndex: MainZindex, hideBefore: boolean = true): boolean {
        if (!layer) {
            LogTool.LogWarning("Scene Insert Layer error");
            return false;
        }
        this.node.addChild(layer.node);
        this.node.setSiblingIndex(zIndex)
        if (layer.init())
            layer.onRegisterEvent();
        else
            LogTool.LogWarning("Layer Init Wrong!!!");
        switch (layer.LayerShowType) {
            case LayerShowType.Normal:
                if (layer.isLayer() && hideBefore)
                    this.hideBottom();
                this.mLayerList.push(layer);
                break;
            case LayerShowType.Always:
                this.mAlwayList.push(layer);
                break;
        }
        return true;
    }


    public isEmpty(): boolean {
        if (this.mLayerList.length <= 0)
            return true;
        return false;
    }

    public isContainLayer(layer: LayerBase): boolean {
        if (!layer)
            return false;
        for (let data of this.mLayerList) {
            if (data === layer)
                return true;
        }
        return false;
    }

    public isContain<T extends LayerBase>(type: { prototype: T }): boolean {
        for (let data of this.mLayerList) {
            let any = <any>type;
            if (data instanceof any)
                return true;
            if (Object.getPrototypeOf(data) === type)
                return true;
        }
        return false;
    }

    public getLayer<T extends LayerBase>(type: { prototype: T }): T {
        for (let data of this.mLayerList) {
            let any = <any>type;
            if (data instanceof any)
                return data as T;
            if (Object.getPrototypeOf(data) === type)
                return data as T;
        }
        return null;
    }

    public remove(layer: LayerBase): boolean {
        if (!layer) {
            LogTool.LogWarning("remove Layer error");
            return false;
        }
        switch (layer.LayerShowType) {
            case LayerShowType.Normal:
                this.removeNormal(layer);
                return true;
            case LayerShowType.Always:
                this.removeAlway(layer);
                return true;
        }
    }

    public removeNormal(layer: LayerBase) {
        let isRemoveLayer = false;
        for (let i = this.mLayerList.length - 1; i >= 0; i--) {
            let serchDialog = this.mLayerList[i];
            if (serchDialog == layer) {

                if (layer.isLayer())
                    isRemoveLayer = true;
                this.mLayerList.splice(i, 1);
                layer.onCancelEvent();
                GameTool.DestoryNode(layer);
                break;
            }
        }
        if (isRemoveLayer)
            this.showOther();
    }

    public removeAlway(layer: LayerBase) {
        for (let i = this.mAlwayList.length - 1; i >= 0; i--) {
            let serchDialog = this.mAlwayList[i];
            if (serchDialog == layer) {
                this.mAlwayList.splice(i, 1);
                GameTool.DestoryNode(layer);
                break;
            }
        }
    }

    public showOther() {
        for (let i = this.mLayerList.length - 1; i >= 0; i--) {
            let layer = this.mLayerList[i];
            if (layer.isLayer()) {
                // 找到下一个层就跳出,层下方不能展示
                layer.show();
                break;
            }
            else {
                // 对话框无所谓,一直查找直到找到层
                layer.show();
            }
        }
    }

    /**
     *  隐藏底部
     */
    public hideBottom() {
        for (let i = 0; i < this.mLayerList.length; i++) {
            this.mLayerList[i].hide();
        }
    }

    /**
     * 关闭顶部
     * @returns 结果
     */
    public closeTop(): boolean {
        if (this.isEmpty())
            return false;
        for (let i = this.mLayerList.length - 1; i >= 0; i--) {
            if (this.mLayerList[i].onKeyDown())
                return true;
        }
        return false;
    }

    //--返回键
    public onKeyDownCallBack(): boolean {
        return false;
    }

    public onGameHideCallBack(): void {

    }

    public onGameShowCallBack(): void {

    }

}
