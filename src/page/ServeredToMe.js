/**
 * 服务过我的搭配师
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Msg, DataLoad, GetData } from '../Component/index';
import { watchOrCancel } from 'ToolAjax';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { data, loadAnimation, loadMsg } = this.props.state;
        let main = data && data.succ ? <ServeredToMe data={data.data} {...this.props} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}


class ServeredToMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            msgShow: false,
            msgText: '', //提示内容
        }
    }

    componentDidMount() {
        document.title = '我的搭配师';
    }

    /**
     * 关注或者取关
     */
    watchOrCancel(collocationId) {
        watchOrCancel(collocationId).then((res) => {
            if (res.succ) {
                let arr = Array.prototype.slice.apply(this.state.data);
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].collocationId == collocationId) {
                        arr[i].concern = !arr[i].concern;
                    }
                }
                this.props.setState(arr);
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '操作失败' //提示内容
                });
            }
        });
    }


    render() {
        return (
            <section className='servered-dps-page'>
                <ul className='list'>
                    {
                        this.state.data.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div className='lside'>
                                        <Link to={'/dpsProfile?collocationId='+item.collocationId}>
                                            <img src={item.headImg} />
                                        </Link>
                                    </div>
                                    <div className='rside'>
                                        {item.nickName}
                                    </div>
                                    <section className='btn-area'>
                                        {
                                            item.concern ? <button className='btn watch-btn active' onClick={this.watchOrCancel.bind(this, item.collocationId)}>+关注</button> : <button className='btn watch-btn' onClick={this.watchOrCancel.bind(this, item.collocationId)}>+关注</button>
                                        }
                                        <Link to={`/chat?selToID=${item.timId}&headUrl=${item.headImg}&nickname=${item.nickName}`} className='btn consult-btn'>
                                            聊天
                                        </Link>

                                    </section>
                                </li>
                            )
                        })
                    }
                </ul>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}


export default GetData({
    id: 'ServeredToMe', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/concern/getMyService',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});