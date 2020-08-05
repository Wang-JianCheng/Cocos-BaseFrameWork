const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello 王建程 是的撒';

    start () {
        // init logic
        this.label.string = this.text;
    }
}
