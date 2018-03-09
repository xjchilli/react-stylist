import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from '../../Action/Index';
import IM from '../../page/component/IM';

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
            <section className="new-info-area">
                {
                    this.state.newMsg ? <span className="cicle"></span> : null
                }
            </section>
        )
    }
}

export default connect((state) => { return { MyNews: state.MyNews }; }, action('setNews'))(MyNews);