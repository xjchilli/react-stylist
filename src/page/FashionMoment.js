/**
 * 时尚圈
 * Created by potato on 2017/4/8.
 */
import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router';
import {
    GetNextPage
} from '../Component/index';
import {
    ToolDps
} from '../ToolDps';
import classNames from 'classnames';



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
        let {
            id,
            planName,
            createTime,
            masterImage,
            awardNum
        } = this.props; //显示数据

        let agree = classNames('icon-svg-zan', {
            'active': this.state.agreeValue === 1
        })


        return (
            <li>
                <Link to={"/fashionMomentDetail?planId="+id}>
                    <h2 className="title">{planName}</h2>
                    <time>{createTime}</time>
                    <img src={masterImage} className="img-content" alt=""/>
                    <p className="description">具体搭配见详情哦~</p>
                </Link>
                <div className="fashion-action-area">
                    <a href="#" className="read-origin-article">阅读全文</a>
                    <div className="footer-area">
                        <span className="agree" onClick={this.state.agreeValue === 0 ? this.zan.bind(this,id) : null}>
                            <svg viewBox="0 0 200 200" className={agree} >
                                <use xlinkHref="/assets/img/icon.svg#svg-zan"/>
                            </svg>
                            {this.state.agreeNum}
                        </span>
                        <span className="money">
                             <svg viewBox="0 0 1024 1024" className="icon-svg-reward" >
                                <use xlinkHref="/assets/img/icon.svg#svg-reward"/>
                            </svg>
                            {awardNum}
                        </span>
                        <span className="right-arrow">&gt;</span>
                    </div>
                </div>
            </li>
        );
    }
}


class FashionMoment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMsg: false
        }
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
        document.title = "时尚圈";
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


    render() {
        let {
            data
        } = this.props.state;
        let newMsg = classNames('bell-link', {
            'active': this.state.newMsg
        });
        return (
            <div className="fashion-moment-area">
                 {
                     data.length > 0 ? <List list={data} /> : null
                 }
                 <Link to="/myDps" className={newMsg}>
                     <svg viewBox="0 0 100 100" className="icon-svg-bell" >
                         <use xlinkHref="/assets/img/icon.svg#svg-bell"/>
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