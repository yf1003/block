import * as cc from 'cc'
import { _decorator, Component, Node } from 'cc';
import { XTween } from 'mvplayable';
const { ccclass, property } = _decorator;

@ccclass('CustomEffectLayer')
export class CustomEffectLayer extends Component {
    @property(cc.Node)
    private loveEffect: cc.Node = null;
    @property(cc.Node)
    private numEffect: cc.Node = null

    onLoad() {
        this.loveEffect.active = false
        cc.game.on('showLoveEffect', this.playLoveEffect, this)

        this.numEffect.active = false
        //@ts-ignore
        cc.game.on('showNumEffect', this.playNumEffect, this)
    }

    public playLoveEffect() {
        this.loveEffect.active = true

        this.loveEffect.getComponent(cc.ParticleSystem).play()
        this.loveEffect.children[0].getComponent(cc.ParticleSystem).play()
        this.scheduleOnce(() => {
            this.loveEffect.active = false
        }, 1)
    }

    private tween: XTween<cc.Node>
    public playNumEffect(num: number) {
        this.tween && this.tween.stop()
        const labNum = this.numEffect.getChildByName('lab_num').getComponent(cc.Label)
        labNum.string = `+${num}`

        this.numEffect.active = true
        const defaultPos = this.numEffect.position.clone()
        const offsetPos = cc.v3(defaultPos.x, defaultPos.y - 80, defaultPos.z)
        this.numEffect.setPosition(offsetPos)
        this.numEffect.setScale(0.5, 0.5, 1)
        this.tween =
            XTween
                .to(this.numEffect, 0.3, { position: defaultPos, scale: cc.v3(1.1, 1.1, 1) })
                .to(0.1, { scale: cc.v3(1, 1, 1) })
                .delay(0.6)
                .call(() => {
                    this.numEffect.active = false
                })
                .play()
    }
}

