/**
 * 订单详情
 *
 * Created by potato on 2017/5/12 0012.
 */
import React, {
    Component
} from 'react';
import {
    DataLoad,
    GetData
} from '../Component/index';
import {
    Link
} from 'react-router';
import {
    ToolDps
} from '../ToolDps';
import Msg from "../Component/tips/msg";
import classNames from 'classnames';


/**
 * 用户对搭配师评价
 */
class Score extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            data
        } = this.props;
        let score = Number(data.score);
        let scoreHtml = [];
        for (let i = 0; i < 5; i++) {
            if (i < score) {
                scoreHtml.push(<img src="/assets/img/star.png" key={i} alt=""/>);
            } else {
                scoreHtml.push(<img src="/assets/img/starEmpty.png" key={i} alt=""/>);
            }
        }
        return (
            <section>
                <div className="score-area">
                    <label className="text">评分：</label>
                    {scoreHtml}
                </div>
                <h6 className="text">评价：</h6>
                <p className="text">{data.content}</p>
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
    }

    render() {
        let {
            data
        } = this.props;
        return (
            <div className="photo-area">
                {
                    data.map((url,index)=>{
                        return (
                            <div className="item" key={index}>
                                <img src={url} alt=""/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

/**
 * 支付  订单状态：待付款
 */
class ToPay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsapiSigna: false, //js签名
            payInfo: null,
        }
        this._time = 0;
    }

    componentDidMount() {
        ToolDps.post('/wx/order/getUnified', {
            orderId: this.props.orderId
        }).then((res) => {
            if (res.succ) {
                this.setState({
                    payInfo: res,
                })
            }
        });
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
                            'chooseWXPay'
                        ] // 必填
                });

                this.setState({
                    jsapiSigna: true
                });
            }
        });

    }

    componentWillUnmount() {
        clearTimeout(this._time);
    }

    /**
     * 支付
     */
    pay() {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
        } else {
            this.onBridgeReady();
        }
    }

    onBridgeReady() {
        let {
            payInfo: {
                payInfo: data
            },
            jsapiSigna
        } = this.state;
        if (!data || !jsapiSigna) {
            this.props.msgLayerShow({
                msgShow: true,
                msgText: '支付订单未签名', //提示内容
            });
            return;
        }
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": data.appId, //公众号名称，由商户传入
                "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
                "nonceStr": data.nonceStr, //随机串
                "package": data.package,
                "signType": data.signType, //微信签名方式：
                "paySign": data.paySign //微信签名
            },
            function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    this.props.msgLayerShow({
                        msgShow: true,
                        msgText: '支付成功啦！', //提示内容
                    });
                    this._time = setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                    this.props.msgLayerShow({
                        msgShow: true,
                        msgText: '支付失败', //提示内容
                    });
                }
            }
        );
    }

    /**
     * 取消订单
     */
    orderCancel() {
        ToolDps.post('/wx/order/canel', {
            orderId: this.props.orderId
        }).then((res) => {
            if (res.succ) {
                this.props.msgLayerShow({
                    msgShow: true,
                    msgText: '取消成功', //提示内容
                });
                this._time = setTimeout(() => {
                    this.context.router.push('/orderList');
                }, 1500);
            }
        });
    }

    render() {
        let {
            payInfo
        } = this.state;
        return (
            <div className="action-area">
                <button onClick={this.pay.bind(this)}>付款￥{payInfo ? payInfo.price : null}</button>
                <button onClick={this.orderCancel.bind(this)}>取消订单</button>
            </div>
        )
    }
}

ToPay.contextTypes = {
    router: React.PropTypes.object.isRequired
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
                    this.context.router.push('/orderList');
                }, 1500);
            }
        });
    }

    render() {
        return (
            <div className="action-area">
                <button onClick={this.cancel.bind(this)} >取消发布</button>
            </div>
        )
    }
}

PublishCancel.contextTypes = {
    router: React.PropTypes.object.isRequired
}

/**
 * 去沟通
 */
class ToChat extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 结束服务
     */
    endService() {
        let {
            ordreId
        } = this.props.order;

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
                <Link to={"/chat?selToID="+timId+"&headUrl="+headImg+"&nickname="+nickName}>
                    <button>沟通</button>
                </Link>
                 <button onClick={this.endService.bind(this)}>结束服务</button>
            </div>
        )
    }
}



/**
 * 评价
 *
 */
