/**
 * 我的搭配师
 * Created by potato on 2017/3/30.
 */
import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router';
import {
    Tool
} from '../Tool';
import {
    ToolDps
} from '../ToolDps'
import {
    DataLoad
} from '../Component/index'
import merged from 'obj-merged';


class FriendList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            friends
        } = this.props;
        let friendArr = [];
        for (let userId in friends) {
            friendArr.push(
                <li key={userId}>
                   <Link to={"/chat?selToID="+userId+"&headUrl="+friends[userId].image+"&nickname="+friends[userId].nickname}>
                       <div className="img">
                           <img src={friends[userId].image} className="head-img" width={60} height={60} alt=""/>
                           {friends[userId].unReadNum ? <span className="no-read-num">{friends[userId].unReadNum}</span> : null}
                       </div>
                       <div className="introduce">
                           <p className="name">{friends[userId].nickname}</p>
                           <p className="msgText" dangerouslySetInnerHTML={{__html:friends[userId].lastMsg}}/>
                       </div>
                   </Link>
               </li>
            )
        };



        return (
            <ul className="myDps-area">
                {friendArr}
            </ul>
        )
    }
}


class MyDps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadAnimation: true, //默认显示加载动画
            loadMsg: '正在加载中',
            friends: null //好友列表
        };
        this.reqRecentSessCount = 50; //每次请求的最近会话条数，业务可以自定义
        this.totalCount = 500; //每次接口请求的条数，分页时用到
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
        document.title = "我的搭配师";

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
            (err) => {
                console.log(err.ErrorInfo);
            }
        );
    }


    /**
     * 监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件
     * newMsgList 为新消息数组，结构为[Msg]
     *
     */
    onMsgNotify(newMsgList) {
        // console.log(newMsgList)
        let sess = newMsgList[0].sess;
        console.log(sess)
        this.updateSessDiv(sess.id(), 1, sess._impl.msgs);
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
                    let friendsInfo = {}; //好友
                    let friends = resp.InfoItem;
                    for (let i = 0; i < friends.length; i++) {
                        let friend = friends[i];
                        let friend_account = friend.Info_Account; //用户id
                        let friend_nickname = friend.Info_Account; //默认用户id当呢称
                        let friend_image = '';
                        for (let j in friend.SnsProfileItem) {
                            switch (friend.SnsProfileItem[j].Tag) {
                                case 'Tag_Profile_IM_Nick':
                                    friend_nickname = friend.SnsProfileItem[j].Value;
                                    break;
                                case 'Tag_Profile_IM_Image':
                                    friend_image = friend.SnsProfileItem[j].Value;
                                    break;
                            }
                        }
                        friendsInfo[friend_account] = {
                            'nickname': friend_nickname, //昵称
                            'image': friend_image, //头像
                            'lastMsg': '', //最新未读消息
                            'unReadNum': '', //未读消息数量
                        };
                    }


                    this.initRecentContactList(); //获取最近会话数据
                    this.setState({
                        loadAnimation: false,
                        loadMsg: "加载完成",
                        friends: friendsInfo
                    });
                } else {
                    this.setState({
                        loadAnimation: false,
                        loadMsg: "您暂时没有搭配师哦"
                    });
                }
            },
            (err) => {
                console.log(err.ErrorInfo);
            }
        );
    }

    /**
     * 监听连接状态回调变化事件
     */
    onConnNotify(resp) {
        let info;
        switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
                webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
                break;
            case webim.CONNECTION_STATUS.OFF:
                info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
                // alert(info);
                webim.Log.warn(info);
                break;
            case webim.CONNECTION_STATUS.RECONNECT:
                info = '连接状态恢复正常: ' + resp.ErrorInfo;
                // alert(info);
                webim.Log.warn(info);
                break;
            default:
                webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
                break;
        }
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
        // debugger
        for (let i in sessMap) {
            sess = sessMap[i];
            // console.log(sess._impl.msgs)
            this.updateSessDiv(sess.id(), sess.unread(), sess._impl.msgs);
        }
    }

    /**
     * 更新最近会话的未读消息数
     * @param to_id 好友用户id
     * @param unread_msg_count  未读条数
     */
    updateSessDiv(to_id, unread_msg_count, msgsArr) {
        if (unread_msg_count > 0 && to_id != "@TLS#144115198577104990") {
            if (unread_msg_count >= 100) {
                unread_msg_count = '99';
            }
            let lasMsg = this.convertMsgtoHtml(msgsArr[msgsArr.length - 1]);
            if (!this.state.friends) return;
            let friends = merged(this.state.friends);
            if (friends[to_id]) {
                friends[to_id].lastMsg = lasMsg; //最新一条消息
                if (Number(friends[to_id].unReadNum) != "") {
                    let newUnReadNum = unread_msg_count + friends[to_id].unReadNum;
                    friends[to_id].unReadNum = newUnReadNum > 99 ? 99 : newUnReadNum; //未读消息数量
                } else {
                    friends[to_id].unReadNum = unread_msg_count; //未读消息数量
                }

            }

            this.setState({
                friends: friends
            });
        }


    }

    /**
     * 把消息转换成Html
     */
    convertMsgtoHtml(msg) {
        let html = "",
            elems, elem, type, content;
        elems = msg.getElems(); //获取消息包含的元素数组
        let count = elems.length;
        for (let i = 0; i < count; i++) {
            elem = elems[i];
            type = elem.getType(); //获取元素类型
            content = elem.getContent(); //获取元素对象
            switch (type) {
                case webim.MSG_ELEMENT_TYPE.TEXT:
                    html += this.convertTextMsgToHtml(content);
                    //转义，防XSS
                    // html = webim.Tool.formatText2Html(html);
                    break;
                case webim.MSG_ELEMENT_TYPE.FACE:
                    html += this.convertFaceMsgToHtml(content);
                    break;
                case webim.MSG_ELEMENT_TYPE.IMAGE:
                    html += "[图片]";
                    break;
                default:
                    webim.Log.error('未知消息元素类型: elemType=' + type);
                    break;
            }
        }
        return html;
    }

    /**
     * 解析文本消息元素
     * @param content
     */
    convertTextMsgToHtml(content) {
        return content.getText();
    }

    //解析表情消息元素
    convertFaceMsgToHtml(content) {
        let faceUrl = null;
        let data = content.getData();
        let index = webim.EmotionDataIndexs[data];

        let emotion = webim.Emotions[index];
        if (emotion && emotion[1]) {
            faceUrl = emotion[1];
        }
        if (faceUrl) {
            return "<img src='" + faceUrl + "'/>";
        } else {
            return data;
        }
    }


    render() {
        let main = this.state.friends ? <FriendList friends={this.state.friends}/> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg}/>;
        return (
            <section className="full-page">
                {main}
            </section>
        )
    }
}


export default MyDps;