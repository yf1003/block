
export default class CommonEvent {
    /**
     * 展示提示
     */
    public static readonly COMMON_EVENT_SHOW_TIP = 'COMMON_EVENT_SHOW_TIP';
    /* 游戏状态 */
    /**
     * 游戏准备
     */
    public static readonly COMMON_EVENT_GAME_READY = 'COMMON_EVENT_GAME_READY';
    /**
     * 游戏开始
     */
    public static readonly COMMON_EVENT_GAME_START = 'COMMON_EVENT_GAME_START';
    /**
     * 游戏重开
     */
    public static readonly COMMON_EVENT_GAME_RESTARE = 'COMMON_EVENT_GAME_RESTARE';
    /**
     * 游戏复活
     */
    public static readonly COMMON_EVENT_GAME_REVIVE = 'COMMON_EVENT_GAME_REVIVE';
    /**
     * 游戏暂停
     */
    public static readonly COMMON_EVENT_GAME_PAUSE = 'COMMON_EVENT_GAME_PAUSE';
    /**
     * 游戏恢复
     */
    public static readonly COMMON_EVENT_GAME_RESUME = 'COMMON_EVENT_GAME_RESUME';
    /**
     * 游戏胜利
     */
    public static readonly COMMON_EVENT_GAME_WIN = 'COMMON_EVENT_GAME_WIN';
    /**
     * 游戏失败
     */
    public static readonly COMMON_EVENT_GAME_OVER = 'COMMON_EVENT_GAME_OVER';
    /**
     * 游戏进入后台
     */
    public static readonly COMMON_EVENT_GAME_HIDE = "COMMON_EVENT_GAME_HIDE";
    /**
     * 游戏从后台进入
     */
    public static readonly COMMON_EVENT_GAME_SHOW = "COMMON_EVENT_GAME_SHOW";

    /*
        数据刷新
    */
    public static readonly COMMON_EVENT_REFRESH_ITEM = "COMMON_EVENT_REFRESH_ITEM";

    /* 游戏储存 */
    /**
     * 保存数据
     */
    public static readonly COMMON_EVENT_SAVE_GAME_DATA = 'COMMON_EVENT_SAVE_GAME_DATA';

    /* Layer */
    /**
     * Layer 展示
     */
    public static readonly COMMON_EVENT_LAYER_SHOW = 'COMMON_EVENT_LAYER_SHOW';
    /**
     * Layer 关闭
     */
    public static readonly COMMON_EVENT_LAYER_CLOSE = 'COMMON_EVENT_LAYER_CLOSE';

    /* Time */
    /**
     * 新的一天
     */
    public static readonly MY_COMMON_EVENT_REFRESH_DAY_LINK = "MY_COMMON_EVENT_REFRESH_DAY_LINK";
    /**
     * 新的一周
     */
    public static readonly MY_COMMON_EVENT_REFRESH_WEEK = "MY_COMMON_EVENT_REFRESH_WEEK";
    /**
     *  同步时间
     */
    public static readonly MY_COMMON_EVENT_SYNC_TIME = "MY_COMMON_EVENT_SYNC_TIME";

    /**
     * 秒发生改变
     */
    public static readonly COMMON_EVENT_ADD_SECOND = "COMMON_EVENT_ADD_SECOND";

    /**
     * 分钟增加
     */
    public static readonly COMMON_EVENT_ADD_MINUTE = "COMMON_EVENT_ADD_MINUTE";
    /**
     *  展示商店
     */
    public static readonly COMMON_EVENT_SHOW_SHOP = 'COMMON_EVENT_SHOW_SHOP';
    /**
     *  消息提示
     */
    public static readonly COMMON_EVENT_NEW_MESSAGE = "COMMON_EVENT_NEW_MESSAGE";

    /**
     * 视频广告观看成功
    */
    public static readonly COMMON_EVENT_VIDEO_SUCCESS = 'COMMON_EVENT_VIDEO_SUCCESS';
    /**
     * 视频广告失败
     */
    public static readonly COMMON_EVENT_VIDEO_FAIL = 'COMMON_EVENT_VIDEO_FAIL';
    /**
     * 视频广告取消
     */
    public static readonly COMMON_EVENT_VIDEO_CANCEL = 'COMMON_EVENT_VIDEO_CANCEL';

    /**
     * 分享成功   
     */
    public static readonly COMMON_EVENT_SHARE_SUCCESS = 'COMMON_EVENT_SHARE_SUCCESS';
    /**
     * 分享失败
     */
    public static readonly COMMON_EVENT_SHARE_FAIL = 'COMMON_EVENT_SHARE_FAIL';
    /**
     * 支付结果
     */
    public static readonly COMMON_EVENT_PAY_RESULT = "COMMON_EVENT_PAY_RESULT";

}
