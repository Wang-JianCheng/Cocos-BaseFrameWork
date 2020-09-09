/**
 * 使用方法：将脚本挂在任意节点上(建议挂在canvas节点上)，输入你要生成节点池的个数，拉取对应的预制，输入初始化数量，节点池就完成了
 * 提示：把节点放回节点池的时候，不会自动把节点恢复到初始状态，所以，应该先自己对节点进行“恢复出厂”操作，然后放回节点池
 */
const { ccclass, property } = cc._decorator;
@ccclass("Pool")
export class Pool {
    @property({
        type: cc.Prefab,
        tooltip: "用来生成节点池的预制体",
    })
    prefab: cc.Prefab = null;
    @property({
        type: cc.Integer,
        tooltip: "初始化节点池的预制数量, 大于0的整数",
    })
    num: number = 1;
}
@ccclass
export default class PoolManager extends cc.Component {
    static instance: PoolManager = null;

    @property({
        type: [Pool],
        tooltip: "输入要生成的节点池的个数",
    })
    prefabArr: Pool[] = [];
    // LIFE-CYCLE CALLBACKS:
    private allPoolArr: cc.NodePool[] = [];
    private poolArr: Map<string, cc.NodePool[]> = new Map();
    onLoad() {
        PoolManager.instance = this;

        for (let i = 0; i < this.prefabArr.length; i++) {
            if (this.prefabArr[i].prefab === null) {
                console.error("缺少预制体!!!");
            } else {
                this.creatPool(i);
            }
        }
    }
    //创建节点池
    private creatPool(index: number): void {
        let initNum = this.prefabArr[index].num;
        let nodePool = new cc.NodePool();
        let prefab = this.prefabArr[index].prefab;
        for (let i = 0; i < initNum; ++i) {
            let ins = cc.instantiate(prefab);
            nodePool.put(ins);
        }
        this.allPoolArr.push(nodePool);//添加进节点池数组
        // console.log("初始化节点池完成,节点池个数", this.allPoolArr,this.allPoolArr.length);
    }
    start() {

    }
    /**
     * @index 该节点所用的预制资源在this.prefabArr数组中的下标,即属性面板中的次序(以0开始);
     * @example PoolManager.instance.getNode(0);
     * */
    public getNode(index: number): cc.Node {
        let node: cc.Node = null;
        let nodePool: cc.NodePool = this.allPoolArr[index];
        let prefab = this.prefabArr[index].prefab;
        if (nodePool.size() > 0) {
            node = nodePool.get();
        }
        else {
            console.warn(prefab.name + "重新创建!!!");
            node = cc.instantiate(prefab);
        }
        // console.warn(node.name + "节点池数量:", nodePool.size());
        return node;
    }
    /**
     * @index 该节点所用的预制资源在this.prefabArr数组中的下标,即属性面板中的次序(以0开始);
     * @node 需要回收的节点
     * @example PoolManager.instance.putNode(0,node);
     * */
    public putNode(index: number, node: cc.Node): void {
        let nodePool: cc.NodePool = this.allPoolArr[index];
        nodePool.put(node);
        // console.log(node.name + "节点池数量:", nodePool.size());
    }
    //此脚本摧毁的时候回自动销毁所有节点池
    onDestroy() {
        for (let i = 0; i < this.allPoolArr.length; i++) {
            this.allPoolArr[i].clear();
        }
    }
    // update (dt) {}
}
