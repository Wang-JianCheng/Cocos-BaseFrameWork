import EventManager from "../manager/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseUI extends cc.Component {

    public state: string = 'none'
    private __listens: any[] = []// 监听列表
    constructor() {
        super();
    }
    public listenEventMaps(): any[] {
        return []
    }
    public BindUI(): void {
        console.error("BindUI BindUI BindUI")
    }
    public __register(val?: string) {
        this.__listens.forEach(({ type, cb, target, tag }) => EventManager.Instance.on(type, cb, target))
        console.error("__listens", this.__listens, EventManager.Instance.event)
        // this.__listens.forEach(({ type, cb, target, tag }) => (!val || val === tag) && EventManager.Instance.on(type, cb, target))
    }

    public __unregister(val?: string) {
        this.__listens.forEach(({ type, cb, target, tag }) => EventManager.Instance.off(type, cb, target))
        // EventManager.Instance.targetOff(this);
        // this.__listens.forEach(({ type, cb, target, tag }) => (!val || val === tag) && EventManager.Instance.off(type, cb, target))
        console.error("__unregister", this.__listens, EventManager.Instance.event)
    }
    public __listenMaps() {
        this.__wrapListenMaps(this.listenEventMaps(), this.__listens, this)
    }
    protected __wrapListenMaps(listens: any[], out: any[], target: any): any[] {
        listens.forEach(map => {
            let data = { type: '', cb: null, target: target, tag: 'create' }
            for (let key in map) {
                let val = map[key]
                if (typeof (val) === 'function') {
                    data.type = key
                    data.cb = val
                } else if (key === 'enter') {
                    data.tag = key
                }
            }
            out.push(data)
        })
        return out
    }
    public init(): void {

    }
    onLoad() {
        // console.log("BaseUI BaseUI BaseUI BaseUI BaseUI")
    }
    onEnable() {

    }
    onDisable() {

    }
    onDestroy() {

    }
    // 添加点击事件
    public addClickEvent(path: string, cmptType: typeof cc.Component, handler: string, data?: string) {
        // const cmpt = this.node.FindChild(path, cmptType)
        // if (!cmpt) {
        //     return cc.error(this.node.name + '.addClickEvent error! [' + path + '] not find!')
        // }
        // if (!this[handler] || typeof (this[handler]) !== 'function') {
        //     return cc.error(handler + ' 没有找到对应的方法名 at=' + this['__classname__'])
        // }
        // const events = cmpt instanceof cc.ToggleContainer ? cmpt.checkEvents : cmpt['clickEvents']
        // if (events) {
        //     events[0] = this.__newEventHandler(handler, data)
        // } else {
        //     return cc.error(handler + ' 没有对应的events at=' + this['__classname__'] + '/' + path)
        // }
    }

    // public __register(val?: string) {
    //     this.__listens.forEach(({ type, cb, target, tag }) => (!val || val === tag) && eventCenter.on(type, cb, target))
    // }

    // public __unregister(val?: string) {
    //     this.__listens.forEach(({ type, cb, target, tag }) => (!val || val === tag) && eventCenter.off(type, cb, target))
    // }



    // public addListener(type: string, cb: Function, target?: any) {
    //     this.__listens.push({ type: type, cb: cb, target: target })
    //     if (this.state === 'enter') {
    //         eventCenter.on(type, cb, target)
    //     }
    // }

    // public removeListener(type: string) {
    //     const data = this.__listens.remove('type', type)
    //     if (data) {
    //         eventCenter.off(data.type, data.cb, data.target)
    //     }
    // }

    // public emit(type: string | number, ...params: any) {
    //     eventCenter.emit(type, ...params)
    // }

    // // 添加点击事件
    // public addClickEvent(path: string, cmptType: typeof cc.Component, handler: string, data?: string) {
    //     const cmpt = this.node.FindChild(path, cmptType)
    //     if (!cmpt) {
    //         return log.error(this.node.name + '.addClickEvent error! [' + path + '] not find!')
    //     }
    //     if (!this[handler] || typeof (this[handler]) !== 'function') {
    //         return log.error(handler + ' 没有找到对应的方法名 at=' + this['__classname__'])
    //     }
    //     const events = cmpt instanceof cc.ToggleContainer ? cmpt.checkEvents : cmpt['clickEvents']
    //     if (events) {
    //         events[0] = this.__newEventHandler(handler, data)
    //     } else {
    //         return log.error(handler + ' 没有对应的events at=' + this['__classname__'] + '/' + path)
    //     }
    // }

}
