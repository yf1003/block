import * as cc from "cc";
export default class ExtendEditBox {
    /**
     * 增加输入结束监听
     * @param box 
     * @param callBack 
     * @param target 
     * @param useCapture 
     * @returns 
     */
    public static AddDidEnded<T extends Function>(box: cc.EditBox, callBack: T, target?: any, useCapture?: boolean) {
        return box.node.on('editing-did-ended', callBack, target, useCapture);
    }
}
