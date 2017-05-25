/**
 *
 * 时尚圈详情
 * Created by potato on 2017/5/22 0022.
 */
import React, {
    Component,
    PropTypes
} from 'react';
import {
    Link
} from 'react-router';
import {
    DataLoad,
    GetData
} from '../Component/index';
import {
    ToolDps
} from '../ToolDps';
import classNames from 'classnames';
import {
    Msg
} from "../Component/index";

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
            <Link to={"/dpsProfile/"+id}>
                <header>
                    <div className="item">
                        <img src={headImg} alt=""/>
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
    render() {
        let {
            planName,
            createTime,
            masterImage,
            smallImg,
            content
        } = this.props.plan;
        return (
            <section className="content">
                <h1>{planName}</h1>
                <time>{createTime}</time>
                <img src={masterImage} alt=""/>
                {
                    smallImg.map((url,index)=>{
                        return <img src={url} key={index} alt="" />
                    })
                }
                <div className="text">{content}</div>
            </section>
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
            toReward: false //是否显示打赏窗口
        }

    }

    /*
     *取消打赏窗口
     */
    hideToReward() {
        this.setState({
            toReward: false
        });
    }

    render() {
        return (
            <section className="reward-area">
                <button className="btn" onClick={()=>{this.setState({toReward:true})}}>打赏</button>
                <p>打赏一杯咖啡吧~</p>
                {this.state.toReward ? <ToReward hideToReward={this.hideToReward.bind(this)} /> : null}
            </section>
        )
    }
}

/**
 * 去打赏
 */
class ToReward extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            money: '', //金额
            jsapiSigna: false, //jsapi是否签名
        }
    }

    componentDidMount() {
        ToolDps.get('/wx/user/getJsapiSigna', {
            url: encodeURIComponent(window.location.href.split('#')[0])
        }).then((res) => {
            if (res.succ) {
                let {
                    jsapiSignature
                } = res;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: jsapiSignature.appid, // 必填，公众号的唯一标识
                    timestamp: jsapiSignature.timestamp, // 必填，生成签名的时间戳
                    nonceStr: jsapiSignature.noncestr, // 必填，生成签名的随机串
                    signature: jsapiSignature.signature, // 必填，签名，见附录1
                    jsApiList: [
                            'checkJsApi',
                            'chooseWXPay'
                        ] // 必填
                });

                this.setState({
                    jsapiSigna: true
                });
            }
        });


    }

    /**
     * 打赏金额
     */
    rewardMoney(e) {
        let val = e.target.value.trim();
        let patt = /\.$/gi;
        if (val != "" && val.match(patt) && val.match(patt).length == 1) {
            this.setState({
                money: val
            });
        }
        if (val != "" && !ToolDps.reg.price(val)) {
            return;
        }
        this.setState({
            money: val
        });

    }

    /**
     * 确定打赏
     */
    toPay() {
        if (!this.state.jsapiSigna) {
            this.setState({
                msgShow: true,
                msgText: 'weixin-js未签名', //提示内容
            });
            return;
        }
        if (this.state.money == "") {
            this.setState({
                msgShow: true,
                msgText: '金额格式有误', //提示内容
            });
            return
        };
        if (Number(this.state.money.trim()) <= 0) return;
        ToolDps.post('/wx/fashion/award', {
            money: this.state.money.trim(),
            planId: this.context.planId
        }).then((res) => {
            console.log(res)
            if (res.succ) {
                this.pay(res.payInfo);
            }

        });

    }

    /**
     * 支付
     */
    pay(payInfo) {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady.bind(this, payInfo), false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady.bind(this, payInfo));
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady.bind(this, payInfo));
            }
        } else {
            this.onBridgeReady(payInfo);
        }


    }

    onBridgeReady(payInfo) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": payInfo.appId, //公众号名称，由商户传入
                "timeStamp": payInfo.timeStamp, //时间戳，自1970年以来的秒数
                "nonceStr": payInfo.nonceStr, //随机串
                "package": payInfo.package,
                "signType": payInfo.signType, //微信签名方式：
                "paySign": payInfo.paySign //微信签名
            },
            function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    this.setState({
                        msgShow: true,
                        msgText: '支付成功啦！', //提示内容
                    });
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                    this.setState({
                        msgShow: true,
                        msgText: '支付失败', //提示内容
                    });
                }
            }
        );
    }


    render() {
        return (
            <section className="full-page money-area">
               <section className="money">
                    <div className="input-group">
                        <label htmlFor="num">
                            <svg viewBox="0 0 1024 1024" className="icon-svg-redBag" >
                                <use xlinkHref="/assets/img/icon.svg#svg-redBag"/>
                            </svg>
                        </label>
                        <input id="num" type="number" min={0.01} placeholder="输入打赏金额" value={this.state.money} onChange={this.rewardMoney.bind(this)}/>
                    </div>
                    <div className="option-money">
                        <div className="item">
                            <button className="btn" onClick={()=>{this.setState({money:'100'})}} >100</button>
                        </div>
                        <div className="item">
                            <button className="btn" onClick={()=>{this.setState({money:'200'})}}>200</button>
                        </div>
                        <div className="item">
                            <button className="btn" onClick={()=>{this.setState({money:'500'})}}>500</button>
                        </div>
                    </div>
               </section>
               <div className="text-center action-area">
                   <button className="btn" onClick={this.props.hideToReward.bind(this)}>取消</button>
                   <button className="btn" onClick={this.toPay.bind(this)}>确定打赏</button>
               </div>
               {this.state.msgShow ? <Msg  msgShow={()=>{this.setState({msgShow:false})}} text={this.state.msgText}/> : null}
           </section>
        )
    }
}

