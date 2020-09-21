export interface UserModule {
    score:number,
    coin:number,
    ballNum:number,
}
export interface BallConfigModule {
    id:number,
    score:number,//积分
    rate:number,//选中概率
}
export interface AwardConfigModule {
    id:number,
    name:string,
    rate:number,//概率
}