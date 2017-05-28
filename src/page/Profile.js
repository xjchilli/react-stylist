/**
 * 个人信息
 *
 * Created by potato on 2017/3/15.
 */
import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router-dom';
import {
    DataLoad,
    GetData
} from '../Component/index';

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

        return (
            <div className="full-page">
                {main}
            </div>
        )
    }
}

class Profile extends Component {
    constructor(props) {
        super(props);

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
            birthday,
            city,
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
        let faceshpeImgSrc = "/assets/img/face" + faceshpe + ".png"; //脸型图片地址
        let colorofskinImgSrc = "/assets/img/skin" + colorofskin + ".png"; //肤色图片地址
        let bodyImgSrc = "/assets/img/body" + bodySize + ".png";

        return (
            <section className="full-page profile-container" >
                <header>
                    <div className="head-img">
                        <img src={headImg} alt=""/>
                        {sex ? <span className="sex">{sex === 1 ? '♂' : '♀'}</span> : null}
                    </div>
                </header>
                <p className="name">{nickName}</p>
                <div className="base-info-area">
                    {birthday ? <span>{birthday}</span> : null}
                    {city ? <span>{city}</span> : null}
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
                                    <img src={faceshpeImgSrc} alt=""/>
                                </div>
                             ) : null
                        }
                        {
                            colorofskin ? (
                                <div className="item">
                                    <img src={colorofskinImgSrc} alt=""/>
                                </div>
                            ) : null
                        }
                        {
                            bodySize ? (
                                <div className="item">
                                    <img src={bodyImgSrc} alt=""/>
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
                                lifeImgs.map((lifeImg,index)=>{
                                    return (
                                        <div className="item" key={index}>
                                            <img src={lifeImg} alt=""/>
                                        </div>
                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>
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