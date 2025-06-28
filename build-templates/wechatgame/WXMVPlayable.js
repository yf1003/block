"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var AdaptRatioType;
(function (AdaptRatioType) {
    AdaptRatioType[AdaptRatioType["IPhone6_Landscape"] = 17787] = "IPhone6_Landscape";
    AdaptRatioType[AdaptRatioType["IPhone6_Portrait"] = 5622] = "IPhone6_Portrait";
    AdaptRatioType[AdaptRatioType["IPhoneX_Landscape"] = 21653] = "IPhoneX_Landscape";
    AdaptRatioType[AdaptRatioType["IPhoneX_Portrait"] = 4618] = "IPhoneX_Portrait";
    AdaptRatioType[AdaptRatioType["IPad_Landscape"] = 13333] = "IPad_Landscape";
    AdaptRatioType[AdaptRatioType["IPad_Portrait"] = 7500] = "IPad_Portrait";
})(AdaptRatioType || (AdaptRatioType = {}));
/**
 * 素材与平台的游戏事件通信，就是素材调用这些接口。
 */
var GameEvent = /** @class */ (function () {
    function GameEvent(mvPlayable) {
        this.mvPlayable = mvPlayable;
    }
    GameEvent.prototype.gameReady = function () {
        log("MV platform gameReady");
        mvPlayable.dispatchEventListener("gameStart");
    };
    GameEvent.prototype.gameEnd = function (result) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        log("MV platform gameEnd ".concat(result, " ").concat(args));
    };
    GameEvent.prototype.gameRetry = function () {
        log("MV platform gameRetry");
    };
    return GameEvent;
}());
function log(data, color) {
    if (color === void 0) { color = "#00AAEE"; }
    console.log("%c".concat(data), "color:".concat(color));
}
var MVPlayable = /** @class */ (function () {
    function MVPlayable(legacy) {
        if (legacy === void 0) { legacy = true; }
        var _this = this;
        this.gameEvent = new GameEvent(this);
        this.eventMap = {};
        /** 是否启动playable功能 */
        this.enabled = true;
        var doc = document;
        doc.addEventListener("PLAYABLE:redirect", function (e) {
            if (e.detail.type == "ending")
                _this.dispatchEventListener("gameEnd", e.detail.params[0]);
        });
        doc.addEventListener('PLAYABLE:switchScene', function (e) {
            _this.dispatchEventListener("switchScene", e.detail.scene);
        });
        if (legacy) {
            globalThis.forceMuted = function (muted) {
                if (muted === void 0) { muted = true; }
                return _this.dispatchEventListener("enableSounds", !muted);
            };
            globalThis.stopAllSound = function () { return _this.dispatchEventListener("enableSounds", false); };
            globalThis.recoveryAllSound = function () { return _this.dispatchEventListener("enableSounds", true); };
            globalThis.gameStart = function (startSounds) {
                if (startSounds === void 0) { startSounds = true; }
                return _this.dispatchEventListener("gameStart", startSounds);
            };
            globalThis.retry = function () { return _this.dispatchEventListener("reloadLanguage"); };
            globalThis.replaceAudioData = function (name, audioData) { return _this.dispatchEventListener("replaceAudioData", name, audioData); };
        }
    }
    Object.defineProperty(MVPlayable.prototype, "channel", {
        /**
         * 当前渠道名称
         */
        get: function () { return "wx"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MVPlayable.prototype, "disable_global_click", {
        /**
         * 是否屏蔽素材内置全局可点
         * @description true: 屏蔽全局可点； false: 启动全局可点
         * @default false 默认为false, 只有头条、穿山甲、抖音、pangle渠道设置为true
         */
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MVPlayable.prototype, "disable_auto_click", {
        /**
         * 是否屏蔽素材内置自动跳转逻辑
         * @description true: 屏蔽自动跳转； false: 启动自动跳转
         * @default false 默认为false, 只有输出给DSP的渠道设置为true
         */
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MVPlayable.prototype, "disable_induce_click", {
        /**
         * 是否屏蔽素材内置诱导跳转逻辑
         * @description true: 屏蔽诱导跳转； false: 启动诱导跳转
         * @default false 默认为false
         */
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MVPlayable.prototype, "languageName", {
        /**
         * 获得当前语言
         */
        get: function () {
            var info = globalThis["wx"].getAppBaseInfo();
            if (info != null && info.language != null)
                return info.language.replace("_", "-").toLowerCase();
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 监听平台事件
     * @param type 事件类型
     * @param callback 事件触发时回调
     * @param thisArg callback的this对象
     * @param once 事件只触发一次就自动删除
     */
    MVPlayable.prototype.addEventListener = function (type, callback, thisArg, once) {
        if (once === void 0) { once = false; }
        console.assert(callback != null);
        var list = this.eventMap[type];
        if (list == null)
            this.eventMap[type] = list = [];
        list.push({ callback: callback, thisArg: thisArg, once: once });
    };
    /**
     * 删除监听事件
     * @param type 事件类型
     * @param callback 事件回调函数
     * @param thisArg callback的this对象
     */
    MVPlayable.prototype.removeEventListener = function (type, callback, thisArg) {
        console.assert(callback != null);
        var list = this.eventMap[type];
        if (list == null)
            return;
        var findIndex = function (l, predicate) {
            for (var i = 0; i < l.length; i++)
                if (predicate(l[i]))
                    return i;
            return -1;
        };
        var index = findIndex(list, function (v) { return v.callback == callback; });
        if (index != -1)
            list.splice(index, 1);
    };
    /**
     * 内部函数，请勿调用。
     * @param type 派发事件类型
     * @param args 该事件对应的参数
     * @returns 该事件返回的参数
     */
    MVPlayable.prototype.dispatchEventListener = function (type) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var list = this.eventMap[type];
        if (list == null)
            return;
        for (var i = list.length - 1; i >= 0; i--) {
            var eventData = list[i];
            (_a = eventData.callback).call.apply(_a, __spreadArray([eventData.thisArg], args, false));
            if (eventData.once)
                list.splice(i, 1);
        }
    };
    /**
     * 给平台发送游戏事件
     * @param type 事件类型
     * @param params 该事件对应的参数
     * @returns 该事件返回的参数
     */
    MVPlayable.prototype.sendGameEvent = function (type) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return (_a = this.gameEvent[type]).call.apply(_a, __spreadArray([this.gameEvent], params, false));
    };
    /**
     * 跳转安装接口
     * @param type 跳转类型
     * @param index 策划要求的跳转索引
     */
    MVPlayable.prototype.install = function (type, index) {
        log("MV platform install ".concat(type, " ").concat(index));
        // globalThis.install?.({ type: type });
        globalThis["wx"].notifyMiniProgramPlayableStatus({ isEnd: true });
    };
    /**
     * 发送埋点接口
     * @param action 埋点标识
     */
    MVPlayable.prototype.sendAction = function (action) {
        var _a;
        (_a = globalThis.HttpAPI) === null || _a === void 0 ? void 0 : _a.sendPoint(action);
        log("MV platform sendAction ".concat(action));
    };
    /** 当前MVPlayble 的版本号 */
    MVPlayable.version = "1.3.1";
    return MVPlayable;
}());
/** 此对象保证在引擎启动之前就存在。  */
globalThis.mvPlayable = new MVPlayable();
Object.defineProperty(globalThis, "MV_PLAYABLE", {
    get: function () {
        return globalThis.mvPlayable.enabled;
    },
    set: function (v) {
        return globalThis.mvPlayable.enabled = v;
    },
});
