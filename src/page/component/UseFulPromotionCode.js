/**
 * 可用的优惠卷
 */
import React, { Component } from 'react';

class UseFulPromotionCode extends Component {
    render() {
        return (
            <section className="pay-select-promotion">
                <section className="box">
                    <h4 className="title">选择可用优惠劵</h4>
                    <i className="close" onClick={this.props.hide}></i>
                    <ul className="list">
                        {
                            this.props.data.map((item, index) => {
                                return (
                                    <li className={this.props.couponsId == item.id ? "active" : ""} key={index} onClick={this.props.selectPromotion.bind(this, item.id, item.price)}>
                                        <ul className="flex-box content">
                                            <li className="text-center">
                                                &yen;
                                                <span>{item.price}</span>
                                            </li>
                                            <li>
                                                <p className="service-type">全场服务通用</p>
                                                <time>有效期至{item.expiryDate}</time>
                                                <i className="yes"></i>
                                            </li>
                                        </ul>
                                    </li>
                                )
                            })
                        }
                        {/* <li className="active">
                            <ul className="flex-box content">
                                <li className="text-center">
                                    ￥
                                    <span>19</span>
                                </li>
                                <li>
                                    <p className="service-type">全场服务通用</p>
                                    <time>有效期至2017-9-8</time>
                                    <i className="yes"></i>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="flex-box content">
                                <li className="text-center">
                                    ￥
                                    <span>19</span>
                                </li>
                                <li>
                                    <p className="service-type">全场服务通用</p>
                                    <time>有效期至2017-9-8</time>
                                    <i className="yes"></i>
                                </li>
                            </ul>
                        </li> */}


                    </ul>
                </section>
            </section>
        )
    }
}

export default UseFulPromotionCode;