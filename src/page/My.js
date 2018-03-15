/**
 * 我的
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataLoad, GetData } from '../Component/index';
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


    render() {
        let { data, orderData } = this.props;
        return (
            <section className="my-page">
                <header>
                    <img src={data.headImg} />
                    <p className="text-center nickname">{data.nickName}</p>
                    <ul className='flex-box'>
                        <li className="item-3 text-center">
                            <Link to="/vipMember">
                                <span className="icon icon-vip"></span>
                                <br />
                                会员中心
                            </Link>
                        </li>
                        <li className="item-3 text-center">
                            <Link to="/orderType">
                                <span className="icon icon-my-order"></span>
                                <br />
                                我的订单
                            </Link>
                        </li>
                        <li className="item-3 text-center">
                            <Link to="/shopCart">
                                <span className="icon icon-my-shop"></span>
                                <br />
                                购物车
                            </Link>
                        </li>
                    </ul>
                </header>
                <Link to="/myAsset" className="link" >
                    <span className="icon icon-my-account"></span>
                    我的账户
                </Link>
                <Link to="/myAsset" className="link" >
                    <span className="icon icon-my-dps"></span>
                    我的搭配师
                </Link>
                <Link to="/profile" className="link" >
                    <span className="icon icon-my-info"></span>
                    我的信息
                </Link>
                <Link to="/myPublish" className="link" >
                    <span className="icon icon-my-publish"></span>
                    我的发布
                </Link>
                <Link to="/promotionCode" className="link" >
                    <span className="icon icon-my-promotion"></span>
                    我的优惠券
                </Link>
                <Link to="/wardrobeList" className="link" >
                    <span className="icon icon-my-wardrobe"></span>
                    我的衣橱
                </Link>
                <Link to="/feedback" className="link">
                    <span className="icon icon-feedback"></span>
                    我要反馈
                </Link>
                {/* <News /> */}

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