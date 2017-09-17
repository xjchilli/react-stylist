/**
 * 我的搭配师
 * Created by potato on 2017/3/30.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps'
import { DataLoad } from '../Component/index'
import merged from 'obj-merged';
import IM from './component/IM';



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
                    <Link to={"/chat?selToID=" + userId + "&headUrl=" + friends[userId].image + "&nickname=" + friends[userId].nickname}>
                        <div className="img">
                            <img src={friends[userId].image} className="head-img" width={50} height={50} alt="" />
                            {friends[userId].unReadNum ? <span className="no-read-num">{friends[userId].unReadNum}</span> : null}
                        </div>
                        <div className="introduce">
                            <p className="name">{friends[userId].nickname}</p>
                            <p className="msgText" dangerouslySetInnerHTML={{ __html: friends[userId].lastMsg }} />
                            <p className="time">{friends[userId].time}</p>
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


class MyDps extends IM {
    constructor(props) {
        super(props);
        this.state = {
            loadAnimation: true, //默认显示加载动画
            loadMsg: '正在加载中',
            friends: null //好友列表
        };
        this.reqRecentSessCount = 50; //每次请求的最近会话条数，业务可以自定义
        this.totalCount = 500; //每次接口请求的条数，分页时用到
    }


    componentDidMount() {
        document.title = "我的搭配师";

        this.signature((data) => {
            this.login(data, () => {
                this.getFriends();
            });
        });



    }



    /**
     * 监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件
     * newMsgList 为新消息数组，结构为[Msg]
     *
     */
    onMsgNotify(newMsgList) {
        // console.log(newMsgList)
        let sess = newMsgList[0].sess;
        // console.log(sess)
        this.updateSessDiv(sess.id(), 1, sess._impl.msgs, sess.time());
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
                            'time': ''//会话时间
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
            this.updateSessDiv(sess.id(), sess.unread(), sess._impl.msgs, sess.time());
        }
    }

    /**
     * 更新最近会话的未读消息数
     * @param to_id 好友用户id
     * @param unread_msg_count  未读条数
     * @msgsArr 会话
     * @time 消息时间
     */
    updateSessDiv(to_id, unread_msg_count, msgsArr, time) {
        if (unread_msg_count > 0 && to_id != "@TLS#144115198577104990") {
            if (unread_msg_count >= 100) {
                unread_msg_count = '99';
            }
            let lasMsg = this.convertMsgtoHtml(msgsArr[msgsArr.length - 1]);
            if (!this.state.friends) return;
            let friends = merged(this.state.friends);
            if (friends[to_id]) {
                friends[to_id].lastMsg = lasMsg; //最新一条消息
                friends[to_id].time = ToolDps.formatDate(time * 1000).toString();//消息时间
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
                case webim.MSG_ELEMENT_TYPE.SOUND:
                    html += "[语音]";
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
        let main = this.state.friends ? <FriendList friends={this.state.friends} /> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />;
        return (
            <section className="full-page myDps-page">
                {main}
            </section>
        )
    }
}


export default MyDps;