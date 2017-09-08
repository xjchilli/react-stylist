/**
 * 成功领取优惠劵
 */
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class GetPromotion extends Component {
    render() {
        return (
            <section className="promotion-get-page">
                <header>
                    <h4>A-Reachel</h4>
                    <p>我刚拥有了一个私人搭配师，这感觉太棒啦！给你分享一张优惠劵，我们一起来改变自己。</p>
                </header>
                <section className="content">
                    <img className="response_img" src="/assets/img/promotion/bg.jpg" />
                    <section className="box">
                        <section className="price-area">
                            <img className="l-border" src="/assets/img/promotion/get-l-border.jpg" />
                            <img className="r-border" src="/assets/img/promotion/get-r-border.jpg" />
                            <ul className="flex-box">
                                <li>
                                    <span className="money-icon">
                                        <span className="icon icon-money-white"></span>
                                    </span>
                                    <span className="num">99</span>
                                </li>
                                <li>
                                    <span className="text-center msg">全场服务通用</span>
                                    <time className="text-center time">有效期至2017-9-6</time>
                                </li>
                            </ul>
                            <p className="text-center msg-text">该劵已放入你的搭配师账户</p>
                            <Link to="/" className="text-center btn use-btn">立即使用</Link>
                        </section>
                        <span className="red-package-none">手慢了，优惠卷被领光了！</span>
                    </section>
                    
                    <img className="cloud response_img" src="/assets/img/promotion/cloud.png" />
                </section>
                <section className="user-area">
                    <img src="/assets/img/girl.jpg" />
                    <span>你抢到了8元优惠劵</span>
                </section>
                <ul className="other-user-list">
                    <li>
                        <ul className="flex-box">
                            <li>
                                <img src="/assets/img/girl.jpg" />
                            </li>
                            <li>
                                <p className="nickname">爱吃鱼的猫</p>
                                <time>15:30</time>
                                <span className="price">5元</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul className="flex-box">
                            <li>
                                <img src="/assets/img/girl.jpg" />
                            </li>
                            <li>
                                <p className="nickname">爱吃鱼的猫</p>
                                <time>15:30</time>
                                <span className="price">5元</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul className="flex-box">
                            <li>
                                <img src="/assets/img/girl.jpg" />
                            </li>
                            <li>
                                <p className="nickname">爱吃鱼的猫</p>
                                <time>15:30</time>
                                <span className="price">5元</span>
                            </li>
                        </ul>
                    </li>
                </ul>


            </section>
        )
    }
}

export default GetPromotion;
