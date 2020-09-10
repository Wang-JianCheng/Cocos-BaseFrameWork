import AssetsManager from "./core/manager/AssetsManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class App extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.debug.setDisplayStats(true);//是否在左下角显示 FPS
    }

    start() {
        this.load();
    }
    private async load() {
        await this.preloadRes();
    }
    // 预加载资源
    private async preloadRes() {
        // 加载资源
        await AssetsManager.Instance.init();
  
        // // this.pgCmt.progress = 0.1
        // // 加载通知层面板
        // await this.loadAllNotice()
        // this.pgCmt.progress = 0.2
        // await viewHelper.preloadView([
        //     { name: 'main', type: ViewType.WIND },
        //     { name: 'login', type: ViewType.WIND },
        //     { name: 'login/story', type: ViewType.PNL },
        //     { name: 'main/eat', type: ViewType.PNL },
        //     { name: 'common/playerGuide', type: ViewType.PNL },
        // ], (cur, total) => {
        //     log.info(`cur: ${cur} total: ${total}`)
        //     this.pgCmt.progress = 0.2 + 0.8 * cur / total

    }
    // update (dt) {}
}
