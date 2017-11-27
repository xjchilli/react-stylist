/**
 *
 * 时尚圈详情
 * Created by potato on 2017/5/22 0022.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { ToolDps } from '../ToolDps';
import classNames from 'classnames';
import { DataLoad, GetData, Msg, PreviewImg, ToReward } from "../Component/index";
import ShareConfig from './component/ShareConfig';
import autosize from 'autosize';
import Scroll from 'react-scroll';
var Lk = Scroll.Link;
// var FastClick = require('fastclick');


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
            <header style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>
                <div className="item">
                    <Link to={"/dpsProfile?collocationId=" + id}>
                        <img src={headImg} alt="" />
                    </Link>
                    {/* {sex && sex === 2 ? (
                            <span className="icon icon-girl"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                        ) : (
                                <span className="icon icon-man"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                            )
                        } */}
                </div>
                <div className="item">
                    <p className="nickname">{nickName}</p>
                </div>

                <div className="item">
                    <Link to={"/dpsProfile?collocationId=" + id + "&tab=2"} className='btn question-btn'>咨询</Link>
                    <button className={this.props.concern ? 'btn watch-btn active' : 'btn watch-btn'} onClick={this.props.watchOrCancel}>{this.props.concern ? "已关注" : "+关注"}</button>
                </div>
            </header>

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
        this.show = this.showImg.bind(this);
    }

    componentDidMount() {
        document.querySelector('.content .text').addEventListener('click', this.show);
    }

    showImg(e) {
        if (e.target.nodeName.toLowerCase() == "img") {//点击图片
            let imgUrl = e.target.getAttribute('src');
            this.setState({
                previewBigImg: true,
                bigImgUrl: imgUrl
            });
        }
    }

    componentWillUnmount() {
        document.querySelector('.content .text').removeEventListener('click', this.show);
    }

    render() {
        let {
            planName,
            wxCreateTime,
            typeVal,
            content
        } = this.props.plan;
        return (
            <section className="content">
                <h1>{planName}</h1>
                {
                    typeVal ? <label>{typeVal}</label> : null
                }
                <br />
                <time>{"发表于" + wxCreateTime}</time>
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
                <p className="text-center">打赏一杯咖啡吧~</p>
                <button className="btn" onClick={() => { this.setState({ toReward: true }) }}>打赏支持</button>
                {this.state.awardUserAvatar.length > 0 ? <p className="reward-num text-center">{this.state.awardUserAvatar.length}人打赏</p> : null}
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
 * 关注搭配师
 */
class WatchDps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collocation: props.collocation
        }

    }


    render() {
        return (
            <section className="watch-dps-area" style={{ borderWidth: ToolDps.iphone ? '0.5px' : '1px' }}>
                <p className="watch-title" style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>关注搭配师，看更多TA的好文章</p>
                <ul className="flex-box">
                    <li>
                        <Link to={"/dpsProfile?collocationId=" + this.state.collocation.id}>
                            <img src={this.state.collocation.headImg} />
                        </Link>
                    </li>
                    <li>
                        <h4 className="dps-nickname">{this.state.collocation.nickName}</h4>
                        <p className="introduce">{this.state.collocation.honor}</p>
                    </li>
                    <li>
                        <button className={this.props.concern ? "btn active" : "btn"} onClick={this.props.watchOrCancel}>{this.props.concern ? "已关注" : "+关注"}</button>
                    </li>
                </ul>
            </section>
        )
    }
}

/**
 * 评论
 */
class Comment extends Component {
    componentDidMount() {
        ToolDps.get('/wx/comment/getPlan', {
            planId: this.props.plan.id
        }).then((res) => {
            if (res.succ) {
                this.props.setCommentNum(res.pager.arrays.length);
                this.props.addComment(res.pager.arrays);
            }
        });
    }

