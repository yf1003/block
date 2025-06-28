
import MultiLanguageManager from "./important/MultiLanguageManager";
import GameCenter from "./important/GameCenter";
import TimeManager from "./important/TimeManager";
import SaveManager from "./save/SaveManager";
import EventNotice from "./tool/EventNotice";
import LogTool from "./tool/LogTool";
import SoundManager from "./important/SoundManager";
import TiledMapManager from "../expand/tiled/TiledMapManager";
import MultiPlatformManager from "./multiPlatform/MultiPlatformManager";
import ConfigInfoManager from "../config/ConfigInfoManager";
import { IManager } from "../expand/interface/IManager";
import GameManager from "../game/manager/GameManager";
import GameDataManager from "../game/manager/GameDataManager";
import DataManager from "./important/DataManager";
import * as cc from "cc";

export default class GameStart {
    public static ManagerArray: Array<IManager> = [];

    public static Init(): void {
        LogTool.Log("GameStart Start Init");
        GameStart.ManagerArray = [];
        // -- Must First Is Importance
        GameStart.ManagerArray.push(SaveManager);
        GameStart.ManagerArray.push(EventNotice);
        GameStart.ManagerArray.push(ConfigInfoManager);
        // -- Net
        // -- ......
        // -- Other
        GameStart.ManagerArray.push(DataManager);
        GameStart.ManagerArray.push(GameCenter);
        GameStart.ManagerArray.push(TimeManager);
        GameStart.ManagerArray.push(MultiLanguageManager);
        GameStart.ManagerArray.push(MultiPlatformManager);
        GameStart.ManagerArray.push(SoundManager);

        // -- Game
        GameStart.ManagerArray.push(TiledMapManager);
        GameStart.ManagerArray.push(GameManager);
        GameStart.ManagerArray.push(GameDataManager);

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
