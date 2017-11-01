/**
 * 去打赏
 * usage:
 * 
 */
import React, { Component } from 'react';
import { ToolDps } from '../../ToolDps';
import { Msg } from "../index";




class ToReward extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                headImg: '',//头像
                nickName: '',//昵称
            },
            isInput: false,//是否是自己输入金额
            isRandom: false,//是否是随机金额
            url: this.props.url,//打赏url
            id: this.props.id,//订单id、时尚圈id
            msgShow: false,
            msgText: '', //提示内容
            showMoney: '', //显示的金额
            inputMony: '',//输入的金额
            jsapiSigna: false, //jsapi是否签名
            moneyArr: ['0.88', '1.68', '1.88', '2.22', '2.33', '2.68', '2.88', '3.33', '3.88', '4.22', '4.44', '5.55', '6.66', '7.11', '8.88', '9.99', '11.11', '12.12', '13.13', '23.33', '66.66', '88.88']//随机的金额
        }
    }

    componentDidMount() {
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

        //查询个人信息
        ToolDps.get('/wx/user/info').then((data) => {
            if (data.succ) {
                this.setState({
                    user: {
                        headImg: data.headImg,//头像
                        nickName: data.nickName,//昵称
                    },
                    isRandom: true
                });
            }
        });

        this.randomMoney();

    }

    /**
     * 打赏金额
     */
    rewardMoney(e) {
        let val = e.target.value.trim();
        let patt = /\.$/gi;
        if (val != "" && val.match(patt) && val.match(patt).length == 1) {
            this.setState({
                inputMony: val
            });
        }
        if (val != "" && !ToolDps.reg.price(val)) {
            return;
        }
        this.setState({
            inputMony: val//输入的金额
        });

    }

    /**
     * 确定打赏
     */
    toPay() {
        if (!this.state.jsapiSigna) {
            this.setState({
                msgShow: true,
                msgText: 'weixin-js未签名', //提示内容
            });
            return;
        }
        let rewardMoney = '';
        if (this.state.isInput) {
            rewardMoney = this.state.inputMony;
        } else {
            rewardMoney = this.state.showMoney;
        }
        if (rewardMoney == "") {
            this.setState({
                msgShow: true,
                msgText: '请输入打赏金额', //提示内容
            });
            return
        };
        if (Number(rewardMoney.trim()) <= 0) return;
        ToolDps.post(this.state.url, {
            money: rewardMoney.trim(),
            id: this.state.id
        }).then((res) => {
            // console.log(res)
            if (res.succ) {
                this.pay(res.payInfo);
            }

        });

    }

    /**
     * 支付
     */
    pay(payInfo) {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady.bind(this, payInfo), false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady.bind(this, payInfo));
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady.bind(this, payInfo));
            }
        } else {
            this.onBridgeReady(payInfo);
        }


    }

    onBridgeReady(payInfo) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": payInfo.appId, //公众号名称，由商户传入
                "timeStamp": payInfo.timeStamp, //时间戳，自1970年以来的秒数
                "nonceStr": payInfo.nonceStr, //随机串
                "package": payInfo.package,
                "signType": payInfo.signType, //微信签名方式：
                "paySign": payInfo.paySign //微信签名
            },
            (res) => {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    this.props.rewardCallback();
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
     * 切换打赏模式
     */
    switchMod() {
        if (!this.state.isInput) {
            this.num.focus();
        }
        this.setState({
            isInput: !this.state.isInput,
            isRandom: !this.state.isRandom
        })
    }

    /**
     * 随机金额
     */
    randomMoney() {
        let num = Math.ceil(Math.random() * this.state.moneyArr.length);
        if (num == this.state.moneyArr.length) {
            num--;
        }
        this.setState({
            showMoney: this.state.moneyArr[num]
        });
    }

    /**
     * 隐藏打赏窗口
     */
    hide(e){
        e.preventDefault();
        this.props.hideToReward()
    }

    render() {
        return (
            <section className="reward-money-area" >
                <div className="info-area">
                    <img src={this.state.user.headImg} className='headImg' alt="" />
                    <p className='text-center nickName'>{this.state.user.nickName}</p>
                    <div className={this.state.isInput ? "input-group active" : "input-group"}>
                        <label htmlFor="num">
                            ￥
                        </label>
                        <input id="num" ref={input => this.num = input} type="number" min={0.01} placeholder="输入打赏金额" value={this.state.inputMony} onChange={this.rewardMoney.bind(this)} />
                    </div>
                    <div className={this.state.isRandom ? "text-center random-money active" : "text-center random-money"}>
                        <span>￥</span>
                        <strong>{this.state.showMoney}</strong>
                    </div>

                    <p className="text-center other-money-btn">
                        <span onClick={this.switchMod.bind(this)}>{this.state.isInput ? '取消' : '其他金额'}</span>
                    </p>
                    <div className="text-center action-area">
                        <button className="btn" onClick={this.toPay.bind(this)}>打赏</button>
                    </div>
                    <div className="text-center footer">
                        <span>
                            <svg viewBox="0 0 1024 1024" className="icon-svg-weixin">
                                <use xlinkHref="/assets/img/icon.svg#svg-weixin" />
                            </svg>
                            微信支付
                        </span>
                    </div>
                    <span className="close-btn" onClick={this.hide.bind(this)}>
                        <svg viewBox="0 0 1024 1024" className="icon-svg-close">
                            <use xlinkHref="/assets/img/icon.svg#svg-close" />
                        </svg>
                    </span>
                </div>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}



export default ToReward;