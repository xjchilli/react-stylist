/**
 * 订单列表
 *
 * Created by potato on 2017/5/9 0009.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';
import {DataLoad,GetData} from '../Component/index';

class Main extends Component{
    constructor(props){
        super(props);
    }


    render(){
        let {data, loadAnimation, loadMsg} = this.props.state;
        let main = data.succ ? <OrderList data={data} /> : <p className="text-center no-record">暂时没有您的订单</p>;

        return (
            <div className="full-page">
                {main}
            </div>
        )
    }
}

class OrderList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {list} = this.props.data;
        return (
            <section className="full-page">
                <ul className="order-list-area">
                    {
                        list.map((item,index)=>{
                            return (
                                <li key={index}>
                                    <Link to={"/weixin/orderDetail?orderId="+item.orderId} className="link">
                                        <span className="service-type">{item.title}</span><br/>
                                        <time className="time">{item.time}</time><br/>
                                        <span className="dps-name">{item.dpsName}</span><br/>
                                        <span className="status">{item.status}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        )
    }
}


export default GetData({
    id: 'OrderList',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/order/getMy',
    data: '',//发送给服务器的数据
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});;