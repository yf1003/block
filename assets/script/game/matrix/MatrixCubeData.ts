import * as cc from 'cc'
import MatrixData from "../../expand/matrix/MatrixData";
import RowCol from "../../expand/matrix/RowCol";
import { CubeState } from "../config/LocalCommon";
import CubeBase from "../cube/CubeBase";
const { ccclass, property } = cc._decorator;
@ccclass
export default class MatrixCubeData extends MatrixData {
    /**
         * 
         * @param cube 方块实例
         * @param row 横
         * @param col 列
         * @returns 是否成功
         */
    public insertCube(cube: CubeBase, row: number, col: number): boolean {
        if (cube === null)
            return false;
        if (this.insert(cube.node, row, col)) {
            cube.Row = row;
            cube.Col = col;
            return true;
        }
        return false;
    }

    /**
     * 
     * @param cube 删除方块
     * @returns 是否成功
     */
    public removeCube(cube: CubeBase): boolean {
        if (cube === null)
            return false;
        return this.remove(cube.Row, cube.Col);
    }



    /**
     * 获取方块
     * @param row 横
     * @param col 列
     */
    public getCube(row: number, col: number): CubeBase {
        let node = this.get(row, col);
        if (node)
            return node.getComponent(CubeBase);
        return null;
    }

    /**
     * 获取所有方块
     */
    public getAllCube(): Array<CubeBase> {
        let array = [];
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let cube = this.getCube(i, j);
                if (cube) {
                    array.push(cube);
                }
            }
        }
        return array;
    }

    /**
     * 交换
     * @param aRow 
     * @param aCol 
     * @param bRow 
     * @param bCol 
     * @returns 
     */
    public swapCube(aRow: number, aCol: number, bRow: number, bCol: number): boolean {
        let cubeA = this.getCube(aRow, aCol);
        let cubeB = this.getCube(bRow, bCol);
        if (cubeA && cubeB) {
            if (this.swap(aRow, aCol, bRow, bCol)) {
                cubeA.Row = bRow;
                cubeA.Col = bCol;

                cubeB.Row = aRow;
                cubeB.Col = aCol;
                return true;
            }
        }
        return false;
    }

    public getFullCube(): Array<CubeBase> {
        return this.getCubeByState(CubeState.Full);
    }

    public getEmptyCube(): Array<CubeBase> {
        return this.getCubeByState(CubeState.Empty);
    }

    public getCubeByState(state: CubeState): Array<CubeBase> {
        let result = [];
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let cube = this.getCube(i, j);
                if (cube && cube.CubeState === state) {
                    result.push(cube);
                }
            }
        }
        return result;
    }

    public isCanInsertMatrix(groupRowCols: Array<RowCol>) {
        if (groupRowCols.isEmpty())
            return false;
        let emptyRowColArray: Array<RowCol> = [];
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let cube = this.getCube(i, j);
                if (cube && cube.CubeState === CubeState.Empty) {
                    emptyRowColArray.push(cube.RowCol.clone());
                }
            }
        }
        return this.isContained(emptyRowColArray, groupRowCols);
    }

    public isContained(a: Array<RowCol>, b: Array<RowCol>) {
        if (a.length <= 0 || b.length <= 0)
            return false;
        if (a.length < b.length)
            return false;
        for (let i = 0; i < b.length; i++) {
            let t = false;
            for (let j = 0; j < a.length; j++) {
                if (b[i].Row === a[j].Row && b[i].Col === a[j].Col) {
                    t = true;
                    break;
                }
            }
            if (!t)
                return false;
        }
        return true;
    }

    public hideAllShadow() {
        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                let cube = this.getCube(i, j);
                cube.hideShadow();
            }
        }
    }

    public isEmptyCube(row: number, col: number): boolean {
        let cube = this.getCube(row, col);
        if (cube)
            return cube.CubeState === CubeState.Empty;
        return false;
    }   

    public isShadowCube(row: number, col: number): boolean {
        let cube = this.getCube(row, col);
        if (cube)
            return cube.inShadow;
        return false;
    }
}
