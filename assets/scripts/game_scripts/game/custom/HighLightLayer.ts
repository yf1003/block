import * as cc from 'cc'
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HighLightLayer')
export class HighLightLayer extends Component {
    @property(cc.Node)
    public rowGroup: Node = null
    @property(cc.Node)
    public colGroup: Node = null

    onLoad() {
        this.rowGroup.active = true
        this.colGroup.active = true
        this.hideAllHightLight()
        //@ts-ignore
        cc.game.on('show_hight_light', this.showHightLight, this)
        cc.game.on('hide_all_hight_light', this.hideAllHightLight, this)
    }

    protected onDestroy(): void {
        cc.game.off('show_hight_light', this.showHightLight, this)
        cc.game.off('hide_all_hight_light', this.hideAllHightLight, this)
    }

    public showHightLight(rowArray: number[], colArray: number[]) {
        if (rowArray.length) {
            this.rowGroup.children.forEach(child => {
                const nameLast = Number(child.name[child.name.length - 1])
                if (rowArray.indexOf(nameLast) !== -1) {
                    child.active = true 
                } else {
                    child.active = false
                }
            })
        } else if (colArray.length) {
            this.colGroup.children.forEach(child => {
                const nameLast = Number(child.name[child.name.length - 1])
                if (colArray.indexOf(nameLast) !== -1) {
                    child.active = true
                } else {
                    child.active = false
                }
            })
        }
    }

    public hideAllHightLight() {
        this.rowGroup.children.forEach(child => {
            child.active = false
        })
        this.colGroup.children.forEach(child => {
            child.active = false
        })
    }

}

