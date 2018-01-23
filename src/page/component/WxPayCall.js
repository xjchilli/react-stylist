/**
 * 微信支付调用
 */

function onBridgeReady(signatureInfo,cb) {
    try {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": signatureInfo.appId, //公众号名称，由商户传入
                "timeStamp": signatureInfo.timeStamp, //时间戳，自1970年以来的秒数
                "nonceStr": signatureInfo.nonceStr, //随机串
                "package": signatureInfo.package,
                "signType": signatureInfo.signType, //微信签名方式：
                "paySign": signatureInfo.paySign //微信签名
            },
            (res) => {
                if (res.err_msg == "get_brand_wcpay_request:ok") {//支付成功
                    cb({
                        type: 1//1：支付成 2：支付取消 3：支付失败 
                    });
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {//支付取消
                    cb({
                        type: 2//1：支付成 2：支付取消 3：支付失败 
                    });
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {//支付失败
                    cb({
                        type: 3//1：支付成 2：支付取消 3：支付失败 
                    });
                }
            }
        );
    } catch (error) {
        // console.log(error);

    }
}

function WxPayCall(payInfo,cb) {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady(payInfo,cb), false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady(payInfo,cb));
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(payInfo,cb));
        }
    } else {
        onBridgeReady(payInfo,cb);
    }



}

export default WxPayCall;