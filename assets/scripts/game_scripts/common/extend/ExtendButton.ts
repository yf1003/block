import * as cc from "cc";
export default class ExtendButton extends cc.Button {

    /**
     * 增加监听
     * @param button 
     * @param callBack 
     * @param target 
     * @param useCapture 
     * @returns 
     */
    public static AddOnClick<T extends Function>(button: cc.Button, callBack: T, target?: any, useCapture?: boolean): T {
        if (!button)
            return;
         button.node.on('click', callBack, target, useCapture);
    }
}
