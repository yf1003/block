
export default class List<T> extends Array<T> {
    public constructor() {
        super();
    }

    /**
     * 添加元素
     * @param value 
     */
    public add: Function = function (value: T): void {
        this.push(value);
    }

    /**
     * 插入元素
     * @param index 
     * @param value 
     */
    public insert: Function = function (index: number, value: T): void {
        this.splice(index, 0, value);
    }

    /**
     * 删除元素
     * @param value 
     */
    public remove: Function = function (value: T): void {
        var index: number = this.indexOf(value);
        this.removeAt(index);
    }

    /**
     * 删除元素
     * @param index 
     */
    public removeAt: Function = function (index: number): void {
        this.splice(index, 1);
    }

    /**
     * 数量
     * @returns 
     */
    public count: Function = function (): number {
        return this.length;
    }

    /**
     * 清理
     */
    public clear: Function = function (): void {
        this.splice(0);
    }

    /**
     * 遍历
     * @param callback 
     */
    public foreach: Function = function (callback: Function): void {
        this._breaking = false;
        var sum = this.length;
        for (var i = 0; i < sum; i++) {
            if (this._breaking) {
                break;
            }
            callback(this[i]);
        }
    }

    _breaking: boolean = false;
    public break: Function = function (): void {
        this._breaking = true;
    }

    /**
     * 转化为数据
     * @returns 
     */
    public toArray: Function = function (): T[] {
        var array: T[] = [];
        this.forEach(element => {
            array.push(element);
        });
        return array;
    }

    /**
     * 连接
     * @param value 
     */
    public append: Function = function (value: T[]): void {
        value.forEach(element => {
            this.push(element);
        });
    }
}
