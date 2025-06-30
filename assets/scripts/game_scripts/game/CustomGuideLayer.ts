import * as cc from 'cc'
import { _decorator, Component, Node } from 'cc';
import { XTween } from 'mvplayable';
import BlockGroups from './group/BlockGroups';
const { ccclass, property } = _decorator;

@ccclass('CustomGuideLayer')
export class CustomGuideLayer extends Component {
    @property(cc.Node)
    private guideNode: cc.Node = null;
    @property(cc.Node)
    private groupRoot: cc.Node = null;

    private initPosition: cc.Vec3;
    private tween: XTween<cc.Node>
    private showing: boolean = false

    onLoad() {
        this.guideNode.active = false
        this.initPosition = this.guideNode.position.clone()

        //@ts-ignore
        cc.game.on('showGuide', this.showGuide, this)
        cc.game.on('hideGuide', this.hideGuide, this)
    }

    protected onDestroy(): void {
        cc.game.targetOff(this)
    }

    public showGuide(group: BlockGroups) {
        if (this.showing) return

        if (!this.groupRoot.children.length) {
            const clone = cc.instantiate(group.node)
            this.groupRoot.addChild(clone)
            clone.setPosition(0, 0, 0)
            clone.setScale(1, 1, 1)
        }

        this.showing = true
        this.guideNode.setPosition(this.initPosition)
        this.guideNode.active = true

        const endPos = this.initPosition.clone()
        endPos.y += 450
        endPos.x += 106

        this.tween && this.tween.stop()
        this.tween = XTween
            .to(this.guideNode, 2.5, { position: endPos }, { easing: 'quinticOut' })
            .set({ active: false })
            .delay(1)
            .call(() => {
                this.showing = false
                this.showGuide(group)
            })
            .play()
    }

    public hideGuide() {
        this.tween && this.tween.stop()
        this.guideNode.active = false
        this.showing = false
    }
}

