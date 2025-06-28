interface Array<T> {
    contains(value: T): boolean;
    isEmpty(): boolean;
    isOnlyOne(): boolean;
    first(): T | undefined;
    last(): T | undefined;
    shuffleSelf();
    getRandomOne(): T | undefined;
    getRandom(number: number): T[];
}

/**
 * 是否包含指定元素
 * @param value 
 * @returns 
 */
Array.prototype.contains = function (value): boolean {
    // for (let i = 0; i < this.length; i++) {
    //     if (this[i] === value) {
    //         return true;
    //     }
    // }
    // return false;
    return this.indexOf(value) >= 0;
}

/**
 * 是否是空的
 */
Array.prototype.isEmpty = function (): boolean {
    if (this.length <= 0)
        return true;
    return false;
}

/**
 * 是否只有一个元素
 */
Array.prototype.isOnlyOne = function (): boolean {
    if (this.length === 1)
        return true;
    return false;
}

/**
 * 第一个元素
 */
Array.prototype.first = function () {
    if (this.isEmpty())
        return null;
    return this[0];
}

/**
 * 
 */
Array.prototype.last = function () {
    if (this.isEmpty())
        return null;
    return this[this.length - 1];
}

/**
 * 打乱自己
 * @param value 
 */
Array.prototype.shuffleSelf = function (): void {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
}

/**
 * 随机获取一个单位
 */
Array.prototype.getRandomOne = function () {
    if (this.isEmpty())
        return null;
    return this.getRandom(1)[0];
}

/**
 * 随机获取n个单位
 */
Array.prototype.getRandom = function (number: number = 1) {
    if (this.isEmpty())
        return null;
    if (number > this.length)
        return this;
    let shuffled = this.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, number);
}
