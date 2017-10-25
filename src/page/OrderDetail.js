/**
 * 订单详情
 *
 * Created by potato on 2017/5/12 0012.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { DataLoad, GetData, Msg, ToReward, PreviewImg } from '../Component/index';
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import WxAuth from './component/WxAuth';




/**
 * 用户对搭配师评价
 */
class Score extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { data } = this.props;
        let score = Number(data.score);
        let scoreHtml = [];
        for (let i = 0; i < 5; i++) {
            if (i < score) {
                scoreHtml.push(<span className="icon icon-star-selected" key={i}></span>);
            } else {
                scoreHtml.push(<span className="icon icon-star-normal" key={i}></span>);
            }
        }
        return (
            <section className="score-area">
                <div className="score">
                    {scoreHtml}
                </div>
                <p className="user-comment-content">{data.content}</p>
                {
                    data.reply.map((item, index) => {
                        return <DpsReply data={item} key={index} />
                    })
                }
            </section>
        )
    }
}

class DpsReply extends Component {
    render() {
        let { data } = this.props;
        return (
            <section className="dps-reply">
                <h6>{data.nickName}的回复：</h6>
                <p className="content">{data.content}</p>
            </section>
        )
    }
}

/**
 * 搭配物品
 */
class DaipeiGoods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewBigImg: false,//是否预览大图
            bigImgUrl: ''//大图url
        }
    }

    render() {
        let {
            data
        } = this.props;
        return (
            <ul className="flex-box photo-area">
                {
                    data.map((url, index) => {
                        return (
                            <li className="item-3" key={index}>
                                <div className="img-show" style={{ backgroundImage: 'url(' + url + ')' }} onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: url }) }} ></div>
                            </li>
                        )
                    })
                }
                {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}
            </ul>
        )
    }
}

/**
 * 取消订单
 */
class CancleOrder extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        clearTimeout(this.time);
    }


    /**
     * 取消订单
     */
    orderCancel() {
        let flag = window.confirm("您确定要取消订单嘛?");
        if (!flag) return false;
        ToolDps.post('/wx/order/canel', {
            orderId: this.props.order.ordreId
        }).then((res) => {
            if (res.succ) {
                this.props.msgLayerShow({
                    msgShow: true,
                    msgText: '取消成功', //提示内容
                });
                this._time = setTimeout(() => {
                    this.context.router.history.push('/orderList');
                }, 1500);
            }
        });
    }

    render() {
        return (
            <section className="cancle-order" onClick={this.orderCancel.bind(this)}>取消订单</section>
        )
    }
}

CancleOrder.contextTypes = {
    router: PropTypes.object.isRequired
}

/**
 * 支付  订单状态：待付款
 */
class ToPay extends Component {
    constructor(props) {
        super(props);
        this.time = 0;
    }

    render() {
        return (
            <div className="action-area">
                <Link className="btn" to={"/pay?orderId=" + this.props.order.ordreId}>付款</Link>
            </div>
        )
    }
}




/**
 * 取消发布
 */
class PublishCancel extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        clearTimeout(this._time);
    }

    /**
     * 取消发布
     */
    cancel() {
        ToolDps.post('/wx/order/refund', {
            orderId: this.props.orderId
        }).then((res) => {
            if (res.succ) {
                this.props.msgLayerShow({
                    msgShow: true,
                    msgText: '取消成功', //提示内容
                });
                this._time = setTimeout(() => {
                    this.context.router.history.push('/orderList');
                }, 1500);
            }
        });
    }

    render() {
        return (
            <div className="action-area">
                <button className="btn" onClick={this.cancel.bind(this)} >取消发布</button>
            </div>
        )
    }
}

PublishCancel.contextTypes = {
    router: PropTypes.object.isRequired
}

/**
 * 去沟通
 */
class ToChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEndService: false//是否结束服务
        }
    }

    /**
     * 结束服务
     */
    endService() {
        let {
            ordreId
        } = this.props.order;
        this.setState({
            isEndService: true
        })
        ToolDps.post('/wx/order/finish', {
            orderId: ordreId
        }).then((res) => {
            if (res.succ) {
                this.props.commentLayerShow(res.finishTime);
            } else {
                this.props.msgLayerShow({
                    msgShow: true,
                    msgText: '操作失败'
                });
            }
        });


    }



    render() {
        let {
            timId,
            nickName,
            headImg
        } = this.props.collocation;
        return (
            <div className="action-area">
                <Link className="btn" to={"/chat?selToID=" + timId + "&headUrl=" + headImg + "&nickname=" + nickName}>
                    沟通
                </Link>
                {
                    !this.state.isEndService ? (
                        <button className="btn" onClick={this.endService.bind(this)}>结束服务</button>
                    ) : null
                }

            </div>
        )
    }
}



