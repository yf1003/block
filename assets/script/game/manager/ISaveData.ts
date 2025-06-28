export default interface ISaveData {

    /**
     * 打包
     */
    pack(): string;

    /**
     * 解包
     * @param json json 数据
     */
    unPack(json: string): boolean;
}
