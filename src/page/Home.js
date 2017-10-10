import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import { DataLoad,Footer,News } from '../Component/index';




class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadAnimation: true,
            loadMsg: '正在加载中',
            loadImg: null,//需展示的时尚圈精选图片
            fashionListImg: [],//时尚圈精选图片
            col1Imgs: [],//时尚圈精选图片1列
            col2Imgs: [],//时尚圈精选图片2列
            col1H: 0,//时尚圈精选图片1列高度
            col2H: 0,//时尚圈精选图片2列高度
        }

        /**
         * 时尚圈精选将要展示的图片
         */
        this.willImg = function (e) {
            let fashionListImg = Array.prototype.slice.apply(this.state.fashionListImg);
            let willBoxEle = document.querySelector('.will-box');

            if (this.state.col1H <= this.state.col2H) {
                let col1H = this.state.col1H + willBoxEle.offsetHeight;
                let col1Imgs = this.state.col1Imgs;
                col1Imgs.push(this.state.loadImg);
                let sliceArr = fashionListImg.splice(0, 1);
                this.setState({
                    col1H: col1H,
                    col1Imgs: col1Imgs,
                    loadImg: sliceArr[0],
                    fashionListImg: fashionListImg
                })
            } else {
                let col2H = this.state.col2H + willBoxEle.offsetHeight;
                let col2Imgs = this.state.col2Imgs;
                col2Imgs.push(this.state.loadImg);
                let sliceArr = fashionListImg.splice(0, 1);
                this.setState({
                    col2H: col2H,
                    col2Imgs: col2Imgs,
                    loadImg: sliceArr[0],
                    fashionListImg: fashionListImg
                });
                window.addEventListener('scroll', this.pageScroll, false);
            }
        }

        /**
         * 检测元素是否在可视区
         * @param {object} el 检测的元素
         */
        this.testMeet = function (el) {
            let rect = el.getBoundingClientRect(); //取得元素在可视区的位置
            let mw = el.offsetWidth; //元素自身宽度
            let mh = el.offsetHeight; //元素自身的高度
            let w = window.innerWidth; //视窗的宽度
            let h = window.innerHeight; //视窗的高度
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            )
        }

        this.pageScroll = () => {
            if (this.testMeet(document.querySelector('.loading-area'))) {
                let fashionListImg = [
                    {
                        url: 'http://chuantu.biz/t6/73/1506763867x1942171029.jpg?' + 100000 * Math.random(),
                        title: '标题1',
                        id: 100000 * Math.random()
                    },
                    {
                        url: '/assets/img/match1.jpg?' + 100000 * Math.random(),
                        title: '标题2',
                        id: 100000 * Math.random()
                    },
                    {
                        url: '/assets/img/match2.jpg?' + 100000 * Math.random(),
                        title: '标题3',
                        id: 100000 * Math.random()
                    },
                    {
                        url: '/assets/img/match3.jpg?' + 100000 * Math.random(),
                        title: '标题4',
                        id: 100000 * Math.random()
                    },
                    {
                        url: '/assets/img/match1.jpg?' + 100000 * Math.random(),
                        title: '标题5',
                        id: 100000 * Math.random()
                    },
                    {
                        url: 'http://chuantu.biz/t6/73/1506763867x1942171029.jpg?' + 100000 * Math.random(),
                        title: '标题1',
                        id: 100000 * Math.random()
                    },
                    {
                        url: '/assets/img/match1.jpg?' + 100000 * Math.random(),
                        title: '标题2',
                        id: 100000 * Math.random()
                    },
                    {
                        url: '/assets/img/match2.jpg?' + 100000 * Math.random(),
                        title: '标题3',
                        id: 100000 * Math.random()
                    },
                    {
                        url: '/assets/img/match3.jpg?' + 100000 * Math.random(),
                        title: '标题4',
                        id: 100000 * Math.random()
                    },
                    {
                        url: '/assets/img/match1.jpg?' + 100000 * Math.random(),
                        title: '标题5',
                        id: 100000 * Math.random()
                    }
                ];
                let sliceArr = fashionListImg.splice(0, 1);
                this.setState({
                    loadImg: sliceArr[0],
                    fashionListImg: fashionListImg
                })
                window.removeEventListener('scroll', this.pageScroll, false);
            }
        }
    }

    componentDidMount() {
        document.title = "Ms搭配师";
        window.addEventListener('scroll', this.pageScroll, false);
        let swiper1 = new Swiper('#banner', {
            pagination: '.swiper-pagination',
            loop: true,
            autoplay: 5000
        });
        let fashionListImg = [
            {
                url: 'http://chuantu.biz/t6/73/1506763867x1942171029.jpg?' + 100000 * Math.random(),
                title: '标题1',
                id: 100000 * Math.random()
            },
            {
                url: '/assets/img/match1.jpg?' + 100000 * Math.random(),
                title: '标题2',
                id: 100000 * Math.random()
            },
            {
                url: '/assets/img/match2.jpg?' + 100000 * Math.random(),
                title: '标题3',
                id: 100000 * Math.random()
            },
            {
                url: '/assets/img/match3.jpg?' + 100000 * Math.random(),
                title: '标题4',
                id: 100000 * Math.random()
            },
            {
                url: '/assets/img/match1.jpg?' + 100000 * Math.random(),
                title: '标题5',
                id: 100000 * Math.random()
            },
            {
                url: 'http://chuantu.biz/t6/73/1506763867x1942171029.jpg?' + 100000 * Math.random(),
                title: '标题1',
                id: 100000 * Math.random()
            },
            {
                url: '/assets/img/match1.jpg?' + 100000 * Math.random(),
                title: '标题2',
                id: 100000 * Math.random()
            },
            {
                url: '/assets/img/match2.jpg?' + 100000 * Math.random(),
                title: '标题3',
                id: 100000 * Math.random()
            },
            {
                url: '/assets/img/match3.jpg?' + 100000 * Math.random(),
                title: '标题4',
                id: 100000 * Math.random()
            },
            {
                url: '/assets/img/match1.jpg?' + 100000 * Math.random(),
                title: '标题5',
                id: 100000 * Math.random()
            }
        ];
        let sliceArr = fashionListImg.splice(0, 1);
        this.setState({
            loadImg: sliceArr[0],
            fashionListImg: fashionListImg
        })
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.pageScroll, false);
    }


    render() {
        return (
            <div className="home-page">
                <div id="banner" className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" >
                            <img className="response_img" src="/assets/img/match1.jpg" />
                        </div>
                        <div className="swiper-slide" >
                            <img className="response_img" src="/assets/img/match2.jpg" />
                        </div>
                        <div className="swiper-slide" >
                            <img className="response_img" src="/assets/img/match3.jpg" />
                        </div>
                    </div>
                    <div className="swiper-pagination">
                        <img className="response_img" src="/assets/img/match1.jpg" />
                    </div>
                </div>
                <div className='title'>
                    今日搭配师推荐
                    <Link to="/">MORE</Link>
                </div>
                <section className='today-recommend'>
                    <div className='box'>
                        <Link to="/" >
                            <div className="lside" style={{ background: "url('http://chuantu.biz/t6/73/1506763867x1942171029.jpg')", backgroundSize: "cover" }}>
                            </div>
                            <div className="rside">
                                <div className="r-top" style={{ background: "url('http://chuantu.biz/t6/73/1506763867x1942171029.jpg')", backgroundSize: "cover" }}></div>
                                <div className="r-bottom" style={{ background: "url('http://chuantu.biz/t6/73/1506763867x1942171029.jpg')", backgroundSize: "cover" }}></div>
                            </div>
                            <div className="introduce-area">
                                <div className="introduce" >曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。</div>
                            </div>
                        </Link>
                        <div className="dps-info">
                            <Link to="/">
                                <img src="/assets/img/girl.jpg" className="head-img"></img>
                                <span className="nickname">么么哒</span>
                            </Link>
                            <button className="btn watch-dps">+关注</button>
                        </div>
                    </div>
                    <div className='box'>
                        <Link to="/" >
                            <div className="lside" style={{ background: "url('http://chuantu.biz/t6/73/1506763867x1942171029.jpg')", backgroundSize: "cover" }}>
                            </div>
                            <div className="rside">
                                <div className="r-top" style={{ background: "url('http://chuantu.biz/t6/73/1506763867x1942171029.jpg')", backgroundSize: "cover" }}></div>
                                <div className="r-bottom" style={{ background: "url('http://chuantu.biz/t6/73/1506763867x1942171029.jpg')", backgroundSize: "cover" }}></div>
                            </div>
                            <div className="introduce-area">
                                <div className="introduce" >曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。</div>
                            </div>
                        </Link>
                        <div className="dps-info">
                            <Link to="/">
                                <img src="/assets/img/girl.jpg" className="head-img"></img>
                                <span className="nickname">么么哒</span>
                            </Link>
                            <button className="btn watch-dps">+关注</button>
                        </div>
                    </div>
                    <div className='box'>
                        <Link to="/" >
                            <div className="lside" style={{ background: "url('http://chuantu.biz/t6/73/1506763867x1942171029.jpg')", backgroundSize: "cover" }}>
                            </div>
                            <div className="rside">
                                <div className="r-top" style={{ background: "url('http://chuantu.biz/t6/73/1506763867x1942171029.jpg')", backgroundSize: "cover" }}></div>
                                <div className="r-bottom" style={{ background: "url('http://chuantu.biz/t6/73/1506763867x1942171029.jpg')", backgroundSize: "cover" }}></div>
                            </div>
                            <div className="introduce-area">
                                <div className="introduce" >曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。曾经担任明星御用设计师，杭州年度十佳服装设计师，英国留学。</div>
                            </div>
                        </Link>
                        <div className="dps-info">
                            <Link to="/">
                                <img src="/assets/img/girl.jpg" className="head-img"></img>
                                <span className="nickname">么么哒</span>
                            </Link>
                            <button className="btn watch-dps">+关注</button>
                        </div>
                    </div>

                </section>
                <div className='title'>
                    时尚圈精选
                </div>
                <div className="fashion-list clear">
                    <ul>
                        {
                            this.state.col1Imgs.map((item, index) => {
                                return (
                                    <li className='box' key={index}>
                                        <Link to="/">
                                            <img src={item.url} className="main-img" />
                                        </Link>
                                        <div className='text-area'>
                                            <Link to="/">
                                                <div className="list-title">何穗来教你！超模的“游客照”是这个范儿~的“游客照”是这个范儿的“游客照”是这个范儿</div>
                                            </Link>
                                            <div className="dps-info">
                                                <Link to="/">
                                                    <img src="/assets/img/girl.jpg" className="head-img" />
                                                    <span className="nickname">么么哒</span>
                                                </Link>
                                                <div className="zan">
                                                    <img src="/assets/img/icon/zan.jpg" className="icon" />
                                                    258
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul>
                        {
                            this.state.col2Imgs.map((item, index) => {
                                return (
                                    <li className='box' key={index}>
                                        <Link to="/">
                                            <img src={item.url} className="main-img" />
                                        </Link>
                                        <div className='text-area'>
                                            <Link to="/">
                                                <div className="list-title">何穗来教你！超模的“游客照”是这个范儿~的“游客照”是这个范儿的“游客照”是这个范儿</div>
                                            </Link>
                                            <div className="dps-info">
                                                <Link to="/">
                                                    <img src="/assets/img/girl.jpg" className="head-img" />
                                                    <span className="nickname">么么哒</span>
                                                </Link>
                                                <div className="zan">
                                                    <img src="/assets/img/icon/zan.jpg" className="icon" />
                                                    258
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {/* 时尚圈精选将要展示的图片 */}
                    <ul className="hideItem">
                        <li className='box will-box'>
                            <Link to="/">
                                <img src={this.state.loadImg ? this.state.loadImg.url : ''} className="main-img" onLoad={this.willImg.bind(this)} />
                            </Link>
                            <div className='text-area'>
                                <Link to="/">
                                    <div className="list-title">何穗来教你！超模的“游客照”是这个范儿~的“游客照”是这个范儿的“游客照”是这个范儿</div>
                                </Link>
                                <div className="dps-info">
                                    <Link to="/">
                                        <img src="/assets/img/girl.jpg" className="head-img" />
                                        <span className="nickname">么么哒</span>
                                    </Link>
                                    <div className="zan">
                                        <img src="/assets/img/icon/zan.jpg" className="icon" />
                                        258
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="loading-area">
                        <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />
                    </div>
                </div>
                <News/>
                <Footer tab="1" />
            </div>
        );
    }
}


export default Home;