
import GameTool from "../../common/tool/GameTool";
import MatrixBase from "../matrix/MatrixBase";
import RowCol from "../matrix/RowCol";
import AstarPoint, { AstarType } from "./AstarPoint";

export default class AstarPath extends MatrixBase {
    private mMatrixAstarPointList: Array<Array<AstarPoint>> = [];
    private mResultPath: Array<RowCol> = [];
    constructor(row: number, col: number) {
        super("Astar", row, col);
    }
    private clearMapData(): void {
        this.mMatrixAstarPointList = [];
        this.mResultPath = [];
        this.mMaxRow = -1;
        this.mMaxCol = -1;
    }

    public initMapData(map: Array<Array<AstarType>>, start: RowCol, end: RowCol): boolean {
        this.clearMapData();

        if (map.length <= 0)
            return false;
        if (!this.isValidBound(start.Row, start.Col))
            return false;
        if (!this.isValidBound(end.Row, end.Col))
            return false;
        if (start.isSame(end))
            return false;

        for (let i = 0; i < this.mMaxRow; i++) {
            this.mMatrixAstarPointList.push([]);
        }

        for (let i = 0; i < this.mMaxRow; i++) {
            for (let j = 0; j < this.mMaxCol; j++) {
                this.mMatrixAstarPointList[i][j] = new AstarPoint(i, j, map[i][j]);
            }
        }

        let endPoint = this.findAstartPath(start, end);
        if (endPoint && endPoint.Parent) {
            this.mResultPath = this.processPath(endPoint);
            if (this.mResultPath.length > 1)
                return true;
        }
        return false;
    }


    public findAstartPath(start: RowCol, end: RowCol): AstarPoint {
        let openList: Array<AstarPoint> = [];
        let closeList: Array<AstarPoint> = [];

        let isFind: boolean = true;

        let startPoint = this.getPointByRowCol(start);
        let endPoint = this.getPointByRowCol(end);
        startPoint.F = 0;
        startPoint.G = 0;
        startPoint.H = 0;
        closeList.push(startPoint);
        let curPoint: AstarPoint = startPoint;
        if (RowCol.Same(startPoint.RowCol, endPoint.RowCol))
            isFind = false;
        else {
            if (this.isNearByDis(startPoint.RowCol, endPoint.RowCol, 1)) {
                endPoint.Parent = startPoint;
                closeList.push(endPoint);
                isFind = false;
            }
        }

        while (curPoint && isFind) {
            if (!GameTool.IsContains(closeList, curPoint)) {
                closeList.push(curPoint);
            }

            let roundCanList: Array<AstarPoint> = this.getSameValueAround(curPoint.RowCol, AstarType.Level1);
            let savePointList: Array<AstarPoint> = [];

            for (let aPoint of roundCanList) {
                if (aPoint.isStop() || GameTool.IsContains(closeList, aPoint) || GameTool.IsContains(openList, aPoint)) {
                    let rowCha = Math.abs(aPoint.RowCol.Row - curPoint.RowCol.Row);
                    let colCha = Math.abs(aPoint.RowCol.Col - curPoint.RowCol.Col);

                    if ((rowCha + colCha) >= 2)
                        aPoint.G = curPoint.G + 14;
                    else
                        aPoint.G = curPoint.G + 10;
                    aPoint.H = 10 * (rowCha + colCha);
                    aPoint.F = aPoint.G + aPoint.H;
                    aPoint.Parent = curPoint;
                    if (curPoint.F <= aPoint.F)
                        savePointList.push(aPoint);
                    openList.push(aPoint);
                }
            }

            // 四面楚歌,没有找到出路
            if (openList.length <= 0) {
                curPoint = null;
                openList = [];
                closeList = [];
                break;
            }

            //移动价值排序
            openList.sort((a: AstarPoint, b: AstarPoint) => {
                if (a.F < b.F)
                    return 1;
                else
                    return - 1;
            });

            // 多个价值相同
            let minFPoints = openList[0];
            let minFList: Array<AstarPoint> = [];

            for (let minPoint of openList) {
                if (minFPoints.F === minFPoints.F) {
                    minFList.push(minPoint);
                }
            }

            // 按照距离从排(当有相同距离路线)
            if (minFList.length > 1) {
                for (let minF of minFList) {

                    let minFRowCha = Math.abs(minF.RowCol.Row - curPoint.RowCol.Row);
                    let minFColCha = Math.abs(minF.RowCol.Col - curPoint.RowCol.Col);
                    minF.D = minFRowCha + minFColCha;
                }
                minFList.sort((a: AstarPoint, b: AstarPoint) => {
                    if (a.D < b.D)
                        return 1;
                    else
                        return - 1;
                });
                minFPoints = minFList[0];
            }

            curPoint = minFPoints;

            if (!GameTool.IsContains(closeList, curPoint))
                closeList.push(curPoint);

            // 去掉头
            for (let i = openList.length - 1; i >= 0; i--) {
                if (openList[i] == curPoint) {
                    openList.splice(i, 1);
                    break;
                }
            }

            if (this.isNearByDis(curPoint.RowCol, endPoint.RowCol)) {
                endPoint.Parent = curPoint;
                closeList.push(endPoint);
                curPoint = null;
            }


            if (closeList.length <= 0)
                return null;
            else
                return closeList.pop();

        }
    }

    public processPath(endPoint: AstarPoint): Array<RowCol> {
        let pathRowColList: Array<RowCol> = [];
        let processPoint = endPoint;
        while (processPoint) {
            pathRowColList.push(processPoint.RowCol);
            processPoint = processPoint.Parent;
            if (processPoint.Parent == null) {
                pathRowColList.push(processPoint.RowCol);
                processPoint = null;
            }
        }

        let copyList: Array<RowCol> = [];
        let reverse = pathRowColList.reverse();
        for (let rowCol of reverse) {
            let newRowCol = RowCol.Clone(rowCol);
            copyList.push(newRowCol);
        }
        return reverse;
    }

    public getPointByRowCol(rowCol: RowCol): AstarPoint {
        if (!this.isValidBound(rowCol.Row, rowCol.Col))
            return null;
        return this.mMatrixAstarPointList[rowCol.Row][rowCol.Col];
    }

    public isNearByDis(rowColA: RowCol, rowColB: RowCol, dis: number = 1): boolean {
        if (!this.isValidBound(rowColA.Row, rowColA.Col))
            return false;
        if (!this.isValidBound(rowColB.Row, rowColB.Col))
            return false;

        if (rowColA.isSame(rowColB))
            return true;
        let disRow = Math.abs(rowColA.Row - rowColB.Row);
        let disCol = Math.abs(rowColA.Col - rowColB.Col);
        if (disRow <= dis && disCol <= dis)
            return true;
        return false;
    }

    public getSameValueAround(rowCol: RowCol, type: AstarType): Array<AstarPoint> {
        let aroundList = this.getSudokuRoundRowColArray(rowCol.Row, rowCol.Col);
        let pointList: Array<AstarPoint> = [];
        for (let around of aroundList) {
            let point = this.getPointByRowCol(around);
            if (point && point.isSameValue(type))
                pointList.push(point);
        }
        return pointList;
    }
}
