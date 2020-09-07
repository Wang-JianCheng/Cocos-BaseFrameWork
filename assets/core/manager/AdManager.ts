
import PlatformAPI from "../base/PlatformAPI";
import ComFunc from "../base/ComFunc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdManager extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    private static _instance: AdManager = null;
    // public static getInstance(): AdManager{
    public static get instance(): AdManager {
        if (this._instance === null) {
            this._instance = new AdManager();
        }
        return this._instance;
    }
    private platform: any = null;//对应平台
    private platform_name: string = "";
    private bannerAd: any = null;
    private videoAd: any = null;
    private callBack: any = null;//激励视频回调函数
    private banner_timestamp: number = 0;
    private banner_id = {
        "wx": "",
        "qq": "",
        "tt": "",
        "oppo": "",
        "vivo": "",
    };
    private rewardedVideo_id = {
        "wx": "",
        "qq": "",
        "tt": "",
        "oppo": "",
        "vivo": "",
    };
    private interstitial_id = {
        "wx": "",
        "qq": "",
        "tt": "",
        "oppo": "",
        "vivo": "",
    };
    private appBox_id = {
        "qq": ""
    }

    // onLoad () {}

    start() {

    }
    /**
     *
     */
    constructor() {
        // constructor(namne:string) {
        super();
        this.platform = PlatformAPI.instance.platform;
        this.platform_name = PlatformAPI.instance.platform_name;
    }
    public init(): void {
        if (this.platform_name === "browser") {
            return;
        }
        this.initBannerAd();
        this.initVideoAd();
    }
    /**
     * 初始化Banner广告
     */
    private initBannerAd(): void {
        if (this.bannerAd) {
            ComFunc.log('销毁bannerAd')
            this.bannerAd.destroy();
            this.bannerAd = null;
            this.banner_timestamp = 0;
        }
        if (this.platform_name === "vivo") {
            //vivo平台接口不一样，特殊处理，style内无需设置任何字段，banner会在屏幕底部居中显示，没有style字段，banner会在上边显示
            this.bannerAd = this.platform.createBannerAd({
                posId: this.banner_id[this.platform_name],
                style: {}
            });
            this.bannerAd.onClose(res => {
                // console.log('banner 广告关闭', res);
                this.bannerAd.destroy();
                this.bannerAd = null;
            });
        } else {
            //初始化Banner
            let Info = this.platform.getSystemInfoSync();
            this.bannerAd = this.platform.createBannerAd({
                adUnitId: this.banner_id[this.platform_name],
                style: {
                    left: 0,
                    top: 0,
                    width: 300
                    // width: Info.width
                }
            });
            this.bannerAd.onResize((size) => {
                const {
                    windowWidth,
                    windowHeight
                } = this.platform.getSystemInfoSync();

                this.bannerAd.style.top = windowHeight - size.height;
                this.bannerAd.style.left = (windowWidth - size.width) / 2;
            });
        }
        this.bannerAd.onError(() => {
            ComFunc.log('加载BannerAd失败');
            this.bannerAd.destroy();
            this.bannerAd = null;
        })

    }
    /**
     * 显示Banner广告
     * @param {*} isShow 默认显示
     */
    public showBannerAd(isShow: boolean = true): void {
        if (this.platform_name === "browser") {
            return;
        }
        if (!this.bannerAd) {
            this.initBannerAd();
        }
        let timestamp = new Date().getTime();
        if (isShow) {
            if (!this.bannerAd) return;
            this.bannerAd.show().then(() => {
                console.log("banner广告展示成功");
            }).catch(err => {
                console.log("banner广告展示失败", err);
            })
        } else {
            if (this.banner_timestamp === 0) {
                this.banner_timestamp = timestamp;
            }
            //大于30秒，重新初始化Banner
            if (timestamp - this.banner_timestamp > 1000 * 30) {
                ComFunc.log('重新生成banner');
                this.initBannerAd();
            } else {
                if (!this.bannerAd) return;
                this.bannerAd.hide().then(() => {
                    console.log("banner广告隐藏成功");
                }).catch(err => {
                    console.log("banner广告隐藏失败", err);
                });
            }
        }
    }
    /**显示插屏广告 */
    public showInterstitialAd(): void {
        if (this.platform.createInterstitialAd) { //有些小游戏平台或者手机版本可能不支持插屏接口，需判断
            let interstitialAd: any = null;
            if (this.platform_name === "vivo") {
                interstitialAd = this.platform.createInterstitialAd({
                    posId: this.interstitial_id[this.platform_name]
                });
            } else {
                interstitialAd = this.platform.createInterstitialAd({
                    adUnitId: this.interstitial_id[this.platform_name]
                });
            }
            interstitialAd.show().then(() => {//vivo小游戏平台插屏广告没有load方法
                console.log('插屏 广告加载 显示成功');
            }).catch(err => {
                console.log('插屏 广告加载 显示失败', err);
                if (interstitialAd.destroy) {//vivo小游戏插屏广告没有destroy方法
                    interstitialAd.destroy();
                }
            })
            interstitialAd.onClose(res => {
                ComFunc.log('插屏 广告关闭', res);
                if (interstitialAd.destroy) {//vivo小游戏插屏广告没有destroy方法
                    interstitialAd.destroy();
                };
            });
            // let interstitialAd = this.platform.createInterstitialAd({
            //     adUnitId: this.interstitial_id[this.platform_name]
            // });
            // interstitialAd.load().then(() => {
            //     interstitialAd.show().then(() => {
            //         ComFunc.log('插屏广告 显示成功');
            //     }).catch(err => {
            //         ComFunc.log("插屏广告 显示失败:", err);
            //         if (interstitialAd.destroy) {//vivo小游戏插屏广告没有destroy方法
            //             interstitialAd.destroy();
            //         };
            //     });
            // }).catch(err => {
            //     ComFunc.log("插屏 广告加载失败:", err);
            //     if (interstitialAd.destroy) {//vivo小游戏插屏广告没有destroy方法
            //         interstitialAd.destroy();
            //     };
            // });
            // interstitialAd.onError(err => {
            //     ComFunc.log("插屏 广告加载失败:", err);
            //     interstitialAd.destroy();
            // })

        }
    }
    /**初始化视频广告*/
    private initVideoAd() {
        if (this.platform.createRewardedVideoAd) {
            if (this.platform_name === "vivo") {
                this.videoAd = this.platform.createRewardedVideoAd({
                    posId: this.rewardedVideo_id[this.platform_name]
                });
            } else {
                this.videoAd = this.platform.createRewardedVideoAd({
                    adUnitId: this.rewardedVideo_id[this.platform_name]
                });
            }

            // this.videoAd.onError((res) => {
            //     // console.log('激励视频加载失败', res);
            //     this.videoAd.destroy();
            //     this.videoAd = null;
            // });
            this.videoAd.onClose((res) => {
                if (res && res.isEnded) {
                    this.callBack();
                    this.callBack = null;
                } else {
                    ComFunc.tips("只有观看完整视频才能获得奖励~");
                }
                if (this.platform_name === "vivo") {
                    // MusicManage.instance.setBgmStatus(false);//vivo小游戏进入视频不会关闭声音,需要关闭,之后再打开
                }
            });
        }
    }
    /**显示激励视频
     * @param callBack 视频看完回调函数
     */
    public showRewardedVideoAd(callBack: any): void {
        callBack();
        return;
        if (this.platform_name === "browser") {
            callBack();
        } else {
            if (this.platform.createRewardedVideoAd) {
                if (!this.videoAd) {
                    this.initVideoAd();
                }
                this.videoAd.load().then(() => {
                    this.videoAd.show().then(() => {
                        if (this.platform_name === "vivo") {
                            // MusicManager.instance.setBgmStatus(true);//vivo小游戏进入视频不会关闭声音,需要关闭,之后再打开
                        }
                        this.callBack = callBack;
                        ComFunc.log('激励视频 显示成功');
                    }).catch(err => {
                        ComFunc.log("激励视频 显示失败:", err);
                        ComFunc.tips(`视频拉取失败，请稍后再试！`)
                        this.videoAd.destroy();
                        this.videoAd = null;
                    });


                    // this.videoAd.show();
                    // this.callBack = callBack;
                    // ComFunc.log('激励视频 加载成功');
                }).catch(err => {
                    ComFunc.log("激励视频 加载失败:", err);
                    ComFunc.tips(`视频拉取失败，请稍后再试！`)
                    this.videoAd.destroy();
                    this.videoAd = null;
                });
            }
        }
    }
    /**显示盒子广告 */
    public showAppBoxAd(): void {
        if (this.platform_name === "qq" && this.platform.createAppBox) {
            let appBoxAd = this.platform.createAppBox({
                adUnitId: this.appBox_id[this.platform_name]
            });
            appBoxAd.load().then(() => {
                appBoxAd.show()
                appBoxAd.show().then(() => {
                    ComFunc.log('盒子广告 显示成功');
                }).catch(err => {
                    ComFunc.log("盒子广告 显示失败:", err);
                    appBoxAd.destroy();
                });
            }).catch(err => {
                ComFunc.log("盒子广告 加载失败:", err);
                appBoxAd.destroy();
            });
            appBoxAd.onClose(() => {
                ComFunc.log("盒子广告 关闭");
                appBoxAd.destroy();
            });
        }
    }
}
