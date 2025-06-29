
import GameCenter from "./important/GameCenter";
import EventNotice from "./tool/EventNotice";
import LogTool from "./tool/LogTool";
import { IManager } from "../expand/interface/IManager";
import GameManager from "../game/manager/GameManager";

export default class GameStart {
    public static ManagerArray: Array<IManager> = [];

    public static Init(): void {
        LogTool.Log("GameStart Start Init");
        GameStart.ManagerArray = [];
        GameStart.ManagerArray.push(EventNotice);
        // -- Other
        GameStart.ManagerArray.push(GameCenter);

        // -- Game
        GameStart.ManagerArray.push(GameManager);

        for (let data of GameStart.ManagerArray) {
            data.init();
        }
    }

    public static Start(): void {
        LogTool.Log("Game Start");
        for (let data of GameStart.ManagerArray) {
            data.start();
        }
    }

    public static Ready(): void {
        LogTool.Log("Game Ready");
        for (let data of GameStart.ManagerArray) {
            data.ready();
        }
    }

    public static Close(): void {
        for (let i = GameStart.ManagerArray.length - 1; i >= 0; i--) {
            GameStart.ManagerArray[i].close();
        }
        GameStart.ManagerArray = [];
    }
}
