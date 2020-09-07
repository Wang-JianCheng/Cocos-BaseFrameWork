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
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
