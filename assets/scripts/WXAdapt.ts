import { _decorator, Component, Node } from 'cc';
import { playable } from "mvplayable";

const { ccclass, property } = _decorator;

@ccclass('WXAdapt')
export class WXAdapt extends Component {
    onEnable() {
        if (playable.channel == "wx")
            this.node.active = false;
    }
}
