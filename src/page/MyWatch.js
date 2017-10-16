/**
 * 我的关注
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataLoad, GetData } from '../Component/index';


class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;

        let main = data && data.succ ? <MyWatch data={data.data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return main;
    }
}


class MyWatch extends Component {
    constructor(props) {
        super(props);
        console.log(props.data);
        this.state = {
            data: props.data
        }
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
                                            <img src={item.headImg} />
                                            <span className="nickname">{item.nickName}</span>
                                            <div className="btn-area">
                                                <Link to={"/chat?selToID="+item.timId+"&headUrl="+item.headImg+"&nickname="+item.nickName} className="btn question-btn">咨询</Link>
                                                <button className="btn watch-btn">已关注</button>
                                            </div>
                                        </section>
                                        <ul className="plan-area">
                                            {
                                                item.plans.map((plan, i) => {
                                                    return (
                                                        <li key={i}>
                                                            <div className="small-img" style={{ backgroundImage: 'url(' + plan.masterImgae + ')' }}></div>
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
                </section>
            </section>
        )
    }
}

// export default MyWatch;

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