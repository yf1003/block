import * as cc from "cc";
import BasicesData from "../../expand/base/BasicesData";
export default class GameNodePool extends BasicesData {
    private mPrefab: cc.Prefab = null;
    public get Prefab(): cc.Prefab {
        return this.mPrefab;
    }
    private mNodePool: cc.NodePool = null;
    public get Pool(): cc.NodePool {
        return this.mNodePool;
    }
    constructor(key: string) {
        super(key)
        this.mNodePool = new cc.NodePool(this.mKey);
    }
    public init(prefab: cc.Prefab, initCount: number): boolean {
        this.mPrefab = prefab;
        for (let i = 0; i < initCount; i++) {
            setTimeout(() => {
                let battery = cc.instantiate(this.mPrefab);
                this.mNodePool.put(battery);
            }, 10 * i);
        };
        return true;
    };

    public size(): number {
        return this.mNodePool.size();
    };

    public get(): cc.Node {
        let item = null;
        if (this.mNodePool.size() > 0)
            item = this.mNodePool.get();
        else
            item = cc.instantiate(this.mPrefab);
        return item;
    };

    public recycle(removeItem: cc.Node): void {
        this.mNodePool.put(removeItem);
    };
}
