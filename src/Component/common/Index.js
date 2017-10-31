import React, { Component } from 'react';
import GetNextPage from './GetNextPage';
import GetData from './GetData';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../Action/Index';
import IM from '../../page/component/IM';
// import PropTypes from 'prop-types';




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

    // redirect() {
    //     this.context.router.history.push('/needMatch');
    // }

    render() {
        let tab = this.props.tab;
        return (
            <ul className="footer clear">
                <li>
                    <NavLink to="/" activeClassName={tab == 1 ? "active" : ""}>
                        <span className={tab == 1 ? "icon icon-home-selected" : "icon icon-home-normal"}></span>
                        <p>首页</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dpsList" activeClassName={tab == 2 ? "active" : ""}>
                        <span className={tab == 2 ? "icon icon-dps-selected" : "icon icon-dps-normal"}></span>
                        <p>搭配师</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/needMatch" >
                        <img className="da-img" src='/assets/img/icon/tab-3-1.png' />

                    </NavLink>
                </li>
                <li>
                    <NavLink to="/fashionMoment" activeClassName={tab == 4 ? "active" : ""}>
                        <span className={tab == 4 ? "icon icon-find-selected" : "icon icon-find-normal"}></span>
                        <p>发现</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/my" activeClassName={tab == 5 ? "active" : ""}>
                        <span className={tab == 5 ? "icon icon-my-selected" : "icon icon-my-normal"}></span>
                        <p>我的</p>
                    </NavLink>
                </li>
            </ul >
        )
    }
}

// Footer.contextTypes = {
//     router: PropTypes.object.isRequired
// };


class MyNews extends IM {
    constructor(props) {
        super(props);
        this.state = {
            newMsg: props.MyNews.newMsg || false
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


    componentWillReceiveProps(nextProps) {
        this.setState({
            newMsg: nextProps.MyNews.newMsg
        });
    }




    onMsgNotify(newMsgList) {
        if (newMsgList.length > 0) {
            this.props.setNews({
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
                this.props.setNews({
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

let News = connect((state) => { return { MyNews: state.MyNews }; }, action('setNews'))(MyNews);

export { GetNextPage, GetData, DataLoad, Footer, News };