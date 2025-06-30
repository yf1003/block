import * as cc from 'cc'
import { _decorator, Component, Node } from 'cc';
import { UserData } from './UserData';
const { ccclass, property } = _decorator;

@ccclass('CustomTip')
export class CustomTip extends Component {
    @property(cc.Node)
    private dragTip: cc.Node = null

    onLoad() {
        this.dragTip.active = false
        cc.game.on('show_drag_tip', this.show, this)
        cc.game.on('hide_drag_tip', this.hide, this)
    }

    onDestroy() {
        cc.game.off('show_drag_tip', this.show, this)
        cc.game.off('hide_drag_tip', this.hide, this)
    }

    private show() {
        this.dragTip.active = true
    }

    private hide() {
        if (this.dragTip.active) {
            UserData.needDragTip = false
        }
        this.dragTip.active = false
    }
}

