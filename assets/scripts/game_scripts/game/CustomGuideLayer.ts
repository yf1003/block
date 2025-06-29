import * as cc from 'cc'
import { _decorator, Component, Node } from 'cc';
import { XTween } from 'mvplayable';
const { ccclass, property } = _decorator;

@ccclass('CustomGuideLayer')
export class CustomGuideLayer extends Component {
    @property(cc.Node)
    private guideNode: cc.Node = null;

    private initPosition: cc.Vec3;
    private tween: XTween<cc.Node>
    private showing: boolean = false

    onLoad() {
        this.guideNode.active = false
        this.initPosition = this.guideNode.position.clone()

        cc.game.on('showGuide', this.showGuide, this)
        cc.game.on('hideGuide', this.hideGuide, this)
    }

    protected onDestroy(): void {
        cc.game.targetOff(this)
    }

    public showGuide() {
        if (this.showing) return

        this.showing = true
        this.guideNode.setPosition(this.initPosition)
        this.guideNode.active = true

        const endPos = this.initPosition.clone()
        endPos.y += 386
        endPos.x -= 53

        this.tween && this.tween.stop()
        this.tween = XTween
            .to(this.guideNode, 2.5, { position: endPos }, { easing: 'quinticOut' })
            .set({ active: false })
            .delay(1)
            .call(() => {
                this.showing = false
                this.showGuide()
            })
            .play()
    }

    public hideGuide() {
        this.tween && this.tween.stop()
        this.guideNode.active = false
        this.showing = false
    }
}

