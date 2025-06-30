import * as cc from "cc";
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AdaptCanvas')
export class AdaptCanvas extends Component {
    public onLoad(): void {
        this.gameFitHandler(cc.macro.ORIENTATION_PORTRAIT);
    }

    protected gameFitHandler(orientation: number) {
        let originDesignResolution = cc.view.getDesignResolutionSize();
        let minSize = Math.min(originDesignResolution.width, originDesignResolution.height);
        let maxSize = Math.max(originDesignResolution.width, originDesignResolution.height);
        let winSize = cc.view.getVisibleSize();
        let whScale = winSize.width / winSize.height;
        let fitValue = cc.ResolutionPolicy.FIXED_HEIGHT;
        switch (orientation) {
            case cc.macro.ORIENTATION_PORTRAIT: {
                // 竖屏处理
                if (whScale > 9 / 16) {
                    fitValue = cc.ResolutionPolicy.FIXED_HEIGHT;
                } else {
                    fitValue = cc.ResolutionPolicy.FIXED_WIDTH;
                }
                cc.view.setDesignResolutionSize(minSize, maxSize, fitValue);
                break;
            }
            case cc.macro.ORIENTATION_LANDSCAPE: {
                // 横屏处理
                if (whScale < 16 / 9) {
                    fitValue = cc.ResolutionPolicy.FIXED_WIDTH;
                } else {
                    fitValue = cc.ResolutionPolicy.FIXED_HEIGHT;
                }
                cc.view.setDesignResolutionSize(maxSize, minSize, fitValue);
                break;
            }
            default: {
                break;
            }
        }
    }
}

