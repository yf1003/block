
/**
 *  元素
 */
export enum ItemType {
    /**
     *  错误
     */
    Null = -1,

    /**
     *  金币
     */
    Gold = 10001,

    /**
     *  钻石
     */
    Gem = 10002,

    /**
     *  游戏币
     */
    Coin = 10003,
}

export enum CubeState {
    /**
     * 不存在
     */
    Null = 1,

    /**
     * 空的位置
     */
    Empty = 2,


    /**
     * 有
     */
    Full = 3,
}

/**
 * 方块颜色类型
 */
export enum CubeColorType {
    Color1 = 0,
    Color2 = 1,
    Color3 = 2,
    Color4 = 3,
    Color5 = 4,
    Color6 = 5,
    Color7 = 6,
    Color8 = 7,
    Color9 = 8,
}

/**
 * 组类型
 */
export enum GroupType {
    Null = -1,

    Z,

    T,

    J,

    LineSmall1,
    LineSmall2,

    Line,

    LineDouble,

    Stone,
    
    Stone2,
    Stone3,
    Stone4,

    Max,
}

/**
 * 方块旋转方向
 */
export enum CubeDirectionType {
    Up = 0,

    Right = 1,

    Down = 2,

    Left = 3,
}

export default class LocalCommon {


    public static readonly TOUCH_GROUP_ADD_Y = 100;
    public static readonly MATRIX_ADD_Y = 50;

    /**
     *  Max X
     */
    public static readonly MAX_ROW = 8;

    /**
     *  Max Y
     */
    public static readonly MAX_COL = 8;


    /**
     * 方块宽
     */
    public static readonly CUBE_WIDTH = 106;

    /**
     * 方块高
     */
    public static readonly CUBE_HEIGHT = 106;

    public static readonly GROUP_SCALE = 0.5;


    public static readonly AWARD_SCORE_MULTI: number = 2000;
    public static readonly LEVEL_TARGET_SCORE: number = 300;
    public static readonly LEVEL_UP_CLEAR_NUMBER: number = 4;


    public static readonly PutDownScore: Array<Array<number>> = [
        [1, 4], [2, 4], [3, 9],
        [4, 12], [5, 20], [6, 24],
        [7, 30], [8, 36], [9, 45],
        [10, 50], [11, 56], [12, 60]
    ];


    /**
     * 获取放下奖励分数
     * @param number 
     * @returns 
     */
    public static GetPutDownScore(number: number): number {
        return number;
        for (var i = 0; i < LocalCommon.PutDownScore.length; i++) {
            if (LocalCommon.PutDownScore[i][0] == number)
                return LocalCommon.PutDownScore[i][1];
        }
        return 0;
    }
}
