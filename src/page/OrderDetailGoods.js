/**
 * 商品订单详情
 */
import React from 'react';
import PropTypes from 'prop-types';
import { orderCancel, mergePay, receiveGoods, deleteOrder } from 'ToolAjax';
import qs from 'query-string';
import { DataLoad, GetData, Msg } from '../Component/index';
import { Link } from 'react-router-dom';
import WxAuth from './component/WxAuth';
import WxPayCall from './component/WxPayCall';

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
                    {/* <time>剩余14天5小时自动确认收货</time> */}
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
                                    <Link to={'/goodsDetail?id=' + item.goodsId}>
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
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
        }
        this._time = 0;
        this._time2 = 0;
        this._time3 = 0;
    }

    componentWillUnmount() {
        clearTimeout(this._time);
        clearTimeout(this._time2);
        clearTimeout(this._time3);
    }

    /**
    * 取消订单
    * @orderId 订单id
    */
    orderCancel(orderId) {
        orderCancel(orderId).then((res) => {
            if (res.succ) {
                this.setState({
                    msgShow: true,
                    msgText: '提交成功', //提示内容
                });
                this._time2 = setTimeout(function () {
                    window.location.reload();
                }.bind(this), 1500);
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
        mergePay(orderIdArr).then((res) => {
            // console.log(res);
            if (res.succ) {
                WxPayCall(res.payInfo, (res) => {
                    if (res.type === 1) {//成功
                        this.setState({
                            msgShow: true,
                            msgText: '支付成功'//提示内容
                        });
                        this._time = setTimeout(function () {
                            window.location.reload();
                        }.bind(this), 1500);
                    } else if (res.type === 3) {
                        this.setState({
                            msgShow: true,
                            msgText: '支付失败', //提示内容
                        });
                    }
                });
            } else {
                this.setState({
                    msgShow: true,
                    msgText: res.msg, //提示内容
                });
            }
        });

    }

    /**
     * 确认收货
     * @orderId 订单id
     */
    receiveGoods(orderId) {
        receiveGoods(orderId).then((res) => {
            if (res.succ) {
                this.setState({
                    msgShow: true,
                    msgText: '提交成功', //提示内容
                });
                this._time3 = setTimeout(function () {
                    window.location.reload();
                }.bind(this), 1500);
            } else {
                this.setState({
                    msgShow: true,
                    msgText: res.msg, //提示内容
                });
            }
        });
    }

    /**
   * 删除订单
   */
    deleteOrder(orderId) {
        deleteOrder(orderId).then((res) => {
            if (res.succ) {
                this.setState({
                    msgShow: true,
                    msgText: '删除成功', //提示内容
                });
                this._time = setTimeout(function () {
                    this.context.router.history.push('/orderListGoods');
                }.bind(this), 1500);
            } else {
                this.setState({
                    msgShow: true,
                    msgText: res.msg, //提示内容
                });
            }
        });
    }

    /**
     * 订单状态对应按钮
     */
    statusHtml() {
        let { status, orderId, service } = this.props.data;
        let html = [<Link key='sale-after' to={`/chat?selToID=${service.timId}&headUrl=${service.headImg}&nickname=${service.nickName}`} className='btn'>售后客服</Link>];
        switch (status) {
            case 1://待付款
                html.push(<button key={1} className='btn' onClick={this.orderCancel.bind(this, orderId)}>取消订单</button>);
                html.push(<button key={2} className='btn red' onClick={this.mergePay.bind(this, orderId)}>去付款</button>);
                break;
            case 3://待收货
                html.push(<Link to={'/transportSearch?orderId=' + orderId} className='btn'>查看物流</Link>);
                html.push(<button className='btn red' onClick={this.receiveGoods.bind(this, orderId)}>确认收货</button>);
                break;
            case 4://待评价
                html.push(<Link to={'/goodsComment?orderId=' + orderId} className='btn red'>去评价</Link>);
                break;
            case -1://交易取消
                html.push(<button key={1} className='btn' onClick={this.deleteOrder.bind(this, orderId)}>删除订单</button>);
                break;
            case 10://已完成
                html.push(<button key={1} className='btn' onClick={this.deleteOrder.bind(this, orderId)}>删除订单</button>);
                break;
        }
        return html;
    }

    render() {
        return (
            <section className='order-action-area'>
                {this.statusHtml()}
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}


Footer.contextTypes = {
    router: PropTypes.object.isRequired
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