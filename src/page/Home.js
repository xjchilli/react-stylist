/**
 * 首页
 */
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import { Msg, DataLoad, Footer, News, GetData } from '../Component/index';



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
        let main = data && data.succ ? <Home data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            fashionListImg: props.data.plans || [],//时尚圈精选图片
            recommand: props.data.recommand,//今日推荐搭配师
            slideshow: props.data.slideshow,//Banner
            loadAnimation: true,
            loadMsg: '正在加载中',
        }
    }

    componentDidMount() {
        document.title = "Ms搭配师";
        let swiper1 = new Swiper('#banner', {
            pagination: '.swiper-pagination',
            loop: true,
            autoplay: 5000
        });
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            fashionListImg: nextProps.data.plans || [],//时尚圈精选图片
            recommand: nextProps.data.recommand,//今日推荐搭配师
            slideshow: nextProps.data.slideshow,//Banner
        });
    }


    calculate(fashionListImg) {
        let col1Imgs = [],//时尚圈精选图片1列
            col2Imgs = [],//时尚圈精选图片2列
            col1H = 0,//时尚圈精选图片1列高度
            col2H = 0;//时尚圈精选图片2列高度
        let data = fashionListImg;
        let imgW = window.innerWidth / 2 - 10;//布局图片宽度
        for (let i = 0; i < data.length; i++) {
            let rate = imgW / data[i].width;//比率
            let height = data[i].height * rate + 100;
            if (col1H <= col2H) {
                col1Imgs.push(data[i]);
                col1H += height;
            } else {
                col2Imgs.push(data[i]);
                col2H += height;
            }
        }

        return {
            col1Imgs: col1Imgs,
            col2Imgs: col2Imgs
        }
    }

    /**
     * 关注搭配师
     */
    watchDps(collocationId) {
        ToolDps.post('/wx/concern/doAddOrDel', { collocationId: collocationId }).then((res) => {
            if (res.succ) {
                let copyRecommand = Array.prototype.slice.apply(this.state.recommand);
                for (let i = 0; i < copyRecommand.length; i++) {
                    if (copyRecommand[i].collocationId == collocationId) {
                        copyRecommand[i].concern = !copyRecommand[i].concern;
                        break;
                    }
                }
                this.setState({
                    recommand: copyRecommand
                });
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '操作失败' //提示内容
                });
            }

        });
    }


    render() {
        let col1Imgs = [],//时尚圈精选图片1列
            col2Imgs = [];//时尚圈精选图片2列
        if (this.state.fashionListImg.length > 0) {
            let fashion = this.calculate(this.state.fashionListImg);
            col1Imgs = fashion.col1Imgs;
            col2Imgs = fashion.col2Imgs;
        }
        return (
            <div className="home-page">
                {/* <Footer tab="1" /> */}
                <div id="banner" className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            this.state.slideshow.map((item, index) => {
                                return (
                                    <div className="swiper-slide" key={index} >
                                        <a href={item.url}>
                                            <img className="response_img" src={item.img} />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="swiper-pagination">
                        <img className="response_img" src="/assets/img/match1.jpg" />
                    </div>
                </div>
                <div className='title'>
                    今日搭配师推荐
                    <Link to="/dpsList">MORE</Link>
                </div>
                <section className='today-recommend'>
                    {
                        this.state.recommand.map((item, index) => {
                            return (
                                <div className='box' key={index}>
                                    <Link to={"/dpsProfile?collocationId=" + item.collocationId} >
                                        <div className="lside" style={{ background: "url(" + item.masterImg + ")", backgroundSize: "cover" }}>
                                        </div>
                                    </Link>
                                    <div className="rside">
                                        <Link to={"/fashionMomentDetail?planId=" + item.topPlanId}>
                                            <div className="r-top" style={{ background: "url(" + item.topImg + ")", backgroundSize: "cover" }}></div>
                                        </Link>
                                        <Link to={"/fashionMomentDetail?planId=" + item.bottomPlanId}>
                                            <div className="r-bottom" style={{ background: "url(" + item.buttomImg + ")", backgroundSize: "cover" }}></div>
                                        </Link>
                                    </div>
                                    <div className="introduce-area">
                                        <div className="introduce" >{item.title}</div>
                                    </div>

                                    <div className="dps-info">
                                        <Link to={"/dpsProfile?collocationId=" + item.collocationId}>
                                            <img src={item.headImg} className="head-img"></img>
                                            <span className="nickname">{item.nickName}</span>
                                        </Link>
                                        <button className={item.concern ? "btn watch-dps watched" : "btn watch-dps"} onClick={this.watchDps.bind(this, item.collocationId)}>{item.concern ? "已关注" : "+关注"}</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
                <div className='title'>
                    时尚圈精选
                </div>
                <div className="fashion-list clear">
                    <ul>
                        {
                            col1Imgs.map((item, index) => {
                                return (
                                    <li className='box' key={index}>
                                        <Link to={"/fashionMomentDetail?planId=" + item.id}>
                                            <img src={item.masterImage} className="main-img" />
                                        </Link>
                                        <div className='text-area'>
                                            <Link to={"/fashionMomentDetail?planId=" + item.id}>
                                                <div className="list-title">{item.planName}</div>
                                            </Link>
                                            <div className="dps-info">
                                                <Link to={"/dpsProfile?collocationId=" + item.collocationId}>
                                                    <img src={item.collocationHeadImg} className="head-img" />
                                                    <span className="nickname">{item.collocationNickName}</span>
                                                </Link>
                                                <div className="zan">
                                                    {item.agreeValue === 1 ? <span className="icon icon-heart-selected"></span> : <span className="icon icon-heart"></span>}
                                                    {item.agreeNum}
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
                            col2Imgs.map((item, index) => {
                                return (
                                    <li className='box' key={index}>
                                        <Link to={"/fashionMomentDetail?planId=" + item.id}>
                                            <img src={item.masterImage} className="main-img" />
                                        </Link>
                                        <div className='text-area'>
                                            <Link to={"/fashionMomentDetail?planId=" + item.id}>
                                                <div className="list-title">{item.planName}</div>
                                            </Link>
                                            <div className="dps-info">
                                                <Link to={"/dpsProfile?collocationId=" + item.collocationId}>
                                                    <img src={item.collocationHeadImg} className="head-img" />
                                                    <span className="nickname">{item.collocationNickName}</span>
                                                </Link>
                                                <div className="zan">
                                                    {item.agreeValue === 1 ? <span className="icon icon-heart-selected"></span> : <span className="icon icon-heart"></span>}
                                                    {item.agreeNum}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <News />
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </div>
        );
    }
}


export default GetData({
    id: 'Home', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/index',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});