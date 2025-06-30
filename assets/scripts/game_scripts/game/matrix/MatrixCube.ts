import * as cc from "cc";
import ContextComponent from "../../common/tool/context/ContextComponent";
import ContextPool from "../../common/tool/context/ContextPool";
import { ITouchEvent } from "../../expand/interface/ITouchEvent";
import LocalCommon, { CubeColorType, CubeDirectionType, CubeState } from "../config/LocalCommon";
import BoomParticle from "../cube/BoomParticle";
import CubeBase from "../cube/CubeBase";
import GameUi from "../GameUi";
import GameWorld from "../GameWorld";
import BlockGroupData from "../group/BlockGroupData";
import BlockGroups from "../group/BlockGroups";
import MatrixCubeData from "./MatrixCubeData";
import MatrixCubeLayer from "./MatrixCubeLayer";
import { changeNodeXYZ, mollocCountFunc, setNodeXYZ } from "../CommonFunc";
import { AudioManager, EAudioType } from "../audio/AudioManager";
import { XTween } from "mvplayable";
import { AsyncQueue } from "../../common/AsyncQueue";
import { UserData } from "../UserData";

const { ccclass, property } = cc._decorator;
@ccclass
export default class MatrixCube extends ContextComponent implements ITouchEvent {
    @property(BlockGroupData)
    public BlockGroupData: BlockGroupData = null;

    @property(cc.Prefab)
    public Cube: cc.Prefab = null;
    @property(cc.Prefab)
    public Group: cc.Prefab = null;
    @property(cc.Prefab)
    public EffectBoom: cc.Prefab = null;

    @property(cc.Node)
    public NodeMatrixLayer: cc.Node = null;
    @property(cc.Node)
    public NodeGroupPoint: Array<cc.Node> = [];

    /**
    *  数据
    */
    private mMatrixCubeData: MatrixCubeData = null;
    public get Data(): MatrixCubeData {
        return this.mMatrixCubeData;
    }

    /**
     *  展示
     */
    private mMatrixCubeLayer: MatrixCubeLayer = null;
    public get Layer(): MatrixCubeLayer {
        return this.mMatrixCubeLayer;
    }

    /**
    *  最大横
    */
    private get MaxRow(): number {
        return this.mMatrixCubeData.MaxRow;
    }

    /**
     *  最大列
     */
    private get MaxCol(): number {
        return this.mMatrixCubeData.MaxCol;
    }

    protected mGroupArray: Array<BlockGroups> = [];

    /**
     * 是否放下
     */
    protected mIsPutDown: boolean = false;

    /**
     * 是否需要检查
     */
    protected mIsCheckGroup: boolean = false;

    protected mGameWord: GameWorld = null;
    protected mGameUi: GameUi = null;
    protected mTouchOffest: cc.Vec2 = cc.v2();
    protected mTouchIndex: number = 0;
    protected mTouchGroup: BlockGroups = null;

    public init(content: ContextPool): boolean {
        super.init(content);

        this.BlockGroupData.init(this.mContextPool);
        this.insertContent(this.BlockGroupData);

        this.mMatrixCubeData = new MatrixCubeData("A", LocalCommon.MAX_ROW, LocalCommon.MAX_COL);
        this.insertContent(this.mMatrixCubeData);

        this.mMatrixCubeLayer = new MatrixCubeLayer("A", LocalCommon.MAX_ROW, LocalCommon.MAX_COL);
        this.insertContent(this.mMatrixCubeLayer);

        return true;
    }

    public load(): void {
        this.mGameWord = this.getContext(GameWorld);
        this.mGameUi = this.mGameWord.GameUi;

        let size = cc.size(LocalCommon.CUBE_WIDTH, LocalCommon.CUBE_HEIGHT);

        let widhtDistance = -this.MaxRow * 0.5 * size.width;
        let heightDistance = -this.MaxCol * 0.5 * size.height;
        let beginPosition = cc.v2(widhtDistance, heightDistance + LocalCommon.MATRIX_ADD_Y);
        this.mMatrixCubeLayer.MatrixNode = this.node;
        this.mMatrixCubeLayer.initMatrix(size, beginPosition);

        this.initMatrix();
        this.initGroups();
    }

