import { EventType } from "./common/config/EventType";
import BaseUI from "./core/base/BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class App extends BaseUI {
    //@autocode property begin
    private new: cc.Node = null;
    private text: cc.Label = null;
    private icon: cc.Sprite = null;
    private confBtn: cc.Button = null;
    //@end

    //事件监听
    public EventList(): any[] {
        return [
            [EventType.UPDATE_DUCKLV, this.func1],
            [EventType.UPDATE_GOLD, this.func2]
        ]
    }
    start() {
        this.create();
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
    // ----------------------------------------- button listener function -------------------------------------------
    private onClickLogin(event: cc.Event.EventTouch, data: string): void {
        // console.log("aaaaa", event, data)
        this.text.string = "Login"
    }
    private onClickConfBtn(event: cc.Event.EventTouch, data: string): void {
        // console.log("onClickconfBtn", event, data)
        this.text.string = "onClickconfBtn";
    }
    // ----------------------------------------- event listener function --------------------------------------------

    // ----------------------------------------- custom function ----------------------------------------------------
}
