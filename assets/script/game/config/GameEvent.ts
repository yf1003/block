import * as cc from "cc";
export default class GameEvent {
    // --  Scut Http 
    /**
     *  展示网络加载
     */
    public static readonly EVENT_SCUTHTTP_SHOW_NETLOAD = "EVENT_SCUTHTTP_SHOW_NETLOAD";
    /**
     *  关闭网络加载 
     */
    public static readonly EVENT_SCUTHTTP_HIDE_NETLOAD = "EVENT_SCUTHTTP_HIDE_NETLOAD";
    /**
     *  展示网络错误信息
     */
    public static readonly EVENT_SCUTHTTP_SHOW_NETERROR = "EVENT_SCUTHTTP_SHOW_NETERROR";
    /**
     *  展示超时框
     */
    public static readonly EVENT_SCUTHTTP_SHOW_NETTIMEOUT = "EVENT_SCUTHTTP_SHOW_NETTIMEOUT";
    /**
     *  展示登录过期
     */
    public static readonly EVENT_SCUTHTTP_SHOW_NETLOGINEXPIRED = "EVENT_SCUTHTTP_SHOW_NETLOGINEXPIRED";

    // --  Guide
    /**
     *  引导开始
     */
    public static readonly EVENT_GUIDE_SYSTEM_START = "EVENT_GUIDE_SYSTEM_START";

    /**
     *  监听步骤开始
     */
    public static readonly EVENT_GUIDE_STEP_START = "EVENT_GUIDE_STEP_START";
    /**
     *  监听步骤结束
     */
    public static readonly EVENT_GUIDE_STEP_END = "EVENT_GUIDE_STEP_END";
    /**
     *  引导界面加载完毕
     */
    public static readonly EVENT_GUIDE_LOAD_OVER = "EVENT_GUIDE_LOAD_OVER";
    /**
     *  完成引导模块
     */
    public static readonly EVENT_GUIDE_COMPILE = "EVENT_GUIDE_COMPILE";
    
    public static readonly EVENT_REFERSH_LEVEL = "EVENT_REFERSH_LEVEL";



}
