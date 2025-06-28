import { _decorator } from 'cc';
import { ExtendString } from "../extend/ExtendString";

export default class LogTool {
//    /**
//     *  开关
//     */
    public static readonly IsOpen: boolean = true;
    public static Log(message: string | number, ...any: any[]): void {
        // if (!LogTool.IsOpen)
        // return;
        // let sendAnyMessage = "";
        // for (let message of any) {
        // sendAnyMessage += "[" + message + "]";
        // }
        // console.log(message + ":", sendAnyMessage);
    }
//    /**
//     * 输出组装信息
//     * @param format 
//     * @param args 
//     */
    public static LogFormat(format: string, ...args: any[]) {
        // LogTool.Log(ExtendString.format(format, ...args));
    }
//    /**
//     * 错误输出
//     * @param message 
//     * @param any 
//     */
    public static LogError(message: string | number, ...any: any[]): void {
        // if (!LogTool.IsOpen)
        // return;
        // console.error(message, any);
    }
//    /**
//     * 警告
//     * @param message 
//     * @param any 
//     */
    public static LogWarning(message: string | number, ...any: any[]): void {
        // if (!LogTool.IsOpen)
        // return;
        // console.warn(message, any);
    }
}

