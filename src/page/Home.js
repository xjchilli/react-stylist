import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router-dom';
import {
    ToolDps
} from '../ToolDps';


class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {


        /*ToolDps.get('/wx/user/getJsapiSigna', {
            url: encodeURIComponent(location.href.split('#')[0])
        }).then((res) => {
            if (res.succ) {
                let {
                    jsapiSignature
                } = res;
                // console.log(jsapiSignature);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: jsapiSignature.appid, // 必填，公众号的唯一标识
                    timestamp: jsapiSignature.timestamp, // 必填，生成签名的时间戳
                    nonceStr: jsapiSignature.noncestr, // 必填，生成签名的随机串
                    signature: jsapiSignature.signature, // 必填，签名，见附录1
                    jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone',
                            'scanQRCode'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                    wx.onMenuShareAppMessage({
                        title: '搭配师', // 分享标题
                        desc: '嗨', // 分享描述
                        link: 'http://potato.ngrok.joinclub.cn/assets/img/category/boy-body.png', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://img.dapeis.com/resources/garderobe/20170502145440926992.jpg', // 分享图标
                        success: function() {
                            // 用户确认分享后执行的回调函数
                            alert('ok');
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                            alert('cancel');
                        }
                    });

                    wx.onMenuShareQQ({
                        title: '搭配师', // 分享标题
                        desc: '嗨', // 分享描述
                        link: 'http://potato.ngrok.joinclub.cn/assets/img/category/boy-body.png', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://img.dapeis.com/resources/garderobe/20170502145440926992.jpg', // 分享图标
                        success: function() {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });



                });



            }
        });*/
    }

    test() {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                alert(JSON.stringify(result));
            }
        });
    }

    render() {

        return (
            <div style={{fontSize:'18px'}}>
                <Link to="/profile">个人信息</Link>
                <br/>
                <Link to="/needMatch">我要搭配</Link>
                <br/>
                <Link to="/myDps">我的搭配师</Link>
                <br/>
                <Link to="/customSuit">搭配测试</Link>
                <br/>
                <Link to="/wardrobeList">我的衣橱</Link>
                <br/>
                <Link to="/orderList">我的订单</Link>
                <br/>
                <Link to="/fashionMoment">我的时尚圈</Link>
                <br/>
        <Link to="/promotionCode">优惠码</Link>
                {/*<button onClick={this.test.bind(this)}>扫码</button>*/}
            </div>
        );
    }
}


export default Home;