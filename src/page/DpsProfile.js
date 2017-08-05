/**
 * 搭配师个人信息
 * Created by potato on 2017/5/23 0023.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { DataLoad, GetData } from '../Component/index';



class Main extends Component {
    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;

        let main = data && data.succ ? <DpsProfile data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return main
    }
}

class DpsProfile extends Component {
    componentDidMount() {
        document.title = "搭配师个人信息";
    }


    render() {
        let {
            collocation,
            plans,
            shops
        } = this.props.data;
        shops.map((item, index) => {
            if (item.type === 1) {
                item['typeName'] = "咨询";
            } else if (item.type === 2) {
                item['typeName'] = "购物";
            } else if (item.type === 3) {
                item['typeName'] = "陪逛";
            } else if (item.type === 4) {
                item['typeName'] = "整理";
            }
            item['url'] = "/dpsServerDetail?shopId=" + item.id;
            item['imgUrl'] = "/assets/img/match" + item.type + ".jpg";
        });
        return (
            <section className="full-page dps-profile-page" >
                <header>
                    <div className="item">
                        <div className="head-img">
                            <img src={collocation.headImg} alt="" />
                            <span className="text-center sex">{collocation.sex === 1 ? '♂' : '♀'}</span>
                        </div>
                    </div>
                    <div className="item dps-info">
                        <p className="nickName">{collocation.nickName}</p>
                        <p className="style">擅长风格：{collocation.goodsStyle}</p>
                        <p className="introduce-text">简介：{collocation.remark}</p>
                    </div>
                </header>
                <div className="photo-wall">
                    <h4 className="text-center title">现有服务</h4>
                    <div className="flex-box">
                        {
                            shops.map((item, index) => {
                                return (
                                    <Link to={item.url} className="item-2" key={index} >
                                        <img src={item.imgUrl} className="response_img" alt="" />
                                        <span className="text-center">{item.typeName}</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="photo-wall">
                    <h4 className="text-center title">搭配师的时尚圈</h4>
                    <div className="flex-box">
                        {
                            plans.map((item, index) => {
                                return (
                                    <Link to={"/fashionMomentDetail?planId=" + item.id} className="item-2" key={index}>
                                        <img src={item.masterImage} className="fashion-img" alt="" />
                                        <div className="statistics">
                                            <span className="agree" >
                                                <svg viewBox="0 0 200 200" className='icon-svg-zan' >
                                                    <use xlinkHref="/assets/img/icon.svg#svg-zan" />
                                                </svg>
                                                {item.agreeNum}
                                            </span>
                                            <span className="comment" >
                                                <svg viewBox="0 0 1024 1024" className="icon-svg-comment" >
                                                    <use xlinkHref="/assets/img/icon.svg#svg-comment" />
                                                </svg>
                                                {item.commentNum}
                                            </span>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        );
    }
}



export default GetData({
    id: 'DpsProfile', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: (props, state) => {
        let { collocationId } = props.location.query;
        return "/wx/fashion/" + collocationId + "/dps";
    },
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});