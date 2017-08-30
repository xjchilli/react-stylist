import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import ShareConfig from './component/ShareConfig';


class Home extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
    }

    componentDidMount() {
        // ShareConfig({
        //     title: '首页', // 分享标题
        //     desc: ToolDps.getUrl, // 分享描述
        //     link: ToolDps.getUrl, // 分享链接
        //     imgUrl: ToolDps.getHost + '/assets/img/logo.jpg', // 分享图标
        // });
    }

    render() {
        return (
            <div style={{ fontSize: '18px',padding:'20px' }}>
                <Link to="/profile">个人信息</Link>
                <br />
                <Link to="/needMatch">我要搭配</Link>
                <br />
                <Link to="/myDps">我的搭配师</Link>
                <br />
                <Link to="/customSuit">搭配测试</Link>
                <br />
                <Link to="/wardrobeList">我的衣橱</Link>
                <br />
                <Link to="/orderList">我的订单</Link>
                <br />
                <Link to="/fashionMoment">我的时尚圈</Link>
                <br />
                <Link to="/promotionCode">优惠码</Link>
                <br />
                <Link to="/share?userId=171">分享</Link>
                <br />
                <Link to="/arrangementScheme?id=18">搭配方案</Link>
                <br />
                <Link to="/feedback">吐槽</Link>
                <br />
                <Link to="/test">测试</Link>
            </div>
        );
    }
}


export default Home;