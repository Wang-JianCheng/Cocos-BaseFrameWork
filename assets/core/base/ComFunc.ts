




const { ccclass, property } = cc._decorator;
const isConsole: boolean = true;//是否能打印
const gameName: string = "BallJump";//游戏名字
@ccclass
export default class ComFunc extends cc.Component {

    // start () {

    // }
    static log(...arg: any[]): void {
        if (!isConsole) return;
        console.log(...arg)
    }
    static error(...arg: any[]): void {
        if (!isConsole) return;
        console.error(...arg)
    }
    static warn(...arg: any[]): void {
        if (!isConsole) return;
        console.warn(...arg)
    }
    //缓存本地数据
    static setStorage(key: string, value: any) {
        cc.sys.localStorage.setItem(gameName + key, value);
    }
    //获取本地数据
    static getStorage(key: string): any {
        return cc.sys.localStorage.getItem(gameName + key);
    }
    //加载Json文件
    static loadJson(url: string, func: any) {
        cc.loader.loadRes(url, function (err, asset) {
            func(asset.json);
        })
    }
    /**动态加载resources目录下的图片
     * @param url 图片路径
     * @param node 图片节点
     */
    static loadImg(url: string, node: cc.Node): void {
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spr) {
            if (err) {
                ComFunc.error(err.message || err);
                return;
            }
            node.getComponent(cc.Sprite).spriteFrame = spr;
        }.bind(this));
    }
    /**加载远程资源和设备资源(绝对路径)
     * @param url 
     * @param img 
     */
    static loadRemoteImg(url: string, img: cc.Node, ): void {
        cc.loader.load(url, (err, texture) => {
            if (err) {
                ComFunc.error(err.message || err);
                return;
            }
            let spriteFrame = new cc.SpriteFrame(texture);
            let sprite: cc.Sprite = img.getComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
        });
    }
    /**
     * 获取倒计时时间格式
     * @param time 时间
     * @param type 1(00:00:00格式); 2(00:00格式)
     */
    static getTimeText(time: number, type: number): string {
        let hour: number | string = Math.floor(time / 3600);
        let minute: number | string = Math.floor((time / 60) % 60);
        let second: number | string = time % 60;

        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        // this.timeText.string = ;
        if (type === 1) {
            return `${hour}:${minute}:${second}`;
        } else {
            return `${minute}:${second}`;
        }
    }
    /**获取区间内的随机整数，左闭右开区间,包含左边不包含右边
     * @param min 
     * @param max 
     */
    static getRandom(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }




    //节点显示效果
    static showAct(node: cc.Node) {
        node.setScale(0.01);
        var seq = cc.spawn(
            cc.scaleTo(0.3, 1, 1).easing(cc.easeOut(3.0)),
            cc.fadeIn(0.3)
        );
        node.runAction(seq);
    }
    //通用提示
    static tipNode: cc.Node = null;
    static tips(str: string, imgId?: number): void {
        if (this.tipNode) {
            this.tipNode.destroy();
            this.tipNode = null;
        }
        let self = this;
        let url = "prefab/tips";
        if (imgId) {
            url = "prefab/tips2"
        }
        cc.loader.loadRes(url, function (err, prefab) {
            var newNode = cc.instantiate(prefab);
            if (imgId) {
                // newNode.getChildByName("img").getComponent(cc.Label).string = str;
                ComFunc.loadImg(`texture/tips/${imgId}`, newNode.getChildByName("img"));
            } else {
                newNode.getChildByName("text").getComponent(cc.Label).string = str;
            }
            cc.director.getScene().addChild(newNode);
            newNode.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
            self.tipNode = newNode;
            // let act1 = cc.delayTime(0.2);
            let act2 = cc.moveTo(0.6, cc.winSize.width / 2, cc.winSize.height / 2 + 100);

            let callFunc = cc.callFunc(() => {
                newNode.destroy()
                self.tipNode = null;
            }
            )
            let seq = cc.sequence(act2, callFunc);
            newNode.runAction(seq);
        });
    }
    static timestampToTime(timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        // let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        // let h = date.getHours() + ':';
        // let m = date.getMinutes() + ':';
        // let s = date.getSeconds();
        return Y + M + D;
        // return Y+M+D+h+m+s;
    }
    // /**
    //  * 获取数值单位，并返回显示数据
    //  * @param value 数值
    //  */
    // static getUnit(value: number): string {//数值单位万、亿、万亿,保留一位小数点
    //     let str: string = "";
    //     let unitNum = 1000;
    //     // let unitArr = ['', '万', '亿', '万亿'];
    //     let i: number;
    //     if (value < unitNum) {
    //         str = Math.round(value) + "";
    //     } else {
    //         i = Math.floor(Math.log(value) / Math.log(unitNum));
    //         // console.log("iii",i,Math.round( (value / Math.pow(unitNum, i))*10)/10)
    //         str = Math.round((value / Math.pow(unitNum, i)) * 10) / 10 + UnitConfig[i - 1].symbol
    //     }
    //     return str;
    // }

    // static adaptation(node: cc.Node, offset?: number) {
    //     // childName = childName || "total";
    //     // var total = node.getChildByName(childName);
    //     if (!node) {
    //         console.error("找不到total节点！！!");
    //         return;
    //     }
    //     node.opacity = 0;
    //     //ui适配
    //     this.adAdaptation(node, offset);
    //     //弹窗动画
    //     var delayTime = cc.delayTime(0.1);
    //     var callFunc = cc.callFunc(function (target, offset) {
    //         node.setScale(0.1);
    //         node.opacity = 255;
    //     });
    //     var scale = cc.scaleTo(0.5, 1, 1).easing(cc.easeBackOut());
    //     node.runAction(cc.sequence(delayTime, callFunc, scale));
    // }
    // /**底部ui适配, node为要适配的节点，上面必须挂载Widget组件，offset可选，距离底部的偏移量，默认0  
    //  * 返回Y方向上的偏移量
    // */
    // static adAdaptation(node: cc.Node, offset) {
    //     if (cc.sys.platform === cc.sys.WECHAT_GAME) {
    //         //记录初始Y坐标
    //         // var initY = node.y;
    //         if (offset == undefined) {
    //             offset = 0;
    //         }
    //         var bottom = 0;
    //         //x额外提升
    //         var extra = 0;
    //         var getSystemInfoSync = wx.getSystemInfoSync();
    //         var windowWidth = getSystemInfoSync.windowWidth;
    //         //缩放比例
    //         var rate = 750 / windowWidth;
    //         if (getSystemInfoSync.model.indexOf("iPhone X") > -1 || getSystemInfoSync.model.indexOf("unknown") > -1 || getSystemInfoSync.model.indexOf("iPhone XS") > -1) {
    //             console.warn("iPhone X系列");
    //             extra = 20;
    //         } else {
    //             extra = 0;
    //         }
    //         bottom = (windowWidth * 0.35 + extra) * rate + offset + 30;
    //         node.getComponent(cc.Widget).bottom = bottom;
    //         node.getComponent(cc.Widget).updateAlignment();
    //         // var endY = node.y;
    //         // return endY - initY;
    //     }
    // }


    // static createNode<T>(prefab: cc.Prefab, parentNode: cc.Node, script?: T, ...data: any): cc.Node {
    //     let node: cc.Node = cc.instantiate(prefab);
    //     parentNode.addChild(node);
    //     // console.log("script",script,node.getComponent(script),...data);
    //     if (script) {
    //         node.getComponent(script).init(...data);
    //     }
    //     return node;
    // }
    /**加载预制资源到场景中
     * @param preUrl 预制节点资源路径
     * @param callFunc 初始化函数事件
     * @param parentNode 父节点,不填的话默认添加到场景下
     */
    static loadPrefab(preUrl: string, callFunc?: any, parentNode?: cc.Node): void {
        cc.loader.loadRes(`${preUrl}`, function (err, prefab) {
            let newNode = cc.instantiate(prefab);
            if (callFunc) {
                callFunc(newNode);
            }

            if (parentNode) {
                parentNode.addChild(newNode);
            } else {
                cc.director.getScene().addChild(newNode);
                // newNode.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
            }

        });
    }
    static switchVideo(e, type: string, node: cc.Node): void {
        let flag: boolean = false;
        if (type === "1") {//显示观看视频按钮
            flag = true;
        };
        node.getChildByName("video_select").getChildByName("select").getChildByName("select").getChildByName("icon").active = flag;
        node.getChildByName("video_select").getChildByName("videoBtn").active = flag;
        node.getChildByName("video_select").getChildByName("getBtn").active = !flag;
    }



    static rotateAct(node: cc.Node): void {
        let act = cc.rotateBy(6, 360);
        let callFunc = cc.callFunc(() => {
            node.angle = 0;
        })
        node.runAction(cc.repeatForever(cc.sequence(act, callFunc)));
    }
    static scaleAct(node: cc.Node): void {
        let act1 = cc.scaleTo(0.5, 1.1);
        let act2 = cc.scaleTo(0.5, 1);
        let callFunc = cc.callFunc(() => {
            node.angle = 0;
        })
        node.runAction(cc.repeatForever(cc.sequence(act1, act2)));
    }
}
