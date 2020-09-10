import EventManager from "../manager/EventManager";
import ComFunc from "./ComFunc";

const { ccclass, property } = cc._decorator;

const CmptTypeVal = {
    Node: { type: cc.Node },
    Lbl: { type: cc.Label },
    Spr: { type: cc.Sprite },
    Btn: { type: cc.Button },
    Tge: { type: cc.Toggle },
    Ani: { type: cc.Animation },
    Sv: { type: cc.ScrollView }
};


@ccclass
export default class BaseUI extends cc.Component {
    private listens: any[] = []// 监听列表
    constructor() {
        super();
    }
    /**当前注册监听事件集合  string:监听事件名称; Function:响应函数 */
    public EventList(): [string, Function][] {
        return [];
    }
    public create(): void {
        this.BindNodes(this.node.children);
    }
    onEnable() {
        this.addListener();
    }
    onDisable() {
        this.removeListener();
    }
    /**注册监听事件 */
    private addListener(): void {
        let arr = this.EventList();
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            let data = { key: '', cb: null };
            data.key = element[0];
            data.cb = element[1];
            EventManager.Instance.on(data.key, data.cb, this);
            this.listens.push(data);
        }
    }
    /**移除监听事件 */
    private removeListener(): void {
        this.listens.forEach(({ key, cb }) => EventManager.Instance.off(key, cb, this))
    }
    /**绑定声明的属性变量   button按钮绑定对应的响应事件*/
    private BindNodes(children: cc.Node[]): void {
        children.forEach(node => {
            let arr = node.name.split('_');
            // console.error("arr", arr)
            if (arr.length >= 2 && !!arr[0]) {
                let cmptType = arr[0];
                let cmptName = arr[1];
                if (this[cmptName] !== undefined) {
                    if (cmptType === "Node") {
                        this[cmptName] = node;
                    } else {
                        const cmpt = node.getComponent(CmptTypeVal[cmptType].type)
                        // console.log("aaaaaaa", cmptType, CmptTypeVal[cmptType])
                        if (cmpt) {
                            this[cmptName] = cmpt;

                        } else {
                            cc.error(cmptName + ' 没有对应的组件 at=' + this['__classname__'])
                        }
                    }
                    // console.log("存在", this[cmptName])
                } else {
                    // console.log("不存在", this[cmptName])

                }

                if (cmptType === "Btn") {
                    let data = !!arr[2] ? arr[2] : " ";
                    const cmpt = node.getComponent(CmptTypeVal[cmptType].type)
                    if (cmpt) {
                        this.addClickEvent(cmptName, cmpt, data);
                    } else {
                        cc.error(cmptName + ' 没有对应的组件 at=' + this['__classname__'])
                    }

                }
                // nodeArr.push(node);
            }
            if (node.children.length > 0) {
                this.BindNodes(node.children)
            }
        });
    }
    public init(): void {

    }
    onLoad() {
    }
    onDestroy() {

    }
    // 添加点击事件
    private addClickEvent(name: string, cmpt: cc.Component, data: string) {
        // console.error("addClickEvent", name, cmpt, data)
        const funcName = 'onClick' + ComFunc.initialUpperCase(name)
        if (this[funcName] && typeof (this[funcName]) === 'function') {
            const events = this.getEvents(cmpt)
            if (events) {
                events[0] = this.newEventHandler(funcName, data)
            } else {
                cc.error(funcName + ' 没有对应的events at=' + this['__classname__'] + '.' + name)
            }
        } else {
            cc.error(funcName + ' 没有找到对应的方法名 at=' + this['__classname__'] + '.' + name)
        }
    }
    private getEvents(cmpt: cc.Component) {
        if (cmpt instanceof cc.Toggle || cmpt instanceof cc.ToggleContainer) {
            return cmpt.checkEvents;
        } else if (cmpt instanceof cc.Button) {
            return cmpt.clickEvents;
        }
        return null
    }
    private newEventHandler(funcName: string, data: string) {
        const eventHandler = new cc.Component.EventHandler()
        eventHandler.target = this.node
        eventHandler.component = this['__classname__']
        eventHandler.handler = funcName
        eventHandler.customEventData = data || ''
        return eventHandler;
    }
}
