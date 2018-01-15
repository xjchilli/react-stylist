/**
 * 确认订单
 */
import React from 'react';
import WxAuth from './component/WxAuth';

class OrderConfirm extends React.Component {
    componentDidMount() {
        document.title = '确认订单';
        WxAuth();
    }

    getAddress() {
        wx.openAddress({
            success: function (res) {
                var userName = res.userName; // 收货人姓名
                var postalCode = res.postalCode; // 邮编
                var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
                var cityName = res.cityName; // 国标收货地址第二级地址（市）
                var countryName = res.countryName; // 国标收货地址第三级地址（国家）
                var detailInfo = res.detailInfo; // 详细收货地址信息
                var nationalCode = res.nationalCode; // 收货地址国家码
                var telNumber = res.telNumber; // 收货人手机号码

            }
        });
    }

    render() {
        return (
            <section className='full-page order-confirm-page'>
                {/* <address onClick={this.getAddress.bind(this)}>
                    <p className='no-address-tip'>没有地址信息，请点击后添加地址</p>
                </address> */}
                <address onClick={this.getAddress.bind(this)}>
                    <p className='contact-tel'>
                        <span className='name'>叶周正</span><span>135****6559</span>
                    </p>
                    <ul className='contact-address'>
                        <li><label className='tag'>默认</label></li>
                        <li><span className='address'>浙江省杭州市西湖区三墩镇华彩国际3幢8楼802</span></li>
                    </ul>
                </address>
                <section className='pay-type-area'>
                    <span className="icon icon-wechat"></span>
                    微信支付
                    <span className="icon icon-selected"><span className="path1"></span><span className="path2"></span></span>
                </section>
                <ul className='goods-list-area'>
                    <li>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <p className='price-area'>
                                    &yen;799.00
                                    <span className='num'>X 2</span>
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <p className='price-area'>
                                    &yen;799.00
                                    <span className='num'>X 2</span>
                                </p>
                            </li>
                        </ul>
                    </li>
                </ul>
                <section className='total-price-area'>
                    <div className='box'>
                        邮费：0.00元
                        <span className='price'>共3件商品，小计：<span className='num'>2397元</span></span>
                    </div>
                </section>
                <ul className='flex-box order-confirm-footer'>
                    <li><b>合计：</b>¥2397.00</li>
                    <li>
                        <button className='btn text-center to-pay-btn'>去支付</button>
                    </li>
                </ul>
            </section>
        )
    }
}

export default OrderConfirm;