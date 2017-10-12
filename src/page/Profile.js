/**
 * 个人信息
 *
 * Created by potato on 2017/3/15.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import { DataLoad, GetData, PreviewImg } from '../Component/index';


//生活照
class LifePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            photoList: [], //生活照片
        }
    }

    uploadPhoto(e) {
        let self = this;
        let files = e.target.files;
        if (files) {
            let targetFile = files[0];
            let readFile = new FileReader();
            readFile.onload = function () {
                let imgObj = {
                    imgPath: this.result,
                    file: targetFile
                };
                self.file.value = '';

            };
            readFile.readAsDataURL(targetFile);
        }
    }


    render() {
        let imgPath = '/assets/img/girl.jpg';
        // if (this.state.data.faceImg) {
        //     imgPath = this.state.data.faceImg.imgPath;
        // }
        return (
            <div className="lifePhoto-area">
                <h2 className="text-center">个人照片</h2>
                <ul className="flex-box upload-control-area">
                    <li className="item-2">
                        <div className="upload-area" >
                            <span className="icon icon-camera"></span>
                            <p>添加一张正脸照片</p>
                            <div className={imgPath ? "img-show active" : "img-show"} style={{ backgroundImage: 'url(' + imgPath + ')' }} ></div>
                            <input type="file" accept="image/*" className="upload-file" onChange={this.uploadPhoto.bind(this)} />
                        </div>
                    </li>
                    <li className="item-2">
                        <div className="upload-area">
                            <span className="icon icon-camera"></span>
                            <p>添加近期全身照</p>
                            <div className={imgPath ? "img-show active" : "img-show"} style={{ backgroundImage: 'url(' + imgPath + ')' }} ></div>
                            <input type="file" accept="image/*" className="upload-file" onChange={this.uploadPhoto.bind(this)} />
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}




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
            problems,
            styles,
            colorofskin,
            bodySize,
            lifeImgs
        } = info ? info : {}; 

        console.log(styles);
        console.log(problems);

        return (
            <section className="full-page profile-page">
                <div className="cicle"></div>
                <section className="box">
                    <div className="head-img-area">
                        <img src={headImg} className="head-img" />
                        {sex && sex === 2 ? (
                            <span className="icon icon-girl"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                        ) : (
                                <span className="icon icon-man"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                            )
                        }
                    </div>
                    <p className="text-center nickname">{nickName}</p>
                    <div className="text-center">
                        <span className="address">{cityName}</span>
                        <span className="job">{professional}</span>
                    </div>
                    <ul className="flex-box age-height-weight">
                        <li className="item-3">
                            <label>年龄</label>{age}
                        </li>
                        <li className="item-3">
                            <label>身高</label>{heigh}cm
                        </li>
                        <li className="item-3">
                            <label>体重</label>{weight}kg
                        </li>
                    </ul>
                    <dl className="flex-box face-skin-body">
                        <dt>脸型 ，肤色和体型</dt>
                        <dd className="item-3">
                            <img src="/assets/img/suit/face-1-1.jpg" width="68" height="67" />
                            <p className="text-center name">圆形</p>
                        </dd>
                        <dd className="item-3">
                            <img src="/assets/img/suit/skin-1-1.jpg" width="68" height="67" />
                            <p className="text-center name">自然红润</p>
                        </dd>
                        <dd className="item-3">
                            <img src="/assets/img/suit/body-1-1.jpg" width="auto" height="67" />
                            <p className="text-center name">沙漏型</p>
                        </dd>
                    </dl>
                    <h6 className="title">希望能解决的问题</h6>
                    {
                        problems.map((item,index)=>{

                        })
                    }
                    <ul className="flex-box solutions">
                        <li className="item-4">脸大</li>
                        <li className="item-4">肩宽</li>
                        <li className="item-4">胳膊粗</li>
                        <li className="item-4">脖子粗</li>
                    </ul>
                    <ul className="flex-box solutions">
                        <li className="item-4">脸大</li>
                        <li className="item-4">肩宽</li>
                        <li className="item-4">胳膊粗</li>
                        <li className="item-4">脖子粗</li>
                    </ul>
                    <h6 className="title">喜欢的穿衣风格</h6>
                    <ul className="flex-box styles">
                        <li className="item-3">中性运动风</li>
                        <li className="item-3">日系小淸新</li>
                        <li className="item-3">文艺复古情怀</li>
                    </ul>
                    <ul className="flex-box solutions">
                        <li className="item-3">中性运动风</li>
                        <li className="item-3">日系小淸新</li>
                        <li className="item-3">文艺复古情怀</li>
                    </ul>
                    <Link to="/customSuit" className="btn text-center to-write">
                        <span>重新填写</span>
                    </Link>
                </section>
                <LifePhoto />
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