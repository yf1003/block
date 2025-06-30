export enum ButtonMusicType {
    No = 0,
    Normal,
    Tab,
    Close
}

export enum DirectionType {
    /**
     * 保持
     */
    Still = 0,

    /**
     * 顶部
     */
    Up,

    /**
     * 右上
     */
    RightUp,

    /**
     * 左上
     */
    LeftUp,

    /**
     * 底部
     */
    Down,

    /**
     * 右下
     */
    RightDown,

    /**
     * 左下
     */
    LeftDown,

    /**
     * 右边
     */
    Right,

    /**
     * 左边
     */
    Left,
}

export enum LockType {
    No = 1,
    Gold = 2,
    Ads = 3,
    Level = 4,
}

export enum LinkType {
    NoLink = 1,   // 未完成
    CanLink = 2,  // 未领取
    OkLink = 3,   // 已领取
}
