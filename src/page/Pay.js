/**
 * 支付
 * Created by potato on 2017/4/28 0028.
 */
import React, {
    Component
} from 'react';
import {
    ToolDps
} from '../ToolDps';
import {
    DataLoad
} from '../Component/index';
import {
    Msg,
    Tips
} from "../Component/index";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadAnimation: true,
            loadMsg: '加载中...',
            type: '', //服务类型
            data: null,
            price: '0.00', //价格
            jsapiSigna: false //js签名是否成功
        }

    }
    componentDidMount() {
        let {
            location
        } = this.props;
        let {
            orderId,
            type
        } = location.query;

        ToolDps.post('/wx/order/getUnified', {
            orderId: orderId
        }).then((res) => {
            if (res.succ) {
                this.setState({
                    loadAnimation: false,
                    loadMsg: '加载成功',
                    type: type,
                    data: res.payInfo,
                    price: res.price
                })
            } else {
                this.setState({
                    loadAnimation: false,
                    loadMsg: '加载失败',
                })
            }

        });

        ToolDps.get('/wx/user/getJsapiSigna', {
            url: encodeURIComponent(window.location.href.split('#')[0])
        }).then((res) => {
            if (res.succ) {
                let {
                    jsapiSignature
                } = res;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: jsapiSignature.appid, // 必填，公众号的唯一标识
                    timestamp: jsapiSignature.timestamp, // 必填，生成签名的时间戳
                    nonceStr: jsapiSignature.noncestr, // 必填，生成签名的随机串
                    signature: jsapiSignature.signature, // 必填，签名，见附录1
                    jsApiList: [
                            'checkJsApi',
                            'chooseWXPay'
                        ] // 必填
                });



                this.setState({
                    jsapiSigna: true
                });
            }
        });


    }


    render() {
        let main = this.state.data && this.state.jsapiSigna ? <Pay type={this.state.type} data={this.state.data} price={this.state.price}/> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />;
        return (
            <div className="full-page">
                {main}
            </div>
        )
    }
}

class Pay extends Component {
    constructor(props) {
        super(props);
        let {
            data,
            type
        } = this.props;
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            type: type || '', //服务类型
            tipsShow: false, //是否显示tips
            appId: data.appId || '',
            callback_url: data.callback_url || '',
            nonceStr: data.nonceStr || '', //支付签名随机串
            package: data.package || '', //统一支付接口返回的prepay_id参数值
            paySign: data.paySign || '', //paySign
            signType: data.signType || '', //签名方式
            status: data.status || '',
            timeStamp: data.timeStamp || '' //支付签名时间戳
        }

    }

    componentDidMount() {
        document.title = "支付";
    }

    /**
     * 支付
     */
    pay() {

        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
        } else {
            this.onBridgeReady();
        }


    }

    onBridgeReady() {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": this.state.appId, //公众号名称，由商户传入
                "timeStamp": this.state.timeStamp, //时间戳，自1970年以来的秒数
                "nonceStr": this.state.nonceStr, //随机串
                "package": this.state.package,
                "signType": this.state.signType, //微信签名方式：
                "paySign": this.state.paySign //微信签名
            },
            (res) => {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    this.setState({
                        tipsShow: true,
                        msgShow: true,
                        msgText: '支付成功啦！', //提示内容
                    });
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                    this.setState({
                        msgShow: true,
                        msgText: '支付失败', //提示内容
                    });
                }
            }
        );
    }

    render() {
        let serviceType = '';
        if (this.props.type === "1") {
            serviceType = '咨询';
        } else if (this.props.type === "2") {
            serviceType = '购物';
        } else if (this.props.type === "3") {
            serviceType = '陪逛';
        } else if (this.props.type === "4") {
            serviceType = '整理';
        }


        return (
            <section className="full-page">
                <section className="pay-msg">
                    <div className="header">
                        <div className="item">付款金额</div>
                        <div className="item">
                            <strong>￥<span>{this.props.price}</span></strong>
                        </div>
                    </div>
                    <div className="content">
                        <div className="ground">
                            <label>服务类型</label><span>{serviceType}服务</span>
                        </div>
                    </div>
                </section>
                <button className="btn pay-btn" onClick={this.pay.bind(this)}>确认支付</button>
                <h6 className="service-note-title">服务须知</h6>
                <ul className="pay-note-content">
                    <ol>1.需求发布并支付后，匹配到的搭配师将抢单并服务用户</ol>
                    <ol>2.线下订单：离线下服务的约定时间超过48小时可以无责取消，若在48小时内取消则收取服务费用20%的违约金</ol>
                    <ol>3.线上订单:未被抢单可以取消，若搭配师已抢单，并进行相关服务，则概不退款</ol>
                    <ol>4.若对服务不满意或产生纠纷，请联系客服邮箱aaron@dapeis.com 工作日 10:00~18:00</ol>
                </ul>
                {this.state.msgShow ? <Msg  msgShow={()=>{this.setState({msgShow:false})}} text={this.state.msgText}/> : null}
                <Tips isShow={this.state.tipsShow}  skipPath="/fashionMoment" perfectPath="/customSuit" hideTips={()=>{this.setState({tipsShow:false})}}/>
            </section>
        )
    }
}



export default Main;