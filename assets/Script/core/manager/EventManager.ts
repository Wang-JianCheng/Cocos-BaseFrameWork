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

    public event: any = null;
    // private keyList: string[] = [];//注册事件集合
    /**
     *
     */
    constructor() {
        super();
        this.event = new cc.EventTarget();
    }
    /**
     * 注册事件目标的特定事件类型回调
     * @param key 
     * @param handle 
     * @param target 
     */
    public on(key: string, handle: Function, target: any): void {
        this.event.on(key, handle, target);
        // console.error("event on", this.event)
    }
    /**
     * 注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身
     * @param key 
     * @param handle 
     * @param target 
     */
    public onOnce(key: string, handle: Function, target: any): void {
        this.event.once(key, handle, target);
        // console.error("event on", this.event)
    }
    /**
     * 通过事件名发送自定义事件
     * @param key 
     * @param data 传递的参数，最多5个
     */
    public emit(key: string, ...data: any[]): void {
        this.event.emit(key, ...data);
    }
    /**
     * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器
     * @param key 
     * @param handle 
     * @param target 
     */
    public off(key: string, handle: Function, target: any): void {
        this.event.off(key, handle, target);
        // console.error("event off", this.event)
    }
    /**
     * 删除target参数在当前 EventTarget 上注册的所有事件监听器。
     * @param target 
     */
    public targetOff(target: any): void {
        this.event.targetOff(target);
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
