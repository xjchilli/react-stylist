/**
 * 时尚圈
 * Created by potato on 2017/4/8.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GetNextPage } from '../Component/index';
import { ToolDps } from '../ToolDps';
import classNames from 'classnames';
import LazyLoad from 'react-lazyload';
import { Footer, News } from '../Component/index';



class FashionMoment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fashionListImg: props.state.data || []//时尚圈精选图片
        }

    }
    componentDidMount() {
        document.title = "时尚圈";
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
        let rate = imgW / fashionListImg[0].width;//比率

        for (let i = 0; i < data.length; i++) {
            data[i].width = data[i].width * rate;
            data[i].height = data[i].height * rate;
            if (col1H <= col2H) {
                col1Imgs.push(data[i]);
                col1H += data[i].height;
            } else {
                col2Imgs.push(data[i]);
                col2H += data[i].height;
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



        return (
            <div className="fashion-moment-area">
                <Footer tab="4" />
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
                                                <Link to={"/dpsProfile?collocationId="+item.collocationId}>
                                                    <img src={item.collocationHeadImg} className="head-img" />
                                                    <span className="nickname">{item.collocationNickName}</span>
                                                </Link>
                                                <div className="zan">
                                                    <img src={item.agreeValue === 1 ? "/assets/img/icon/zan-active.jpg" : "/assets/img/icon/zan.jpg"} className="icon" />
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
                                                <Link to={"/dpsProfile?collocationId="+item.collocationId}>
                                                    <img src={item.collocationHeadImg} className="head-img" />
                                                    <span className="nickname">{item.collocationNickName}</span>
                                                </Link>
                                                <div className="zan">
                                                    <img src={item.agreeValue === 1 ? "/assets/img/icon/zan-active.jpg" : "/assets/img/icon/zan.jpg"} className="icon" />
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
                
                <News />
            </div>
        )
    }
}



export default GetNextPage({
    id: 'FashionMoment', //应用关联使用的redux
    component: FashionMoment, //接收数据的组件入口
    url: '/wx/fashion/list',
    data: (props, state) => { //发送给服务器的数据
        let {
            currentPager
        } = state;
        return {
            currentPager
        }
    },
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});