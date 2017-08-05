/**
 * 搭配方案
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { DataLoad, GetData, PreviewImg } from '../Component/index';
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
                <Link to={"/dpsProfile?collocationId=" + collocation.id}>
                    <div className="dps-info">
                        <img src={collocation.headImg} alt="" />
                        <p className="nickname">{collocation.nickName}</p>
                        <p className="time">{scenario.time}</p>
                    </div>
                </Link>

                <div className="relate-info">
                    <h3 className="title">{scenario.title}</h3>
                    <p className="desc">{scenario.content}</p>
                </div>
                <div className="relate-goods">
                    <h3>相关单品</h3>
                    <ul>
                        {
                            scenario.thumbailsImg.map((url, index) => {
                                return (
                                    <li key={index}>
                                        <a href="#">
                                            <img src={url} alt="" onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: url }) }} />
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}
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