    public initMatrix(): void {
        for (let i = 0; i < this.MaxRow; i++) {
            for (let j = 0; j < this.MaxCol; j++) {
                let cube = this.createCube(i, j);
                if (cube) {
                    cube.CubeState = CubeState.Empty;
                    cube.ColorType = CubeColorType.Color1;
                }
            }
        }
    }

    public initGroups(): void {
        this.mGroupArray = [];
        for (const Point of this.NodeGroupPoint) {
            let group = cc.instantiate(this.Group);
            this.node.addChild(group);
            group.position = Point.position.clone();

            let blockGroups = group.getComponent(BlockGroups);
            blockGroups.init(this.mContextPool);
            this.mGroupArray.push(blockGroups);
        }

        for (var i = 0; i < this.mGroupArray.length; i++) {
            this.mGroupArray[i].createNewGroup();
        }
    }

    /**
    * 实例方块
    * @param id 标识
    */
    public instantiateCube(): CubeBase {
        let cube = cc.instantiate(this.Cube).getComponent(CubeBase);
        if (cube) {
            cube.node.position = cc.Vec3.ZERO;
            cube.node.setScale(1, 1, 1);
            cube.node.angle = 0;
            if (cube.init(this.ContextPool)) {
                cube.load();
                return cube;
            }
        }
        return null;
    }

