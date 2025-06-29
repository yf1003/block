
import ValueData from "../../expand/base/ValueData";
import LogTool from "./LogTool";

export default class StringTool {
    /**
     *  空的
     */
    public static readonly Null: string = "Null";
    /**
     *  未知的
     */
    public static readonly Unknow: string = "Unknow";
    public static readonly StringEmptyArray: Array<any> = [
        null,
        '',
        "",
        NaN,
        'NaN',
        undefined,
        'undefined',
        StringTool.Null,
        StringTool.Unknow];

    /**
     * 识别字符串是否为空
     * @param str 字符串
     * @returns 结果
     */
    public static IsEmpty(str: string): boolean {

        for (let key of StringTool.StringEmptyArray) {
            if (key === str)
                return true;
        }
        return false;
    }

    /**
     * 裁剪数字显示
     * @param num 数量
     * @param fixed 缩减
     * @returns 
     */
    public static GetCutNumber(num: number, fixed: number = 2): string {
        let cutnum = parseInt(num + "");
        if (cutnum >= 10000 && cutnum < 1000000) {
            let cut1000Num = cutnum / 1000;
            let back = 'K';
            if (cut1000Num === 1000)
                back = cut1000Num + back;
            else
                back = cut1000Num.toFixed(fixed) + back;
            return back;
        }
        else if (cutnum >= 1000000 && cutnum < 1000000000) {
            let cut10000Num = cutnum / 1000000;
            let endBack = "M";
            if (cut10000Num === 1000000)
                endBack = cut10000Num + endBack;
            else
                endBack = cut10000Num.toFixed(fixed) + endBack;
            return endBack;
        }
        else if (cutnum >= 1000000000) {
            let cut1000000000Num = cutnum / 1000000000;
            let endBack = "B";
            if (cut1000000000Num === 1000000000)
                endBack = cut1000000000Num + endBack;
            else
                endBack = cut1000000000Num.toFixed(fixed) + "B";
            return endBack;
        }
        return cutnum + "";
    }

    /**
     * 文本切割
     * @param str 字符串
     * @param len 上限长度
     * @param replace 超出替换字符串
     * @returns 
     */
    public static GetCutString(str: string, len: number, replace: string = "..."): string {
        let length = 0;
        let strLen = 0;
        let str_cut = new String();
        strLen = str.length;
        for (let i = 0; i < strLen; i++) {
            let a = str.charAt(i);
            length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4  
                length++;
            }
            str_cut = str_cut.concat(a);
            if (length > len) {
                str_cut = str_cut.concat(replace);
                return str_cut.toString();
            }
        }
        if (length < len)
            return str;
        return str;
    }

    /**
     * 切割商品加分隔
     * @param num 
     * @param splitString 
     * @returns 
     */
    public static GetCutSideNumber(num: number, splitString: string = ","): string {
        let result = [];
        let counter = 0;
        let stringList = (num || 0).toString().split('');
        for (let i = stringList.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i != 0)
                result.unshift(splitString);
        }
        return result.join('');
    }

    /**
     * 获取拼接时间
     * @param nowTime 
     * @param andString 
     * @returns 
     */
    public static GetTimeString(nowTime: number, andString: string = ":"): string {
        let time = nowTime;
        let hours = time / (60 * 60);
        let min = time % (60 * 60) / 60;
        let sec = time % (60 * 60) % 60 % 60;

        let hourString = StringTool.RepairTenNumber(hours);
        let minString = StringTool.RepairTenNumber(min);
        let secString = StringTool.RepairTenNumber(sec);

        return hourString + andString + minString + andString + secString;
    }

    /**
     * 补全个位数字
     * @param num 
     * @returns 
     */
    public static RepairTenNumber(num: number): string {
        if (num > 0) {
            if (num < 10)
                return "0" + num;
        }
        return num + "";
    }

    /**
     * 判断文本是否只由数字字符构成
     * @param str 
     * @returns 
     */
    public static IsNumberOfLetter(str: string) {
        if (StringTool.IsEmpty(str))
            return false;

        for (let ca of str) {

        }
    }

    /**
     * 解析字符串,从字符串中获取到数据列表
     * @param content 
     * @param spltichar 
     * @returns 
     */
    public static GetValuesByString(content: string, ...spltichar: Array<string>) {
        let valueList: Array<ValueData> = [];
        if (StringTool.IsEmpty(content)) {
            LogTool.LogWarning("GetValuesByString Content Is Null");
            return valueList;
        }

        for (let splitChar of spltichar) {
            let splitArray = content.split(splitChar);
            if (splitArray.length > 0) {
                for (let str of splitArray) {
                    valueList.push(new ValueData(str));
                }
                return valueList;
            }
        }
        return valueList;
    }

    /**
     * 切割字符串
     * @param str 
     * @param start 
     * @param end 
     * @returns 
     */
    public static Split(str: string, start: string, end: string): Array<string> {
        return str.match(new RegExp(start + '(\S*)' + end));
    }

    /**
     * 组装“xxx”
     * @param message  
     * @returns 结果
     */
    public static PackageDoubleQuote(message: string): string {
        let resultKey = "\"" + message + "\"";
        return resultKey;
    }

    /**
     * 判断结束是否包含指定 字符数组内容
     * @param value 判断字符
     * @param endArray 指定数组
     * @returns 
     */
    public static EndsWithArray(value: string, endArray: Array<string>): boolean {
        if (StringTool.IsEmpty(value))
            return false;
        if (endArray) {
            for (var find of endArray) {
                if (value.endsWith(find))
                    return true;
            }
        }
        return false;
    }
};

