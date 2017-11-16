/**
 * 摇一摇插件
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.shake = factory());
}(this, (function () {

    let shake = function (cb) {
        //设置临界值,这个值可根据自己的需求进行设定，默认就3000也差不多了
        var shakeThreshold = 3000;
        //设置最后更新时间，用于对比
        var lastUpdate = 0;
        //设置位置速率
        var curShakeX = 0,
            curShakeY = 0,
            curShakeZ = 0,
            lastShakeX = 0,
            lastShakeY = 0,
            lastShakeZ = 0;
        let deviceMotionHandler = (event) => {
            //获得重力加速
            var acceleration = event.accelerationIncludingGravity;
            //获得当前时间戳
            var curTime = new Date().getTime();
            if ((curTime - lastUpdate) > 100) {
                //时间差
                var diffTime = curTime - lastUpdate;
                lastUpdate = curTime;
                //x轴加速度
                curShakeX = acceleration.x;
                //y轴加速度
                curShakeY = acceleration.y;
                //z轴加速度
                curShakeZ = acceleration.z;
                var speed = Math.abs(curShakeX + curShakeY + curShakeZ - lastShakeX - lastShakeY - lastShakeZ) / diffTime * 10000;
                lastShakeX = curShakeX;
                lastShakeY = curShakeY;
                lastShakeZ = curShakeZ;
                if (speed > shakeThreshold) {
                    cb();
                }
            }
        }

        return {
            //增加设备摇一摇功能
            add: function () {
                //先判断设备是否支持HTML5摇一摇功能
                if (window.DeviceMotionEvent) {
                    //获取移动速度，得到device移动时相对之前某个时间的差值比
                    window.addEventListener('devicemotion', deviceMotionHandler);
                } else {
                    alert('您好，你目前所用的设备好像不支持重力感应哦！');
                }
            },
            //移除设备摇一摇功能
            remove: function () {
                window.removeEventListener('devicemotion', deviceMotionHandler);
            }
        }
    }

    return shake;
})));