ToReward.contextTypes = {
    planId: PropTypes.number
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
            console.log(res);
            if (res.succ) {
                let commentArr = Array.prototype.slice.apply(this.state.arrays);
                commentArr.splice(0, 0, res.data);
                this.props.setCommentNum(commentArr.length);
                this.setState({
                    newCommentContent: '',
                    arrays: commentArr
                })
            }
        });
    }

    render() {
        return (
            <section className="comment-area">
                <div id="user-comment" className="user-comment">
                    <div className="item">
                        <input type="text" placeholder="说说你的想法吧~" value={this.state.newCommentContent} onChange={(e)=>{this.setState({newCommentContent:e.target.value})}}/>
                    </div>
                    <div className="item">
                        <button className="btn" onClick={this.toComment.bind(this)}>发送</button>
                    </div>
                </div>
                <ul className="comment-list">
                    {
                        this.state.arrays.map((item,index)=>{
                            return (
                                <li key={index}>
                                    <div className="item">
                                        <img src={item.headImg} alt=""/>
                                        <i className="gender">{item.sex === 1 ? '♂' : '♀'}</i>
                                    </div>
                                    <div className="item">
                                        <p className="nickname">{item.nickName}</p>
                                        <time>{item.time}</time>
                                        <p className="comment-content">{item.content}</p>
                                    </div>
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
            }
        });

    }


    render() {

        let agree = classNames('icon-svg-zan', {
            'active': this.state.agreeValue === 1
        })
        return (
            <footer>
                <div className="item" onClick={this.state.agreeValue === 0 ? this.zan.bind(this,this.state.id) : null}>
                    <span className="agree" >
                        <svg viewBox="0 0 200 200" className={agree} >
                            <use xlinkHref="/assets/img/icon.svg#svg-zan"/>
                        </svg>
                    </span>
                    <p className="num">{this.state.agreeNum}</p>
                </div>
                <div className="item">
                    <a href="#user-comment">
                        <span className="agree" >
                            <svg viewBox="0 0 1024 1024" className="icon-svg-comment" >
                                <use xlinkHref="/assets/img/icon.svg#svg-comment"/>
                            </svg>
                        </span>
                        <p className="num">{this.state.commentTotalNum}</p>
                    </a>
                </div>
            </footer>
        )
    }
}

class FashionMomentDetail extends Component {
    constructor(props) {
        super(props);
        let {
            data: {
                plan
            }
        } = this.props.state;
        this.state = {
            newMsg: false, //即时通讯新消息
            commentTotalNum: 0, //评论总条数
            planId: plan.id, //方案id
        };

        this.reqRecentSessCount = 50; //每次请求的最近会话条数，业务可以自定义
        //参数：loginInfo
        this.loginInfo = {
            'sdkAppID': '', //用户所属应用id,必填
            'accountType': '', //用户所属应用帐号类型，必填
            'identifier': '', //当前用户ID,必须是否字符串类型，必填
            'userSig': '', //当前用户身份凭证，必须是字符串类型，必填
            'identifierNick': '', //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
            'headurl': '' //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
        };
        //参数：listeners
        this.listeners = {
            "onConnNotify": this.onConnNotify, //监听连接状态回调变化事件,必填
            "onMsgNotify": this.onMsgNotify.bind(this) //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
        };
        //参数:options
        //初始化时，其他对象，选填
        this.options = {
            'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
            'isLogOn': false //是否开启控制台打印日志,默认开启，选填
        }
    }

    componentDidMount() {
        ToolDps.get('/wx/tim/getSignature').then((res) => {
            // console.log(res);
            if (res.succ) {
                let {
                    data
                } = res;
                this.login(data);
            } else {
                alert('签名失败');
            }

        });
    }

    getChildContext() {
        return {
            planId: this.state.planId
        };
    }

    /**
     * 登录
     * @param data
     */
    login(data) {
        //当前用户身份
        this.loginInfo.sdkAppID = data.sdkAppId;
        this.loginInfo.accountType = data.accountType;
        this.loginInfo.identifier = data.identifier;
        this.loginInfo.userSig = data.userSig;
        this.loginInfo.identifierNick = data.identifierNick;
        this.loginInfo.headurl = data.headUrl;

        webim.login(
            this.loginInfo, this.listeners, this.options,
            (resp) => {
                this.loginInfo.identifierNick = resp.identifierNick; //设置当前用户昵称
                // console.log(resp);
                this.getFriends();
            },
            function(err) {
                console.log(err.ErrorInfo);
            }
        );
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
            if (sess.unread() > 0) {
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
                collocation,
                plan
            }
        } = this.props.state;

        return (
            <section className="full-page bgWhite fashionMomentDetailArea">
                <div className="box" >
                     <DapeisInfo collocation={collocation}/>
                    <Content plan={plan}/>
                    <ReWard/>
                    <Comment plan={plan} setCommentNum={this.setCommentNum.bind(this)}/>
                    <Footer plan={plan} commentTotalNum={this.state.commentTotalNum}/>
                    <Link to="/myDps" className={newMsg}>
                        <svg viewBox="0 0 100 100" className="icon-svg-bell" >
                            <use xlinkHref="/assets/img/icon.svg#svg-bell"/>
                        </svg>
                        <span className="circle"></span>
                    </Link>
                </div>
            </section>
        )
    }
}

FashionMomentDetail.childContextTypes = {
    planId: PropTypes.number
}


class Main extends Component {

    constructor(props) {
        super(props);
        let {
            location
        } = props;
        let {
            planId,
            isReload
        } = location.query;
        if (!isReload) {
            window.location.href = '/weixin/fashionMomentDetail?planId=' + planId + '&isReload=yes';
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
        }
        let main = succ ? <FashionMomentDetail {...this.props}  /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return (
            main
        )
    }
}


export default GetData({
    id: 'FashionMomentDetail', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/fashion/detail',
    data: (props, state) => { //发送给服务器的数据
        let {
            planId
        } = props.location.query;
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