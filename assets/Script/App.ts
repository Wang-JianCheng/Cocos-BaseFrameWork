import AssetsManager from "./core/manager/AssetsManager";
import DataManager from "./manager/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class App extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.debug.setDisplayStats(false);//是否在左下角显示 FPS
    }

    start() {
        DataManager.Instance.init();
        this.load();
    }
    private async load() {
        await AssetsManager.Instance.init();
    }
    // 预加载资源
    private async preloadRes() {
        // 加载资源
        // await AssetsManager.Instance.init();
    }
    // update (dt) {}
}
