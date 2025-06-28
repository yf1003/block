
import SaveManager from "../../common/save/SaveManager";
import BaseBasicesData from "./BaseBasicesData";

export default class BaseBasicesSaveData extends BaseBasicesData {
    constructor(key: string, defaultNumber: number = 0) {
        super(key);
        let save = parseFloat(SaveManager.getData(this.mKey, defaultNumber));
        this.init(save);
    }
    public set(number: number): void {
        super.set(number);
        SaveManager.setData(this.mKey, this.Number);
    }
}
