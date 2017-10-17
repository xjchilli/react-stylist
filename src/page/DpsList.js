/**
 * 搭配师列表
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataLoad, GetData } from '../Component/index';
import { Footer, News } from '../Component/index';


class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { data, loadAnimation, loadMsg } = this.props.state;
        let main = data && data.succ ? <DpsList data={data.data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}


class DpsList extends Component {
    render() {
        return (
            <section className="dps-list-page">
                <section className="list-area">
                    <h5 className="title">您关注的搭配师</h5>
                    <ul>
                        <li>
                            <section className="dps-info">
                                <img src="/assets/img/girl.jpg" />
                                <span className="nickname">旱死的鱼</span>
                                <div className="btn-area">
                                    <button className="btn question-btn">咨询</button>
                                </div>
                            </section>
                            <section className="main-img-area" style={{ backgroundImage: 'url(/assets/img/girl2.jpg)' }}>
                                <p className="describe">
                                    <span>
                                        曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。擅长欧美风格和学院风的搭配。
                                    </span>
                                </p>
                            </section>
                            <ul className="flex-box small-img-area">
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <section className="dps-info">
                                <img src="/assets/img/girl.jpg" />
                                <span className="nickname">旱死的鱼</span>
                                <div className="btn-area">
                                    <button className="btn question-btn">咨询</button>
                                </div>
                            </section>
                            <section className="main-img-area" style={{ backgroundImage: 'url(/assets/img/girl2.jpg)' }}>
                                <p className="describe">
                                    <span>
                                        曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。擅长欧美风格和学院风的搭配。
                                    </span>
                                </p>
                            </section>
                            <ul className="flex-box small-img-area">
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section>
                <section className="list-area">
                    <h5 className="title">热门搭配师</h5>
                    <ul>
                        <li>
                            <section className="dps-info">
                                <img src="/assets/img/girl.jpg" />
                                <span className="nickname">旱死的鱼</span>
                                <div className="btn-area">
                                    <button className="btn question-btn">咨询</button>
                                    <button className="btn watch-btn">+关注</button>
                                </div>
                            </section>
                            <section className="main-img-area" style={{ backgroundImage: 'url(/assets/img/girl2.jpg)' }}>
                                <p className="describe">
                                    <span>
                                        曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。擅长欧美风格和学院风的搭配。
                                    </span>
                                </p>
                            </section>
                            <ul className="flex-box small-img-area">
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <section className="dps-info">
                                <img src="/assets/img/girl.jpg" />
                                <span className="nickname">旱死的鱼</span>
                                <div className="btn-area">
                                    <button className="btn question-btn">咨询</button>
                                    <button className="btn watch-btn">+关注</button>
                                </div>
                            </section>
                            <section className="main-img-area" style={{ backgroundImage: 'url(/assets/img/girl2.jpg)' }}>
                                <p className="describe">
                                    <span>
                                        曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。擅长欧美风格和学院风的搭配。
                                    </span>
                                </p>
                            </section>
                            <ul className="flex-box small-img-area">
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                                <li className="item-3">
                                    <div className="small-img" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section>
                <News />
                <Footer tab="2" />
            </section>
        )
    }
}

// export default DpsList;

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