/**
 * 我的关注
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataLoad, GetData } from '../Component/index';
import { ToolDps } from '../ToolDps';


class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { data, loadAnimation, loadMsg } = this.props.state;
        let main = data && data.succ ? <MyWatch data={data.data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}


class MyWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    componentDidMount() {
        document.title = "我的关注";
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }


    //取消关注
    cancelWatch(collocationId) {
        ToolDps.post('/wx/concern/doAddOrDel', { collocationId: collocationId }).then((res) => {
            let copyData = Array.prototype.slice.apply(this.state.data);
            for (let i = 0; i < copyData.length; i++) {
                if (copyData[i].collocationId == collocationId) {
                    copyData[i].concern = !copyData[i].concern;
                    break;
                }
            }
            this.setState({
                data: copyData
            });
        });
    }

    render() {
        return (
            <section className="dps-list-page my-watch-page">
                <section className="list-area">
                    <ul>
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <section className="dps-info" >
                                            <Link to={"/dpsProfile?collocationId=" + item.collocationId}>
                                                <img src={item.headImg} />
                                                <span className="nickname">{item.nickName}</span>
                                            </Link>
                                            <div className="btn-area">
                                                {
                                                    item.concern ? (<Link to={"/dpsProfile?collocationId=" + item.collocationId + "&tab=2"} className="btn question-btn">咨询</Link>) : null
                                                }
                                                <button className="btn watch-btn" onClick={this.cancelWatch.bind(this, item.collocationId)}>{item.concern ? "已关注" : "+关注"}</button>
                                            </div>
                                        </section>
                                        <ul className="plan-area">
                                            {
                                                item.plans.map((plan, i) => {
                                                    return (
                                                        <li key={i}>
                                                            <Link to={"/fashionMomentDetail?planId=" + plan.planId}>
                                                                <div className="small-img" style={{ backgroundImage: 'url(' + plan.masterImgae + ')' }}></div>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {
                        this.state.data.length == 0 ? <p className="text-center">您暂时未关注搭配师</p> : null
                    }
                </section>
            </section>
        )
    }
}


export default GetData({
    id: 'MyWatch', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/concern/getMy',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});