import { UserModule } from "../common/config/DataModule";
import { EventType } from "../common/config/GlobalConfig";
import BaseFunc from "../core/base/BaseFunc";
import EventManager from "../core/manager/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DataManager extends cc.Component {

    private static _instance: DataManager;
    /**单例模式，用存取器get获取当前实例*/
    public static get Instance(): DataManager {
        if (!this._instance) {
            this._instance = new DataManager();
        }
        return this._instance;
    }
    public userData: UserModule = null;

    @property()
    get score(): number {
        return this.userData.score;
    }
    set score(num) {
        this.userData.score += num;
        // console.error("this._curLevel：", this._curLevel)
        EventManager.Instance.emit(EventType.UPDATE_SCORE);
        this.setUserData();
    }
    @property()
    get coin(): number {
        return this.userData.coin;
    }
    set coin(num) {
        this.userData.coin += num;
        // console.error("this._curLevel：", this._curLevel)
        EventManager.Instance.emit(EventType.UPDATE_COIN);
        this.setUserData();
    }
    @property()
    get ballNum(): number {
        return this.userData.ballNum;
    }
    set ballNum(num) {
        this.userData.ballNum += num;
        // console.error("this._curLevel：", this._curLevel)
        EventManager.Instance.emit(EventType.UPDATE_BALLNUM);
        this.setUserData();
    }

    public init(): void {
        this.getUserData();
    }
    //获取玩家数据
    public getUserData() {

        if (BaseFunc.getStorage("userData")) {
            this.userData = JSON.parse(BaseFunc.getStorage("userData"));
            // //新增合成相关数据信息
            // if (!this.userData.synthData) {
            //     this.userData.jewel = 200;
            //     this.userData.synthData = [{ "id": 1, "num": 1, "goldCount": 0, "jewelCount": 0 }];
            //     this.setUserData();
            // }
        } else {
            this.userData = {
                score: 0,
                coin: 0,
                ballNum: 0,
            };
            console.log("数据为空:", this.userData);
            this.setUserData();
        }
    }
    /**存储玩家数据 */
    public setUserData(): void {
        BaseFunc.setStorage("userData", JSON.stringify(this.userData));
    }
    // update (dt) {}
}
