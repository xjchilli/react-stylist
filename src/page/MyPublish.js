/**
 * 我的发布
 */

import React from 'react';
import { Link } from 'react-router-dom';

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
                    <li>
                        <section className='lside'>
                            <time>5个小时前</time>
                            <p className='title'>尝试了新的风格真的惊艳到自己了～</p>
                            <div className='user-reward'>
                                <span className="icon icon-heart-icon"></span>
                                258
                                <span className="icon icon-money-icon"></span>
                                258
                            </div>
                        </section>
                        <section className='rside'>
                            <div className='cover-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                        </section>
                    </li>
                    <li>
                        <section className='lside'>
                            <time>5个小时前</time>
                            <p className='title'>尝试了新的风格真的惊艳到自己了～</p>
                            <div className='user-reward'>
                                <span className="icon icon-heart-icon"></span>
                                258
                                <span className="icon icon-money-icon"></span>
                                258
                            </div>
                        </section>
                        <section className='rside'>
                            <div className='cover-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                        </section>
                    </li>
                    <li>
                        <section className='lside'>
                            <time>5个小时前</time>
                            <p className='title'>尝试了新的风格真的惊艳到自己了～</p>
                            <div className='user-reward'>
                                <span className="icon icon-heart-icon"></span>
                                258
                                <span className="icon icon-money-icon"></span>
                                258
                            </div>
                        </section>
                        <section className='rside'>
                            <div className='cover-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                        </section>
                    </li>
                </ul>
                <Link to='/publishArticle' className='btn to-publish-btn text-center'>发布</Link>
            </section>
        )
    }
}

class MyPublish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        document.title = '我的发布';
    }
    render() {
        return (
            <section className='full-page my-publish-page'>
                <List />
                {/* <NoArticle /> */}
            </section>
        )
    }
}


export default MyPublish;