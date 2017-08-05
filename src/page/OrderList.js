/**
 * 订单列表
 *
 * Created by potato on 2017/5/9 0009.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataLoad, GetData } from '../Component/index';
import { ToolDps } from '../ToolDps';


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '-1'//-1:全部 0 : 待付款  1:发布中  2 :服务中 3:待评价 10 :已完成 
        }
    }

    componentDidMount() {
        new Swiper('.order-list-nav', {
            slidesPerView: 4
        });
    }


    select(status) {
        this.setState({
            status: status
        });
        this.props.getData(status === "-1" ? '' : status);
    }

    render() {
        return (
            <div className="swiper-container order-list-nav">
                <div className="swiper-wrapper">
                    <div className={this.state.status === "-1" ? 'swiper-slide active' : 'swiper-slide'} onClick={this.select.bind(this, '-1')}>
                        <span>全部</span>
                    </div>
                    <div className={this.state.status === "0" ? 'swiper-slide active' : 'swiper-slide'} onClick={this.select.bind(this, '0')}>
                        <span>待付款</span>
                    </div>
                    <div className={this.state.status === "1" ? 'swiper-slide active' : 'swiper-slide'} onClick={this.select.bind(this, '1')}>
                        <span>发布中</span>
                    </div>
                    <div className={this.state.status === "2" ? 'swiper-slide active' : 'swiper-slide'} onClick={this.select.bind(this, '2')}>
                        <span>服务中</span>
                    </div>
                    <div className={this.state.status === "3" ? 'swiper-slide active' : 'swiper-slide'} onClick={this.select.bind(this, '3')}>
                        <span>待评价</span>
                    </div>
                    <div className={this.state.status === "10" ? 'swiper-slide active' : 'swiper-slide'} onClick={this.select.bind(this, '10')}>
                        <span>已完成</span>
                    </div>
                </div>
            </div>
        )
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadAnimation: true,
            loadMsg: '正在加载中'
        }
    }

    componentDidMount() {
        document.title = "订单列表";
        this.getData();
      
    }

    getData(status) {
        this.setState({
            data: [],
            loadAnimation: true,
            loadMsg: '正在加载中'
        });
        ToolDps.get('/wx/order/getMy', {
            status: status ? status : ''
        }).then((res) => {
            if (res.succ) {
                let msg = '加载完成';
                if (res.list.length === 0) {
                    msg = "暂时没有您的订单";
                }
                this.setState({
                    data: res.list,
                    loadAnimation: false,
                    loadMsg: msg
                });
            } else {
                this.setState({
                    loadAnimation: false,
                    loadMsg: '加载失败'
                });
            }
        }).catch(() => {
            this.setState({
                loadAnimation: false,
                loadMsg: '加载失败'
            });
        });
    }

    render() {
        let main = this.state.data.length > 0 ? <OrderList data={this.state.data} /> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />;

        return (
            <div className="full-page order-list-page">
                <Nav getData={this.getData.bind(this)} />
                {main}
            </div>
        )
    }
}

class OrderList extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <ul className="order-list-area">
                {
                    this.props.data.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={"/orderDetail?orderId=" + item.orderId} className="link">
                                    <span className="service-type">{item.title}&nbsp;{"(￥" + item.originalPrice + ")"}</span><br />
                                    <time className="time">{item.time}</time><br />
                                    <span className="dps-name">{item.dpsName}</span><br />
                                    <span className="status">{item.status}</span>
                                </Link>
                            </li>
                        )
                    })

                }
            </ul>
        )
    }
}


export default Main;