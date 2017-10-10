import React, { Component } from 'react';
import GetNextPage from './GetNextPage';
import GetData from './GetData';
import { Link,NavLink } from 'react-router-dom';



/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
class DataLoad extends Component {
    render() {
        let { loadAnimation, loadMsg } = this.props;
        return (
            <div className={'data-load data-load-' + loadAnimation}>
                <div className="msg">{loadMsg}</div>
            </div>
        );
    }
}
DataLoad.defaultProps = {
    loadAnimation: true, //默认显示加载动画
    loadMsg: '正在加载中'
}

//底部tab
class Footer extends Component {
    render() {
        let tab = this.props.tab;
        return (
            <ul className="footer clear">
                <li>
                    <NavLink to="/" activeClassName={tab == 1 ? "active" : ""}>
                        <img src={tab == 1 ? '/assets/img/icon/tab-1-2.jpg' : '/assets/img/icon/tab-1-1.jpg'} width="20" height="22" />
                        <p>首页</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/myDps" activeClassName={tab == 2 ? "active" : ""}>
                        <img src={tab == 2 ? '/assets/img/icon/tab-2-2.jpg' : '/assets/img/icon/tab-2-1.jpg'} width="15" height="22" />
                        <p>搭配师</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/needMatch" activeClassName={tab == 3 ? "active" : ""}>
                        <img src={tab == 3 ? '/assets/img/icon/tab-3-2.jpg' : '/assets/img/icon/tab-3-1.jpg'} width="23" height="22" />
                        <p>搭配</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/fashionMoment" activeClassName={tab == 4 ? "active" : ""}>
                        <img src={tab == 4 ? '/assets/img/icon/tab-4-2.jpg' : '/assets/img/icon/tab-4-1.jpg'} width="22" height="22" />
                        <p>发现</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" activeClassName={tab == 5 ? "active" : ""}>
                        <img src={tab == 5 ? '/assets/img/icon/tab-5-2.jpg' : '/assets/img/icon/tab-5-1.jpg'} width="16" height="22" />
                        <p>我的</p>
                    </NavLink>
                </li>
            </ul >
        )
    }
}

class News extends Component {
    render() {
        return (
            <view className="new-info-area">
                <Link to="/">
                    <view className="news">
                        <img src="/assets/img/icon/news.png" />
                        <view className="cicle"></view>
                    </view>
                </Link>
            </view>
        )
    }
}

export { GetNextPage, GetData, DataLoad, Footer,News };