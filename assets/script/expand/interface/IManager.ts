export interface IManager {

    // 顺序
    // init -> start-> ready -> close

    /**
     * 初始化
     */
    init(): boolean;
    /**
     * 开始
     */
    start(): void;
    /**
     * 完全准备好了
     */
    ready(): void;
    /**
     * 关闭
     */
    close(): void;
}