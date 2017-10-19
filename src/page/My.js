/**
 * 我的
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataLoad, GetData, Footer, News } from '../Component/index';

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
        let main = data.succ ? <My data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return main;
    }
}


class My extends Component {
    constructor(props){
        super(props);
    }


    componentDidMount() {
    }


    render() {
        let { data } = this.props;
        return (
            <section className="my-page">
                <Footer tab="5" />
                <header>
                    <img src={data.headImg} />
                    <p className="text-center nickname">{data.nickName}</p>
                </header>
                <section className="order-area">
                    <Link to="/orderList" className="all">全部订单</Link>
                    <ul className="flex-box">
                        <li className="item-5 text-center">
                            <Link to="/orderList?status=0" >
                                <span className="icon icon-wait-pay"></span>
                                <p className="text-center">待付款</p>
                            </Link>
                        </li>
                        <li className="item-5 text-center">
                            <Link to="/orderList?status=1" >
                                <span className="icon icon-publish"></span>
                                <p className="text-center">发布中</p>
                            </Link>
                        </li>
                        <li className="item-5 text-center">
                            <Link to="/orderList?status=2" >
                                <span className="icon icon-serving"></span>
                                <p className="text-center">服务中</p>
                            </Link>
                        </li>
                        <li className="item-5 text-center">
                            <Link to="/orderList?status=3" >
                                <span className="icon icon-wait-comment"></span>
                                <p className="text-center">待评价</p>
                            </Link>
                        </li>
                        <li className="item-5 text-center">
                            <Link to="/orderList?status=10" >
                                <span className="icon icon-finish"></span>
                                <p className="text-center">已完成</p>
                            </Link>
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
                <a  target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=939796214&site=qq&menu=yes" className="contact-us">联系客服</a>
                <Link to="/feedback" className="feedback">我要反馈</Link>
                <News />
                
            </section>
        )
    }
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