/**
 * 评价
 *
 */
class Comment extends Component {
    constructor(props) {
        super(props);
    }

    /**
     *显示评论
     * 
     */
    showComment() {
        this.props.commentLayerShow();
    }

    render() {
        return (
            <div className="action-area">
                <button className="btn" onClick={this.showComment.bind(this)}>评价</button>
                <button className="btn" onClick={() => { this.props.rewardShow() }}>打赏</button>
            </div>
        )
    }
}

/**
 * 去评论
 */
class ToCommnet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endServiceTime: this.props.endServiceTime || '', //用户主动结束服务时间
            score: 0, //分数
            content: '', //评论内容
        }
        this._time = 0;
    }

    componentWillUnmount() {
        clearTimeout(this._time);
    }

    /**
     * 去评论
     * */
    toComment() {
        let {
            order: {
                ordreId
            }
        } = this.props;
        let score = this.state.score;
        if (score == 0) {
            this.props.msgLayerShow({
                msgShow: true,
                msgText: '请打分哦', //提示内容
            });
            return;
        }
        ToolDps.post('/wx/comment/add', {
            score: score,
            content: this.state.content,
            orderId: ordreId
        }).then((res) => {
            if (res.succ) {
                this.props.msgLayerShow({
                    msgShow: true,
                    msgText: '评论成功', //提示内容
                });
                this._time = setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        });
    }
    render() {

        let {
            collocation,
            order
        } = this.props;
        let score = Number(this.state.score);
        let scoreHtml = [];
        for (let i = 0; i < 5; i++) {
            if (i < score) {
                scoreHtml.push(<span className="icon icon-star-selected" key={i} onClick={() => { this.setState({ score: i + 1 }) }}></span>);
            } else {
                scoreHtml.push(<span className="icon icon-star-normal" key={i} onClick={() => { this.setState({ score: i + 1 }) }}></span>);
            }
        }

        return (
            <section className="user-comment-area">
                <section className="box">
                    <ul className="flex-box header-area">
                        <li className="text-right">
                            <header className="dps-header">
                                <img src={collocation.headImg} alt="" />
                            </header>
                        </li>
                        <li>
                            <span className="nickname">【搭配师】{collocation.nickName}</span>
                            <time className="match-time">匹配时间：{order.taskTime}</time>
                            <time className="end-time">结束时间：{this.state.endServiceTime != "" ? this.state.endServiceTime : order.finshTime}</time>
                        </li>
                    </ul>
                    <div className="star-area text-center">
                        {scoreHtml}
                    </div>
                    <section className="content">
                        <textarea placeholder="评价下搭配师的服务吧~" onChange={(e) => { this.setState({ content: e.target.value }) }} value={this.state.content} />
                    </section>
                    <button className="btn finish-btn" onClick={this.toComment.bind(this)}>完成</button>
                    <span className="icon icon-close-gray" onClick={this.props.commentLayerHide}></span>
                </section>
            </section>
        )
    }
}

/**
 * 订单完成
 */
