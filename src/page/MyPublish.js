/**
 * 我的发布
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Msg, DataLoad, GetData } from '../Component/index';


class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { data, loadAnimation, loadMsg } = this.props.state;
        let main = data && data.succ ? <MyPublish data={data.data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}


/** 
 * 没有文章显示
*/
class NoArticle extends React.Component {
    render() {
        return (
            <section className='no-article-area'>
                <section className='content text-center'>
                    <img src='/assets/img/publish/no-article.jpg' />
                    <p>这里什么也没有，只有冷风吹过～</p>
                    <p>快来发布你的第一篇买家秀吧！</p>
                    <Link to='/publishArticle' className='btn publish-btn'>发布</Link>
                </section>
            </section>
        )
    }
}

/** 
 * 列表
*/
class List extends React.Component {
    render() {
        return (
            <section className='list-area'>
                <ul className='content'>
                    {
                        this.props.data.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/fashionMomentDetail?isMe=true&&planId=${item.id}`}>
                                        <section className='lside'>
                                            <time>{item.time2ago}</time>
                                            <p className='title'>{item.planName}</p>
                                            <div className='user-reward'>
                                                <span className="icon icon-heart-icon"></span>
                                                {item.agreeNum}
                                                <span className="icon icon-money-icon"></span>
                                                {item.awardNum}
                                            </div>
                                        </section>
                                        <section className='rside'>
                                            <div className='cover-img' style={{ backgroundImage: `url(${item.masterImage})` }}></div>
                                        </section>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <Link to='/publishArticle' className='btn to-publish-btn text-center'>发布</Link>
            </section>
        )
    }
}

class MyPublish extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            list: props.data || []
        }
    }
    componentDidMount() {
        document.title = '我的发布';
    }
    render() {
        return (
            <section className='full-page my-publish-page'>
                {this.state.list.length === 0 ? <NoArticle /> : <List data={this.state.list} />}
            </section>
        )
    }
}


// export default MyPublish;


export default GetData({
    id: 'MyPublish', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/fashion/myPlans',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});