import ComFunc from "../base/ComFunc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlatformAPI extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    private static _instance: PlatformAPI = null;
    // public static getInstance(): PlatformAPI{
    public static get instance(): PlatformAPI {
        if (this._instance === null) {
            this._instance = new PlatformAPI();
        }
        return this._instance;
    }

    public platform: any = null;//对应平台
    public platform_name: string = "";
    private tt_recorder: any = null;
    // onLoad() { }
    /** 构造时 判断平台*/
    constructor() {
        super();
        /** */
        // if (cc.sys.platform === cc.sys.WECHAT_GAME) {//微信、QQ、字节跳动platform一样,所以不能用平台号区别三者，否则会出错误
        //     try {
        //         if (qq) {
        //             ComFunc.error("try QQ平台");
        //             this.platform = qq;
        //             this.platform_name = "qq";
        //         }
        //     } catch (error) {
        //         try {
        //             if (tt) {
        //                 ComFunc.error("catch 字节跳动平台")
        //                 this.platform = tt;
        //                 this.platform_name = "tt";
        //                 // this.initRecorder();
        //                 let app_name = tt.getSystemInfoSync().appName;
        //                 // ComFunc.log("BannerManager app_name: ", app_name);
        //             }
        //         } catch (error) {
        //             ComFunc.error("catch catch 微信平台")
        //             this.platform = wx;
        //             this.platform_name = "wx";
        //         }
        //     }
        // } else if (cc.sys.platform === cc.sys.OPPO_GAME) {
        //     this.platform = qg
        //     this.platform_name = "oppo";
        // } else if (cc.sys.platform === cc.sys.VIVO_GAME) {
        //     this.platform = qg;
        //     this.platform_name = "vivo";
        // } else {
        //     ComFunc.error("浏览器")
        //     this.platform = null;
        //     this.platform_name = "browser";
        // }
    }

    start() {

    }
    // private initRecorder(): void {
    //     this.tt_recorder = this.platform.getGameRecorderManager();//获取录屏管理器
    //     this.tt_recorder.onStart(res => {
    //         console.log('录屏开始');
    //         this.isEnd = false;
    //         this.showTip = false;
    //     });
    //     this.tt_recorder.onStop(res => {
    //         console.log('录屏结束');
    //         console.log(res.videoPath);
    //         if (!this.showTip) {
    //             ComFunc.tips(`录屏结束`);
    //         }
    //         Game.instance.hideVideo();
    //         this.isEnd = true;
    //         this.videoPath = res.videoPath;
    //     })
    //     this.tt_recorder.onError(err => {
    //         console.log(err);
    //     })
    // }
    // public startVideo(): void {
    //     if (this.recorder) {
    //         this.recorder.start({
    //             duration: 15,
    //         })
    //     }
    // }
    // public stopVideo(): void {
    //     if (this.recorder && !this.isEnd) {
    //         this.showTip = true;
    //         this.recorder.stop();
    //     }
    // }
    // public shareVideo(): void {
    //     if (this.showTip) {
    //         ComFunc.tips(`录屏时间不足`);
    //         return;
    //     }
    //     if (this.recorder) {
    //         tt.shareAppMessage({
    //             channel: "video",
    //             title: "民航大亨",
    //             // desc: "",
    //             // imageUrl: "",
    //             // templateId: "", // 替换成通过审核的分享ID
    //             // query: "",
    //             extra: {
    //                 videoPath: this.videoPath, // 可替换成录屏得到的视频地址
    //                 // videoTopics: ["话题1", "话题2"]
    //             },
    //             success(res) {
    //                 console.log("分享视频成功", res);
    //             },
    //             fail(e) {
    //                 console.log("分享视频失败", e);
    //             }
    //         })
    //     }
    // }
    public showMoreGame(): void {
        if (this.platform_name === "tt") {
            /**打包头条的包时，在开发者工具中game.json中添加对应的跳转id
             "ttNavigateToMiniGameAppIdList": [
                    "ttfd108bad623a9fd0",
                    "ttf66780da694d8a28",
                    "tt2d335b8eb2194f88",
                    "tt565620ebc97c2a03"
                ],
             */
            const systemInfo = this.platform.getSystemInfoSync();
            // iOS 不支持，建议先检测再使用
            if (systemInfo.platform !== "ios") {
                // 打开互跳弹窗
                this.platform.showMoreGamesModal({
                    appLaunchOptions: [
                        {
                            appId: "tt764c00f1e966026a",
                            query: "",
                            extraData: {}
                        },
                        {
                            appId: "ttf66780da694d8a28",
                            query: "",
                            extraData: {}
                        },
                        {
                            appId: "tt2d335b8eb2194f88",
                            query: "",
                            extraData: {}
                        },
                        {
                            appId: "tt764c00f1e966026a",
                            query: "",
                            extraData: {}
                        },
                    ],
                    success(res) {
                        ComFunc.log("success", res.errMsg);
                    },
                    fail(res) {
                        ComFunc.log("fail", res.errMsg);
                    }
                });
            } else {
                this.showModal("提示", "ios系统暂不支持此功能", false)
            }
        }
    };
    /**开启右上角转发 */
    public showShareMenu(): void {
        if (this.platform_name === "wx" || this.platform_name === "qq" || this.platform_name === "tt") {
            this.platform.showShareMenu({
                withShareTicket: true
            })
            // this.platform.onShareAppMessage(() => {
            //     let msg = ShareConfig[ComFunc.getRandom(0, ShareConfig.length)];
            //     return {
            //         title: msg.text,
            //         imageUrl: msg.url,
            //         query: "",
            //         success(res) {
            //             ComFunc.log("首页右上角转发 成功")
            //         },
            //         fail(res) {
            //             ComFunc.log("首页右上角转发 失败")
            //         },
            //         complete: function (res) {
            //             // ComFunc.log("首页右上角转发");
            //         }
            //     }
            // })
        }
    };

    /**分享
     * @param successFunc 分享成功回调
     * @param failFunc 分享失败回调
     */
    public share(successFunc?: any, failFunc?: any): void {
        if (this.platform.shareAppMessage) {
            // let msg = ShareConfig[ComFunc.getRandom(0, ShareConfig.length)];
            // this.platform.shareAppMessage({
            //     title: msg.text,    //转发标题，不传则默认使用当前小游戏的昵称。
            //     imageUrl: msg.url,  //图片链接，网络路径或本地文件路径
            //     query: "",
            //     success: function (res) {
            //         console.log("分享成功:", res)
            //     },
            //     fail: function (res) {
            //         console.log("分享失败:", res)
            //     },
            //     complete: function (res) {
            //         // console.log("shareAppMessage", res);
            //     }
            // })
        }
    }
    /**振动接口 
     * @param type 1：短时振动；2：较长时间震动； 
     */
    public shake(type: number = 1): void {
        if (this.platform_name !== "browser") {
            if (type === 1 && this.platform.vibrateShort) {
                this.platform.vibrateShort();//短振动
            } else if (type === 2 && this.platform.vibrateLong) {
                this.platform.vibrateLong();//长振动
            } else { }
        }
    }
    /**
     * 设置开放数据域排行榜数据
     * @param keyType 数据的 key
     * @param num     数据的值
     */
    public setRankData(keyType: string, num: number): void {
        if (this.platform.setUserCloudStorage) {
            this.platform.setUserCloudStorage({
                KVDataList: [{ key: keyType, value: "" + num }],
                success: function (res) {
                    // console.error('setUserCloudStorage', 'success', res);
                    // if(isEnd){
                    //     self.getFriendData(true);
                    // }
                },
                fail: function (res) {
                    // console.error('setUserCloudStorage', 'fail', res)
                    // if(isEnd){
                    //     self.getFriendData(true);
                    // }
                },
            });
        }
    }
    /**跳转到其他小程序 */
    public toOtherGame(index: number, failFunc?: any) {
        // console.log("msg",OtherGameConfig[index]);
        // if (this.platform_name === "wx") {
        //     let msg: OtherGameModule = OtherGameConfig[index];
        //     let that = this;
        //     this.platform.navigateToMiniProgram({
        //         appId: msg.appid,
        //         path: 'page/index/index' + msg.path,
        //         extraData: {},
        //         envVersion: 'release',
        //         success(res) {
        //             //阿拉丁统计跳转数据
        //             // that.aldCount(msg.game_name);
        //         },
        //         fail(res) {
        //             // 打开失败
        //             // console.log("跳转失败:", res);
        //             if (failFunc) {
        //                 failFunc();
        //             }
        //         }
        //     })
        // }
    }
    /**显示模态弹窗
     * @param title 标题
     * @param content 提示的内容
     * @param showCancel 是否显示取消按钮
     * @param confirmFunc 确认的回调函数
     * @param cancelFunc 取消的回调函数
     */
    public showModal(title: string, content: string, showCancel: boolean, confirmFunc?: any, cancelFunc?: any): void {
        if (this.platform.showModal) {
            this.platform.showModal({
                title: title,
                content: content,
                showCancel: showCancel,
                success(res) {
                    if (res.confirm) {
                        ComFunc.log('用户点击确定');
                        if (confirmFunc) {
                            confirmFunc();
                        }
                    } else if (res.cancel) {
                        ComFunc.log('用户点击取消');
                        if (cancelFunc) {
                            cancelFunc();
                        }
                    }
                },
                fail(res) {
                    ComFunc.log(`showModal调用失败`);
                }
            })
        }
    }
    /** 触发垃圾回收*/
    public clear(): void {
        if (this.platform.triggerGC) {
            this.platform.triggerGC();
        };
    };
    // update (dt) {}
}
