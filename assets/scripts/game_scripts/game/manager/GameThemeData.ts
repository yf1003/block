import * as cc from "cc";
import GameTool from "../../common/tool/GameTool";
import { CubeColorType } from "../config/LocalCommon";

export enum ModeType {
    /**
     * 夜间模式
     */
    Night = 0,

    /**
     * 日间模式
     */
    Day,

    /**
     * 冷艳
     */
    Coldly,

    /**
     * 清新
     */
    Fresh,

    /**
     * 自然
     */
    Natural,

    /**
     * 舒适
     */
    Comfort,


    Max,
}

export interface IModeData {
    Name: string;
    Icon: string;
    BG: string;
    UI: string;
    Target: string;
    Score: string;
    Floor: string;
    Block: Array<string>;
}

export default class GameThemeData {
    public static readonly SAVE_THEMT_KEY = "SAVE_THEMT_KEY";
    public NightData: IModeData = {
        Name: "护眼",
        BG: "1c1c1c",
        Icon: "5c71e3",
        UI: "fefefe",
        Target: "5c71e3",
        Score: "97db55",
        Floor: "363636",
        Block: ["7989c3", "5dbfe3", "4dd5ae", "99dd55", "59cb86", "ef9549", "e76a82", "db6455", "ffc73c"],
    };

    public DayData: IModeData = {
        Name: "白天",
        BG: "ffffff",
        Icon: "5cbde3",
        UI: "f5c9a3",
        Target: "5cbde3",
        Score: "97db56",
        Floor: "e3e3e3",
        Block: ["db6455", "59cb86", "5dbfe3", "99dd55", "ef9549", "7989c3", "ffc73c", "e76a82", "f6fe15"],
    };

    public ColdlyData: IModeData = {
        Name: "冷艳",
        BG: "2d233c",
        Icon: "395b65",
        UI: "ffffff",
        Target: "7e498d",
        Score: "b462c3",
        Floor: "413655",
        Block: ["58bbb3", "6192c4", "6171c4", "5554e7", "7562c7", "9662c7", "b662c7", "c762b2", "ce639d"],
    };

    public FreshData: IModeData = {
        Name: "清新",
        BG: "#CDEBEC",
        Icon: "5cbde3",
        UI: "f5c9a3",
        Target: "97db56",
        Score: "97db56",
        Floor: "71c18a",
        Block: ["9248ef", "e776a6", "30dbb2", "96db51", "e38755", "30c9ef", "246cef", "dfc124", "e776a6"],
    };

    public NaturalData: IModeData = {
        Name: "自然",
        BG: "7dbfaf",
        Icon: "9ac89c",
        UI: "212121",
        Target: "0192d1",
        Score: "0192d1",
        Floor: "a1805f",
        Block: ["f287a0", "f7ad6d", "96cdeb", "93d7a4", "c3e579", "fdfd8a", "afa7e0", "c7b39a", "eb8979"],
    };

    public ComfortData: IModeData = {
        Name: "舒适",
        BG: "393131",
        Icon: "939ca9",
        UI: "fefefe",
        Target: "fefefe",
        Score: "bdbac9",
        Floor: "cbcdc3",
        Block: ["f287a0", "f7ad6d", "96cdeb", "93d7a4", "c3e579", "fdfd8a", "afa7e0", "c7b39a", "eb8979"],
    };

    /**
     * 当前选择模式
     */
    protected mModeType: ModeType = ModeType.Night;
    public set ModeType(type: ModeType) {
        this.mModeType = type;
        this.save();
    }
    public get ModeType(): ModeType {
        return this.mModeType;
    }

    public getChoiceModeData(): IModeData {
        return this.getModeData(this.mModeType);
    }

    public getModeData(type: ModeType): IModeData {
        switch (type) {
            case ModeType.Night:
                return this.NightData;
            case ModeType.Day:
                return this.DayData;
            case ModeType.Coldly:
                return this.ColdlyData;
            case ModeType.Fresh:
                return this.FreshData;
            case ModeType.Natural:
                return this.NaturalData;
            case ModeType.Comfort:
                return this.ComfortData;
            default:
                break;
        }
        return this.NightData;
    }
    public getName(): string {
        return this.getChoiceModeData().Name;
    }

    public getIconColor(): cc.Color {
        return this.getColor(this.getChoiceModeData().Icon);
    }
    public getBGColor(): cc.Color {
        return this.getColor(this.getChoiceModeData().BG);
    }
    public getUIColor(): cc.Color {
        return this.getColor(this.getChoiceModeData().UI);
    }
    public geTargetColor(): cc.Color {
        return this.getColor(this.getChoiceModeData().Target);
    }
    public getScoreColor(): cc.Color {
        return this.getColor(this.getChoiceModeData().Score);
    }
    public getFloorColor(): cc.Color {
        return this.getColor(this.getChoiceModeData().Floor);
    }

    public getBlockColor(type: CubeColorType): cc.Color {
        let blockArray = this.getChoiceModeData().Block;
        if (GameTool.IsSafeArrayIndex(type, blockArray)) {
            return this.getColor(blockArray[type]);
        }
        return this.getColor(blockArray[0]);
    }

    public getColor(hex: string): cc.Color {
        return cc.color().fromHEX(hex);
    }

    public read() {
    }
    public save() {
    }
}
