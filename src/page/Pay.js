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
        ToolDps.get('/wx/order/queryCoupons', {
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
        // ToolDps.get('/wx/user/getJsapiSigna', {
        //     url: encodeURIComponent(window.location.href.split('#')[0])
        // }).then((res) => {
        //     if (res.succ) {
        //         let {
        //             jsapiSignature
        //         } = res;
        //         wx.config({
        //             debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //             appId: jsapiSignature.appid, // 必填，公众号的唯一标识
        //             timestamp: jsapiSignature.timestamp, // 必填，生成签名的时间戳
        //             nonceStr: jsapiSignature.noncestr, // 必填，生成签名的随机串
        //             signature: jsapiSignature.signature, // 必填，签名，见附录1
        //             jsApiList: [
        //                 'checkJsApi',
        //                 'chooseWXPay'
        //             ] // 必填
        //         });



        //         this.setState({
        //             jsapiSigna: true
        //         });
        //     }
        // });


    }


    render() {
        let main = this.state.isQueryCoupons && this.state.jsapiSigna ? <Pay data={this.state.data} /> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />;
        return main;
    }
}

class Pay extends React.Component {
    constructor(props) {
        super(props);
        let {
            data,
            type
        } = this.props;
        this.state = {
            isShowPromotionCode: false, //是否显示优惠券
            couponsId: '', //优惠卷id
            promotionPrice: '', //优惠价
            msgShow: false,
            msgText: '', //提示内容
            tipsShow: false,
            userInfo: '', //是否填写过个人信息 0：没填 1：已经填写
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
        let data = {}
        data.orderId = this.props.data.orderId;
        if (this.state.couponsId) {
            data.couponsId = this.state.couponsId;
        }

        ToolDps.post('/wx/order/updateCoupons', data).then((res) => {
            if (res.succ) {
                this.setState({
                    userInfo: res.userInfo
                });

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
                        msgText: '支付成功', //提示内容
                        tipsShow: res.userInfo == "0"
                    });

                    this._time = setTimeout(function () {
                        this.context.router.history.push('/fashionMoment');
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
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    this.setState({
                        // msgShow: true,
                        // msgText: '支付成功啦！', //提示内容
                        tipsShow: this.state.userInfo == "0"
                    });
                    if (this.state.userInfo == "1") {
                        this._time = setTimeout(function () {
                            this.context.router.history.push('/fashionMoment');
                        }.bind(this), 1500);
                    }
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
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
            payPrice = Number(price) - Number(this.state.promotionPrice);
            if (payPrice == 0 || payPrice < 0) {
                payPrice = '0.00';
            }
        }

        return (
            <section className="full-page pay-page">
                <p className="service-type">服务类型：{requiremntTypeName}</p>
                <ul className="pay-money">
                    <li onClick={()=>{this.setState({isShowPromotionCode:true})}}>
                        使用优惠劵
                        <span className="money">-￥19</span>
                        <span className="used-one">（已用一张）</span>
                        <span className="borrow"></span>
                    </li>
                    <li>需支付金额
                        <span className="money">￥{payPrice}</span>
                    </li>
                </ul>
                <ul className="flex-box to-pay">
                    <li>总计: <span className="num">￥0.90</span></li>
                    <li>
                        <button className="btn pay-btn" onClick={this.pay.bind(this)}>确认支付</button>
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
                <Tips isShow={this.state.tipsShow} skipPath="/fashionMoment" perfectPath="/customSuit" hideTips={() => { this.setState({ tipsShow: false }) }} />
                {/*优惠码暂时隐藏*/}
                <CSSTransitionGroup transitionName="move" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {this.state.isShowPromotionCode ? <UseFulPromotionCode data={coupons} hide={()=>{this.setState({isShowPromotionCode:false})}}/> : null}

                </CSSTransitionGroup>
            </section>
        )
    }
}


Pay.contextTypes = {
    router: PropTypes.object.isRequired
}


export default Main;