/**
 * 支付
 * Created by potato on 2017/4/28 0028.
 */
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { ToolDps } from '../ToolDps';
import { Msg, Tips, DataLoad } from "../Component/index";
import classNames from "classnames";
import { CSSTransitionGroup } from 'react-transition-group';
import UseFulPromotionCode from './component/UseFulPromotionCode';
import WxAuth from './component/WxAuth';




class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadAnimation: true,
            loadMsg: '加载中...',
            isQueryCoupons: false, //订单查询是否成功
            data: null,
            jsapiSigna: false //js签名是否成功
        }

    }
    componentDidMount() {
        let { orderId } = qs.parse(this.props.location.search);

        //订单查询
        ToolDps.post('/wx/active/queryOrder', {
            orderId: orderId
        }).then((res) => {
            if (res.succ) {
                this.setState({
                    loadAnimation: true,
                    loadMsg: '查询成功',
                    isQueryCoupons: res.succ,
                    data: res.data
                });
            } else {
                this.setState({
                    loadAnimation: false,
                    loadMsg: '查询失败',
                    isQueryCoupons: res.succ
                });
            }

        });

        //jsapi签名
        WxAuth().then(() => {
            this.setState({
                jsapiSigna: true
            });
        });
    }


    render() {
        let main = this.state.isQueryCoupons && this.state.jsapiSigna ? <PayActivity data={this.state.data} /> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />;
        return main;
    }
}

class PayActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            reqPay: false,//是否请求支付
        }
        this._time = 0;
    }

    componentDidMount() {
        document.title = "支付";
    }

    componentWillUnmount() {
        clearTimeout(this._time);
    }

    /**
     * 支付
     */
    pay() {
        this.setState({
            reqPay: true
        });
        ToolDps.post('/wx/active/getPayInfo', { orderId: this.props.data.orderId }).then((res) => {
            this.setState({
                reqPay: false
            });
            if (res.succ) {
                if (res.goPay === "1") {
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady.bind(this, res.payInfo), false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady.bind(this, res.payInfo));
                            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady.bind(this, res.payInfo));
                        }
                    } else {
                        this.onBridgeReady(res.payInfo);
                    }
                } else {
                    this.setState({
                        msgShow: true,
                        msgText: '报名成功'//提示内容
                    });

                    this._time = setTimeout(function () {
                        this.context.router.history.push('/');
                    }.bind(this), 1500);
                }
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '获取支付签名失败', //提示内容
                });
            }

        });



    }

    onBridgeReady(signatureInfo) {
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
                    this.setState({
                        msgShow: true,
                        msgText: '报名成功'//提示内容
                    });
                    this._time = setTimeout(function () {
                        this.context.router.history.push('/');
                    }.bind(this), 1500);
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {//支付取消
                    this.setState({
                        isHidePromotionCode: false
                    });
                }
                else if (res.err_msg == "get_brand_wcpay_request:fail") {//支付失败
                    this.setState({
                        msgShow: true,
                        msgText: '支付失败', //提示内容
                    });
                }
            }
        );
    }


    render() {
        let {
            typeName,
            price,
            coupons
        } = this.props.data;

        return (
            <section className="full-page pay-page">
                <p className="service-type">服务类型：{typeName}</p>
                <ul className="flex-box to-pay">
                    <li>总计: <span className="num">&yen;{price}</span></li>
                    <li>
                        <button className="btn pay-btn" onClick={this.state.reqPay ? null : this.pay.bind(this)}>确认支付</button>
                    </li>
                </ul>
                <h6 className="text-center service-note-title">服务须知</h6>
                <ul className="pay-note-content">
                    <ol>1.需求发布并支付后，匹配到的搭配师将抢单并服务用户</ol>
                    <ol>2.线下订单：离线下服务的约定时间超过48小时可以无责取消，若在48小时内取消则收取服务费用20%的违约金</ol>
                    <ol>3.线上订单:未被抢单可以取消，若搭配师已抢单，并进行相关服务，则概不退款</ol>
                    <ol>4.若对服务不满意或产生纠纷，请联系客服邮箱aaron@dapeis.com 工作日 10:00~18:00</ol>
                </ul>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}


PayActivity.contextTypes = {
    router: PropTypes.object.isRequired
}


export default Main;