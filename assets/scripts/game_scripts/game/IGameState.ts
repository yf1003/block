export interface IGameState {
    /**
     *  开始
     */
    onGameStart(): void;
    /**
     *  胜利
     */
    onGameWin(): void;
    /**
     *  失败
     */
    onGameOver(): void;
    /**
     *  暂停
     */
    onGamePause(): void;
    /**
     *  恢复
     */
    onGameResume(): void;
    /**
     *  重玩
     */
    onGameRestart(): void;
    /**
     *  复活
     */
    onGameRevive(): void;
}