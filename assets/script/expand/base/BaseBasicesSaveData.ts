
import BaseBasicesData from "./BaseBasicesData";

export default class BaseBasicesSaveData extends BaseBasicesData {
    constructor(key: string, defaultNumber: number = 0) {
        super(key);
        this.init(1);
    }
    public set(number: number): void {
        super.set(number);
    }
}
