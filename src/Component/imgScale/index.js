/**
 * 移动端图片手指缩放
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.imgScale = factory());
}(this, (function () {
    let imgScale = function (arg) {

        let action = {
            init: function (arg) {
                // console.log(arg);
                this.options = {
                    ele: arg.ele,//图片元素
                    ctEle: arg.ctEle,//图片容器元素
                    touchNum: 0,//手指数量
                    oneStartX: 0,//开始坐标x
                    oneStartY: 0,//开始坐标y
                    oneEndX: 0,//结束坐标x
                    oneEndY: 0,//结束坐标y
                    oneDistance: 0,//第一次2个手机距离
                    twoStartX: 0,//开始坐标x
                    twoStartY: 0,//开始坐标y
                    twoEndX: 0,//结束坐标x
                    twoEndY: 0,//结束坐标y
                    twoDistance: 0,//第二次2个手机距离
                    rate: 1,//比例
                    startListen: arg.startListen || function () { },//实时监听函数
                    moveListen: arg.moveListen || function () { },//实时监听函数
                    endListen: arg.endListen || function () { },//实时监听函数
                };
                this.move = this.move.bind(this);
                this.options.ele.addEventListener('touchstart', (e) => {
                    // console.log(e.touches.length);
                    this.options.startListen(e);
                    this.options.touchNum = e.touches.length;
                    if (this.options.touchNum > 1) {
                        this.options.oneStartX = e.touches[0].pageX;
                        this.options.oneStartY = e.touches[0].pageY;
                        this.options.twoStartX = e.touches[1].pageX;
                        this.options.twoStartY = e.touches[1].pageY;
                        this.options.oneDistance = Math.sqrt(Math.pow(this.options.twoStartX - this.options.oneStartX, 2) + Math.pow(this.options.twoStartY - this.options.oneStartY, 2));
                    }
                    this.options.ele.addEventListener('touchmove', this.move);//move 
                });

                this.options.ele.addEventListener('touchend', (e) => {
                    this.options.endListen(e);
                    this.options.ele.removeEventListener('touchmove', this.move);
                });
            },
            move: function (e) {//移动
                this.options.moveListen(e);
                if (this.options.touchNum > 1) {
                    this.options.oneStartX = e.touches[0].pageX;
                    this.options.oneStartY = e.touches[0].pageY;
                    this.options.twoStartX = e.touches[1].pageX;
                    this.options.twoStartY = e.touches[1].pageY;
                    this.options.twoDistance = Math.sqrt(Math.pow(this.options.twoStartX - this.options.oneStartX, 2) + Math.pow(this.options.twoStartY - this.options.oneStartY, 2));
                    this.options.rate = this.options.twoDistance / this.options.oneDistance > 1 ? this.options.twoDistance / this.options.oneDistance : 1;
                    this.options.ele.style.width = this.options.ele.width * this.options.rate + 'px';
                    this.options.ele.style.height = this.options.ele.height * this.options.rate + 'px';
                    // this.options.oneDistance = this.options.twoDistance;
                    console.log(this.options.rate, this.options.ele.style.width, this.options.ele.style.height);
                }
            }

        }

        action.init(arg);


    }

    return imgScale;
})));