import BaseUI from "../base/BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
    // 当前实例 
    private static _instance: UIManager;
    /**单例模式，用存取器get获取当前实例*/
    public static get Instance(): UIManager {
        if (!this._instance) {
            this._instance = new UIManager();
        }
        return this._instance;
    }

    private UIList: BaseUI[] = [];
    private preUI: cc.Node = null;
    private curUI: cc.Node = null;
    private nextUI: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }
    public openUI(): void { }
    public hideUI(): void { }
    public closeUI(): void { }
    // update (dt) {}
}
