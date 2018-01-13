/**
 * 商品订单列表
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataLoad, GetData } from '../Component/index';
import { ToolDps } from '../ToolDps';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status || ''//-1:全部 0 : 待付款  1:发布中  2 :服务中 3:待评价 10 :已完成 
        }
    }

    componentDidMount() {
        new Swiper('.order-list-nav', {
            slidesPerView: 5
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            status: nextProps.status
        });
    }


    render() {
        return (
            <div className="swiper-container order-list-nav">
                <div className="swiper-wrapper">
                    <div className={!this.state.status ? 'swiper-slide active' : 'swiper-slide'} onClick={this.props.statusChange.bind(this, '')}>
                        <span>全部</span>
                    </div>
                    <div className={this.state.status === "0" ? 'swiper-slide active' : 'swiper-slide'} onClick={this.props.statusChange.bind(this, '0')}>
                        <span>待付款</span>
                    </div>
                    <div className={this.state.status === "1" ? 'swiper-slide active' : 'swiper-slide'} onClick={this.props.statusChange.bind(this, '1')}>
                        <span>待发货</span>
                    </div>
                    <div className={this.state.status === "2" ? 'swiper-slide active' : 'swiper-slide'} onClick={this.props.statusChange.bind(this, '2')}>
                        <span>待收货</span>
                    </div>
                    <div className={this.state.status === "3" ? 'swiper-slide active' : 'swiper-slide'} onClick={this.props.statusChange.bind(this, '3')}>
                        <span>待评价</span>
                    </div>
                </div>
            </div>
        )
    }
}


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            data: [{}],
            loadAnimation: true,
            loadMsg: '正在加载中'
        }
    }


    statusChange(status) {
        this.setState({
            status: status || '',
            data: [{}]
        });

        // this.getData(status);
    }

    render() {
        let main = this.state.data.length > 0 ? <OrderListGoods data={this.state.data} /> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />;
        return (
            <section className='full-page order-list-goods-page'>
                <Nav status={this.state.status} statusChange={this.statusChange.bind(this)} />
                {main}
            </section>
        )
    }
}

class OrderListGoods extends React.Component {
    render() {
        return (
            <div className="order-list-area">
                <ul>
                    <li>
                        <p className='order-num'>
                            <span className="icon icon-not-selected"><span className="path1"></span><span className="path2"></span></span>
                            订单编号：1515049557001
                        <span className='status'>等待付款</span>
                        </p>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h5>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568</h5>
                                <p>炫黑，170/85A</p>
                            </li>
                            <li>
                                <p className='text-right price'>&yen;888.00</p>
                                <p className='text-right num'>X 2</p>
                            </li>
                        </ul>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h5>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568</h5>
                                <p>炫黑，170/85A</p>
                            </li>
                            <li>
                                <p className='text-right price'>&yen;888.00</p>
                                <p className='text-right num'>X 2</p>
                            </li>
                        </ul>
                        <footer>
                            应付：¥799.00
                        <div className='action-area'>
                                <button className='btn'>查看物流</button>
                                <button className='btn red'>确认收货</button>
                            </div>
                        </footer>
                    </li>
                    <li>
                        <p className='order-num'>
                            <span className="icon icon-selected"><span className="path1"></span><span className="path2"></span></span>
                            订单编号：1515049557001
                        <span className='status'>等待付款</span>
                        </p>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h5>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568</h5>
                                <p>炫黑，170/85A</p>
                            </li>
                            <li>
                                <p className='text-right price'>&yen;888.00</p>
                                <p className='text-right num'>X 2</p>
                            </li>
                        </ul>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h5>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568</h5>
                                <p>炫黑，170/85A</p>
                            </li>
                            <li>
                                <p className='text-right price'>&yen;888.00</p>
                                <p className='text-right num'>X 2</p>
                            </li>
                        </ul>
                        <footer>
                            应付：¥799.00
                        <div className='action-area'>
                                <button className='btn'>查看物流</button>
                                <button className='btn red'>确认收货</button>
                            </div>
                        </footer>
                    </li>
                    <li>
                        <p className='order-num'>
                            订单编号：1515049557001
                        <span className='status'>等待付款</span>
                        </p>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h5>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568</h5>
                                <p>炫黑，170/85A</p>
                            </li>
                            <li>
                                <p className='text-right price'>&yen;888.00</p>
                                <p className='text-right num'>X 2</p>
                            </li>
                        </ul>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h5>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568</h5>
                                <p>炫黑，170/85A</p>
                            </li>
                            <li>
                                <p className='text-right price'>&yen;888.00</p>
                                <p className='text-right num'>X 2</p>
                            </li>
                        </ul>
                        <footer>
                            应付：¥799.00
                        <div className='action-area'>
                                <button className='btn'>查看物流</button>
                                <button className='btn red'>确认收货</button>
                            </div>
                        </footer>
                    </li>
                </ul>
                <div className='merge-pay'>
                    <button className='btn'>合并付款</button>
                </div>
            </div>
        )
    }
}

export default Main;