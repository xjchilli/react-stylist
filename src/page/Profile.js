/**
 * 个人信息
 *
 * Created by potato on 2017/3/15.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import { DataLoad, GetData, Loading } from '../Component/index';
import PropTypes from 'prop-types';


//生活照
class LifePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            imgLoding: false,//正脸照上传loading图
            imgLoding2: false,//全身照上传loading图
            faceLifeImg: props.faceLifeImg || '',//正脸照
            bodyFaceImg: props.bodyFaceImg || '',//全身照
        }
    }

    selectImg(type, e) {
        let files = e.target.files;
        if (files && files[0]) {
            let readFile = new FileReader();
            readFile.onload = () => {
                this.upload(type, files[0]);
            }
            readFile.readAsDataURL(files[0]);
        }
    }

    upload(type, file) {
        if (type == "face") {
            this.setState({
                imgLoding: true
            });
        } else if (type == "all") {
            this.setState({
                imgLoding2: true
            });
        }
        let formdata = new FormData();
        formdata.append('type', type);
        formdata.append('img', file);
        ToolDps.post('/wx/user/uploadInfoImg', formdata, {
            'Content-Type': 'multipart/form-data'
        }).then((data) => {
            if (data.succ) {
                if (type == "face") {
                    this.setState({
                        imgLoding: false,
                        faceLifeImg: data.img
                    });
                } else if (type == "all") {
                    this.setState({
                        imgLoding2: false,
                        bodyFaceImg: data.img
                    });
                }
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '上传图片失败',
                });
            }
        });
    }

    render() {
        return (
            <div className="lifePhoto-area">
                <h2 className="text-center">个人照片</h2>
                <ul className="flex-box upload-control-area">
                    <li className="item-2">
                        <div className="upload-area" >
                            <span className="icon icon-camera"></span>
                            <p>添加一张正脸照片</p>
                            <div className={this.state.faceLifeImg ? "img-show active" : "img-show"} style={{ backgroundImage: 'url(' + this.state.faceLifeImg + ')' }} ></div>
                            <input type="file" accept="image/*" className="upload-file" onChange={this.selectImg.bind(this, 'face')} />
                            {
                                this.state.imgLoding ? <Loading /> : null
                            }
                        </div>
                    </li>
                    <li className="item-2">
                        <div className="upload-area">
                            <span className="icon icon-camera"></span>
                            <p>添加近期全身照</p>
                            <div className={this.state.bodyFaceImg ? "img-show active" : "img-show"} style={{ backgroundImage: 'url(' + this.state.bodyFaceImg + ')' }} ></div>
                            <input type="file" accept="image/*" className="upload-file" onChange={this.selectImg.bind(this, 'all')} />
                            {
                                this.state.imgLoding2 ? <Loading /> : null
                            }
                        </div>
                    </li>
                </ul>

                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </div>
        )
    }
}




class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadAnimation: true,
            loadMsg: '正在加载...',
            data: null,
        }
    }

    componentDidMount() {
        ToolDps.get('/wx/user/info').then((res) => {
            if (res.succ) {
                this.setState({
                    data: res,
                    loadAnimation: false,
                    loadMsg: '加载成功'
                });
            } else {
                this.setState({
                    loadAnimation: true,
                    loadMsg: '加载失败'
                });
            }
        }).catch(() => {
            this.setState({
                loadAnimation: true,
                loadMsg: '加载失败'
            });
        });
    }

    render() {
        let main = this.state.data ? <Profile data={this.state.data} /> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />;

        return main;
    }
}

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.data.info.faceshpe) {//如果没填写过个人信息跳转填写页面
            this.context.router.history.push('/customSuit');
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
            faceshpe,
            faceshpeImg,
            problemValues,
            styleValues,
            colorofskin,
            colorofskinImg,
            bodySize,
            bodySizeImg,
            faceLifeImg,
            bodyFaceImg
        } = info;



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
                            <img src={faceshpeImg} width="68" height="67" />
                            <p className="text-center name">{faceshpe}</p>
                        </dd>
                        <dd className="item-3">
                            <img src={colorofskinImg} width="68" height="67" />
                            <p className="text-center name">{colorofskin}</p>
                        </dd>
                        <dd className="item-3">
                            <img src={bodySizeImg} width="auto" height="67" />
                            <p className="text-center name">{bodySize}</p>
                        </dd>
                    </dl>
                    <h6 className="title">希望能解决的问题</h6>
                    <ul className="flex-box solutions">
                        {
                            problemValues.map((solution, index) => {
                                return index < 4 ? <li className="item-4" key={index}>{solution}</li> : null
                            })
                        }
                    </ul>
                    {
                        problemValues.length > 4 ? (
                            <ul className="flex-box solutions">
                                {
                                    problemValues.map((solution, index) => {
                                        return index > 3 ? <li className="item-4" key={index}>{solution}</li> : null
                                    })
                                }
                            </ul>
                        ) : null
                    }
                    <h6 className="title">喜欢的穿衣风格</h6>
                    <ul className="flex-box styles">
                        {
                            styleValues.map((style, index) => {
                                return index < 3 ? <li className="item-3" key={index}>{style}</li> : null
                            })
                        }
                    </ul>
                    {
                        problemValues.length > 3 ? (
                            <ul className="flex-box styles">
                                {
                                    styleValues.map((style, index) => {
                                        return index > 2 ? <li className="item-3" key={index}>{style}</li> : null
                                    })
                                }
                            </ul>
                        ) : null
                    }
                    <Link to="/customSuit" className="btn text-center to-write">
                        <span>重新填写</span>
                    </Link>
                </section>
                <LifePhoto faceLifeImg={faceLifeImg} bodyFaceImg={bodyFaceImg} />
            </section>
        );
    }
}


Profile.contextTypes = {
    router: PropTypes.object.isRequired
};



export default Main;