/**
 * 支付
 * Created by potato on 2017/4/28 0028.
 */
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { ToolDps } from '../ToolDps';
import { Msg, Tips, DataLoad, GetData } from "../Component/index";
import classNames from "classnames";
import { CSSTransitionGroup } from 'react-transition-group';
import UseFulPromotionCode from './component/UseFulPromotionCode';
import WxAuth from './component/WxAuth';
import BindTel from "./component/BindTel";


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsapiSigna: false, //js签名是否成功
            isGetUser: false,//用户信息是否查询完成
            contact: '',
        }
    }

    componentDidMount() {
        //jsapi签名
        WxAuth().then(() => {
            this.setState({
                jsapiSigna: true
            });
        });

        ToolDps.get('/wx/user/info').then((res) => {
            if (res.succ) {
                this.setState({
                    isGetUser: true,
                    contact: res.contact || ''
                });
            }
        });
    }

    render() {
        //loadMsg
        let { data, loadAnimation } = this.props.state;
        let main = data && data.succ && this.state.jsapiSigna && this.state.isGetUser ? <Pay data={data.data} contact={this.state.contact} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={''} />;
        return main
    }
}




// class Main extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loadAnimation: true,
//             loadMsg: '加载中...',
//             isQueryCoupons: false, //订单查询是否成功
//             data: null,
//             jsapiSigna: false //js签名是否成功
//         }

//     }
//     componentDidMount() {
//         let { orderId } = qs.parse(this.props.location.search);

//         //订单查询
//         ToolDps.get('/wx/order/queryCoupons', {
//             orderId: orderId
//         }).then((res) => {
//             if (res.succ) {
//                 this.setState({
//                     loadAnimation: true,
//                     loadMsg: '查询成功',
//                     isQueryCoupons: res.succ,
//                     data: res.data
//                 });
//             } else {
//                 this.setState({
//                     loadAnimation: false,
//                     loadMsg: '查询失败',
//                     isQueryCoupons: res.succ
//                 });
//             }

//         });

//         //jsapi签名
//         WxAuth().then(() => {
//             this.setState({
//                 jsapiSigna: true
//             });
//         });
//     }


//     render() {
//         let main = this.state.isQueryCoupons && this.state.jsapiSigna ? <Pay data={this.state.data} /> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />;
//         return main;
//     }
// }

class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidePromotionCode: props.data.showCoupons,//是否因此点击优惠劵位置
            isShowPromotionCode: false, //是否显示优惠券
            couponsId: '', //优惠卷id
            promotionPrice: '', //优惠价
            msgShow: false,
            msgText: '', //提示内容
            reqPay: false,//是否请求支付
            contact: props.contact || '',//联系方式
            isBingTelShow: false, //是否显示绑定手机窗口
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
        if (!this.state.contact) {
            this.setState({
                msgShow: true,
                msgText: '联系方式不能为空'//提示内容
            });
            return;
        }

        let data = {}
        data.orderId = this.props.data.orderId;
        if (this.state.couponsId) {
            data.couponsId = this.state.couponsId;
        }

        this.setState({
            reqPay: true
        });
        ToolDps.post('/wx/order/updateCoupons', data).then((res) => {
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
                        msgText: '支付成功'//提示内容
                    });

                    this._time = setTimeout(function () {
                        this.context.router.history.push('/orderDetail?orderId=' + this.props.data.orderId);
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
                    this._time = setTimeout(function () {
                        this.context.router.history.push('/orderDetail?orderId=' + this.props.data.orderId);
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


    /**
     * [selectPromotion 选择优惠卷]
     * @Author   potato
     * @DateTime 2017-06-05T13:33:54+0800
     * @param    {[type]}                 id    [优惠卷id]
     * @param    {[type]}                 price [优惠价]
     * @return   {[type]}                       [description]
     */
    selectPromotion(id, price) {
        this.setState({
            couponsId: id,
            isShowPromotionCode: false,
            promotionPrice: price
        })
    }

    render() {
        let {
            requiremntTypeName,
            price,
            coupons
        } = this.props.data;
        let payPrice = price;
        if (this.state.couponsId && this.state.promotionPrice) {
            payPrice = (Number(price) - Number(this.state.promotionPrice)).toFixed(2);
            if (payPrice == 0 || payPrice < 0) {
                payPrice = '0.00';
            }
        }

        return (
            <section className="full-page pay-page">
                <p className="service-type">服务类型：{requiremntTypeName}</p>
                <ul className="pay-money">
                    {
                        coupons.length > 0 && this.state.isHidePromotionCode ? (
                            <li className="promotionCode" onClick={() => { this.setState({ isShowPromotionCode: true }) }}>
                                使用优惠劵
                                {this.state.promotionPrice ? <span className="money">-&yen;{this.state.promotionPrice}</span> : null}
                                {this.state.promotionPrice ? <span className="used-one">（已用一张）</span> : null}
                                <span className="borrow"></span>
                            </li>
                        ) : null
                    }
                    <li onClick={() => { this.setState({ isBingTelShow: true }) }}>
                        <em>*</em>联系方式
                        <span className="money">{this.state.contact}</span>
                        <span className="borrow"></span>
                    </li>
                    <li>
                        需支付金额
                        <span className="money">&yen;{payPrice}</span>
                    </li>
                </ul>
                <ul className="flex-box to-pay">
                    <li>总计: <span className="num">&yen;{payPrice}</span></li>
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
                {this.state.isBingTelShow ? <BindTel close={(contact) => { this.setState({ isBingTelShow: false, contact: contact }) }} /> : null}
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
                {/*优惠码暂时隐藏*/}
                <CSSTransitionGroup transitionName="move" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {this.state.isShowPromotionCode ? <UseFulPromotionCode couponsId={this.state.couponsId} data={coupons} hide={() => { this.setState({ isShowPromotionCode: false }) }} selectPromotion={this.selectPromotion.bind(this)} /> : null}
                </CSSTransitionGroup>
            </section>
        )
    }
}


Pay.contextTypes = {
    router: PropTypes.object.isRequired
}


// export default Main;


export default GetData({
    id: 'PayOrder', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/order/queryCoupons',
    data: (props, state) => {
        let { orderId } = qs.parse(props.location.search);
        return {
            orderId: orderId
        }
    }, //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});