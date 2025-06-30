import * as cc from "cc";

import RandTool from "./RandTool";
export default class GameTool {
    /**
     * 根据name递归搜节点
     * @param parent 节点 
     * @param name 名字
     * @returns 结果
     */
    public static SearchChildByName(parent: cc.Node, name: string): cc.Node {
        if (!parent)
            return null;
        if (parent.name == name)
            return parent;
        let childList = parent.children;
        for (let child of childList) {
            let res = GameTool.SearchChildByName(child, name);
            if (res)
                return res;
        }
        return null;
    }

    /**
     * 获取节点A在节点B位置
     * @param a 
     * @param b 
     * @returns 
     */
    public static GetNodePosition(a: cc.Node, b: cc.Node): cc.Vec3 {
        let worldPos = a.parent.getWorldPosition();
        return b.getComponent(cc.UITransform).convertToNodeSpaceAR(worldPos).clone();
    }

    /**
     * 获取真实的pos
     * @param node 
     * @returns 
     */
    public static GetTruePos(node: cc.Node): cc.Vec2 {
        if (!node)
            return cc.Vec2.ZERO;
        const uiTran = node.getComponent(cc.UITransform)
        let acPoint = uiTran.anchorPoint;
        let nodeX = node.position.x + uiTran.width * (0.5 - acPoint.x);
        let nodeY = node.position.y + uiTran.height * (0.5 - acPoint.y);
        return cc.v2(nodeX, nodeY);
    }

    /**
     * 根据节点名字获取当前节的位置
     * @param nodeName 
     * @returns 
     */
    public static GetWorldPosByName(nodeName: string): cc.Vec2 {
        throw new Error('未实现函数')
        // let nowScene = cc.director.getScene();
        // let parent = nowScene.getChildByName("Canvas");
        // let child = GameTool.SearchChildByName(parent, nodeName);
        // if (child) {
        //     let truePos = GameTool.GetTruePos(child);
        //     let wordPos = child.parent.convertToWorldSpaceAR(truePos);
        //     let maskPos = parent.convertToNodeSpaceAR(wordPos);
        //     return maskPos;
        // }
        // return cc.Vec2.ZERO.clone();
    }

    /**
     * 转换Boolen To Number
     * @param is 
     * @returns 
     */
    public static ChangeBoolenToNumber(is: boolean): number {
        if (is)
            return 1;
        else
            return 0;
    }

    /**
     * 转换Number To Boolen
     * @param num 
     * @returns 
     */
    public static ChangeNumberToBoolen(num: number): boolean {
        if (num <= 0)
            return false;
        else
            return true;
    }

    // 替换多语言文本[];
    public replaceText(st: string, list: Array<string | number>): string {
        if (!st || st == "")
            return "";
        if (!list || list.length < 0)
            return "";

        let now = st;
        for (let repalceString of list) {
            now = this.replaceTextOnce(now, repalceString);
        }
        return now;
    };

    public replaceTextOnce(st: string, target: string | number): string {
        let result = st.replace('[]', target + "");
        return result;
    };

    /**
     * 是不是余数
     * @param num 
     * @returns 
     */
    public static IsEvennumber(num: number): boolean {
        if (num % 2 == 0)
            return true;
        return false;
    }

    /**
     * 是否包含
     * @param list 
     * @param any 
     * @returns  -1 代表没有 其他代表index
     */
    public static IsContains(list: Array<any>, any: any): number {
        if (list.length <= 0)
            return -1;
        for (let i = 0; i < list.length; i++) {
            let data = list[i];
            if (data === any)
                return i;
        }
        return -1;
    }

    /**
     * 是否是数组安全索引
     * @param index 
     * @param list 
     * @returns 
     */
    public static IsSafeArrayIndex(index: number, list: Array<any>): boolean {
        if (index < 0)
            return false;
        if (index >= list.length)
            return false;
        return true;
    }

    /**
     * 获取环绕点的园
     * @param r 半径
     * @param startPos 起始点
     * @param count 数量
     * @param randMovex x 偏移
     * @param randMovey y 偏移
     * @returns 
     */
    public static GetCirclePoints(r: number, startPos: cc.Vec2, count: number, randMovex: number = 0, randMovey: number = 0): Array<cc.Vec2> {
        let points: Array<cc.Vec2> = [];
        let radians = (Math.PI / 180) * Math.round(360 / count);
        for (let i = 0; i < count; i++) {
            let x = startPos.x + r * Math.sin(radians * i);
            let y = startPos.y + r * Math.cos(radians * i);
            let randX = RandTool.RandPlusOrMinus() * RandTool.RandIncludeAll(randMovex * 0.5, randMovex);
            let randY = RandTool.RandIncludeAll(randMovey * 0.5, randMovey);
            points.unshift(cc.v2(x + randX, y + randY));
        }
        return points;
    }


    public static DestoryNode(component: cc.Component): boolean {
        if (!component)
            return false;
        return component.node.destroy();
    }
}
