import { IManager } from "../../expand/interface/IManager";

export default interface ISaveRecord extends IManager {
    /**
     * 读取
     */
    read(): void;

    /**
     * 保存
     */
    save(): void;
}