class OrderFinish extends Component {
    render() {
        return (
            <div className="action-area">
                <button className="btn" onClick={() => { this.props.rewardShow() }}>打赏</button>
            </div>
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

        let main = data.succ ? <OrderDetail data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}



class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewBigImg: false,//是否预览大图
            bigImgUrl: '',//大图url
            shareTip: false,//分享提示显示
            msgShow: false,
            msgText: '', //提示内容
            commentLayer: false, //是否显示评论窗口
            endServiceTime: '', //用户主动结束服务时间
            toReward: false //是否显示打赏窗口
        };

    }

    componentDidMount() {
        document.title = "订单详情";
        WxAuth();
    }

    msgLayerShow(obj) {
        this.setState({
            msgShow: obj.msgShow,
            msgText: obj.msgText, //提示内容
        });
    }

    /**
     * 显示评论窗口
     */
    commentLayerShow(finishTime) {
        let obj = {
            commentLayer: true
        }
        if (finishTime) {
            obj.endServiceTime = finishTime;
        }

        this.setState(obj);
    }

    /**
     * 隐藏评论窗口
     */
    commentLayerHide() {
        this.setState({
            commentLayer: false
        });
    }



    /**
     * 显示打赏
     */
    rewardShow() {
        this.setState({
            toReward: true
        });
    }

    render() {
        let {
            requirement,
            collocation,
            comment,
            order,
            userId,
            projectItem,
            prestigeInfo
        } = this.props.data;
        return (
            <div className="full-page order-detail-box">
                <section className="time-area">
                    <p>订单编号：<span>{order.ordreId}</span></p>
                    <p>创建时间：<span>{requirement.createTime}</span></p>
                    <span className="status">{order.statusStr}</span>
                </section>
                {/*订单类型*/}
                <h4 className="title">订单类型</h4>
                <section className="typeName">{requirement.typeName}</section>
                {/*搭配师*/}
                {
                    collocation ? <h4 className="title">搭配师</h4> : null
                }
                {
                    collocation ? (
                        <ul className="dps-area flex-box">
                            <li>
                                <header className="dps-header">
                                    <img src={collocation.headImg} alt="" />
                                </header>
                            </li>
                            <li>
                                <span className="nickname">【搭配师】{collocation.nickName}</span>
                                {order.taskTime ? <time className="match-time">匹配时间：{order.taskTime}</time> : null}
                                {order.finshTime ? <time className="end-time">结束时间：{order.finshTime}</time> : null}
                            </li>
                        </ul>
                    ) : null
                }
                {/*基本信息*/}
                <h4 className="title">基本信息</h4>
                <section className="requirement-area">
                    {
                        prestigeInfo ? (
                            <ul className="flex-box plain-info">
                                <li className="item-3"><p>性别：{prestigeInfo.sex == 2 ? "女" : "男"}</p></li>
                                <li className="item-3"><p>职业：{prestigeInfo.professional}</p></li>
                                <li className="item-3"><p>年龄：{prestigeInfo.age}岁</p></li>
                                <li className="item-3"><p>身高：{prestigeInfo.heigh}cm</p></li>
                                <li className="item-3"><p>体重：{prestigeInfo.weight}kg</p></li>
                            </ul>
                        ) : null
                    }
                    <section className="form-content">
                        {requirement.costCode ? <p className="text">预期花费：<span>&yen;{requirement.costCode}</span></p> : null}
                        {requirement.shops.length > 0 ? (
                            <p className="text">搭配商品：
                                {
                                    requirement.shops.map((shop, s) => {
                                        return (<span key={s}>{shop}</span>)
                                    })
                                }

                            </p>) : null}
                        {requirement.scenes.length > 0 ? (
                            <p className="text">搭配场景：
                                {
                                    requirement.scenes.map((scenes, i) => {
                                        return (<span key={i}>{scenes}</span>)
                                    })
                                }

                            </p>) : null}
                        {requirement.time ? <p className="text">约定时间：<span>{requirement.time}</span></p> : null}
                        {requirement.addres ? <p className="text">约定地址：<span>{requirement.addres}</span></p> : null}
                    </section>
                </section>
                {/*肤色体型*/}
                {
                    prestigeInfo ? (<h4 className="title">肤色、体型</h4>) : null
                }
                {
                    prestigeInfo ? (
                        <section className="skin-body">
                            <div className="skin-body-box">
                                <img src={prestigeInfo.colorofskinImg} height="65" />
                                <p>{prestigeInfo.colorofskinValues}</p>
                            </div>
                            <div className="skin-body-box">
                                <img src={prestigeInfo.bodySizeImg} height="65" />
                                <p>{prestigeInfo.bodySizeValues}</p>
                            </div>
                        </section>
                    ) : null
                }
                {/*个人照片*/}
                {
                    prestigeInfo ? (<h4 className="title">个人照片</h4>) : null
                }
                {
                    prestigeInfo ? (
                        <ul className="flex-box private-photo">
                            <li className="item-2">
                                <div className="box" style={{ backgroundImage: "url(" + prestigeInfo.faceLifeImg + ")" }} onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: prestigeInfo.faceLifeImg }) }}></div>
                            </li>
                            <li className="item-2">
                                <div className="box" style={{ backgroundImage: "url(" + prestigeInfo.bodyFaceImg + ")" }} onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: prestigeInfo.bodyFaceImg }) }}></div>
                            </li>
                        </ul>
                    ) : null
                }

                {/*喜欢的穿衣风格*/}
                {
                    prestigeInfo ? (<h4 className="title">喜欢的穿衣风格</h4>) : null
                }
                {
                    prestigeInfo ? (
                        <ul className="flex-box styles-area">
                            {
                                prestigeInfo.styleValues.map((style, index) => {
                                    return (<li className="item-3" key={index}>{style}</li>)
                                })
                            }
                        </ul>
                    ) : null
                }


                {/*需求描述*/}
                <h4 className="title">需求描述</h4>
                <p className="remark">{requirement.remark}</p>
                {/*搭配物品*/}
                {requirement.garderobes && requirement.garderobes.length > 0 ? <h4 className="title">搭配物品</h4> : null}
                {requirement.garderobes && requirement.garderobes.length > 0 ? <DaipeiGoods data={requirement.garderobes} /> : null}
                {/*需求描述*/}
                <h4 className="title">套餐清单</h4>
                <ul className="order-item">
                    {
                        projectItem.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span className="name">{item.title}</span>
                                    <span className="single-price">&yen;{item.money}/次</span>
                                    <span>x{item.num}</span>
                                    <span className="total">&yen;{item.totalMoney}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <section className="order-total-price">
                    订单金额
                    <div className="price">
                        <span>&yen;{order.transactionPrice}</span>
                        <br />
                        {order.originalPrice != order.transactionPrice ? <del>原价:&yen;{order.originalPrice}</del> : null}
                    </div>
                </section>
                {/*评论*/}
                {comment ? <h4 className="title">评价</h4> : null}
                {comment ? <Score data={comment} /> : null}
                {/* 更多操作 */}
                {order.status === 0 ? <h4 className="title">更多操作</h4> : null}
                {order.status === 0 ? <CancleOrder order={order} msgLayerShow={this.msgLayerShow.bind(this)} /> : null}

                {/* 页面底部按钮操作 */}
                <section className="user-order-action-area">
                    <span className="name">订单金额:</span>
                    <span className="price">&yen;{order.transactionPrice}</span>
                    {/*支付*/}
                    {order.status === 0 ? <ToPay order={order} /> : null}
                    {/*取消发布button*/}
                    {order.status === 1 ? <PublishCancel orderId={order.ordreId} msgLayerShow={this.msgLayerShow.bind(this)} /> : null}
                    {/*咨询、结束服务button*/}
                    {order.status === 2 ? <ToChat collocation={collocation} order={order} msgLayerShow={this.msgLayerShow.bind(this)} commentLayerShow={this.commentLayerShow.bind(this)} /> : null}
                    {/*评价button*/}
                    {order.status === 3 ? <Comment rewardShow={this.rewardShow.bind(this)} commentLayerShow={this.commentLayerShow.bind(this)} /> : null}
                    {/*订单已完成button*/}
                    {order.status === 10 ? <OrderFinish rewardShow={this.rewardShow.bind(this)} /> : null}
                </section>





                {/*评论窗口*/}
                {this.state.commentLayer ? <ToCommnet commentLayerHide={this.commentLayerHide.bind(this)} collocation={collocation} order={order} msgLayerShow={this.msgLayerShow.bind(this)} endServiceTime={this.state.endServiceTime} /> : null}
                {/*提示信息*/}
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
                {/*打赏*/}
                {this.state.toReward ? <ToReward rewardCallback={() => { }} hideToReward={() => { this.setState({ toReward: false }) }} url='/wx/order/award' id={order.ordreId} /> : null}
                {order.couponsActiveId && order.status === 1 || order.status === 2 || order.status === 3 || order.status === 10 ? <RedPackage couponsActiveId={order.couponsActiveId} shawTip={() => { this.setState({ shareTip: true }) }} /> : null}
                {this.state.shareTip ? <RedPackageShareTip hideTip={() => { this.setState({ shareTip: false }) }} /> : null}
                {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}
            </div>
        )
    }
}

