
import AddtionCenter from "./MultiPlatformManager";
import GameCenter from "../important/GameCenter";
import LogTool from "../tool/LogTool";

export default class JavePlatformCallBack {

    public getAddtion() {
        LogTool.Log("JPlatformCallTS getAddtion()");
        return AddtionCenter;
    }

    public getGameCenter() {
        LogTool.Log("JPlatformCallTS getGameCenter()");
        return GameCenter;
    }
}
(<any>window).JavePlatformCallBack = new JavePlatformCallBack();
