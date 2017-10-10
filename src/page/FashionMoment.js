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
                        return <ListItem globalState={this.props.globalState} globalSetState={this.props.globalSetState} key={index} {...item} />
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

    componentWillReceiveProps(np) {
        this.setState({
            agreeValue: np.agreeValue, //该用户是否点赞 0:未点赞，1已经点赞
            agreeNum: np.agreeNum //点赞数
        });
    }

    /**
     * 点赞
     * @planId 方案id
     */
    zan(planId) {
        let globalState = this.props.globalState;
        let oldData = globalState.data;
        let newData = oldData.map((item, index) => {
            let data = item;
            if (data.id == planId) {
                data.agreeValue = 1;
                data.agreeNum = ++this.state.agreeNum;
            }
            return data;
        })
        globalState.data = newData;
        this.props.globalSetState(globalState);

        this.setState({
            agreeValue: 1,
            agreeNum: ++this.state.agreeNum
        });
        ToolDps.post('/wx/fashion/agree', {
            planId: planId
        }).then((res) => {
            if (!res.succ) {//点赞失败
                let newData = oldData.map((item, index) => {
                    let data = item;
                    if (data.id == planId) {
                        data.agreeValue = 0;
                        data.agreeNum = --this.state.agreeNum;
                    }
                    return data;
                })
                globalState.data = newData;
                this.props.globalSetState(globalState);
                alert(res.msg);
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
            newMsg: false,
            loadImg: null,//需展示的时尚圈精选图片
            fashionListImg: props.data || [],//时尚圈精选图片
            col1Imgs: [],//时尚圈精选图片1列
            col2Imgs: [],//时尚圈精选图片2列
            col1H: 0,//时尚圈精选图片1列高度
            col2H: 0,//时尚圈精选图片2列高度
        }
        this.reqRecentSessCount = 50; //每次请求的最近会话条数，业务可以自定义

        /**
         * 时尚圈精选将要展示的图片
         */
        this.willImg = function (e) {
            let fashionListImg = Array.prototype.slice.apply(this.state.fashionListImg);
            let willBoxEle = document.querySelector('.will-box');

            if (this.state.col1H <= this.state.col2H) {
                let col1H = this.state.col1H + willBoxEle.offsetHeight;
                let col1Imgs = this.state.col1Imgs;
                col1Imgs.push(this.state.loadImg);
                let sliceArr = fashionListImg.splice(0, 1);
                this.setState({
                    col1H: col1H,
                    col1Imgs: col1Imgs,
                    loadImg: sliceArr[0],
                    fashionListImg: fashionListImg
                })
            } else {
                let col2H = this.state.col2H + willBoxEle.offsetHeight;
                let col2Imgs = this.state.col2Imgs;
                col2Imgs.push(this.state.loadImg);
                let sliceArr = fashionListImg.splice(0, 1);
                this.setState({
                    col2H: col2H,
                    col2Imgs: col2Imgs,
                    loadImg: sliceArr[0],
                    fashionListImg: fashionListImg
                });
                // window.addEventListener('scroll', this.pageScroll, false);
            }
        }

    }
    componentDidMount() {
        document.title = "时尚圈";
        // this.signature((data) => {
        //     this.login(data, () => {
        //         this.getFriends();
        //     });
        // });

        let fashionListImg = Array.prototype.slice.apply(this.state.fashionListImg);
        let sliceArr = fashionListImg.splice(0, 1);
        this.setState({
            loadImg: sliceArr[0],
            fashionListImg: fashionListImg
        })
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
        // let { data } = this.props.state;
        // console.log(data);
        let newMsg = classNames('bell-link', {
            'active': this.state.newMsg
        });
        return (
            <div className="fashion-moment-area">
                {/* data.length > 0 ? <List globalState={this.props.state} globalSetState={this.props.setState} list={data} /> : null */}

                <div className="fashion-list clear">
                    <ul>
                        {
                            this.state.col1Imgs.map((item, index) => {
                                return (
                                    <li className='box' key={index}>
                                        <Link to="/">
                                            <img src={item.url} className="main-img" />
                                        </Link>
                                        <div className='text-area'>
                                            <Link to="/">
                                                <div className="list-title">何穗来教你！超模的“游客照”是这个范儿~的“游客照”是这个范儿的“游客照”是这个范儿</div>
                                            </Link>
                                            <div className="dps-info">
                                                <Link to="/">
                                                    <img src="/assets/img/girl.jpg" className="head-img" />
                                                    <span className="nickname">么么哒</span>
                                                </Link>
                                                <div className="zan">
                                                    <img src="/assets/img/icon/zan.jpg" className="icon" />
                                                    258
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul>
                        {
                            this.state.col2Imgs.map((item, index) => {
                                return (
                                    <li className='box' key={index}>
                                        <Link to="/">
                                            <img src={item.url} className="main-img" />
                                        </Link>
                                        <div className='text-area'>
                                            <Link to="/">
                                                <div className="list-title">何穗来教你！超模的“游客照”是这个范儿~的“游客照”是这个范儿的“游客照”是这个范儿</div>
                                            </Link>
                                            <div className="dps-info">
                                                <Link to="/">
                                                    <img src="/assets/img/girl.jpg" className="head-img" />
                                                    <span className="nickname">么么哒</span>
                                                </Link>
                                                <div className="zan">
                                                    <img src="/assets/img/icon/zan.jpg" className="icon" />
                                                    258
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {/* 时尚圈精选将要展示的图片 */}
                    <ul className="hideItem">
                        <li className='box will-box'>
                            <Link to="/">
                                <img src={this.state.loadImg ? this.state.loadImg.url : ''} className="main-img" onLoad={this.willImg.bind(this)} />
                            </Link>
                            <div className='text-area'>
                                <Link to="/">
                                    <div className="list-title">何穗来教你！超模的“游客照”是这个范儿~的“游客照”是这个范儿的“游客照”是这个范儿</div>
                                </Link>
                                <div className="dps-info">
                                    <Link to="/">
                                        <img src="/assets/img/girl.jpg" className="head-img" />
                                        <span className="nickname">么么哒</span>
                                    </Link>
                                    <div className="zan">
                                        <img src="/assets/img/icon/zan.jpg" className="icon" />
                                        258
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="loading-area">
                        {this.props.children}
                    </div>
                </div>

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