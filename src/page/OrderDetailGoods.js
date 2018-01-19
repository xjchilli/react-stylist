/**
 * 商品订单详情
 */
import React from 'react';
import { ToolDps } from '../ToolDps';
import qs from 'query-string';
import { DataLoad, GetData, Msg } from '../Component/index';
import { Link } from 'react-router-dom';
import WxAuth from './component/WxAuth';

/**
 * 订单状态
 */
class OrderStatus extends React.Component {
    render() {
        let { statusVal } = this.props.data;
        return (
            <section className='status-area'>
                <div className='content'>
                    <p className='status'>{statusVal}</p>
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
        let { sendInfo: { name, contact, province, city, county, address } } = this.props.data;
        return (
            <section className='customer-info-area'>
                <h5>收货地址</h5>
                <div className='contact-area'>
                    {name}
                    <span className='tel'>{contact}</span>
                </div>
                <address>{province}{city}{county}{address}</address>
            </section>
        )
    }
}

/**
 * 商品信息
 */
class GoodsList extends React.Component {
    render() {
        let { details, totalNumber, transactionPrice, status } = this.props.data;
        return (
            <section>
                <ul className='goods-list-area'>
                    {
                        details.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={'/goodsDetail?id=' + item.goodId}>
                                        <ul className='flex-box'>
                                            <li>
                                                <div className='goods-img' style={{ backgroundImage: `url(${item.images})` }}></div>
                                            </li>
                                            <li>
                                                <h4>{item.goodsName}</h4>
                                                <p className='sku'>{item.colorName}，{item.measurementName}</p>
                                                <p className='price-area'>
                                                    &yen;{item.transactionPrice}
                                                    <span className='num'>X {item.num}</span>
                                                </p>
                                            </li>
                                        </ul>
                                    </Link>
                                    {
                                        status === 2 || status === 3 || status == 4 || status === 10 ? (
                                            <div className='goods-action-area'>
                                                <Link to='/saleAfter'>
                                                    <button className='btn'>申请售后</button>
                                                </Link>
                                            </div>
                                        ) : null
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
                <section className='total-price-area'>
                    <div className='box'>
                        邮费：0.00元
                        <span className='price'>共{totalNumber}件商品，小计：<span className='num'>{transactionPrice}元</span></span>
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
        let { orderId, createTime } = this.props.data;
        return (
            <section className='other-info-area'>
                <p>订单编号：{orderId}</p>
                <time>下单时间：{createTime}</time>
            </section>
        )
    }
}

/**
 * 按钮区域
 */
class Footer extends React.Component {

    /**
    * 取消订单
    * @orderId 订单id
    */
    orderCancel(orderId) {
        ToolDps.post('/wx/goods/order/close', { orderId: orderId }).then((res) => {
            if (res.succ) {
                window.location.reload();
            } else {
                this.setState({
                    msgShow: true,
                    msgText: res.msg, //提示内容
                });
            }

        });
    }


    /**
    * 合并付款
    * @orderId 订单id  
    * 
    */
    mergePay(orderId) {
        let orderIdArr = [orderId];
        ToolDps.post('/wx/goods/order/getMergeUnifeid', { orderId: orderIdArr }).then((res) => {
            console.log(res);
            if (res.succ) {
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
                    msgText: res.msg, //提示内容
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
                        msgText: '支付成功'//提示内容
                    });
                    this._time = setTimeout(function () {
                        window.location.reload();
                    }.bind(this), 1500);
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {//支付取消
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
        let { status, orderId } = this.props.data;
        return (
            <section>
                {/* 代付款 */}
                {
                    status === 1 ? (
                        <div className='order-action-area'>
                            <button className='btn' onClick={this.orderCancel.bind(this, orderId)}>取消订单</button>
                            <button className='btn red' onClick={this.mergePay.bind(this, orderId)}>去付款</button>
                        </div>
                    ) : null
                }
                {/* 待收货 */}
                {
                    status === 3 ? (
                        <div className='order-action-area'>
                            <Link to='/transportSearch'>
                                <button className='btn'>查看物流</button>
                            </Link>
                            <button className='btn red'>确认收货</button>
                        </div>
                    ) : null
                }
                {/* 待评价 */}
                {
                    status === 4 ? (
                        <div className='order-action-area'>
                            <Link to='/goodsComment'>
                                <button className='btn red'>去评价</button>
                            </Link>
                        </div>
                    ) : null
                }

            </section>
        )
    }
}



class OrderDetailGoods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <section className='full-page order-goods-detail-page'>
                {/* 订单状态 */}
                <OrderStatus data={this.state.data} />
                {/* 用户信息 */}
                <CustomerInfo data={this.state.data} />
                {/* 商品信息 */}
                <GoodsList data={this.state.data} />
                {/* 其他信息 */}
                <OtherInfo data={this.state.data} />
                {/* 按钮区域 */}
                <Footer data={this.state.data} />
            </section>
        )
    }
}


class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = '订单详情';
        WxAuth();
    }

    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data && data.succ ? <OrderDetailGoods data={data.data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}

// export default OrderDetailGoods;

export default GetData({
    id: 'OrderDetailGoods', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/goods/order/detail',
    data: (props, state) => {
        let { id } = qs.parse(props.location.search);
        return {
            orderId: id
        }
    }, //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});