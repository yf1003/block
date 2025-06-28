export default interface IDataSave {
    /**
     * 获取数据
     * @param key 标识
     * @param defaultValue 默认值 
     */
    getData(key: string, defaultValue: any): any;

    /**
     * 设置数据
     * @param key 标识
     * @param value 默认值
     */
    setData(key: string, value: any): boolean;

    /**
     * 删除数据
     * @param key 标识 
     */
    removeData(key: string): boolean;

    /**
     * 保存数据
     */
    save(): boolean;

    /**
     * 清理
     */
    clear(): boolean;

    /**
     * 输出
     */
    log(): void;
}