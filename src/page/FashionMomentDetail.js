/**
 *
 * 时尚圈详情
 * Created by potato on 2017/5/22 0022.
 */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { ToolDps } from '../ToolDps';
// import { target } from '../Config/Config';
import classNames from 'classnames';
import { DataLoad, GetData, Msg, PreviewImg, ToReward } from "../Component/index";
import IM from './component/IM';
import ShareConfig from './component/ShareConfig';


/**
 * 搭配师信息
 */
class DapeisInfo extends Component {
    render() {
        let {
            headImg,
            nickName,
            sex,
            id
        } = this.props.collocation;
        return (
            <Link to={"/dpsProfile?collocationId=" + id}>
                <header>
                    <div className="item">
                        <img src={headImg} alt="" />
                        <i className="gender">{sex === 1 ? '♂' : '♀'}</i>
                    </div>
                    <div className="item">
                        <p className="nickname">{nickName}</p>
                    </div>
                </header>
            </Link>
        )
    }
}

/**
 * 方案内容
 */
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewBigImg: false,//是否预览大图
            bigImgUrl: ''//大图url
        }
    }
    render() {
        let {
            planName,
            createTime,
            // smallImg,
            content
        } = this.props.plan;
        return (
            <section className="content">
                <h1>{planName}</h1>
                <time>{createTime}</time>
                <div className="text" dangerouslySetInnerHTML={{ __html: content }}></div>
                {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}
            </section >
        )
    }
}

/**
 * 打赏
 */
class ReWard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            awardUserAvatar: props.awardUserAvatar || [],
            toReward: false //是否显示打赏窗口
        }

    }



    /**
     * 打赏回调函数
     */
    rewardCallback() {
        //显示打赏人头像
        ToolDps.get('/wx/user/info').then((data) => {
            if (data.succ) {
                let headUrlArr = Array.prototype.slice.apply(this.state.awardUserAvatar);
                headUrlArr.push(data.headImg);
                this.setState({
                    awardUserAvatar: headUrlArr,
                    toReward: false
                });
            }
        });

    }

    render() {
        return (
            <section className="reward-area">
                <p>打赏一杯咖啡吧~</p>
                <button className="btn" onClick={() => { this.setState({ toReward: true }) }}>打赏</button>
                {this.state.awardUserAvatar.length > 0 ? <p className="reward-num">{this.state.awardUserAvatar.length}人打赏</p> : null}
                <div className="reward-person">
                    {
                        this.state.awardUserAvatar.map((url, index) => {
                            return (
                                <img key={index} src={url} alt="" />
                            )
                        })
                    }
                </div>
                {this.state.toReward ? <ToReward rewardCallback={this.rewardCallback.bind(this)} hideToReward={() => { this.setState({ toReward: false }) }} url='/wx/fashion/award' id={this.props.planId} /> : null}
            </section>
        )
    }
}



/**
 * 评论
 */
class Comment extends Component {

