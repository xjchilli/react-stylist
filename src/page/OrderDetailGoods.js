/**
 * 商品订单详情
 */
import React from 'react';

/**
 * 订单状态
 */
class OrderStatus extends React.Component {
    render() {
        return (
            <section className='status-area'>
                <div className='content'>
                    <p className='status'>
                        交易取消
                        <span className='return-mony'>退款已完成</span>
                    </p>
                    <time>剩余14天5小时自动确认收货</time>
                </div>
            </section>
        )
    }
}

/**
 * 用户信息
 */
class CustomerInfo extends React.Component {
    render() {
        return (
            <section className='customer-info-area'>
                <h5>收货地址</h5>
                <div className='contact-area'>
                    叶周正
                    <span className='tel'>135****6559</span>
                </div>
                <address>浙江省杭州市西湖区三墩镇华彩国际3幢8楼802</address>
            </section>
        )
    }
}

/**
 * 商品信息
 */
class GoodsList extends React.Component {
    render() {
        return (
            <section>
                <ul className='goods-list-area'>
                    <li>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <p className='price-area'>
                                    &yen;799.00
                                    <span className='num'>X 2</span>
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <p className='price-area'>
                                    &yen;799.00
                                    <span className='num'>X 2</span>
                                </p>
                            </li>
                        </ul>
                    </li>
                </ul>
                <section className='total-price-area'>
                    <div className='box'>
                        邮费：0.00元
                        <span className='price'>共3件商品，小计：<span className='num'>2397元</span></span>
                    </div>
                </section>
            </section>
        )
    }
}


/**
 * 其他信息
 */
class OtherInfo extends React.Component {
    render() {
        return (
            <section className='other-info-area'>
                <p>订单编号：1515049557001</p>
                <time>下单时间：2018-1-20   10:31:44</time>
            </section>
        )
    }
}

/**
 * 按钮区域
 */
class Footer extends React.Component {
    render() {
        return (
            <div className='action-area'>
                 <button className='btn'>申请售后</button>
                 <button className='btn red'>去评价</button>
            </div>
        )
    }
}

class OrderDetailGoods extends React.Component {
    render() {
        return (
            <section className='full-page order-goods-detail-page'>
                {/* 订单状态 */}
                <OrderStatus />
                {/* 用户信息 */}
                <CustomerInfo />
                {/* 商品信息 */}
                <GoodsList />
                {/* 其他信息 */}
                <OtherInfo />
                {/* 按钮区域 */}
                <Footer />

            </section>
        )
    }
}

export default OrderDetailGoods;