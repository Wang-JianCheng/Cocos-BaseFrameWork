const { ccclass, property } = cc._decorator;

@ccclass
export default class MusicManager extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    // 懒汉模式，需要时才创建对象实例
    private static _instance: MusicManager = null;
    // public static getInstance(): MusicManager{
    public static get instance(): MusicManager {
        if (this._instance === null) {
            this._instance = new MusicManager();
        }
        return this._instance;
    }
    /**当前是否禁止播放音乐 */
    public status: boolean = false;//是否禁止播放音效

    public bgmStatus: boolean = false;//是否禁止播放背景音乐
    /**当前持续播放的音效(类似bgm)的播放id集合 */
    private audioArr: [string, number][] = [];
    // onLoad () {}
    /**是否震动 */
    public shakeStatus: boolean = false;

    start() {

    }
    /**
     * 
     * @param str 音频名称
     * @param isLoop 是否循环播放,默认不循环
     * @param voice 音量大小(0 ~ 1),默认值为1
     * @example MusicManager.instance.play("click")
     */
    public play(str: string, isLoop: boolean = false, voice: number = 0.5): void {
        if (this.status) {
            return;
        }
        let url = `sound/${str}`;
        cc.loader.loadRes(url, cc.AudioClip, (err, audio) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            cc.audioEngine.play(audio, isLoop, voice);
        });
    }
    public playMusic(str: string, isLoop: boolean = true, voice: number = 0.3): void {
        // if (this.status) {
        //     return;
        // }
        if (this.bgmStatus) {
            return;
        }
        let url = `sound/${str}`;
        cc.loader.loadRes(url, cc.AudioClip, (err, audio) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            let audioId = cc.audioEngine.playMusic(audio, isLoop);
            // let audioId = cc.audioEngine.play(audio, isLoop, voice);
            this.audioArr.push([url, audioId]);
        });
    }
    /**停止某个音乐 */
    public stopAudio(str) {
        if (!this.status) {
            return;
        }
        let url = `sound/${str}`;
        for (var i = 0; i < this.audioArr.length; i++) {
            if (url == this.audioArr[i][0]) {
                cc.audioEngine.stop(this.audioArr[i][1]);
            }
        }
    }
    /**停止全部音乐 */
    public stopAllMusic(): void {
        for (var i = 0; i < this.audioArr.length; i++) {
            cc.audioEngine.stop(this.audioArr[i][1]);
        }
    }
    /**音乐播放或暂停 */
    public changeStatus(): void {
        this.status = !this.status;
        // console.log("")
        if (this.status) {
            // this.stopAllMusic();
            this.stopAudio("bgm");
        } else {
            this.playMusic("bgm");
        }
    }
    public setMusicStatus(flag: boolean): void {
        this.status = flag;
    }
    public setBgmStatus(flag: boolean): void {
        // console.log("flag",flag)
        this.bgmStatus = flag;
        if (this.bgmStatus) {
            this.stopAllMusic();
            // this.stopAudio("bgm");
        } else {
            this.playMusic("bgm");
        }
    }
    //
    public changeShakeStatus(flag: boolean): void {
        this.shakeStatus = flag;
    }
    // update (dt) {}
}
