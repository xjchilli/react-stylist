import React, { Component } from 'react';
import GetNextPage from './GetNextPage';
import GetData from './GetData';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import IM from '../../page/component/IM';



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
                    <NavLink to="/dpsList" activeClassName={tab == 2 ? "active" : ""}>
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
                    <NavLink to="/my" activeClassName={tab == 5 ? "active" : ""}>
                        <img src={tab == 5 ? '/assets/img/icon/tab-5-2.jpg' : '/assets/img/icon/tab-5-1.jpg'} width="16" height="22" />
                        <p>我的</p>
                    </NavLink>
                </li>
            </ul >
        )
    }
}

class News extends IM {
    constructor(props) {
        super(props);
        this.state={
            newMsg: false
        }
        this.reqRecentSessCount = 50; //每次请求的最近会话条数，业务可以自定义
    }

    componentDidMount() {
        this.signature((data) => {
            this.login(data, () => {
                this.getFriends();
            });
        });
    }


    
    onMsgNotify(newMsgList) {
        if (newMsgList.length > 0) {
            this.setState({
                newMsg: true
            });
        }

    }


    /**
     * 获取好友列表
     */
    getFriends() {
        let options = {
            'From_Account': this.loginInfo.identifier,
            'TimeStamp': 0,
            'StartIndex': 0,
            'GetCount': this.totalCount,
            'LastStandardSequence': 0,
            "TagList": [
                "Tag_Profile_IM_Nick",
                "Tag_Profile_IM_Image",
                "Tag_Profile_IM_Gender"
            ]
        };

        webim.getAllFriend(options,
            (resp) => {
                // console.log(resp);
                if (resp.FriendNum > 0) {
                    this.initRecentContactList(); //获取最近会话数据
                }
            },
            (err) => {
                console.log(err.ErrorInfo);
            }
        );
    }

    /**
     * 初始化聊天界面最近会话列表
     */
    initRecentContactList() {
        let options = {
            'Count': this.reqRecentSessCount //要拉取的最近会话条数
        };
        webim.getRecentContactList(
            options,
            (resp) => {
                if (resp.SessionItem && resp.SessionItem.length > 0) { //如果存在最近会话记录
                    webim.syncMsgs(this.initUnreadMsgCount.bind(this)); //初始化最近会话的消息未读数

                }

            }
        );
    }

    /**
     * 初始化最近会话的消息未读数
     */
    initUnreadMsgCount() {
        let sess;
        let sessMap = webim.MsgStore.sessMap();
        for (let i in sessMap) {
            sess = sessMap[i];
            // console.log(sess._impl.msgs)
            if (sess.id() != "@TLS#144115198577104990" && sess.unread() > 0) {
                this.setState({
                    newMsg: true
                });
            }
        }
    }


    render() {
        return (
            <view className="new-info-area">
                <Link to="/myDps">
                    <view className="news">
                        <img src="/assets/img/icon/news.png" />
                        {
                            this.state.newMsg ? <view className="cicle"></view> : null
                        }
                    </view>
                </Link>
            </view>
        )
    }
}


export { GetNextPage, GetData, DataLoad, Footer, News };