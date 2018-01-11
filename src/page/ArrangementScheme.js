/**
 * 搭配方案
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { DataLoad, GetData } from '../Component/index';
import { ToolDps } from '../ToolDps';



class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = "搭配方案";
    }

    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;

        let main = data.succ ? <ArrangementScheme data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return (
            <div className="full-page">
                {main}
            </div>
        )
    }
}


class ArrangementScheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewBigImg: false,//是否预览大图
            bigImgUrl: ''//大图url
        }
    }

    render() {
        let { collocation, scenario } = this.props.data;
        return (
            <div className="full-page scheme-area">
                <img src={scenario.masterImg} alt="" />
                <p className='goods-desc'>{scenario.content}</p>
                <Link to={"/dpsProfile?collocationId=" + collocation.id}>
                    <div className="dps-info">
                        <img src={collocation.headImg} alt="" />
                        <p className="nickname">{collocation.nickName}</p>
                        <p className="time">{scenario.time}</p>
                    </div>
                </Link>
                <div className="relate-goods">
                    <h3>相关商品</h3>
                    <ul className='flex-box'>
                        {
                            scenario.goods.map((item, index) => {
                                return (
                                    <li key={index} className='item-2'>
                                        <Link to={'/goodsDetail?id=' + item.goodsId}>
                                            <section className='box'>
                                                <div className='single-goods-img' style={{ backgroundImage: `url(${item.images})` }}></div>
                                                <h6>{item.goodsName}</h6>
                                                <p className='price'>&yen;{item.price}</p>
                                            </section>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}


export default GetData({
    id: 'Profile', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: (props, state) => {
        let { id } = qs.parse(props.location.search);
        return "/wx/fashion/" + id + "/qrcode/detail";
    },
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});