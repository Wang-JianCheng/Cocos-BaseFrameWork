const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseView extends cc.Component {

    public state: string = 'none'
    private __listens: any[] = []// 监听列表

    // public __register(val?: string) {
    //     this.__listens.forEach(({ type, cb, target, tag }) => (!val || val === tag) && eventCenter.on(type, cb, target))
    // }

    // public __unregister(val?: string) {
    //     this.__listens.forEach(({ type, cb, target, tag }) => (!val || val === tag) && eventCenter.off(type, cb, target))
    // }

    // public __listenMaps() {
    //     this.__wrapListenMaps(this.listenEventMaps(), this.__listens, this)
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
