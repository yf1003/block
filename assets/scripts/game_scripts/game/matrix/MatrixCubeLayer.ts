import * as cc from 'cc'
import MatrixCreateLayer from "../../expand/matrix/MatrixCreateLayer";
import RowCol from "../../expand/matrix/RowCol";
import CubeBase from "../cube/CubeBase";
const { ccclass, property } = cc._decorator;
@ccclass
export default class MatrixCubeLayer extends MatrixCreateLayer {
    /**
    * 插入方块
    * @param cube 方块实例
    * @param row 横
    * @param col 列
    * @returns 
    */
    public insertCube(cube: CubeBase, row: number, col: number): boolean {
        if (cube === null)
            return false;
        let data = this.getMatrixPos(row, col);
        cube.node.position = cc.v3(data.Position.x, data.Position.y);
        cube.node.parent = null;
        if (cube.node !== this.mMatrixNode) {
            this.MatrixNode.addChild(cube.node);
        }
        return true;
    }

    /**
     * 删除方块
     * @param cube 删除方块实例
     * @returns 
     */
    public removeCube(cube: CubeBase): boolean {
        if (cube === null)
            return false;
        return cube.remove();
    }

    public getRowColsByPostion(posList: Array<cc.Vec2>): Array<RowCol> {
        let rowColList: Array<RowCol> = [];
        let posLength = posList.length;
        for (let i = 0; i < posLength; i++) {
            let rowCol = this.getRowColByPos(posList[i]);
            if (!rowCol.isWrong()) {
                rowColList.push(rowCol);
            }
        }
        if (rowColList.length !== posLength)
            rowColList = [];
        return rowColList;
    }
}
