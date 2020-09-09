const { ccclass, property } = cc._decorator;

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
    private PermAudio;
    /**播放背景音乐 */
    public playBgm(): void {

    }
    /**播放短音效 */
    public playSound(): void {

    }
}
