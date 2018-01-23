/**
 * 商品订单列表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataLoad, GetData } from '../Component/index';
import { orderList, mergePay, orderCancel, receiveGoods, deleteOrder } from 'ToolAjax';
import { Msg } from '../Component/index';
import WxAuth from './component/WxAuth';
import WxPayCall from './component/WxPayCall';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status || ''//-1:全部 1:待付款，2:待发货(付款成功) ，3:待收货(已发货)，4:待评价(已确认收货),10:已完成(已评价)
        }
    }

    componentDidMount() {
        new Swiper('.order-list-nav', {
            slidesPerView: 5
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            status: nextProps.status
        });
    }


    render() {
        return (
            <div className="swiper-container order-list-nav">
                <div className="swiper-wrapper">
                    <div className={!this.state.status ? 'swiper-slide active' : 'swiper-slide'} onClick={this.props.statusChange.bind(this, '')}>
                        <span>全部</span>
                    </div>
                    <div className={this.state.status === 1 ? 'swiper-slide active' : 'swiper-slide'} onClick={this.props.statusChange.bind(this, 1)}>
                        <span>待付款</span>
                    </div>
                    <div className={this.state.status === 2 ? 'swiper-slide active' : 'swiper-slide'} onClick={this.props.statusChange.bind(this, 2)}>
                        <span>待发货</span>
                    </div>
                    <div className={this.state.status === 3 ? 'swiper-slide active' : 'swiper-slide'} onClick={this.props.statusChange.bind(this, 3)}>
                        <span>待收货</span>
                    </div>
                    <div className={this.state.status === 4 ? 'swiper-slide active' : 'swiper-slide'} onClick={this.props.statusChange.bind(this, 4)}>
                        <span>待评价</span>
                    </div>
                </div>
            </div>
        )
    }
}


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            data: [],
            loadAnimation: true,
            loadMsg: '正在加载中'
        }
    }

    componentDidMount() {
        document.title = "订单列表";
        WxAuth();
        this.getData(this.state.status);
    }

    getData(status) {
        this.setState({
            data: [],
            loadAnimation: true,
            loadMsg: '正在加载中'
        });
        orderList(status ? status : '').then((res) => {
            // console.log(res);
            if (res.succ) {
                let msg = '加载完成';
                if (res.data.length === 0) {
                    msg = "暂时没有您的订单";
                }
                this.setState({
                    data: res.data,
                    loadAnimation: false,
                    loadMsg: msg
                });
            } else {
                this.setState({
                    loadAnimation: false,
                    loadMsg: '加载失败'
                });
            }
        }).catch(() => {
            this.setState({
                loadAnimation: false,
                loadMsg: '加载失败'
            });
        });
    }


    statusChange(status) {
        this.setState({
            status: status || '',
            data: []
        });
        this.getData(status);
    }

    render() {
        let main = this.state.data.length > 0 ? <OrderListGoods data={this.state.data} {...this.props} status={this.state.status} /> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />;
        return (
            <section className='full-page order-list-goods-page'>
                <Nav status={this.state.status} statusChange={this.statusChange.bind(this)} />
                {main}
            </section>
        )
    }
}

class OrderListGoods extends React.Component {
    constructor(props) {
        super(props);
        let list = props.data;
        for (let i = 0; i < list.length; i++) {
            if (list[i].status === 1) {
                list[i].checked = false;
            }
        }
        this.state = {
            list: list,
            msgShow: false,
            msgText: '', //提示内容
        }
    }

    /**
     * 合并付款
     * @orderId 订单id  
     * 
     */
    mergePay(orderId) {
        let orderIdArr = [];
        if (orderId) {//如果订单id存在为单个订单付款否则是多个订单付款
            orderIdArr.push(orderId);
        } else {
            let list = Array.prototype.slice.apply(this.state.list);
            for (let i = 0; i < list.length; i++) {
                if (list[i].checked) {
                    orderIdArr.push(list[i].orderId);
                }
            }
        }
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
     * 取消订单
     * @orderId 订单id
     */
    orderCancel(orderId) {
        orderCancel(orderId).then((res) => {
            if (res.succ) {
                this.setState({
                    msgShow: true,
                    msgText: '取消成功', //提示内容
                });
                let list = Array.prototype.slice.apply(this.state.list);
                for (let i = 0; i < list.length; i++) {
                    if (list[i].orderId === orderId) {
                        list[i].status = -1;
                        break;
                    }
                }
                this.setState({
                    list
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
     * 选择订单
     * @orderId 订单id
     */
    selectOrder(orderId) {
        let list = Array.prototype.slice.apply(this.state.list);
        for (let i = 0; i < list.length; i++) {
            if (list[i].orderId === orderId) {
                list[i].checked = !list[i].checked;
                break;
            }
        }
        this.setState({
            list
        });
    }

    /**
     * 是否显示合并付款
     */
    isShowMergePay() {
        let flag = false;
        let list = Array.prototype.slice.apply(this.state.list);
        for (let i = 0; i < list.length; i++) {
            if (list[i].checked) {
                flag = true;
                break;
            }
        }
        return flag;
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
                let list = Array.prototype.slice.apply(this.state.list);
                for (let i = 0; i < list.length; i++) {
                    if (list[i].orderId === orderId) {
                        list.splice(i, 1);
                        break;
                    }
                }
                this.setState({
                    list
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
    * 订单状态对应按钮
    */
    statusHtml(status, orderId) {
        let html = [];
        switch (status) {
            case 1://待付款
                html.push(<button key={1} className='btn' onClick={this.orderCancel.bind(this, orderId)}>取消订单</button>);
                html.push(<button key={2} className='btn red' onClick={this.mergePay.bind(this, orderId)}>去付款</button>);
                break;
            case 3://待收货
                html.push(<Link key={1} to={'/transportSearch?orderId=' + orderId} className='btn'>查看物流</Link>);
                html.push(<button key={2} className='btn red' onClick={this.receiveGoods.bind(this, orderId)}>确认收货</button>);
                break;
            case 4://待评价
                html.push(<Link key={1} to={'/goodsComment?orderId=' + orderId} className='btn red'>去评价</Link>);
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
        let isShowMergePay = this.isShowMergePay();

        return (
            <div className="order-list-area">
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <li key={index}>
                                    <p className='order-num'>
                                        {
                                            this.props.status === 1 ? item.checked ? <span className="icon icon-selected" onClick={this.selectOrder.bind(this, item.orderId)}><span className="path1"></span><span className="path2"></span></span> : <span className="icon icon-not-selected" onClick={this.selectOrder.bind(this, item.orderId)}><span className="path1"></span><span className="path2"></span></span> : null
                                        }
                                        订单编号：{item.orderId}
                                        <span className='status'>{item.statusVal}</span>
                                    </p>
                                    {
                                        item.details.map((goods, i) => {
                                            return (
                                                <Link key={i} to={'/orderDetailGoods?id=' + item.orderId}>
                                                    <ul className='flex-box'>
                                                        <li>
                                                            <div className='goods-img' style={{ backgroundImage: `url(${goods.images})` }}></div>
                                                        </li>
                                                        <li>
                                                            <h5>{goods.goodsName}</h5>
                                                            <p>{goods.colorName}，{goods.measurementName}</p>
                                                        </li>
                                                        <li>
                                                            <p className='text-right price'>&yen;{goods.transactionPrice}</p>
                                                            <p className='text-right num'>X {goods.num}</p>
                                                        </li>
                                                    </ul>
                                                </Link>
                                            )
                                        })
                                    }
                                    <footer>
                                        应付：&yen;{item.transactionPrice}
                                        <div className='action-area'>
                                            {this.statusHtml(item.status, item.orderId)}
                                        </div>
                                    </footer>
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    this.props.status === 1 && isShowMergePay ? (
                        <div className='merge-pay'>
                            <button className='btn' onClick={this.mergePay.bind(this, null)}>合并付款</button>
                        </div>
                    ) : null
                }
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </div>
        )
    }
}


OrderListGoods.contextTypes = {
    router: PropTypes.object.isRequired
}


export default Main;