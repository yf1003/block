import * as cc from "cc";
import ContextPool from "../../common/tool/context/ContextPool";
import GameTool from "../../common/tool/GameTool";
import LocalCommon, { CubeColorType, CubeState } from "../config/LocalCommon";
import GameManager from "../manager/GameManager";
import MatrixBodyBase from "./MatrixBodyBase";
import { changeHeight, changeOpacity, changeWidth } from "../CommonFunc";
import { XTween } from "mvplayable";
const { ccclass, property } = cc._decorator;
@ccclass
export default class CubeBase extends MatrixBodyBase {
    @property(cc.Sprite)
    public SpriteBottom: cc.Sprite = null;
    @property(cc.Sprite)
    public SpriteUp: cc.Sprite = null;
    @property(cc.Sprite)
    public SpriteShadow: cc.Sprite = null;
    @property(cc.UIOpacity)
    public sprLight: cc.UIOpacity = null
    @property(cc.Node)
    private block: cc.Node = null



    protected mIsGray: boolean = false;
    public set IsGray(is: boolean) {
        this.mIsGray = is;
        this.refershGray();
    }
    public get IsGray(): boolean {
        return this.mIsGray;
    }

    protected mIsShadow: boolean = false;
    public set IsShadow(is: boolean) {
        this.mIsShadow = is;
        this.refershGray();
    }
    public get IsShadow(): boolean {
        return this.mIsShadow;
    }

    protected mCubeState: CubeState = CubeState.Null;
    public set CubeState(state: CubeState) {
        this.mCubeState = state;
        this.refershCubeColor();
    }
    public get CubeState(): CubeState {
        return this.mCubeState;
    }

    protected mColorType: CubeColorType = CubeColorType.Color1;
    public set ColorType(type: CubeColorType) {
        this.mColorType = type;

        this.refershFloorColor();
        this.refershCubeColor();
    }
    public get ColorType(): CubeColorType {
        return this.mColorType;
    }

    public get inShadow(): boolean {
        return this.SpriteShadow.node.active
    }

    public init(content: ContextPool): boolean {
        super.init(content);


        this.node.getComponent(cc.UITransform).setContentSize(LocalCommon.CUBE_WIDTH, LocalCommon.CUBE_HEIGHT)
        changeOpacity(this.SpriteUp.node, 0)
        this.SpriteUp.node.active = false
        this.SpriteBottom.node.active = false
        this.SpriteShadow.node.active = false;
        this.sprLight.opacity = 0
        this.block.active = false

        return true;
    }

    public refershFloorColor() {
        this.SpriteBottom.color = GameManager.GameThemeData.getFloorColor();
    }

    public refershCubeColor() {
        switch (this.mCubeState) {
            case CubeState.Null:
                changeOpacity(this.SpriteBottom.node, 0)
                changeOpacity(this.SpriteUp.node, 0)
                break;
            case CubeState.Empty:
                changeOpacity(this.SpriteBottom.node, 255)
                changeOpacity(this.SpriteUp.node, 255)
                break;
            case CubeState.Full:
                changeOpacity(this.SpriteBottom.node, 255)
                changeOpacity(this.SpriteUp.node, 255)
                this.SpriteUp.color = GameManager.GameThemeData.getBlockColor(this.mColorType);
                break;
        }
    }

    public refershGray() {
        // if (this.mIsGray)
        //     this.SpriteUp.customMaterial = this.MaterialGray
        // else
        //     this.SpriteUp.customMaterial = this.MaterialEmpty
    }

    public showShadow(color: CubeColorType): void {
        this.SpriteShadow.node.active = true;
        // changeWidth(this.SpriteShadow.node, LocalCommon.CUBE_WIDTH)
        // changeHeight(this.SpriteShadow.node, LocalCommon.CUBE_HEIGHT)
        // this.SpriteShadow.color = GameManager.GameThemeData.getBlockColor(color);
    }

    public hideShadow(): void {
        this.SpriteShadow.node.active = false;
    }

    private tween: XTween<cc.UIOpacity>
    public showFullAnim(colorType: CubeColorType) {
        this.ColorType = colorType
        this.CubeState = CubeState.Full

        this.hideShadow()

        this.block.active = true
        this.tween = XTween
            .to(this.sprLight, 0.2, { opacity: 255 })
            .to(0.1, { opacity: 55 })
            .set({ opacity: 0 })
            .play()
    }

    public showEmptyAnim() {
        this.tween.stop()
        this.sprLight.opacity = 0
        this.CubeState = CubeState.Empty
        this.block.active = false
    }

    public remove(): boolean {
        GameTool.DestoryNode(this);
        return true;
    }
}
