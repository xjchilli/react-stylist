/**
 * 我的资产
 */
import React from 'react';
import { DataLoad, GetData, Button, Msg } from '../Component/index';
import { ToolDps } from '../ToolDps';

class Main extends React.Component {
    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data && data.succ ? <MyAsset data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}


class MyAsset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            msgShow: false,
            msgText: '', //提示内容
        }
    }
    render() {
        let { data, totalMoney } = this.props.data;
        return (
            <section className='myAsset-page'>
                <header>
                    <p className='title'>账户总资产(元)</p>
                    <p className='num'>{totalMoney}</p>
                    <Button className='btn extract-money-btn' onClick={() => { this.setState({ msgShow: true, msgText: '该功能即将开放...' }) }}>去提现</Button>
                    {/* <button className='btn extract-money-btn'>去提现</button> */}
                </header>
                <dl>
                    <dt style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>资金明细</dt>
                    {
                        data.map((item, index) => {
                            return (
                                <dd key={index} style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>
                                    <p className='nickname'>{item.userName}</p>
                                    <time className='time'>{item.createTime}</time>
                                    <span className='num'>+{item.money}</span>
                                </dd>
                            )
                        })
                    }
                    {/* <dd style={{ borderBottomWidth: ToolDps.iphone ? '0.5px' : '1px' }}>
                        <p className='nickname'>啊飘打赏</p>
                        <time className='time'>11-22  08:30</time>
                        <span className='num'>+0.60</span>
                    </dd> */}

                </dl>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}


// export default MyAsset;

export default GetData({
    id: 'MyAsset', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/user/getMoneyLog',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});