class Comment extends Component {

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
                <button onClick={this.showComment.bind(this)}>评价</button>
            </div>
        )
    }
}

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
                scoreHtml.push(<img src="/assets/img/star.png" key={i} onClick={()=>{this.setState({score:i+1})}} alt=""/>);
            } else {
                scoreHtml.push(<img src="/assets/img/starEmpty.png" key={i} onClick={()=>{this.setState({score:i+1})}} alt=""/>);
            }
        }

        return (
            <section className="full-page text-center user-comment-area">
                    <header className="text-center">
                        <div className="haader-img">
                            <img src={collocation.headImg} alt=""/>
                            <span>{collocation.nickName}</span>
                        </div>
                        <p className="match-time">匹配时间：{order.taskTime}</p>
                        <p className="end-time">结束时间：{this.state.endServiceTime !="" ? this.state.endServiceTime : order.finshTime}</p>
                    </header>
                    <div className="star-area">
                        {scoreHtml}
                    </div>
                    <textarea  cols="30" rows="10" placeholder="评价下搭配师的服务吧" onChange={(e)=>{this.setState({content:e.target.value})}} value={this.state.content}/>
                    <div className="action-area">
                        <button onClick={this.toComment.bind(this)}>完成</button>
                    </div>
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

        let main = data.succ ? <OrderDetail data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return (
            <div className="full-page">
                {main}
            </div>
        )
    }
}



class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            commentLayer: false, //是否显示评论窗口
            endServiceTime: '' //用户主动结束服务时间
        };

    }

    componentDidMount() {
        document.title = "订单详情";

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

    render() {
        let {
            requirement,
            collocation,
            comment,
            order
        } = this.props.data;
        return (
            <div className="order-detail-box">
                <section className="requirement-area">
                    <h3 className="title">{requirement.typeName}<small>{order.statusStr}</small></h3>
                    <p className="text order-num">订单编号：{order.ordreId}</p>
                    <p className="text publish-time">发布时间：{requirement.createTime}</p>
                    {requirement.scenes.length > 0 ?  <p className="text">搭配场景：{requirement.scenes.join('、')}</p> : null}
                    {requirement.shops.length > 0 ?  <p className="text">搭配类目：{requirement.shops.join('、')}</p> : null}
                    {requirement.costCode ? <p className="text">预期花费：{requirement.costCode}</p> : null}
                    {requirement.time ?  <p className="text">约定时间：{requirement.time}</p> : null}
                    {requirement.addres ? <p className="text">约定地址：{requirement.addres}</p> : null}
                    {requirement.garderobes ? <DaipeiGoods data={requirement.garderobes}/> : null}
                    <h6 className="text">需求描述：</h6>
                    <p className="text">{requirement.remark}</p>
                </section>
                {/*搭配师*/}
                {
                    collocation ? (
                        <section className="dps-area">
                            <header className="dps-header">
                                <img src={collocation.headImg} alt=""/>
                                <span>{collocation.nickName}</span>
                            </header>
                            {order.taskTime ? <time className="text match-time">匹配时间：{order.taskTime}</time> : null}
                            {order.finshTime ?  <time className="text end-time">结束时间：{order.finshTime}</time> : null}
                        </section>
                    ) : null
                }
                {/*评论*/}
                {comment ? <Score data={comment}/> : null}
                {/*支付、取消订单button*/}
                {order.status === 0 ? <ToPay orderId={order.ordreId} msgLayerShow={this.msgLayerShow.bind(this)}/> : null}
                {/*取消发布button*/}
                {order.status === 1 ? <PublishCancel orderId={order.ordreId} msgLayerShow={this.msgLayerShow.bind(this)} /> : null}
                {/*咨询、结束服务button*/}
                {order.status === 2 ? <ToChat collocation={collocation} order={order} msgLayerShow={this.msgLayerShow.bind(this)} commentLayerShow={this.commentLayerShow.bind(this)}/> : null}
                {/*评价button*/}
                {order.status === 3 ? <Comment commentLayerShow={this.commentLayerShow.bind(this)}/> : null}
                {/*评论窗口*/}
                {this.state.commentLayer ? <ToCommnet collocation={collocation} order={order} msgLayerShow={this.msgLayerShow.bind(this)} endServiceTime={this.state.endServiceTime}/> : null}
                {/*提示信息*/}
                {this.state.msgShow ? <Msg  msgShow={()=>{this.setState({msgShow:false})}} text={this.state.msgText}/> : null}
          </div>
        )
    }
}


export default GetData({
    id: 'OrderDetail', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/order/detail',
    data: (props, state) => {
        let {
            location
        } = props;
        let {
            orderId
        } = location.query;
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
});;