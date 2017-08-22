/**
 * 个人信息
 *
 * Created by potato on 2017/3/15.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataLoad, GetData, PreviewImg } from '../Component/index';

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
        let main = data.succ ? <Profile data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return main;
    }
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewBigImg: false,//是否预览大图
            bigImgUrl: '',//大图url
        }

    }
    componentDidMount() {
        document.title = "个人信息";
    }

    render() {
        let {
            headImg,
            nickName,
            info
        } = this.props.data;
        let {
            sex,
            age,
            cityName,
            professional,
            heigh,
            weight,
            chest,
            waist,
            hip,
            faceshpe,
            colorofskin,
            bodySize,
            lifeImgs
        } = info ? info : {};
        let sexFlag = sex === 1 ? '2' : '1';
        let faceshpeImgSrc = "/assets/img/suit/face-" + sexFlag + "-" + faceshpe + ".jpg"; //脸型图片地址
        let colorofskinImgSrc = "/assets/img/suit/skin-" + sexFlag + "-" + colorofskin + ".jpg"; //肤色图片地址
        let bodyImgSrc = "/assets/img/suit/body-" + sexFlag + "-" + bodySize + ".jpg";

        return (
            <section className="full-page profile-container">
                <header className="flex-box">
                    <div className="item-2 head-img">
                        <img src={headImg} alt="" />
                        {sex && sex === 2 ? (
                            <span className="icon icon-girl"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                        ) : (
                                <span className="icon icon-man"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                            )
                        }
                    </div>
                    <div className="item-2">
                        <p className="name">{nickName}</p>
                        <ul className="flex-box box">
                            <li>
                                <p className="base">
                                    <span>{age}</span>
                                    <span>{cityName}</span>
                                </p>
                                <p className="job">
                                    {professional}
                                    {!age && !cityName && !professional ? "赶紧定制你的专属信息吧~" : null}
                                </p>
                            </li>
                            <li>
                                <Link to="/customSuit" className="again-write">马上定制</Link>
                            </li>
                        </ul>
                    </div>
                </header>
                <div className="figure-info-area">
                    <h3 className="title">
                        身材信息
                    </h3>
                    <p>身高(cm)：<span className={heigh ? "active" : ""}>{heigh ? heigh : "去添加身高~"}</span></p>
                    <p>体重(kg)：<span className={weight ? "active" : ""}>{weight ? weight : "去添加体重~"}</span></p>
                    <p>三围(胸腰臀cm)：<span className={chest ? "active" : ""}>{chest ? chest : "去添加三围~"}、{waist}、{hip}</span></p>
                    <p>脸型、肤色和体型：<span>{faceshpe ? '' : "去选择你的脸型肤色体型~"}</span></p>
                    <div className="flex-box body-img-area">
                        {
                            faceshpe ? (
                                <div className="item-3">
                                    <img src={faceshpeImgSrc} alt="" width="68" height="67" onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: faceshpeImgSrc }) }} />
                                </div>
                            ) : null
                        }
                        {
                            colorofskin ? (
                                <div className="item-3">
                                    <img src={colorofskinImgSrc} alt="" width="68" height="67"  onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: colorofskinImgSrc }) }} />
                                </div>
                            ) : null
                        }
                        {
                            bodySize ? (
                                <div className="item-3">
                                    <img src={bodyImgSrc} alt="" width="68" height="81"  onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: bodyImgSrc }) }} />
                                </div>
                            ) : null
                        }
                    </div>
                </div>
                <div className="photo-wall">
                    <h4 className="title">照片墙</h4>
                    <div className="photo-area">
                        {
                            lifeImgs ? (
                                lifeImgs.map((lifeImg, index) => {
                                    return (
                                        <div className="item" key={index}>
                                            <img src={lifeImg.imgPath} alt="" onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: lifeImg.imgPath }) }} />
                                        </div>
                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>
                {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}
            </section>
        );
    }
}



export default GetData({
    id: 'Profile', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/user/info',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});