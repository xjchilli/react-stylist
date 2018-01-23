/**
 * 时尚圈
 * Created by potato on 2017/4/8.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GetNextPage } from '../Component/index';
import { ToolDps } from 'ToolDps';
import { FashionType } from 'ToolAjax';
import classNames from 'classnames';
import LazyLoad from 'react-lazyload';
import { News } from '../Component/index';
import qs from 'query-string';


/**
 * (导航分类)
 * 
 * @class Nav
 * @extends {Component} 
 */
class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: []
        }
    }
    componentDidMount() {
        FashionType().then((res) => {
            if (res.succ) {
                this.setState({
                    tabs: res.data
                });
                this.tabSwiper = new Swiper(this.Jtab, {
                    freeMode: true,
                    slidesPerView: 4,
                    spaceBetween: 15,
                    slidesOffsetBefore: 15,
                    slidesOffsetAfter: 15,
                    observer: true,
                })
            }
        });

    }



    render() {
        return (
            <nav className="index-nav">
                <div className="swiper-container J-tab" ref={(el) => this.Jtab = el}>
                    <div className="swiper-wrapper">
                        {
                            this.state.tabs.map((item, index) => {
                                return (
                                    <div key={index} className={Number(this.props.tab) === item.id ? "swiper-slide on" : "swiper-slide"}>
                                        <Link to={"/fashionMoment?tab=" + item.id} className='tab'>{item.name}</Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </nav>
        );
    }

}

class FashionMoment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fashionListImg: props.state.data || []//时尚圈精选图片
        }

    }
    componentDidMount() {
        document.title = "发现";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            fashionListImg: nextProps.state.data
        })
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


    render() {
        let col1Imgs = [],//时尚圈精选图片1列
            col2Imgs = [];//时尚圈精选图片2列
        if (this.state.fashionListImg.length > 0) {
            let fashion = this.calculate(this.state.fashionListImg);
            col1Imgs = fashion.col1Imgs;
            col2Imgs = fashion.col2Imgs;
        }

        let tab = qs.parse(this.props.location.search).tab || -1;

        return (
            <div className="fashion-moment-area">
                <Nav tab={tab} />

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
                    <div className="loading-area">
                        {this.props.children}
                    </div>
                </div>
                {/* <News /> */}
            </div>
        )
    }
}



export default GetNextPage({
    id: 'FashionMoment', //应用关联使用的redux
    component: FashionMoment, //接收数据的组件入口
    url: '/wx/fashion/list',
    data: (props, state) => { //发送给服务器的数据
        let { currentPager } = state;
        return {
            currentPager: currentPager,
            typeId: qs.parse(props.location.search).tab || -1,
        }
    },
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});