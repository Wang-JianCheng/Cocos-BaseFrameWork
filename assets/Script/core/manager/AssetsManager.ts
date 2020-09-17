
interface JsonModule {
    data: any,
    getById(id: string | number): any;
}
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

    private audioCache: Map<string, cc.AudioClip> = new Map(); //音效资源缓存
    private prefabCache: Map<string, cc.Prefab> = new Map(); //预制资源缓存
    private atlasCache: Map<string, cc.SpriteAtlas> = new Map();; //图集资源缓存
    private jsonCache: Map<string, JsonModule> = new Map();; //json资源缓存
    private imageCache: Map<string, cc.SpriteFrame> = new Map();; //image资源缓存
    // onLoad () {}

    start() {

    }
    /**初始化加载通用资源 */
    public async init() {
        await this.initAudio();
        await this.initJson();
        await this.initImage();
        await this.initPrefab();
        // await AudioManager.Instance.init();
    }
    public async initJson() {
        let assets = await AssetsManager.loadDir("common/audio", cc.AudioClip);
        assets.forEach(element => this.audioCache.set(element.name, element));
    }
    public async initAudio() {
        let assets = await AssetsManager.loadDir("common/audio", cc.JsonAsset);
        assets.forEach(element => {
            this.jsonCache.set(element.name, {
                data: element.json,
                getById(id: string | number) {
                    id = Number(id);
                    return this.datas.find(m => m.id === id);
                }
            });
        })
    }
    public async initImage() {
        let assets = await AssetsManager.loadDir("common/prefab", cc.AudioClip);
        assets.forEach(element => this.prefabCache.set(element.name, element));
    }
    public async initPrefab() {
        let assets = await AssetsManager.loadDir("common/prefab", cc.AudioClip);
        assets.forEach(element => this.prefabCache.set(element.name, element));
    }

    public async getAudio(key: string): Promise<any> {
        if (this.audioCache.has(key)) {
            return Promise.resolve(this.audioCache.get(key));
        } else {
            let asset = await AssetsManager.load("audio/" + key, cc.AudioClip);
            this.audioCache.set(key, asset);
            return Promise.resolve(asset);
        }
    }
    /**释放音效资源 
     * @param key 音效资源名称
     */
    public async releaseAudio(key: string) {
        if (this.audioCache.has(key)) {
            let audio: cc.AudioClip = this.audioCache.get(key);
            this.audioCache.delete(key);
            cc.assetManager.releaseAsset(audio);
        }
    }
    /**获取配置数据
     * @param key 名称
     */
    public getJsonData(key: string): any {
        return this.jsonCache.get(key).data;
    }
    /**获取某一配置数据中具体一项数据
     * @param key 文件名称
     * @param id id
     */
    public getJsonById(key: string, id: string | number): any {
        const jsonData = this.jsonCache.get(key);
        return jsonData && jsonData.getById(id);
    }

    /**
     * 加载目标文件夹中的所有资源
     * @param url resources下文件夹路径
     * @param type 加载的资源类型，若没有则加载该目录下所有资源
     * @param onProgess 函数 回调参数 finish(当前已加载资源数量): number, total(资源总数量,不是固定,会随着解析变大,进度条功能可用变量做缓冲，判断当前加载量/总量是否大于缓冲值,然后赋值): number
     * @param onComplete 
     */
    static async loadDir(url: string, type: typeof cc.Asset, onProgess?: any): Promise<any[]> {
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
    static async load(url: string, type: typeof cc.Asset, onProgess?: any): Promise<any> {
        return new Promise(resolve => {
            cc.resources.load(url, type, onProgess, (err, asset) => {
                if (err) {
                    cc.error(`load ${url} error`, err);
                    resolve(null);
                } else {
                    resolve(asset);
                }
                // console.log("onComplete", err, asset)
            });
        })
    }
    /**动态加载resources目录下图片
     * @param url 地址
     * @param spriteNode sprite组件或者所在node节点 
     */
    static loadImg(url: string, spriteNode: cc.Sprite | cc.Node): void {
        this.load(url, cc.SpriteFrame).then(spriteFrame => {
            if (spriteNode instanceof cc.Sprite) {
                spriteNode.spriteFrame = spriteFrame;
            } else {
                spriteNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        })
    }
    public loadJson(): void { }


    // update (dt) {}
}
