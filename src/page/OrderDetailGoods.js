/**
 * 商品订单详情
 */
import React from 'react';

/**
 * 订单状态
 */
class OrderStatus extends React.Component {
    render() {
        return (
            <section className='status-area'>
                <div className='content'>
                    <p className='status'>
                        交易取消
                        <span className='return-mony'>退款已完成</span>
                    </p>
                    <time>剩余14天5小时自动确认收货</time>
                </div>
            </section>
        )
    }
}

/**
 * 用户信息
 */
class CustomerInfo extends React.Component {
    render() {
        return (
            <section className='customer-info-area'>
                <h5>收货地址</h5>
                <div className='contact-area'>
                    叶周正
                    <span className='tel'>135****6559</span>
                </div>
                <address>浙江省杭州市西湖区三墩镇华彩国际3幢8楼802</address>
            </section>
        )
    }
}

/**
 * 商品信息
 */
class GoodsList extends React.Component {
    render() {
        return (
            <section>
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
            </section>
        )
    }
}


/**
 * 其他信息
 */
class OtherInfo extends React.Component {
    render() {
        return (
            <section className='other-info-area'>
                <p>订单编号：1515049557001</p>
                <time>下单时间：2018-1-20   10:31:44</time>
            </section>
        )
    }
}

/**
 * 按钮区域
 */
class Footer extends React.Component {
    render() {
        return (
            <div className='action-area'>
                <button className='btn'>申请售后</button>
                <button className='btn red'>去评价</button>
            </div>
        )
    }
}

/**
 * 申请售后（选择售后类型）
 */
class ServiceTypeSelect extends React.Component {
    componentDidMount() {
        document.title = '选择服务类型';
    }

    componentWillUnmount() {
        document.title = '订单详情';
    }

    render() {
        return (
            <section className='full-page service-type-area'>
                <ul className='goods-list-area'>
                    <li>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className='type-select-area'>
                    <li>
                        <h5>直接换货</h5>
                        <p>已收到货，需要退换已收到的货物</p>
                    </li>
                    <li>
                        <h5>退货退款</h5>
                        <p>与卖家协商一致的前提下</p>
                    </li>
                </ul>

            </section>
        )
    }
}

/**
 * 去评价
 */
class UserComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            files: []
        }
    }

    componentDidMount() {
        document.title = '评价';
    }


    selectImg(e) {
        let files = e.target.files;
        if (files && files.length > 0) {
            if (this.state.files.length + files.length > 6) {//大于6张了
                this.setState({
                    msgShow: true,
                    msgText: '图片上限6张！'
                });
                return;
            }
            for (let i = 0; i < files.length; i++) {
                let readFile = new FileReader();
                readFile.onload = () => {
                    let obj = {
                        file: null,//图片文件
                        url: ''//图片base64地址
                    }
                    obj.file = files[i];
                    obj.url = readFile.result;
                    let fileArr = Array.prototype.slice.apply(this.state.files);
                    fileArr.push(obj);
                    this.setState({
                        files: fileArr
                    })
                }
                readFile.readAsDataURL(files[i]);
            }

        }
    }

    /**
     * 删除图片
     */
    deleteImg(index) {
        let fileArr = Array.prototype.slice.apply(this.state.files);
        fileArr.splice(index, 1);
        this.setState({
            files: fileArr
        });

    }

    render() {
        return (
            <section className='full-page comment-area'>
                <ul>
                    <li>
                        <ul className='goods-list-area'>
                            <li>
                                <ul className='flex-box'>
                                    <li>
                                        <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                    </li>
                                    <li>
                                        <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                        <p className='sku'>炫黑，170/85A</p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <section className='comment-content'>
                            <div className='box'>
                                <textarea placeholder='宝贝满足你的期待吗？留下你的意见吧～'></textarea>
                            </div>
                        </section>
                        <section className='upload-certificate'>
                            <ul className='flex-box'>
                                {
                                    this.state.files.map((item, index) => {
                                        return (
                                            <li className='item-4' key={index} onClick={this.deleteImg.bind(this, index)}>
                                                <div className='img-show' style={{ backgroundImage: `url(${item.url})` }}>
                                                    <span className="icon icon-fault"><span className="path1"></span><span className="path2"></span></span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                {
                                    this.state.files.length <= 6 ? (
                                        <li className='item-4'>
                                            <div className='upload-img-area'>
                                                <span className="icon icon-camera2"></span>
                                                <input type="file" accept="image/*" multiple className="upload-file" onChange={this.selectImg.bind(this)} />
                                            </div>
                                        </li>
                                    ) : null
                                }
                            </ul>
                        </section>
                    </li>

                </ul>
                <section className='select-score-area'>
                    <h5>评价</h5>
                    <ul className='flex-box'>
                        <li>
                            <label>服装质量与描述</label>
                        </li>
                        <li>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className='score'>3分</span>
                        </li>
                    </ul>
                    <ul className='flex-box'>
                        <li>
                            <label>发货速度</label>
                        </li>
                        <li>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className='score'>3分</span>
                        </li>
                    </ul>
                </section>
                <section className='action-area'>
                    <button className='btn send-btn'>提交</button>
                </section>

            </section>
        )
    }
}

class OrderDetailGoods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowServiceTypeSelect: false,//是否显示申请售后类型
            isShowComment: true,//是否显示用户评价窗口
        }
    }
    componentDidMount() {
        document.title = '订单详情';
    }
    render() {
        return (
            <section className='full-page order-goods-detail-page'>
                {/* 订单状态 */}
                <OrderStatus />
                {/* 用户信息 */}
                <CustomerInfo />
                {/* 商品信息 */}
                <GoodsList />
                {/* 其他信息 */}
                <OtherInfo />
                {/* 按钮区域 */}
                <Footer />
                {
                    this.state.isShowServiceTypeSelect ? <ServiceTypeSelect /> : null
                }
                {
                    this.state.isShowComment ? <UserComment /> : null
                }
            </section>
        )
    }
}

export default OrderDetailGoods;