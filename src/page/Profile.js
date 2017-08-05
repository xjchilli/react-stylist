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
        let isBoyImg = sex === 1 ? '-boy' : '';
        let faceshpeImgSrc = "/assets/img/face" + faceshpe + "" + isBoyImg + ".jpg"; //脸型图片地址
        let colorofskinImgSrc = "/assets/img/skin" + colorofskin + "" + isBoyImg + ".jpg"; //肤色图片地址
        let bodyImgSrc = "/assets/img/body" + bodySize + "" + isBoyImg + ".jpg";

        return (
            <section className="full-page profile-container">
                <header>
                    <div className="head-img">
                        <img src={headImg} alt="" />
                        {sex ? <span className="sex">{sex === 1 ? '♂' : '♀'}</span> : null}
                    </div>
                </header>
                <p className="name">{nickName}</p>
                <div className="base-info-area">
                    {age ? <span>{age}</span> : null}
                    {cityName ? <span>{cityName}</span> : null}
                    {professional ? <span>{professional}</span> : null}
                </div>
                <div className="figure-info-area">
                    <h3 className="title">
                        您的身材信息
                        <Link to="/customSuit" className="overwrite--figure-info">重新录入</Link>
                    </h3>
                    <div className="body-info-area">
                        <span>身高(CM)：{heigh}</span>
                        <span>体重(KG)：{weight}</span>
                    </div>
                    <p className="sanwei">三围(胸腰臀CM)：{chest} {waist} {hip}</p>
                    <div className="body-img-area">
                        {
                            faceshpe ? (
                                <div className="item">
                                    <img src={faceshpeImgSrc} alt="" onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: faceshpeImgSrc }) }} />
                                </div>
                            ) : null
                        }
                        {
                            colorofskin ? (
                                <div className="item">
                                    <img src={colorofskinImgSrc} alt="" onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: faceshpeImgSrc }) }}  />
                                </div>
                            ) : null
                        }
                        {
                            bodySize ? (
                                <div className="item">
                                    <img src={bodyImgSrc} alt="" onClick={() => { this.setState({ previewBigImg: true, bigImgUrl: faceshpeImgSrc }) }}  />
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