    /**
    * 创建方块
    * @param row 
    * @param col 
    */
    public createCube(row: number, col: number): CubeBase {
        let cbue = this.instantiateCube();
        if (cbue && this.insertCube(cbue, row, col))
            return cbue;
        return null;
    }

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
        if (this.mMatrixCubeData.insertCube(cube, row, col)) {
            if (this.mMatrixCubeLayer.insertCube(cube, row, col)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 删除方块
     * @param cube 删除方块实例
     * @returns 删除位置
     */
    public removeCube(cube: CubeBase): boolean {
        if (cube === null)
            return false;

        if (this.mMatrixCubeData.removeCube(cube)) {
            if (this.mMatrixCubeLayer.removeCube(cube)) {
                return true;
            }
        }
        return false;
    }


    /**
     * 获取方块
     * @param row 横
     * @param col 列
     * @returns 
     */
    public getCube(row: number, col: number): CubeBase {
        return this.mMatrixCubeData.getCube(row, col);
    }

    /**
     * 获取方块
     * @param index 
     */
    public getCubeByIndex(index: number): CubeBase {
        let rowCol = this.mMatrixCubeData.getRowColByIndex(index);
        return this.getCube(rowCol.Row, rowCol.Col);
    }



    public onTouchBegin(event: cc.EventTouch): void {
        this.mTouchOffest = cc.v2(0, LocalCommon.TOUCH_GROUP_ADD_Y);
        let touches = event.getTouches();
        let touchposWorld = touches[0].getUILocation();
        let touchpos = this.node.getComponent(cc.UITransform).convertToNodeSpaceAR(cc.v3(touchposWorld.x, touchposWorld.y));

        for (let i = 0; i < this.NodeGroupPoint.length; i++) {
            let size = this.NodeGroupPoint[i].getComponent(cc.UITransform).contentSize;
            let rect = cc.rect(this.NodeGroupPoint[i].position.x - size.width / 2, this.NodeGroupPoint[i].position.y - size.height / 2, size.width, size.height);
            if (rect.contains(cc.v2(touchpos.x, touchpos.y))) {
                this.mTouchGroup = this.mGroupArray[i];
                this.mTouchIndex = i;
                break;
            }
        }

        if (this.mTouchGroup && !this.mTouchGroup.IsGray) {
            this.mTouchOffest.x += this.NodeGroupPoint[this.mTouchIndex].position.x - touchpos.x;
            this.mTouchOffest.y += this.NodeGroupPoint[this.mTouchIndex].position.y - touchpos.y;
            AudioManager.ins.playAudio(EAudioType.click)
            cc.game.emit('hideGuide')
        }
        else
            this.mTouchGroup = null;
    }

    public onTouchMove(event: cc.EventTouch): void {
        if (this.mTouchGroup === null)
            return;
        let touches = event.getTouches();
        let touchWorld = touches[0].getUILocation();
        let touchBeginposWorld = touches[0].getUIStartLocation();
        let touchpos = this.node.getComponent(cc.UITransform).convertToNodeSpaceAR(cc.v3(touchWorld.x, touchWorld.y));

        this.mTouchGroup.node.setPosition(
            touchpos.x + this.mTouchOffest.x,
            touchpos.y + this.mTouchOffest.y,
            0
        )

        if (!(Math.abs(touchBeginposWorld.x - touchpos.x) <= 5
            && Math.abs(touchBeginposWorld.y - touchpos.y) <= 5)) {

            this.mTouchGroup.pickUp();
            changeNodeXYZ(this.mTouchGroup.node, 'y', LocalCommon.TOUCH_GROUP_ADD_Y);
        }


        this.mMatrixCubeData.hideAllShadow();

        let modelList = this.mTouchGroup.getAdjustModelsPos();
        for (let i = 0; i < modelList.length; i++) {
            let posList = modelList[i];
            let cubeList = this.mMatrixCubeLayer.getRowColsByPostion(posList);
            if (this.mMatrixCubeData.isCanInsertMatrix(cubeList)) {
                for (let j = 0; j < cubeList.length; j++) {
                    let cube = this.mMatrixCubeData.getCube(cubeList[j].Row, cubeList[j].Col);
                    cube.showShadow(this.mTouchGroup.CubeColorType);
                }
                return;
            }
        }
    }


    public onTouchEnd(event: cc.EventTouch): void {
        if (this.mTouchGroup === null)
            return;
        let isPutDown = false;

        let touches = event.getTouches();
        let touchpos = touches[0].getUILocation();
        let touchBeginpos = touches[0].getUIStartLocation();

        if (Math.abs(touchBeginpos.x - touchpos.x) <= 5
            && Math.abs(touchBeginpos.y - touchpos.y) <= 5) {
            this.mMatrixCubeData.hideAllShadow();

            this.mTouchGroup.roateModelGroup();
            this.mTouchGroup.putDown();
            this.mTouchGroup.runBackAction();
            this.mTouchGroup = null;
            return;
        }


        let modelList = this.mTouchGroup.getAdjustModelsPos();
        for (var i = 0; i < modelList.length; i++) {
            let posList = modelList[i];
            let cubeList = this.mMatrixCubeLayer.getRowColsByPostion(posList);
            if (this.mMatrixCubeData.isCanInsertMatrix(cubeList)) {
                let addScore = LocalCommon.GetPutDownScore(cubeList.length);
                this.mGameUi.addScore(addScore);
                for (var j = 0; j < cubeList.length; j++) {
                    let rowCol = cubeList[j];
                    let cube = this.mMatrixCubeData.getCube(rowCol.Row, rowCol.Col);
                    cube.showFullAnim(this.mTouchGroup.CubeColorType)
                }
                this.mTouchGroup.createNewGroup();
                this.mTouchGroup.runInsertAction();
                // this.mTouchGroup.hideGroup();

                this.mIsPutDown = true;
                this.mIsCheckGroup = true;
                isPutDown = true;
                AudioManager.ins.playAudio(EAudioType.put)
                UserData.needGuide = false
                break;
            }
        }
        if (!isPutDown) {
            this.mTouchGroup.runBackAction();
        }
        this.mTouchGroup.putDown();
        this.mMatrixCubeData.hideAllShadow();
        this.mTouchGroup = null;
    }



    public onTouchCancel(event: cc.EventTouch): void {
        if (this.mTouchGroup === null)
            return;
        this.mMatrixCubeData.hideAllShadow();
        this.mTouchGroup.runBackAction();
        this.mTouchGroup.putDown();
        this.mTouchGroup = null;
    }


    public onUpdate(dt: number) {
        this.checkGuide(dt)
        this.checkMatrixHightLight()

        if (this.checkMatrixClear())
            return;
        if (this.checkLevelUp()) {
            return;
        }
        if (this.checkMatrixResult()) {
            return;
        }
    }

    /**
    * 检测升级
    * @returns 
    */
    public checkLevelUp(): boolean {
        return false
        if (this.mGameUi.isCompleteTarget()) {
            this.levelUp();
            return true;
        }
        return false;
    }

    /**
     * 检测游戏结果
     * @returns 
     */
    public checkMatrixResult(): boolean {
        if (!this.mIsCheckGroup)
            return false;
        this.mIsCheckGroup = false;
        let isOver = true;

        for (let group of this.mGroupArray) {
            if (this.chenkGroupInsert(group)) {
                isOver = false;
            }
        }
        if (isOver)
            this.showGameOverAction();
        return isOver;
    }

    /**
     * 检测组能否插入
     * @param group 
     * @returns 
     */
    public chenkGroupInsert(group: BlockGroups): boolean {
        let emptyArray = this.mMatrixCubeData.getEmptyCube();
        for (let i = 0; i < emptyArray.length; i++) {
            for (let type = CubeDirectionType.Up; type < CubeDirectionType.Left + 1; type++) {
                let posList = group.getModelsPosOnMatrix(emptyArray[i].node.position, type);
                if (posList.length > 0) {
                    let rowColList = this.mMatrixCubeLayer.getRowColsByPostion(posList);
                    if (this.mMatrixCubeData.isCanInsertMatrix(rowColList)) {
                        group.hideGray();
                        return true;
                    }
                }
            }
        }
        group.showGray();
        return false;
    }

    public showGameOverAction() {
        let haveList = this.mMatrixCubeData.getFullCube();
        let actionAry = [];
        for (let i = 0; i < haveList.length; i++) {
            let cube = haveList[i];
            GameWorld.IncreaseLock();
            let cb = () => {
                cube.IsGray = true;
                GameWorld.ReduceLock();
            };
            this.scheduleOnce(cb, i * 0.03);
        }

        this.scheduleOnce(() => {
            // -- 游戏结束
            GameWorld.GameOver();
        }, haveList.length * 0.03 + 0.3);
    }


    /**
     * 升级
     */
    public levelUp() {
        // let allCube = this.mMatrixCubeData.getFullCube();
        // let randClearCube = allCube.getRandom(LocalCommon.LEVEL_UP_CLEAR_NUMBER);

        // this.mGameUi.levelUp();

        // let delay = 1.2;
        // this.scheduleOnce(() => {
        //     for (let i = 0; i < randClearCube.length; i++) {
        //         GameWorld.IncreaseLock();
        //         let cube = randClearCube[i];
        //         this.scheduleOnce(() => {
        //             this.changeCubeEmpty(cube);
        //             GameWorld.ReduceLock();
        //         }, i * 0.2);
        //     }

        //     this.scheduleOnce(() => {
        //         this.mIsCheckGroup = true;
        //     }, randClearCube.length * 0.2);
        // }, delay);
    }

    private time: number = 0
    public checkGuide(dt: number) {
        if (!UserData.needGuide) return
        if (this.mTouchGroup) return

        this.time += dt
        if (this.time >= 3) {
            this.time = 0
            if (UserData.needGuide) {
                cc.game.emit('showGuide')
            }
        }
    }

    public checkMatrixHightLight(): void {
        if (this.mIsPutDown) {
            cc.game.emit('hide_all_hight_light')
            return
        }

        const rowArray: number[] = []
        const colArray: number[] = []
        for (let i = 0; i < this.MaxRow; i++) {
            let isFull = true, hasInShadow = true;
            for (let j = 0; j < this.MaxCol; j++) {
                let isInShadow = this.mMatrixCubeData.isShadowCube(i, j)
                hasInShadow = hasInShadow || isInShadow
                if (this.mMatrixCubeData.isEmptyCube(i, j) && !isInShadow) {
                    isFull = false;
                    break;
                }
            }

            if (isFull && hasInShadow) {
                rowArray.push(i)
            }
        }

        for (let i = 0; i < this.MaxCol; i++) {
            let isFull = true, hasInShadow = true;
            for (let j = 0; j < this.MaxRow; j++) {
                let isInShadow = this.mMatrixCubeData.isShadowCube(j, i)
                hasInShadow = hasInShadow || isInShadow
                if (this.mMatrixCubeData.isEmptyCube(j, i) && !isInShadow) {
                    isFull = false;
                    break;
                }
            }
            if (isFull && hasInShadow) {
                colArray.push(i)
            }
        }

        if (rowArray.length === 0 && colArray.length === 0) {
            cc.game.emit('hide_all_hight_light')
        } else {
            cc.game.emit('show_hight_light', rowArray, colArray)
        }
    }

    /**
     * 检测矩阵消除
     * @returns 
     */
    public checkMatrixClear(): boolean {
        if (!this.mIsPutDown)
            return false;
        this.mIsPutDown = false;

        let clearArray: Array<Array<CubeBase>> = [];
        for (let i = 0; i < this.MaxRow; i++) {
            let isFull = true;
            for (let j = 0; j < this.MaxCol; j++) {
                if (this.mMatrixCubeData.isEmptyCube(i, j)) {
                    isFull = false;
                    break;
                }
            }

            if (isFull) {
                let arr: Array<CubeBase> = []
                for (let col = 0; col < this.MaxCol; col++) {
                    let cube = this.mMatrixCubeData.getCube(i, col);
                    if (arr.indexOf(cube) < 0)
                        arr.push(cube);
                }
                clearArray.push(arr)
            }
        }

        for (let i = 0; i < this.MaxCol; i++) {
            let isFull = true;
            for (let j = 0; j < this.MaxRow; j++) {
                if (this.mMatrixCubeData.isEmptyCube(j, i)) {
                    isFull = false;
                    break;
                }
            }
            if (isFull) {
                let arr: Array<CubeBase> = []
                for (let row = 0; row < this.MaxRow; row++) {
                    let cube = this.mMatrixCubeData.getCube(row, i);
                    if (arr.indexOf(cube) < 0)
                        arr.push(cube);
                }
                clearArray.push(arr)
            }
        }
        if (clearArray.length === 0) {
            return false
        } else {
            this.clearCubeOnByOne(clearArray);
            if (clearArray.length > 1) {
                AudioManager.ins.playAudio(EAudioType.synthesis2)
            } else {
                AudioManager.ins.playAudio(EAudioType.synthesis1)
            }
            return true
        }
    }

    /**
     * YF
     * 一个一个清理方块
     * @param clearArray 
     * @returns 
     */
    public clearCubeOnByOne(clearCubeArray: Array<Array<CubeBase>>) {
        let addScore = 0
        for (let i = 0; i < clearCubeArray.length; i++) {
            addScore += clearCubeArray[i].length * LocalCommon.AWARD_SCORE_MULTI
        }

        const callback = mollocCountFunc(clearCubeArray.length, () => {
            this.mIsCheckGroup = true;
            this.mGameWord.GameUi.addScore(addScore);
        })
        clearCubeArray.forEach(arr => {
            // let actionArray: cc.Tween<cc.Node>[] = [];
            // for (let i = 0; i < arr.length; i++) {
            //     GameWorld.IncreaseLock();
            //     let cube = arr[i];
            //     actionArray.push(cc.tween().call(() => {
            //         this.changeCubeEmpty(cube);
            //         GameWorld.ReduceLock();
            //     }));
            //     actionArray.push(cc.tween().delay(0.05));
            // }

            // if (actionArray.length > 0) {
            //     actionArray.push(cc.tween().call(() => {
            //         callback()
            //     }));

            //     let action = cc.tween(this.node).sequence(...actionArray);
            //     action.start();
            // } else {
            //     callback()
            // }

            const queue = new AsyncQueue()
            for (let i = 0; i < arr.length; i++) {
                GameWorld.IncreaseLock();
                let cube = arr[i];
                queue.push(next => {
                    this.changeCubeEmpty(cube);
                    GameWorld.ReduceLock();
                    next()
                })
                queue.yieldTime(0.05 * 1000)
            }
            queue.complete = callback
            queue.play()
        })
    }


    public changeCubeEmpty(cube: CubeBase): void {
        if (!cube)
            return;

        let boom = cc.instantiate(this.EffectBoom);
        let boomControl = boom.getComponent(BoomParticle);
        boomControl.ColorType = cube.ColorType;

        this.NodeMatrixLayer.addChild(boom);
        boom.setWorldPosition(cube.node.getWorldPosition())

        cube.showEmptyAnim()
        this.scheduleOnce(() => {
            boom?.isValid && boom.destroy();
        }, 0.6)
    }
}
