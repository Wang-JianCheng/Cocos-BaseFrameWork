import PlatformAPI from "../base/PlatformAPI";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BasePanel extends cc.Component {

    public key: string = " ";//模块名
    public url: string = " ";//地址
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    public async create() {
        await this.onCreate();
    }
    public __enter(...params: any) {
        if (this.state !== 'enter') {
            this.state = 'enter'
            this.__register('enter')
        }
        this.onEnter(...params)
    }

    public __remove() {
        this.state = 'remove'
        this.__unregister('enter')
        this.onRemove()
    }

    public __clean() {
        this.state = 'clean'
        this.__unregister()
        this.onClean()
    }

    public async onCreate() {
    }

    public onEnter(...params: any) {
    }

    public onRemove() {
    }

    public onClean() {
    }

    public hide() {
        this.emit(CoreEventType.HIDE_PNL, this)
    }
}
