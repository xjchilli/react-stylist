/**
 * 时尚圈
 * Created by potato on 2017/4/8.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GetNextPage } from '../Component/index';
import { ToolDps } from '../ToolDps';
import classNames from 'classnames';
import IM from './component/IM';
import LazyLoad from 'react-lazyload';


/**
 * (循环列表)
 *
 * @class List
 * @extends {Component}
 */
class List extends Component {
    render() {
        return (
            <ul className="fashion-moment-list">
                {
                    this.props.list.map((item, index) => {
                        return <ListItem key={index} {...item} />
                    })
                }
            </ul>
        );
    }
}


class ListItem extends Component {

    constructor(props) {
        super(props);
        let {
            agreeValue,
            agreeNum
        } = this.props;
        this.state = {
            agreeValue: agreeValue, //该用户是否点赞 0:未点赞，1已经点赞
            agreeNum: agreeNum //点赞数
        }
    }

    /**
     * 点赞
     * @planId 方案id
     */
    zan(planId) {
        this.setState({
            agreeValue: 1,
            agreeNum: ++this.state.agreeNum
        });
        ToolDps.post('/wx/fashion/agree', {
            planId: planId
        }).then((res) => {
            if (!res.succ) {
                this.setState({
                    agreeValue: 0,
                    agreeNum: --this.state.agreeNum
                });
                alert('点赞失败');
            }
        });

    }

    render() {
        let {
            id,
            planName,
            wxCreateTime,
            masterImage,
            awardNum,
            content
        } = this.props; //显示数据

        let agree = classNames('icon-svg-zan', {
            'active': this.state.agreeValue === 1
        })

        let p = document.createElement('p');
        p.innerHTML = content;

        return (
            <li>
                <div className="main-img">
                    <Link to={"/fashionMomentDetail?planId=" + id}>
                        {/* <LazyLoad height={200} overflow={true}> </LazyLoad> */}
                            <img src={masterImage} className="img-content" alt="" />
                       
                    </Link>
                    <div className="action-area">
                        <div className="agree-area" onClick={this.state.agreeValue === 0 || !this.state.agreeValue ? this.zan.bind(this, id) : null}>
                            <span className={this.state.agreeValue === 1 ? "icon icon-heart-selected" : "icon icon-heart"}></span>
                            <p>{this.state.agreeNum ? this.state.agreeNum : 0}</p>
                        </div>
                        <div className="money-area">
                            <span className="icon icon-money"></span>
                            <p>{awardNum ? awardNum : 0}</p>
                        </div>
                    </div>
                </div>
                <div className="content-area">
                    <h2 className="title">{planName}</h2>
                    <time>{wxCreateTime}</time>
                    <p className="description">{p.textContent}</p>
                </div>
            </li>
        );
    }
}


class FashionMoment extends IM {
    constructor(props) {
        super(props);
        this.state = {
            newMsg: false
        }
        this.reqRecentSessCount = 50; //每次请求的最近会话条数，业务可以自定义

    }
    componentDidMount() {
        document.title = "时尚圈";
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
        let {
            data
        } = this.props.state;
        let newMsg = classNames('bell-link', {
            'active': this.state.newMsg
        });
        return (
            <div className="full-page fashion-moment-area">
                {
                    data.length > 0 ? <List list={data} /> : null
                }
                {this.props.children}

                <Link to="/myDps" className={newMsg}>
                    <svg viewBox="0 0 100 100" className="icon-svg-bell" >
                        <use xlinkHref="/assets/img/icon.svg#svg-bell" />
                    </svg>
                    <span className="circle"></span>
                </Link>
            </div>
        )
    }
}


export default GetNextPage({
    id: 'FashionMoment', //应用关联使用的redux
    component: FashionMoment, //接收数据的组件入口
    url: '/wx/fashion/list',
    data: (props, state) => { //发送给服务器的数据
        let {
            currentPager
        } = state;
        return {
            currentPager
        }
    },
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});