import * as cc from 'cc'
import { _decorator, Component, Node } from 'cc';
import { AudioManager, EAudioType } from './audio/AudioManager';
import { XTween } from 'mvplayable';
const { ccclass, property } = _decorator;

@ccclass('CustomEffectLayer')
export class CustomEffectLayer extends Component {
    @property(cc.Node)
    private loveEffect: cc.Node = null;
    @property(cc.Node)
    private numEffect: cc.Node = null
    @property(cc.Node)
    private comboEffect: cc.Node = null

    onLoad() {
        this.loveEffect.active = false
        cc.game.on('showLoveEffect', this.playLoveEffect, this)

        this.numEffect.active = false
        //@ts-ignore
        cc.game.on('showNumEffect', this.playNumEffect, this)

        this.comboEffect.active = false
        //@ts-ignore
        cc.game.on('showComboEffect', this.playComboEffect, this)
    }

    private showingLove: boolean = false
    public playLoveEffect() {
        if (this.showingLove) return
        this.showingLove = true

        this.loveEffect.active = true

        const random = Math.random()
        if (random < 0.5) {
            AudioManager.ins.playAudio(EAudioType.wow)
        } else {
            AudioManager.ins.playAudio(EAudioType.great)
        }

        const icon = this.loveEffect.getChildByName('icon')
        const iconOp = icon.getComponent(cc.UIOpacity)
        iconOp.opacity = 0

        icon.active = true
        icon.setScale(0.8, 0.8, 1)
        XTween
            .to(iconOp, 0.1, { opacity: 204 })
            .call(() => {
                const lizi = this.loveEffect.getChildByName('lizi')
                lizi.active = true
                lizi.getComponent(cc.ParticleSystem).play()
                lizi.children[0].getComponent(cc.ParticleSystem).play()

                this.scheduleOnce(() => {
                    lizi.active = false
                }, 2)

                XTween
                    .to(icon, 0.32, { scale: cc.v3(1.1, 1.1, 1) })
                    .to(0.08, { scale: cc.v3(1, 1, 1) })
                    .call(() => {
                        XTween
                            .to(iconOp, 0.2, { opacity: 0 })
                            .to(0.2, { opacity: 204 })
                            .to(iconOp, 0.2, { opacity: 0 })
                            .to(0.2, { opacity: 204 })
                            .to(iconOp, 0.2, { opacity: 0 })
                            .to(0.2, { opacity: 204 })
                            .to(0.5, { opacity: 0 })
                            .call(() => {
                                this.loveEffect.active = false
                                this.showingLove = false
                            })
                            .play()
                    })
                    .play()
            })
            .play()
    }

    private showingNum: boolean = false
    private tweenNum: XTween<cc.Node>
    public playNumEffect(num: number) {
        if (this.showingNum) return
        this.showingNum = true

        this.tweenNum && this.tweenNum.stop()
        const labNum = this.numEffect.getChildByName('lab_num').getComponent(cc.Label)
        labNum.string = `${num}`

        this.numEffect.active = true
        this.numEffect.setScale(0, 0, 1)
        this.tweenNum =
            XTween
                .to(this.numEffect, 0.22, { scale: cc.v3(1.5, 1.5, 1) })
                .to(0.08, { scale: cc.v3(1, 1, 1) })
                .delay(0.5)
                .to(0.2, { scale: cc.v3(0, 0, 1) })
                .call(() => {
                    this.numEffect.active = false
                    this.showingNum = false
                })
                .play()
    }

    private showingCombo: boolean = false
    private tweenCombo: XTween<cc.Node>
    public playComboEffect(num: number) {
        if (this.showingCombo) return
        this.showingCombo = true

        this.tweenCombo && this.tweenCombo.stop()
        const labCombo = this.comboEffect.getChildByName('Layout').getChildByName('lab_num').getComponent(cc.Label)
        labCombo.string = `x${num}`

        this.comboEffect.active = true
        this.comboEffect.setScale(0, 0, 1)
        this.tweenCombo =
            XTween
                .to(this.comboEffect, 0.22, { scale: cc.v3(1.5, 1.5, 1) })
                .to(0.08, { scale: cc.v3(1, 1, 1) })
                .delay(0.5)
                .to(0.2, { scale: cc.v3(0, 0, 1) })
                .call(() => {
                    this.comboEffect.active = false
                    this.showingCombo = false
                })
                .play()
    }
}

