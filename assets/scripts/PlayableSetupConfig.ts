import { director, Director, instantiate, Prefab, resources, sys } from "cc";
import { ENABLE_RETARGET_SKELETON } from "cc/userland/macro";
import { AdaptScreenManager, audioManager, initRetargetSkeleton, InstallType, playable, Playable, registerSetupConfig, registerSystemSetup, SetupConfig, XTween } from "mvplayable";

if (ENABLE_RETARGET_SKELETON)
    initRetargetSkeleton();

/**
 * 素材启动配置类，此配置类保证了素材资源与相关对象，比喻playable,多语言，gameConfig等资源&对象都能在场景脚本启动之前初始化。
 */
@registerSetupConfig
export class PlayableSetupConfig extends SetupConfig {
    protected onInitialize(): void {
        // 本地模拟诱导开关模式
        // if (!BUILD) playable.isInduceInstall = false;
        // 每次重玩，都重新播放一下背景音乐
        playable.eventSystem.on(Playable.StartGameEvent, () => audioManager.playMusic("bm_bgm"));
        // 开启/关闭埋点，有些素材有需求，重玩后不再发送埋点，那就可以调用此函数关闭。
        // playable.eventSystem.once(Playable.OnRetryEvent, () => playable.enableAction = false);
        // 当有场景重新加载，表示当前游戏已经结束，做一些清理工作
        director.on(Director.EVENT_BEFORE_SCENE_LOADING, this.onShutdown, this);
        /** 当调用了{@link playable.showEnding}后，这里能收到显示结束页面的事件 */
        playable.eventSystem.on(Playable.EndingEvent, (result) => {
            console.log("show ending", result);
            // if (sys.platform === sys.Platform.WECHAT_GAME) // 客户特殊要求：如不点击，2秒后自动跳转微信结束页
            //     setTimeout(() => playable.install(InstallType.None), 2000);
            // ViewUIManager.hideView(GameView); // 如果素材有需要在结束页时隐藏GameView页面，可以开启此代码
            // 在此显示ending 页面
            const ending = instantiate(resources.get("prefabs/endingView", Prefab));
            director.getScene().getChildByName("Canvas").addChild(ending);
        });
    }

    // 提前加载资源
    public getSyncPreloadAssets() {
        return [this.createAssetTask("prefabs/gameView"), this.createAssetTask("prefabs/endingView")];
    }

    @registerSystemSetup(400) // 注册一个事件系统，当场景加载玩成，游戏未启动时，可以做一些资源处理。
    protected static initGameView(config: SetupConfig): void {
        // const gameViewPrefab = resources.get("prefabs/gameView", Prefab);
        // const canvasNode = config.scene.getChildByName("Canvas");
        // canvasNode.getOrAddComponent(AdaptScreenManager);
        // const gameView = instantiate(gameViewPrefab);
        // gameView.setParent(canvasNode);
    }

    public onShutdown(): void {
        XTween.removeAllTweens();
    }
}