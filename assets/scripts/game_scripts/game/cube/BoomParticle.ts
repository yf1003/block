import * as cc from "cc";
import { CubeColorType } from "../config/LocalCommon";
import GameManager from "../manager/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoomParticle extends cc.Component {
    @property(cc.ParticleSystem)
    public ParticleSystem: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    public ParticleSystem2: cc.ParticleSystem = null;

    protected mColorType: CubeColorType = CubeColorType.Color1;
    public set ColorType(type: CubeColorType) {
        this.mColorType = type;
        this.ParticleSystem.play()
        this.ParticleSystem2.play()
        this.node.active = true;
    }
}
