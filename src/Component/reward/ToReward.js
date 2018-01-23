/**
 * 去打赏
 * usage:
 * 
 */
import React, { Component } from 'react';
import { ToolDps } from '../../ToolDps';
import { Msg } from "../index";
import WxAuth from '../../page/component/WxAuth';
import WxPayCall from '../../page/component/WxPayCall';



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
          //jsapi签名
          WxAuth().then(() => {
            this.setState({
                jsapiSigna: true
            });
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
        let data = {
            money: rewardMoney.trim(),
            id: this.state.id
        }
        //分享用户id
        let sourceUserId = ToolDps.sessionItem('sourceUserId');
        if (sourceUserId) {
            data['sourceUserId'] = sourceUserId;
        }

        ToolDps.post(this.state.url, data).then((res) => {
            // console.log(res)
            if (res.succ) {
                WxPayCall(res.payInfo, (res) => {
                    if (res.type === 1) {//成功
                        this.props.rewardCallback();
                    } else if (res.type === 3) {
                        this.setState({
                            msgShow: true,
                            msgText: '支付失败', //提示内容
                        });
                    }
                });
            }

        });

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
    hide(e) {
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