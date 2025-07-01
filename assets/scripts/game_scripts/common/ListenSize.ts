import * as cc from 'cc'
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ListenSize')
export class ListenSize extends Component {
    @property(cc.UITransform)
    public targetNode: cc.UITransform = null;

   onLoad() {
    this.targetNode.node.on(cc.Node.EventType.SIZE_CHANGED, this.onSizeChanged, this)
   }

    private onSizeChanged() {
        this.node.getComponent(cc.UITransform).width = this.targetNode.width + 85
    }
}

