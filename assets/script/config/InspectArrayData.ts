
export default class InspectArrayData {
    public static CheckArraySize2<T>(array: Array<T>) {
        return InspectArrayData.CheckArraySize(array, 2);
    }
    /**
     * 检查数组大小
     * @param array 
     * @param number 
     * @returns 
     */
    public static CheckArraySize<T>(array: Array<T>, number: number): boolean {
        if (array.length >= number)
            return true;
    }
}
