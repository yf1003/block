
import TimeManager from "../important/TimeManager";
import MultiPlatformBase, { SDKResult } from "./MultiPlatformBase";
import MultiPlatformManager from "./MultiPlatformManager";
export default class MultiPlatformEmpty extends MultiPlatformBase {
    constructor() {
        super();
    }

    public override getTime(): boolean {
        MultiPlatformManager.getTimeCallBack(SDKResult.Succeed, new Date().getTime() + "");
        return true;
    }

    public override  getTimeCallBack(result: SDKResult, time: string): void {
        switch (result) {
            case SDKResult.Succeed:
                TimeManager.refreshStateByTime(parseInt(time));
                break;
            case SDKResult.Fail:
                break;
            case SDKResult.Cancel:
                break;
            case SDKResult.Error:
                break;
            default:
                break;
        }

    }
}
