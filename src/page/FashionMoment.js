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
                        return (<ListItem key={index} {...item} />
                        )
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
        ToolDps.post('/wx/fashion/agree', {
            planId: planId
        }).then((res) => {
            if (res.succ) {
                this.setState({
                    agreeValue: 1,
                    agreeNum: ++this.state.agreeNum
                });
            } else {
                alert('点赞失败');
            }
        });

    }

    render() {
        let {
            id,
            planName,
            createTime,
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
                <Link to={"/fashionMomentDetail?planId=" + id}>
                    <LazyLoad height={200} overflow={true}>
                        <img src={masterImage} className="img-content" alt="" />
                    </LazyLoad>
                    {/*{planName}  */}
                    <h2 className="title">好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上</h2>
                     <div className="footer-area">
                        <span className="agree" onClick={this.state.agreeValue === 0 || !this.state.agreeValue ? this.zan.bind(this, id) : null}>
                            <svg viewBox="0 0 200 200" className={agree} >
                                <use xlinkHref="/assets/img/icon.svg#svg-zan" />
                            </svg>
                            {this.state.agreeNum ? this.state.agreeNum : 0}
                        </span>
                        <span className="money">
                            <svg viewBox="0 0 1024 1024" className="icon-svg-reward" >
                                <use xlinkHref="/assets/img/icon.svg#svg-reward" />
                            </svg>
                            {awardNum ? awardNum : 0}
                        </span>
                    </div>
                    <time>{createTime}</time>
                </Link>
                {/* <Link to={"/fashionMomentDetail?planId=" + id}>
                    <h2 className="title">{planName}</h2>
                    <time>{createTime}</time>
                    <LazyLoad height={200} overflow={true}>
                        <img src={masterImage} className="img-content" alt="" />
                    </LazyLoad>
                    <p className="description">{p.textContent}</p>
                </Link>
                <div className="fashion-action-area">
                    <Link to={"/fashionMomentDetail?planId=" + id} className="read-origin-article">阅读全文</Link>
                    <div className="footer-area">
                        <span className="agree" onClick={this.state.agreeValue === 0 || !this.state.agreeValue ? this.zan.bind(this, id) : null}>
                            <svg viewBox="0 0 200 200" className={agree} >
                                <use xlinkHref="/assets/img/icon.svg#svg-zan" />
                            </svg>
                            {this.state.agreeNum ? this.state.agreeNum : 0}
                        </span>
                        <span className="money">
                            <svg viewBox="0 0 1024 1024" className="icon-svg-reward" >
                                <use xlinkHref="/assets/img/icon.svg#svg-reward" />
                            </svg>
                            {awardNum ? awardNum : 0}
                        </span>
                        <span className="right-arrow">&gt;</span>
                    </div>
                </div> */}
            </li>
        );
    }
}


class FashionMoment extends IM {
    constructor(props) {
        super(props);
        let data = this.arrangeData(props.state.data);
        this.state = {
            newMsg: false,
            leftData: data.colLeft || [],//左列数据
            rightData: data.colRight || []//右列数据
        }
        this.reqRecentSessCount = 50; //每次请求的最近会话条数，业务可以自定义

    }
    componentDidMount() {
        document.title = "时尚圈";
        // this.signature((data) => {
        //     this.login(data, () => {
        //         this.getFriends();
        //     });
        // });
    }

    componentWillReceiveProps(nextProps) {
        let data = this.arrangeData(nextProps.state.data);
        this.setState({
            leftData: data.colLeft,
            rightData: data.colRight
        });
    }

    /**
     * 排列数据
     */
    arrangeData(data) {
        let colLeft = [];//左列数据
        let colRight = [];//右列数据
        for (let i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
                console.log(i);
                colLeft.push(data[i]);
            } else {
                colRight.push(data[i]);
            }
        }

        return {
            colLeft,
            colRight
        }

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
        // let {
        //     data
        // } = this.props.state;
        let newMsg = classNames('bell-link', {
            'active': this.state.newMsg
        });
        return (
            <section className="full-page fashion-moment-area">
                <section className="clear">
                    {
                        this.state.leftData.length > 0 ? <List list={this.state.leftData} /> : null
                    }
                    {
                        this.state.rightData.length > 0 ? <List list={this.state.rightData} /> : null
                    }
                </section>
                {this.props.children}
                <Link to="/myDps" className={newMsg}>
                    <svg viewBox="0 0 100 100" className="icon-svg-bell" >
                        <use xlinkHref="/assets/img/icon.svg#svg-bell" />
                    </svg>
                    <span className="circle"></span>
                </Link>
            </section>
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