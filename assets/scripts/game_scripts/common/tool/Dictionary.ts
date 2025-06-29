
export default class Dictionary {
    private mDatastore: Array<any> = [];
    public add(key: string, value: any): boolean {
        for (var forKey in this.mDatastore) {
            if (this.mDatastore[forKey] === value)
                return false;
        }
        this.mDatastore[key] = value;
        return true;
    };

    public isHaveValue(value: any): boolean {
        for (var forKey in this.mDatastore) {
            if (this.mDatastore[forKey] === value)
                return true;
        }
        return false;
    };

    public find(key: string): any {
        return this.mDatastore[key];
    };

    public remove(key: string): void {
        delete this.mDatastore[key];
    };

    public showAll(): string {
        var str = "";
        for (var key in this.mDatastore) {
            str += key + " -> " + this.mDatastore[key] + ";"
        }
        console.log(str);
        return str;
    };

    public size(): number {
        var listSize = 0;
        for (var key in Object.keys(this.mDatastore)) {
            ++listSize;
        }
        return listSize;
    };

    public clear(): boolean {
        for (var key in this.mDatastore) {
            delete this.mDatastore[key];
        }
        return true;
    };
}
