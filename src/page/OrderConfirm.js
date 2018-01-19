/**
 * 确认订单
 */
import React from 'react';
import PropTypes from 'prop-types';
import { DataLoad, GetData } from '../Component/index';
import { getGoodsInfo } from '../Config/ToolStore';
import { ToolDps } from '../ToolDps';
import WxAuth from './component/WxAuth';
import { Msg } from '../Component/index';

class Main extends React.Component {
    componentDidMount() {
        document.title = '确认订单';
        WxAuth();
    }

    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data && data.succ ? <OrderConfirm data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return main;
    }
}


class OrderConfirm extends React.Component {
    constructor(props) {
        super(props);
        let goodsInfos = getGoodsInfo() || [];
        let totalNum = 0;
        let totalPrice = 0;
        for (let i = 0; i < goodsInfos.list.length; i++) {
            totalNum += goodsInfos.list[i].num;
            totalPrice += Number(goodsInfos.list[i].salePrice) * goodsInfos.list[i].num;
        }
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            address: props.data.address,
            type: goodsInfos.type,
            goodsInfos: goodsInfos.list,
            totalNum: totalNum,//总数
            totalPrice: totalPrice,//总价
        }
    }

    componentDidMount() {
    }

    /**
     * 修改收货地址
     */
    modifyAddress(data) {
        ToolDps.post('/wx/shipping/address/wechat', data).then((res) => {
            if (!res.succ) {
                this.setState({
                    msgShow: true,
                    msgText: '地址修改失败', //提示内容
                });
            }
            console.log(res);
        });
    }

    getAddress() {
        wx.openAddress({
            success: (res) => {
                var userName = res.userName; // 收货人姓名
                var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
                var cityName = res.cityName; // 国标收货地址第二级地址（市）
                var countryName = res.countryName; // 国标收货地址第三级地址（国家）
                var detailInfo = res.detailInfo; // 详细收货地址信息
                var telNumber = res.telNumber; // 收货人手机号码
                let address = {
                    address: detailInfo,//门牌地址
                    city: cityName,//城市
                    contact: telNumber,//电话
                    county: countryName,//县区
                    name: userName,//收件人姓名
                    province: provinceName//省份
                }
                console.log(res);
                this.setState({
                    address: address
                });
                this.modifyAddress(address);

            }
        });
    }

    /**
     * 创建订单
     */
    createOrder() {
        let data = [];
        let goodsInfos = this.state.goodsInfos;
        for (let i = 0; i < goodsInfos.length; i++) {
            let obj = {
                goodsId: goodsInfos[i].goodsId,//商品ID
                num: goodsInfos[i].num,//购买数量
                skuId: goodsInfos[i].skuId,//规格ID
                supplierId: goodsInfos[i].supplierId//供应商ID
            }
            data.push(obj);
        }
        ToolDps.post('/wx/goods/order/createOrder', data, {
            'Content-Type': 'application/json'
        }).then((res) => {
            console.log(res);
            if (res.succ) {
                if (this.state.type === '1') {//购物车删除
                    let cartIdArr = [];
                    for (let i = 0; i < this.state.goodsInfos.length; i++) {
                        cartIdArr.push(this.state.goodsInfos[i].cartId);
                    }
                    ToolDps.post('/wx/cart/delete', { cartId: cartIdArr });
                }
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady.bind(this, res.payInfo), false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady.bind(this, res.payInfo));
                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady.bind(this, res.payInfo));
                    }
                } else {
                    this.onBridgeReady(res.payInfo);
                }
            } else {
                this.setState({
                    msgShow: true,
                    msgText: res.msg, //提示内容
                });
            }
        });
    }

    onBridgeReady(signatureInfo) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": signatureInfo.appId, //公众号名称，由商户传入
                "timeStamp": signatureInfo.timeStamp, //时间戳，自1970年以来的秒数
                "nonceStr": signatureInfo.nonceStr, //随机串
                "package": signatureInfo.package,
                "signType": signatureInfo.signType, //微信签名方式：
                "paySign": signatureInfo.paySign //微信签名
            },
            (res) => {
                if (res.err_msg == "get_brand_wcpay_request:ok") {//支付成功
                    this.setState({
                        msgShow: true,
                        msgText: '支付成功'//提示内容
                    });

                    this._time = setTimeout(function () {
                        this.context.router.history.push('/orderDetailGoods');
                    }.bind(this), 1500);
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {//支付取消

                }
                else if (res.err_msg == "get_brand_wcpay_request:fail") {//支付失败
                    this.setState({
                        msgShow: true,
                        msgText: '支付失败', //提示内容
                    });
                }
            }
        );
    }

    render() {
        let address = this.state.address;
        return (
            <section className='full-page order-confirm-page'>
                {
                    address ? (
                        <address onClick={this.getAddress.bind(this)}>
                            <p className='contact-tel'>
                                <span className='name'>{address.name}</span><span>{address.contact}</span>
                            </p>
                            <ul className='contact-address'>
                                <li><label className='tag'>默认</label></li>
                                <li><span className='address'>{address.province + address.city + address.county + address.address}</span></li>
                            </ul>
                        </address>
                    ) : (
                            <address onClick={this.getAddress.bind(this)}>
                                <p className='no-address-tip'>没有地址信息，请点击后添加地址</p>
                            </address>
                        )
                }
                <section className='pay-type-area'>
                    <span className="icon icon-wechat"></span>
                    微信支付
                    <span className="icon icon-selected"><span className="path1"></span><span className="path2"></span></span>
                </section>
                <ul className='goods-list-area'>
                    {
                        this.state.goodsInfos.map((item, index) => {
                            return (
                                <li key={index}>
                                    <ul className='flex-box'>
                                        <li>
                                            <div className='goods-img' style={{ backgroundImage: `url(${item.goodsImg})` }}></div>
                                        </li>
                                        <li>
                                            <h4>{item.goodsName}</h4>
                                            <p className='sku'>{item.colorActiveName}，{item.sizeActiveName}</p>
                                            <p className='price-area'>
                                                &yen;{item.salePrice}
                                                <span className='num'>X {item.num}</span>
                                            </p>
                                        </li>
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>
                <section className='total-price-area'>
                    <div className='box'>
                        邮费：0.00元
                        <span className='price'>共{this.state.totalNum}件商品，小计：<span className='num'>{this.state.totalPrice}元</span></span>
                    </div>
                </section>
                <ul className='flex-box order-confirm-footer'>
                    <li><b>合计：</b>&yen;{this.state.totalPrice}</li>
                    <li>
                        <button className='btn text-center to-pay-btn' onClick={this.createOrder.bind(this)}>去支付</button>
                    </li>
                </ul>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}

OrderConfirm.contextTypes = {
    router: PropTypes.object.isRequired
}



export default GetData({
    id: 'Profile', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/user/info',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});