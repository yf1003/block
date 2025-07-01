import * as cc from "cc";
import { CubeColorType } from "../config/LocalCommon";
import GameManager from "../manager/GameManager";
import MatrixBodyBase from "./MatrixBodyBase";
const { ccclass, property } = cc._decorator;
@ccclass
export default class ModelCube extends MatrixBodyBase {
    @property(cc.Node)
    public Shadow: cc.Node = null;
    @property(cc.Sprite)
    public SpriteCube: cc.Sprite = null;

    protected mIsGray: boolean = false;
    public set IsGray(is: boolean) {
        this.mIsGray = is;
        this.refershGray();
    }
    public get IsGray(): boolean {
        return this.mIsGray;
    }


    protected mColorType: CubeColorType = CubeColorType.Color1;
    public set ColorType(type: CubeColorType) {
        this.mColorType = type;
        this.refershCubeColor();
    }
    public get ColorType(): CubeColorType {
        return this.mColorType;
    }

    public refershCubeColor() {
        // this.SpriteCube.color = GameManager.GameThemeData.getBlockColor(this.mColorType);
    }


    public refershGray() {
        if (this.mIsGray) {
            this.SpriteCube.getComponent(cc.UIOpacity).opacity = 100
        }
        else
            this.SpriteCube.getComponent(cc.UIOpacity).opacity = 255
    }

    /**
     * 抓取
     */
    public pickUp(): void {
        this.node.setScale(1, 1, 1);
        this.Shadow.active = false
    }

    /**
     * 放下
     */
    public putDown(): void {
        this.node.setScale(1, 1, 1);
        this.Shadow.active = true
    }
}
