import AudioManager from "./AudioManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AssetsManager extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    // 当前实例 
    private static _instance: AssetsManager;
    /**单例模式，用存取器get获取当前实例*/
    public static get Instance(): AssetsManager {
        if (!this._instance) {
            this._instance = new AssetsManager();
        }
        return this._instance;
    }

    private atlas;//图集
    // onLoad () {}

    start() {

    }
    /**初始化加载通用资源 */
    public async init() {
        await AudioManager.Instance.init();
    }
    /**
     * 加载目标文件夹中的所有资源
     * @param url resources下文件夹路径
     * @param type 加载的资源类型，若没有则加载该目录下所有资源
     * @param onProgess 函数 回调参数 finish(当前已加载资源数量): number, total(资源总数量,不是固定,会随着解析变大,进度条功能可用变量做缓冲，判断当前加载量/总量是否大于缓冲值,然后赋值): number
     * @param onComplete 
     */
    public async loadDir(url: string, type: typeof cc.Asset, onProgess?: any): Promise<any[]> {
        // const { url, type, use, onProgess } = this.makeLoadResArgs(params);
        return new Promise(resolve => {
            cc.resources.loadDir(url, type, onProgess, (err, asset) => {
                if (err) {
                    cc.error(`loadDir ${url} error`, err);
                    resolve([]);
                } else {
                    resolve(asset);
                }
                // console.log("onComplete", err, asset)
            });
        })
    }
    public async load(url: string, type: typeof cc.Asset, onProgess?: any): Promise<any> {
        return new Promise(resolve => {
            cc.resources.load(url, type, onProgess, (err, asset) => {
                if (err) {
                    cc.error(`load ${url} error`, err);
                    resolve([]);
                } else {
                    resolve(asset);
                }
                // console.log("onComplete", err, asset)
            });
        })
    }
    // update (dt) {}
}