/**
 * 红包
 */
class RedPackage extends Component {
    componentDidMount() {
        wx.onMenuShareTimeline({
            title: '送你一个私人搭配师！领优惠劵即刻享受服务！', // 分享标题
            desc: '我刚拥有了一个私人搭配师，这感觉太棒啦！给你分享一张优惠券，你也愿意尝试一下吗？', // 分享描述
            link: ToolDps.getHost + '/getPromotion?couponsActiveId=' + this.props.couponsActiveId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: ToolDps.getHost + '/assets/img/logo.jpg', // 分享图标
        });
        wx.onMenuShareAppMessage({
            title: '送你一个私人搭配师！领优惠劵即刻享受服务！', // 分享标题
            desc: '我刚拥有了一个私人搭配师，这感觉太棒啦！给你分享一张优惠券，你也愿意尝试一下吗？', // 分享描述
            link: ToolDps.getHost + '/getPromotion?couponsActiveId=' + this.props.couponsActiveId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: ToolDps.getHost + '/assets/img/logo.jpg', // 分享图标
        });
        // wx.ready(function () {


        // });
    }

    render() {
        return (
            <section className="red-package-area" onClick={this.props.shawTip}>
                <img className="red-fun" src="/assets/img/promotion/red-fun.png" />
                <img className="fahongbao" src="/assets/img/promotion/fahongbao.jpg" />
            </section>
        )
    }
}

/**
 * 红包提示
 */
class RedPackageShareTip extends Component {
    render() {
        return (
            <section className="share-red-package" onClick={this.props.hideTip}>
                <img className="response_img" src="/assets/img/promotion/share-red-package.png" />
            </section>
        )
    }
}

export default GetData({
    id: 'OrderDetail', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/order/detail',
    data: (props, state) => {
        let { orderId } = qs.parse(props.location.search);
        return {
            orderId: orderId
        }
    }, //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});