/**
 * 成功领取优惠劵
 */
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import qs from 'query-string';
import { DataLoad, GetData } from '../Component/index';


class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {
			data,
            loadAnimation,
            loadMsg
		} = this.props.state;
        const main = data.succ ? <GetPromotion {...data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />
        return (
            main
        )
    }
}

class GetPromotion extends Component {
    render() {
        console.log(this.props);
        return (
            <section className="promotion-get-page">
                <header>
                    <h4>{this.props.sharUserName}</h4>
                    <p>我刚拥有了一个私人搭配师，这感觉太棒啦！给你分享一张优惠劵，我们一起来改变自己。</p>
                </header>
                <section className="content">
                    <img className="response_img" src="/assets/img/promotion/bg.jpg" />
                    <section className="box">
                        {
                            this.props.coupons ? (
                                <section className="price-area">
                                    <img className="l-border" src="/assets/img/promotion/get-l-border.jpg" />
                                    <img className="r-border" src="/assets/img/promotion/get-r-border.jpg" />
                                    <ul className="flex-box">
                                        <li>
                                            <span className="money-icon">
                                                <span className="icon icon-money-white"></span>
                                            </span>
                                            <span className="num">{this.props.coupons.money}</span>
                                        </li>
                                        <li>
                                            <span className="text-center msg">全场服务通用</span>
                                            <time className="text-center time">有效期至{this.props.coupons.time}</time>
                                        </li>
                                    </ul>
                                    <p className="text-center msg-text">该劵已放入你的搭配师账户</p>
                                    <Link to="/needMatch" className="text-center btn use-btn">立即使用</Link>
                                </section>
                            ) : (
                                    <span className="text-center red-package-none">{this.props.errMsg}</span>
                                )
                        }


                    </section>

                    <img className="cloud response_img" src="/assets/img/promotion/cloud.png" />
                </section>
                {
                    this.props.coupons ? (
                        <section className="user-area">
                            <img src={this.props.coupons.headImg} />
                            <span>你抢到了{this.props.coupons.money}元优惠劵</span>
                        </section>
                    ) : null
                }
                <ul className="other-user-list">
                    {
                        this.props.drawCouponsList.map((item,index) => {
                            return (
                                <li key={index}>
                                    <ul className="flex-box">
                                        <li>
                                            <img src={item.headImg} />
                                        </li>
                                        <li>
                                            <p className="nickname">{item.nickName}</p>
                                            <time>{item.time}</time>
                                            <span className="price">{item.money}元</span>
                                        </li>
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>


            </section>
        )
    }
}



export default GetData({
    id: 'OrderDetail', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: (props, state) => {
        let { couponsActiveId } = qs.parse(props.location.search);
        return "/wx/coupons/" + couponsActiveId + "/draw";
    },
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});