    constructor(props) {
        super(props);
        let {
            id
        } = this.props.plan;
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            planId: id, //方案id
            arrays: [], //评论列表
            newCommentContent: ''
        }
    }

    componentDidMount() {
        ToolDps.get('/wx/comment/getPlan', {
            planId: this.state.planId
        }).then((res) => {
            if (res.succ) {
                this.props.setCommentNum(res.pager.arrays.length);
                this.setState({
                    arrays: res.pager.arrays
                })
            }
        });
    }

    /**
     * 评论
     * */
    toComment() {
        let newCommentContent = this.state.newCommentContent;
        if (!newCommentContent.trim()) return;
        ToolDps.post('/wx/comment/plan', {
            content: this.state.newCommentContent,
            planId: this.state.planId
        }).then((res) => {
            if (res.succ) {
                let commentArr = Array.prototype.slice.apply(this.state.arrays);
                commentArr.splice(0, 0, res.data);
                this.props.setCommentNum(commentArr.length);
                this.setState({
                    newCommentContent: '',
                    arrays: commentArr
                })
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '评论失败', //提示内容
                });
            }
        });
    }

    render() {
        return (
            <section className="comment-area">
                <div id="user-comment" className="user-comment">
                    <div className="item">
                        <input type="text" placeholder="说说你的想法吧~" value={this.state.newCommentContent} onChange={(e) => { this.setState({ newCommentContent: e.target.value }) }} />
                    </div>
                    <div className="item">
                        <button className="btn" onClick={this.toComment.bind(this)}>发送</button>
                    </div>
                </div>
                <ul className="comment-list">
                    {
                        this.state.arrays.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div className="item">
                                        <img src={item.headImg} alt="" />
                                        <i className="gender">{item.sex === 1 ? '♂' : '♀'}</i>
                                    </div>
                                    <div className="item">
                                        <p className="nickname">{item.nickName}</p>
                                        <time>{item.time}</time>
                                        <p className="comment-content">{item.content}</p>
                                        {
                                            item.reply.map((data, i) => {
                                                return <AuthorReply data={data} key={i} />
                                            })
                                        }

                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}

/**
 * 作者回复
 */
class AuthorReply extends Component {
    render() {
        let data = this.props.data;
        return (
            <section className="reply-area">
                <p className="author-nickname">作者回复</p>
                <time>{data.createTime}</time>
                <p className="comment-content">{data.content}</p>
            </section>
        )
    }
}

/**
 * 方案底部内容
 */
class Footer extends Component {

    constructor(props) {
        super(props);
        let {
            agreeNum,
            agreeValue,
            id
        } = this.props.plan;
        this.state = {
            agreeValue: agreeValue, //该用户是否点赞 0:未点赞，1已经点赞
            agreeNum: agreeNum, //	点赞数
            id: id, //方案id
            commentTotalNum: this.props.commentTotalNum //评论总条数
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            commentTotalNum: nextProps.commentTotalNum
        });
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

        let agree = classNames('icon-svg-zan', {
            'active': this.state.agreeValue === 1
        })
        return (
            <footer>
                <div className="item" onClick={this.state.agreeValue === 0 || !this.state.agreeValue ? this.zan.bind(this, this.state.id) : null}>
                    <span className="agree" >
                        <svg viewBox="0 0 200 200" className={agree} >
                            <use xlinkHref="/assets/img/icon.svg#svg-zan" />
                        </svg>
                    </span>
                    <p className="num">{this.state.agreeNum ? this.state.agreeNum : 0}</p>
                </div>
                <div className="item">
                    <a href="#user-comment">
                        <span className="agree" >
                            <svg viewBox="0 0 1024 1024" className="icon-svg-comment" >
                                <use xlinkHref="/assets/img/icon.svg#svg-comment" />
                            </svg>
                        </span>
                        <p className="num">{this.state.commentTotalNum}</p>
                    </a>
                </div>
            </footer>
        )
    }
}

class FashionMomentDetail extends IM {
    constructor(props) {
        super(props);
        let {
            data: {
                plan
            }
        } = props.state;
        this.state = {
            plan: plan,
            newMsg: false, //即时通讯新消息
            commentTotalNum: 0, //评论总条数
            planId: plan.id, //方案id
        };

        this.reqRecentSessCount = 50; //每次请求的最近会话条数，业务可以自定义

    }

    componentDidMount() {
        document.title = "时尚圈详情";
        let p = document.createElement('p');
        p.innerHTML=this.state.plan.content;
        //分享配置
        ShareConfig({
            title: this.state.plan.planName, // 分享标题
            desc: p.textContent, // 分享描述
            link: window.location.href, // 分享链接
            imgUrl: this.state.plan.masterImage, // 分享图标
        });

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

    /**
     * 设置评论数量
     * @num 数量
     */
    setCommentNum(num) {
        this.setState({
            commentTotalNum: num
        });
    }

    render() {
        let newMsg = classNames('bell-link', {
            'active': this.state.newMsg,
        });

        let {
            data: {
                awardUserAvatar,
            collocation,
            plan
            }
        } = this.props.state;

        return (
            <section className="fashionMomentDetailArea">
                <div className="bgWhite box" >
                    <DapeisInfo collocation={collocation} />
                    <Content plan={plan} />
                    <ReWard awardUserAvatar={awardUserAvatar} planId={this.state.planId} />
                    <Comment plan={plan} setCommentNum={this.setCommentNum.bind(this)} />
                </div>
                <Footer plan={plan} commentTotalNum={this.state.commentTotalNum} />
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
        let succ = false;
        if (data) {
            succ = data.succ;
        }
        let main = succ ? <FashionMomentDetail {...this.props} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}


export default GetData({
    id: 'FashionMomentDetail', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/fashion/detail',
    data: (props, state) => { //发送给服务器的数据
        ToolDps.reloadUrl();
        let { planId } = qs.parse(props.location.search);
        return {
            planId: planId
        }
    },
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});