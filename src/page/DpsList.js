/**
 * 搭配师列表
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Footer, News } from '../Component/index';

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
                                <p className="describe">曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。擅长欧美风格和学院风的搭配。</p>
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
                                <p className="describe">曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。擅长欧美风格和学院风的搭配。</p>
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
                                <p className="describe">曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。擅长欧美风格和学院风的搭配。</p>
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
                                <p className="describe">曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。擅长欧美风格和学院风的搭配。</p>
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

export default DpsList;