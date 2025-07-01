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
    @property(cc.Node)
    private dragTip: cc.Node = null
    @property(cc.Node)
    private moveEnd: cc.Node = null
    @property(cc.Node)
    private moveFirstEnd: cc.Node = null
    @property(cc.Node)
    private cubeLayer: cc.Node = null

    private initPosition: cc.Vec3;
    private tween: XTween<cc.Node>
    private showingGuide: boolean = false
    private showingNoTouch: boolean = false

    private isFirstGuide: boolean = true

    onLoad() {
        this.guideNode.active = false
        this.initPosition = this.guideNode.position.clone()

        //@ts-ignore
        cc.game.on('showGuide', this.showGuide, this)
        cc.game.on('hideGuide', this.hideGuide, this)

        //@ts-ignore
        cc.game.on('showNoTouch', this.showNoTouch, this)
        cc.game.on('hideNoTouch', this.hideNoTouch, this)
    }

    protected onDestroy(): void {
        cc.game.targetOff(this)
    }

    public showGuide(group: BlockGroups) {
        if (this.showingGuide || this.showingNoTouch) return
        this.showingGuide = true

        // 手指动画
        this.groupRoot.destroyAllChildren()
        const clone = cc.instantiate(group.node)
        this.groupRoot.addChild(clone)
        clone.setPosition(0, 0, 0)
        this.hideShadow(clone.getComponent(BlockGroups))
        this.showFinger(group, clone)

        // drag动画
        this.showDrag()
    }

    public hideGuide() {
        this.tween && this.tween.stop()
        this.guideNode.active = false
        this.dragTip.active = false
        this.showingGuide = false
        this.isFirstGuide = false
    }

    private showNoTouch(group: BlockGroups) {
        if (this.showingGuide || this.showingNoTouch) return

        // 手指动画
        this.groupRoot.destroyAllChildren()
        const clone = cc.instantiate(group.node)
        this.groupRoot.addChild(clone)
        clone.setPosition(0, 0, 0)
        this.hideShadow(clone.getComponent(BlockGroups))
        this.showFinger(group, clone)
    }

    private hideNoTouch() {
        this.tween && this.tween.stop()
        this.guideNode.active = false
        this.showingNoTouch = false
    }

    private showDrag() {
        this.dragTip.active = true
        const opac = this.dragTip.getComponent(cc.UIOpacity)
        opac.opacity = 0
        XTween
            .to(opac, 0.2, { opacity: 255 })
            .play()
    }

    private showFinger(group: BlockGroups, clone: cc.Node) {
        clone.setScale(1, 1, 1)
        this.guideNode.setWorldPosition(group.node.getWorldPosition())
        this.guideNode.active = true

        this.tween && this.tween.stop()
        const endPos = this.isFirstGuide ? this.moveFirstEnd.getWorldPosition() : this.moveEnd.getWorldPosition()
        this.tween = XTween
            .to(this.guideNode, 2.5, { worldPosition: endPos }, { easing: 'quinticOut' })
            .set({ active: false })
            .delay(1)
            .call(() => {
                this.showFinger(group, clone)
            })
            .play()
    }

    private hideShadow(clone: BlockGroups) {
        clone.itemLayer.children.forEach(item => {
            item.getChildByName('block_projection').active = false
        })
    }
}

