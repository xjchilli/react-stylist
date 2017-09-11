/**
 * 分享配置
 */

import { ToolDps } from '../../ToolDps';


function WxAuth() {
    let url = location.href.split('#')[0];
    if (ToolDps.isWKWebview) {//用于区别ios android
        url = ToolDps.sessionItem('authUrl');
    }
    return new Promise(function (resolve, reject) {
        ToolDps.get('/wx/user/getJsapiSigna', {
            url: encodeURIComponent(url)
        }).then((res) => {
            if (res.succ) {
                let { jsapiSignature } = res;
                // console.log(jsapiSignature);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: jsapiSignature.appid, // 必填，公众号的唯一标识
                    timestamp: jsapiSignature.timestamp, // 必填，生成签名的时间戳
                    nonceStr: jsapiSignature.noncestr, // 必填，生成签名的随机串
                    signature: jsapiSignature.signature, // 必填，签名，见附录1
                    jsApiList: [
                        'onMenuShareTimeline',//分享到朋友圈
                        'onMenuShareAppMessage',//分享给朋友
                        'chooseWXPay'
                    ] // 必填
                });
                wx.ready(function () {
                 
                });

                wx.error(function (res) {
                    // alert(JSON.stringify(res));
                    // window.location.reload();
                });


                resolve(true);
            } else {
                reject(false);
            }
        }).catch(() => {
            // alert('获取jsapi签名配置失败');
        });

    });

}

export default WxAuth;