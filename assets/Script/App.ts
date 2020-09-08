import BaseUI from "../core/base/BaseUI";
import EventManager from "../core/manager/EventManager";
import { EventType } from "../Script/common/constant/EventType";

const { ccclass, property } = cc._decorator;

@ccclass
export default class App extends BaseUI {


    public EventList(): any[] {
        return [
            [EventType.UPDATE_DUCKLV, this.func2],
            [EventType.UPDATE_GOLD, this.func2]
        ]
    }
    start() {

        this.create();
        // console.error("aaaaaaa", EventManager.Instance.event)

        // this.__listenMaps();
        // this.__register();

        // this.label.string = this.text;
        // console.error("sssss", this.node, this['__classname__'])




        // var clickEventHandler = new cc.Component.EventHandler();
        // clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        // clickEventHandler.component = "App";// 这个是代码文件名
        // clickEventHandler.handler = "onClickLogin";
        // clickEventHandler.customEventData = "2";
        // var button = this.node.getChildByName("New Button").getComponent(cc.Button);
        // button.clickEvents.push(clickEventHandler);





        // this.BindUI();
        // this.__listenMaps();
        // this.__register();

        // // let temp = new cc.Node();
        // // temp.x = 0;
        // // cc.tween(temp).to(1, { x: 100 }, {
        // //     progress: (start, end, current, ratio) => {
        // //         console.error("startstart", start, end, current, ratio)

        // //         return start + (end - start) * ratio;
        // //     }
        // //     // }).call(() => { temp.destroy() }).start();
        // // }).start();

        // this.event = new cc.EventTarget();
        // this.event.on("change", this.func1, this);
        // this.event.on("tips", this.func2, this);

        // console.error("event", this.event, this.event.hasEventListener("change"));

        // let data: Map<string, number> = new Map();//Map数据结构
        // data.set("id", 1)
        // data.set("reward", 100)
        // console.error("data", data.size, data.get("id"), data.get("ids"), data.has("id"), data.has("name"))
        // // data.delete("id")
        // // data.clear()

    }
    private func1(data): void {
        console.error("func1", data);
    }
    private func2(): void { }
    private onClickLogin(event: cc.Event.EventTouch, data: string): void {
        // console.log("aaaaa", event, data)
        // EventManager.Instance.emit("change", 1)
        // this.event.removeAll("change")
        // this.event.off("change", this.func1, this)
        // console.error("event", this.event, this.event.hasEventListener("change"));
        // this.__unregister();
    }
}
