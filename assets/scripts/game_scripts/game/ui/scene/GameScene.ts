import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

import BaseScene from "../../../expand/ui/BaseScene";
import { SceneType } from "./SceneType";
import GameStart from '../../../common/GameStart';
import { UserData } from '../../UserData';

@ccclass('GameScene')
export default class GameScene extends BaseScene {

    static isInit: boolean = false

    public onLoad(): void {
        if (!GameScene.isInit) {
            GameStart.Init();
            GameStart.Start();
            GameStart.Ready();
            UserData.init()
            GameScene.isInit = true
        }
        this.init(SceneType.GameScene);
    }
}

