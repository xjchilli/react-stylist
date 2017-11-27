/**
 * 我的
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataLoad, GetData, News } from '../Component/index';
import { ToolDps } from '../ToolDps';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderLoad: false,//订单数量是否查询完成
            orderData: null//订单数
        }
    }

    componentDidMount() {
        ToolDps.get('/wx/user/getMyCenter').then((res) => {
            if (res.succ) {
                this.setState({
                    orderLoad: true,
                    orderData: res.data
                })
            }
        });
    }

    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data.succ && this.state.orderLoad ? <My data={data} orderData={this.state.orderData} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={''} />;

        return main;
    }
}


class My extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        document.title = "我的";
    }

    redirect(status) {
        ToolDps.sessionItem('orderStatus', status);
        this.context.router.history.push('/orderList');
    }


    render() {
        let { data, orderData } = this.props;
        return (
            <section className="my-page">
                <header style={{ borderBottomWidth: ToolDps.iphone ? '0.3px' : '1px' }}>
                    <img src={data.headImg} />
                    <p className="text-center nickname">{data.nickName}</p>
                </header>
                <section className="order-area">
                    <div className="all" onClick={this.redirect.bind(this, '')}>全部订单</div>
                    <ul className="flex-box">
                        <li className="item-5 text-center" onClick={this.redirect.bind(this, '0')}>
                            <span className="icon icon-wait-pay">
                                {orderData.orderWaitPayTotal === 0 ? null : <i className="num">{orderData.orderWaitPayTotal}</i>}
                            </span>
                            <p className="text-center">待付款</p>
                        </li>
                        <li className="item-5 text-center" onClick={this.redirect.bind(this, '1')}>
                            <span className="icon icon-publish">
                                {orderData.orderReleaseTotal === 0 ? null : <i className="num">{orderData.orderReleaseTotal}</i>}
                            </span>
                            <p className="text-center">发布中</p>
                        </li>
                        <li className="item-5 text-center" onClick={this.redirect.bind(this, '2')}>
                            <span className="icon icon-serving">
                                {orderData.orderServiceTotal === 0 ? null : <i className="num">{orderData.orderServiceTotal}</i>}
                            </span>
                            <p className="text-center">服务中</p>
                        </li>
                        <li className="item-5 text-center" onClick={this.redirect.bind(this, '3')}>
                            <span className="icon icon-wait-comment">
                                {orderData.orderWaitCommentTotal === 0 ? null : <i className="num">{orderData.orderWaitCommentTotal}</i>}
                            </span>
                            <p className="text-center">待评价</p>
                        </li>
                        <li className="item-5 text-center" onClick={this.redirect.bind(this, '10')}>
                            <span className="icon icon-finish"></span>
                            <p className="text-center">已完成</p>
                        </li>
                    </ul>
                </section>
                <ul className="flex-box base-info-area">
                    <li className="item-2">
                        <Link to="/wardrobeList">
                            <div className="box text-center">
                                <span className="icon icon-my-wordrobe"></span>
                                <p>我的衣橱</p>
                            </div>
                        </Link>
                    </li>
                    <li className="item-2">
                        <Link to="/profile">
                            <div className="box text-center">
                                <span className="icon icon-my-info"></span>
                                <p>我的信息</p>
                            </div>
                        </Link>
                    </li>
                    <li className="item-2">
                        <Link to="/myWatch">
                            <div className="box text-center">
                                <span className="icon icon-my-watch"></span>
                                <p>我的关注</p>
                            </div>
                        </Link>
                    </li>
                    <li className="item-2">
                        <Link to="/promotionCode">
                            <div className="box text-center">
                                <span className="icon icon-my-promotion"></span>
                                <p>我的优惠券</p>
                            </div>
                        </Link>
                    </li>
                </ul>
                <Link to="/myAsset" className="myAsset" style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>我的资产</Link>
                <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=939796214&site=qq&menu=yes" className="contact-us" style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>联系客服</a>
                <Link to="/feedback" className="feedback">我要反馈</Link>
                <News />

            </section>
        )
    }
}

My.contextTypes = {
    router: PropTypes.object.isRequired
}


export default GetData({
    id: 'Profile', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/user/info',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});