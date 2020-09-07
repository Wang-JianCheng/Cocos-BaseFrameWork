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
    // public __enter(...params: any) {
    //     if (this.state !== 'enter') {
    //         this.state = 'enter'
    //         this.__register('enter')
    //     }
    //     this.onEnter(...params)
    // }

    // public __remove() {
    //     this.state = 'remove'
    //     this.__unregister('enter')
    //     this.onRemove()
    // }

    // public __clean() {
    //     this.state = 'clean'
    //     this.__unregister()
    //     this.onClean()
    // }
    public showAni(...callFuns: any[]) {
        let self = this;
        this.node.scale = 0.7;
        this.node.opacity = 0;
        let act0 = cc.fadeIn(0.3);
        let act1 = cc.scaleTo(0.3, 1).easing(cc.easeBackOut());
        let spa = cc.spawn(act0, act1)
        let finish = cc.callFunc(function () {
            for (let i in callFuns) {
                if (callFuns[i]) callFuns[i]();
            }
            self.node.scale = 1;
            self.node.opacity = 255;
            // self.addEvent();
        });

        let seq = cc.sequence(spa, finish);
        this.node.runAction(seq);
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
        // this.emit(CoreEventType.HIDE_PNL, this)
    }
}
