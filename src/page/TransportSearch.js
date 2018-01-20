/**
 * 物流查询
 */

import React from 'react';
import { ToolDps } from '../ToolDps';
import qs from 'query-string';
import { DataLoad, GetData } from '../Component/index';


class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = '查看物流';
    }

    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data && data.succ ? <TransportSearch data={data.data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}

class TransportSearch extends React.Component {
    render() {
        let { kdName, number, list } = this.props.data;
        return (
            <section className='full-page transport-search-page'>
                <header>
                    {kdName}：{number}
                </header>
                <ul className='step-area'>
                    {
                        list.map((item, index) => {
                            return (
                                <li key={index} className={index === 0 ? 'end' : ''}>
                                    <span className='circle'></span>
                                    <p className='desc'>{item.status}</p>
                                    <time>{item.time}</time>
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
    id: 'TransportSearch', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/goods/order/kd/query',
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