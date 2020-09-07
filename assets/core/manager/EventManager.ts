const { ccclass, property } = cc._decorator;
@ccclass
export default class EventManager extends cc.Component {
    // 当前实例 
    private static _instance: EventManager;
    /**单例模式，用存取器get获取当前实例*/
    public static get Instance(): EventManager {
        if (!this._instance) {
            this._instance = new EventManager();
        }
        return this._instance;
    }

    private event: any = null;
    // private keyList: string[] = [];//注册事件集合
    /**
     *
     */
    constructor() {
        super();
        this.event = new cc.EventTarget();
    }
    public on(key: string, handle, target): void {
        this.event.on(key, handle, target);
        // console.error("event on", this.event)
    }
    public onOnce(key: string, handle, target): void {
        this.event.once(key, handle, target);
        // console.error("event on", this.event)
    }
    // public emit(key: string, arg0, arg1, arg2, arg3, arg4): void {
    //     this.event.emit(key, arg0, arg1, arg2, arg3, arg4);
    // }
    public emit(key: string, ...data: any[]): void {//最多5个参数
        this.event.emit(key, ...data);
    }
    public off(key: string, handle, target): void {
        this.event.off(key, handle, target);
        // console.error("event off", this.event)
    }
    // public offAll(target): void {
    //     if (this.keyList.length == 0) return;
    //     for (let i = this.keyList.length - 1; i >= 0; i--) {
    //         let i_key = this.keyList[i];
    //         this.event.off(i_key, target["i_key"], target);
    //         this.keyList.pop();
    //     }
    // }
}
