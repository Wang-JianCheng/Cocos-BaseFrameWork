import BaseUI from "../core/base/BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class App extends BaseUI {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello 王建程';

    public aaa: number = 0;

    start() {
        
        // this.label.string = this.text;
        // console.error("sssss", this.node, this['__classname__'])

        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "App";// 这个是代码文件名
        clickEventHandler.handler = "onClickLogin";
        clickEventHandler.customEventData = "2";

        var button = this.node.getChildByName("New Button").getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
        this.BindUI();
        this.__register();

        // let temp = new cc.Node();
        // temp.x = 0;
        // cc.tween(temp).to(1, { x: 100 }, {
        //     progress: (start, end, current, ratio) => {
        //         console.error("startstart", start, end, current, ratio)

        //         return start + (end - start) * ratio;
        //     }
        //     // }).call(() => { temp.destroy() }).start();
        // }).start();
    }
    private onClickLogin(event: cc.Event.EventTouch, data: string): void {
        console.log("aaaaa", event, data)
    }
}
