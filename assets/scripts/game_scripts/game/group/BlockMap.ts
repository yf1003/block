import * as cc from "cc";
const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockMap extends cc.Component {
    protected mCubePositonArray: Array<Array<cc.Vec3>> = [];
    public get CubePositonArray(): Array<Array<cc.Vec3>> {
        return this.mCubePositonArray;
    }
    public init(): void {
        for (var i = 0; i < this.node.children.length; i++) {
            this.getPosData(this.node.children[i]);
        }
    }
    public getPosData(node: cc.Node): void {
        let posList = new Array();
        for (var i = 0; i < node.children.length; i++) {
            posList.push(cc.v3(node.children[i].position.x, node.children[i].position.y));
        }
        this.mCubePositonArray.push(posList);
    }
}