    render() {
        return (
            <section className="comment-area" name="user-comment">
                <div className="comment-num">{this.props.commentTotalNum}次评论</div>
                <ul className="comment-list">
                    {
                        this.props.commentList.map((item, index) => {
                            return (
                                <li key={index} style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>
                                    <section className="box">
                                        <div className="item">
                                            <img src={item.headImg} alt="" />
                                            {/* {item.sex && item.sex === 2 ? (
                                                <span className="icon icon-girl"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                                            ) : (
                                                    <span className="icon icon-man"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                                                )
                                            } */}
                                            {/* <i className="gender">{item.sex === 1 ? '♂' : '♀'}</i> */}
                                        </div>
                                        <div className="item">
                                            <p className="nickname">{item.nickName}</p>
                                            <time>{item.time}</time>
                                            <p className="comment-content">{item.content}</p>
                                        </div>
                                    </section>
                                    {
                                        item.reply.length > 0 ?
                                            (
                                                <section className="dps-reply-box" style={{ borderTopWidth: ToolDps.iphone ? '0.5px' : '1px' }}>
                                                    {
                                                        item.reply.map((data, i) => {
                                                            return <AuthorReply data={data} key={i} />
                                                        })
                                                    }
                                                </section>
                                            ) : null
                                    }


                                </li>
                            )
                        })
                    }

                </ul>

            </section>
        )
    }
}

/**
 * 用户评论
 */
class UserComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
        }
        this.time = 0;
    }

    componentDidMount() {
        autosize(this.textarea);//textarea高度自适应
        this.textarea.focus();
        this.time = setTimeout(function () {
            window.scrollTo(0, 100000);
        }, 200)

    }

    componentWillUnmount() {
        clearTimeout(this.time);
    }

    /**
    * 评论
    * */
    toComment() {
        let newCommentContent = this.props.newCommentContent;
        if (!newCommentContent.trim()) return;
        this.props.setNewCommentContent('');
        ToolDps.post('/wx/comment/plan', {
            content: newCommentContent,
            planId: this.props.plan.id
        }).then((res) => {
            if (res.succ) {
                this.props.hide();
                let commentArr = Array.prototype.slice.apply(this.props.commentList);
                commentArr.splice(0, 0, res.data);
                this.props.setCommentNum(Number(this.props.commentTotalNum) + 1);
                this.props.addComment(commentArr);
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
            <section className="user-to-comment-area" >
                <div className="bg" onClick={this.props.hide}></div>
                <div className="box">
                    <textarea style={{ borderWidth: ToolDps.iphone ? '0.5px' : '1px' }} ref={(el) => { this.textarea = el; }} placeholder="说说你的想法吧~" value={this.props.newCommentContent} onChange={(e) => { this.props.setNewCommentContent(e.target.value.trim()) }} />
                    <button className="btn" onClick={this.toComment.bind(this)}>发表评论</button>
                </div>
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
                <div className="comment-content">
                    <span>{data.nickName + "的回复："}</span>
                    {data.content}
                </div>
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
        let { id } = this.props.plan;
        this.state = {
            id: id, //方案id
            toComment: false,//去评论
            newCommentContent: ''//评论内容
        }
    }


    /**
     * 点赞
     * @planId 方案id
     */
    zan(planId) {
        this.props.setZan(1, ++this.props.plan.agreeNum);
        ToolDps.post('/wx/fashion/agree', {
            planId: planId
        }).then((res) => {
            if (!res.succ) {
                this.props.setZan(0, --this.props.plan.agreeNum);
                alert('点赞失败');
            }
        });
    }


    render() {
        return (
            <footer style={{ borderTopWidth: ToolDps.iphone ? '0.5px' : '1px' }}>
                <section className="to-write" onClick={() => { this.setState({ toComment: true }) }}>
                    <span className="icon icon-write"></span>
                    写下你的评论...
                </section>
                <ul className="flex-box">
                    <li className="item-2" onClick={this.props.plan.agreeValue === 0 ? this.zan.bind(this, this.state.id) : null}>
                        {this.props.plan.agreeValue === 1 ? <span className="icon icon-heart-selected"></span> : <span className="icon icon-heart"></span>}
                        <span className="num">{this.props.plan.agreeNum ? this.props.plan.agreeNum : 0}</span>
                    </li>
                    <li className="item-2" >
                        <Lk activeClass="active" to="user-comment" spy={true} smooth={true} duration={500}>
                            <span className="icon icon-msg"></span>
                            <span className="num">{this.props.commentTotalNum}</span>
                        </Lk>
                    </li>
                </ul>
                {this.state.toComment ? <UserComment newCommentContent={this.state.newCommentContent} setNewCommentContent={(val) => { this.setState({ newCommentContent: val }) }} commentTotalNum={this.props.commentTotalNum} setCommentNum={this.props.setCommentNum} commentList={this.props.commentList} addComment={this.props.addComment} plan={this.props.plan} hide={() => { this.setState({ toComment: false }) }} /> : null}
            </footer>
        )
    }
}

class FashionMomentDetail extends Component {
    constructor(props) {
        super(props);
        let { awardUserAvatar, collocation, plan, concern } = props.data;
        this.state = {
            awardUserAvatar: awardUserAvatar,
            collocation: collocation,
            plan: plan,
            concern: concern,
            commentTotalNum: 0, //评论总条数
            planId: plan.id, //方案id
            msgShow: false,
            msgText: '', //提示内容
            commentList: []//评论数据
        };
    }

    componentDidMount() {
        document.title = "时尚圈详情";
        let p = document.createElement('p');
        p.innerHTML = this.state.plan.content;
        //分享配置
        ShareConfig({
            title: this.state.plan.planName, // 分享标题
            desc: p.textContent, // 分享描述
            link: window.location.href.split('#')[0], // 分享链接 
            imgUrl: this.state.plan.masterImage, // 分享图标
        });
    }

    componentWillReceiveProps(nextProps) {
        let { awardUserAvatar, collocation, plan, concern } = nextProps.data;
        this.setState({
            awardUserAvatar: awardUserAvatar,
            collocation: collocation,
            plan: plan,
            concern: concern,
        });
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

    /**
     * 添加评论数据
     */
    addComment(listData) {
        this.setState({
            commentList: listData
        });
    }

    /**
     * 设置点赞
     */
    setZan(zanFlag, zanNum) {
        let plan = this.state.plan;
        plan.agreeValue = zanFlag;
        plan.agreeNum = zanNum;
        this.setState({
            plan: plan
        })
    }

    /**
     * 关注或者取关
     */
    watchOrCancel() {
        ToolDps.post('/wx/concern/doAddOrDel', { collocationId: this.state.collocation.id }).then((res) => {
            if (res.succ) {
                this.setState({
                    concern: !this.state.concern
                });
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '操作失败' //提示内容
                });
            }
        });
    }



    render() {
        //分享用户id
        let sourceUserId = ToolDps.sessionItem('sourceUserId');
        return (
            // ref={(el) => this.page = el}
            <section className="fashionMomentDetailArea" >
                <DapeisInfo collocation={this.state.collocation} concern={this.state.concern} watchOrCancel={this.watchOrCancel.bind(this)} />
                <Content plan={this.state.plan} />
                <ReWard awardUserAvatar={this.state.awardUserAvatar} planId={this.state.planId} />
                <WatchDps collocation={this.state.collocation} concern={this.state.concern} watchOrCancel={this.watchOrCancel.bind(this)} />
                <Comment plan={this.state.plan} commentTotalNum={this.state.commentTotalNum} commentList={this.state.commentList} addComment={this.addComment.bind(this)} setCommentNum={this.setCommentNum.bind(this)} />
                <Footer plan={this.state.plan} setZan={this.setZan.bind(this)} commentTotalNum={this.state.commentTotalNum} setCommentNum={this.setCommentNum.bind(this)} commentList={this.state.commentList} addComment={this.addComment.bind(this)} />
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
                {/* 用户分享来源才会出现这个按钮 */}
                {
                    sourceUserId ? (
                        <Link to={"/plainPeopleChange?projectId=5&sourceUserId=" + sourceUserId} className="join-link">
                            立即参加改造
                    </Link>
                    ) : null
                }
                <Link to="/" className="home-link">
                    <span className="icon icon-home"></span>
                </Link>
            </section>
        )
    }
}


class Main extends Component {
    constructor(props) {
        super(props);
    }


    /**
     * 保存分享用户id
     * @param {*} props 
     */
    saveSourceUserId(props) {
        let { sourceUserId } = qs.parse(props.location.search);
        if (sourceUserId) {
            ToolDps.sessionItem('sourceUserId', sourceUserId);//用户id
            ToolDps.sessionItem('resourceCollocaitonId', props.state.data.collocation.id);//搭配师id
        }
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
            if (succ) this.saveSourceUserId(this.props);
        }
        let main = succ ? <FashionMomentDetail data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}


export default GetData({
    id: 'FashionMomentDetail', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/fashion/detail',
    data: (props, state) => { //发送给服务器的数据
        // ToolDps.reloadUrl();
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