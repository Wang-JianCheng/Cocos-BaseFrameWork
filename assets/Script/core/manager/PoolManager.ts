import AssetsManager from "./AssetsManager";
const { ccclass, property } = cc._decorator;
@ccclass
export default class PoolManager extends cc.Component {
    // 当前实例 
    private static _instance: PoolManager;
    /**单例模式，用存取器get获取当前实例*/
    public static get Instance(): PoolManager {
        if (!this._instance) {
            this._instance = new PoolManager();
        }
        return this._instance;
    }
    private poolMap: Map<string, cc.NodePool> = new Map();

    public initPool() {

    }
    /**创建对象池
     * @param name  对象名称
     * @param num   对象池数量
     */
    public async createPool(name: string, num: number) {
        // let initNum = this.prefabArr[index].num;
        let nodePool = new cc.NodePool();
        let prefab = await AssetsManager.Instance.getPrefab(name);
        for (let i = 0; i < num; ++i) {
            let ins = cc.instantiate(prefab);
            nodePool.put(ins);
        }
        this.poolMap.set("name", nodePool);
        // this.allPoolArr.push(nodePool);//添加进对象池数组
        // console.log("初始化对象池完成,对象池个数", this.allPoolArr,this.allPoolArr.length);
    }
    /**销毁对象池
     * @param key 对象名称 
     */
    public destroyPool(key: string): void {
        let nodePool: cc.NodePool = this.poolMap.get(key);
        nodePool.clear();//清除对象池
        this.poolMap.delete(key);
    }
    start() {

    }
    /**
     * @index 该节点所用的预制资源在this.prefabArr数组中的下标,即属性面板中的次序(以0开始);
     * @example PoolManager.instance.getNode("demo");
     * */
    public async getNode(key: string) {
        let node: cc.Node = null;
        let nodePool: cc.NodePool = this.poolMap.get(key);
        let prefab = await AssetsManager.Instance.getPrefab(key);
        if (nodePool.size() > 0) {
            node = nodePool.get();
        }
        else {
            console.warn(prefab.name + "重新创建!!!");
            node = cc.instantiate(prefab);
        }
        // console.warn(node.name + "对象池数量:", nodePool.size());
        // return Promise.resolve(node) node;
        return Promise.resolve(node);
    }
    /**
     * @key 节点名称;
     * @node 需要回收的节点
     * @example PoolManager.instance.putNode("demo",node);
     * */
    public putNode(key: string, node: cc.Node): void {
        let nodePool: cc.NodePool = this.poolMap.get(key);
        nodePool.put(node);
        // console.log(node.name + "对象池数量:", nodePool.size());
    }
}
