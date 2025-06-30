
import LogTool from "../../common/tool/LogTool";
import StringTool from "../../common/tool/StringTool";

export default class ValueData {
    protected mValue: string = StringTool.Null;

    public set Value(value: string) {
        this.mValue = value;
    }
    public get Value(): string {
        return this.mValue;
    }

    constructor(value: string | number | boolean) {
        this.mValue = value + "";
    }

    public asInt(): number {
        let result = 0;
        result = Number(this.Value);
        if (isNaN(result))
            return result;
        result = parseInt(this.mValue);
        return result;
    }

    public asFloat(): number {
        let result = 0;
        result = Number(this.Value);
        if (isNaN(result))
            return result;
        result = parseFloat(this.mValue);
        return result;
    }

    public asNumber(): number {
        let result = 0;
        result = Number(this.Value);
        if (isNaN(result))
            return result;
        return result;
    }

    public asBool(): boolean {
        let result = false;
        switch (this.mValue) {
            case "True":
                result = true;
                break;
            case "False":
                result = false;
                break;
            case "true":
                result = true;
                break;
            case "false":
                result = false;
                break;
            case "0":
                result = false;
                break;
            case "1":
                result = true;
                break;
            default:
                LogTool.LogWarning("ValueData asBool() Warning");
                break;
        }
        return result;
    }

    public asString(): string {
        return this.mValue;
    }

    /**
     * 转化 string
     * @param value 转换对象
     * @returns 结果
     */
    public static AsString(value: string | number | boolean): string {
        return new ValueData(value).asString();
    }

    /**
     * 转化 int
     * @param value 转化对象
     * @returns 结果
     */
    public static AsInt(value: string | number | boolean): number {
        return new ValueData(value).asInt();
    }

    /**
     * 转化 float
     * @param value 转化对象 
     * @returns 结果
     */
    public static AsFloat(value: string | number | boolean): number {
        return new ValueData(value).asFloat();
    }

    /**
     * 转化 number
     * @param value 转化对象 
     * @returns 结果
     */
    public static AsNumber(value: string | number | boolean): number {
        return new ValueData(value).asNumber();
    }

    /**
     * 转化 bool
     * @param value 转化对象 
     * @returns 结果
     */
    public static AsBool(value: string | number | boolean): boolean {
        return new ValueData(value).asBool();
    }
}
