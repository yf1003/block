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

        this.loveEffect.getComponent(cc.ParticleSystem).play()
        this.loveEffect.children[0].getComponent(cc.ParticleSystem).play()
        this.scheduleOnce(() => {
            this.loveEffect.active = false
            this.showingLove = false
        }, 1)
    }

    private showingNum: boolean = false
    private tweenNum: XTween<cc.Node>
    public playNumEffect(num: number) {
        if (this.showingNum) return
        this.showingNum = true

        this.tweenNum && this.tweenNum.stop()
        const labNum = this.numEffect.getChildByName('lab_num').getComponent(cc.Label)
        labNum.string = `+${num}`

        this.numEffect.active = true
        const defaultPos = this.numEffect.position.clone()
        const offsetPos = cc.v3(defaultPos.x, defaultPos.y - 80, defaultPos.z)
        this.numEffect.setPosition(offsetPos)
        this.numEffect.setScale(0.7, 0.7, 1)
        this.tweenNum =
            XTween
                .to(this.numEffect, 0.1, { position: defaultPos, scale: cc.v3(1.1, 1.1, 1) })
                .to(0.02, { scale: cc.v3(1, 1, 1) })
                .delay(0.6)
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
        const defaultPos = this.comboEffect.position.clone()
        const offsetPos = cc.v3(defaultPos.x, defaultPos.y - 80, defaultPos.z)
        this.comboEffect.setPosition(offsetPos)
        this.comboEffect.setScale(0.7, 0.7, 1)
        this.tweenCombo =
            XTween
                .to(this.comboEffect, 0.1, { position: defaultPos, scale: cc.v3(1.1, 1.1, 1) })
                .to(0.02, { scale: cc.v3(1, 1, 1) })
                .delay(0.6)
                .call(() => {
                    this.comboEffect.active = false
                    this.showingCombo = false
                })
                .play()
    }
}

