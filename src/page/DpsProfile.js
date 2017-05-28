/**
 * 搭配师个人信息
 * Created by potato on 2017/5/23 0023.
 */
import React, {
    Component
} from 'react';
import {
    browserHistory
} from 'react-router';
import {
    ToolDps
} from '../ToolDps'
import {
    DataLoad,
    GetData
} from '../Component/index';


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

        let main = data.succ ? <DpsProfile data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return (
            <div className="full-page">
                {main}
            </div>
        )
    }
}

class DpsProfile extends Component {
    constructor(props) {
        super(props);
        let {
            isFriend,
            collocation
        } = props.data;
        this.state = {
            isFriend: isFriend || false, //和该用户是否是好友，true是好友，false 非好友
            headUrl: collocation.headUrl || '', //头像
            nickname: collocation.nickname || '', //昵称
            collocationId: collocation.id, //搭配师ID
            timId: collocation.timId, //即时通讯搭配师ID
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
        this.listeners = {};
        //参数:options
        //初始化时，其他对象，选填
        this.options = {
            'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
            'isLogOn': false //是否开启控制台打印日志,默认开启，选填
        }


    }

    componentDidMount() {
        document.title = "搭配师个人信息";
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

            },
            (err) => {
                console.log(err.ErrorInfo);
                // this.login(data);
            }
        );
    }



    /**
     * [applyAddFriend 申请加好友]
     * @return {[type]} [description]
     */
    applyAddFriend() {
        let add_friend_item = [{
            'To_Account': this.state.timId,
            "AddSource": "AddSource_Type_Unknow",
            "AddWording": '' //加好友附言，可为空
        }];
        var options = {
            'From_Account': this.loginInfo.identifier,
            'AddFriendItem': add_friend_item
        };

        webim.applyAddFriend(
            options,
            (resp) => {
                if (resp.ResultItem.length > 0) {
                    this.toLink();
                }

            },
            function(err) {
                alert(err.ErrorInfo);
            }
        );
    }


    toChat() {
        if (!this.state.isFriend) {
            this.applyAddFriend();
        } else {
            this.toLink();
        }
    }


    toLink() {
        browserHistory.push('/chat?selToID=' + this.state.timId + "&headUrl=" + this.state.headUrl + "&nickname=" + this.state.nickname);
    }

    render() {
        let {
            collocation,
            plans
        } = this.props.data;
        return (
            <section className="full-page profile-container" >
                <header>
                    <div className="head-img">
                        <img src={collocation.headImg} alt=""/>
                         <span className="sex">{collocation.sex === 1 ? '♂' : '♀'}</span>
                    </div>
                </header>
                <p className="name">{collocation.nickName}</p>
                <div className="figure-info-area">
                    <h3 className="title">简介</h3>
                    <p className="text-center dps-style">{collocation.goodsStyle}</p>
                    <p className="dps-introduce-text">{collocation.remark}</p>
                    <button className="btn dps-chat-btn" onClick={this.toChat.bind(this)}>立即咨询</button>
                </div>
                <div className="photo-wall">
                    <h4 className="title">客户案例</h4>
                    <div className="photo-area">
                        {
                            plans.map((lifeImg,index)=>{
                                return (
                                    <div className="item" key={index}>
                                        <img src={lifeImg} alt=""/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        );
    }
}



export default GetData({
    id: 'Profile', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/fashion/collocation',
    data: (props, state) => {
        let {
            collocationId
        } = props.params;
        return {
            collocationId: collocationId
        }
    }, //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
            return state
        } //请求失败后执行的方法
});