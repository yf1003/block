import * as cc from "cc";
export interface ITouchEvent {
    /**
     * 开始触摸
     * @param event 监听
     */
    onTouchBegin(event: cc.EventTouch): void
    /**
     * 持续触摸
     * @param event 监听
     */
    onTouchMove(event: cc.EventTouch): void
    /**
     * 结束触摸
     * @param event 监听
     */
    onTouchEnd(event: cc.EventTouch): void
    /**
     * 取消触摸
     * @param event 监听
     */
    onTouchCancel(event: cc.EventTouch): void
}