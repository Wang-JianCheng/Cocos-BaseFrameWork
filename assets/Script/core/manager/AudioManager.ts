import AssetsManager from "./AssetsManager";

const { ccclass, property } = cc._decorator;
interface cachesModule {
    url: string,
    audio: cc.Asset
}
@ccclass
export default class AudioManager extends cc.Component {
    // 当前实例 
    private static _instance: AudioManager;
    /**单例模式，用存取器get获取当前实例*/
    public static get Instance(): AudioManager {
        if (!this._instance) {
            this._instance = new AudioManager();
        }
        return this._instance;
    }
    private caches: Map<string, cc.AudioClip> = new Map();//音效资源缓存
    private curAudioId: number = -1;//当前背景音效 Id
    private curAudioName: string = "";//当前背景音效 名称

    private isBan: boolean = false;//当前游戏是否禁止播放音频

    /**初始化加载通用音效资源 */
    public async init() {
        let assets = await AssetsManager.Instance.loadDir("common/audio", cc.AudioClip);
        assets.forEach(element => this.caches.set("common/audio/" + element.name, element));
    }
    /**播放背景音乐等 */
    public async playMusic(url: string) {
        if (this.isBan) {
            return;
        }
        if (!url) {
            return;
        }
        if (url === this.curAudioName) {//当前音效已经在播放
            console.log(`${url}已经播放`);
            return;
        }
        this.stopBGM();
        let audio: cc.AudioClip = await this.getAudio(url);
        this.curAudioId = cc.audioEngine.play(audio, true, 1);
        this.curAudioName = url;
    }
    /**播放短音效 */
    public async playSound(url: string, loop: boolean = false, cb = null) {
        if (this.isBan) {
            return;
        }
        if (!url) {
            return;
        }
        let audio: cc.AudioClip = await this.getAudio(url);
        let audioId = cc.audioEngine.play(audio, loop, 1);
        if (cb && !loop) {//设置一个音频结束后的回调
            cc.audioEngine.setFinishCallback(audioId, cb);
        }
    }
    private async getAudio(url: string): Promise<any> {
        if (this.caches.has(url)) {
            return Promise.resolve(this.caches.get(url));
        } else {
            let asset = await AssetsManager.Instance.load(url, cc.AudioClip);
            this.caches.set(url, asset);
            return Promise.resolve(asset);
        }
    }
    public stopBGM() {
        if (this.curAudioId >= 0) {
            cc.audioEngine.stop(this.curAudioId);
            this.curAudioName = "";
            this.curAudioId = -1;
        }
    }
    public pauseAll() {
        cc.audioEngine.pauseAll();
    }

    public resumeAll() {
        cc.audioEngine.resumeAll();
    }

    public stopAll() {
        cc.audioEngine.stopAll();
        this.curAudioName = "";
        this.curAudioId = -1;
    }
    /**释放音效资源 
     * @param url 音效资源路径
     */
    public async releaseAudio(url: string) {
        if (this.caches.has(url)) {
            let audio: cc.AudioClip = this.caches.get(url);
            this.caches.delete(url);
            cc.assetManager.releaseAsset(audio);
        }
    }
    /**改变当前音效状态 */
    public changeStatus(): void {
        this.isBan = !this.isBan;
        if (this.isBan) {
            this.stopAll();
        } else {
            this.playMusic("common/audio/bgm");
        }
    }
}
