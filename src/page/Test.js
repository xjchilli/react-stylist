/**
 * 个人信息
 *
 * Created by potato on 2017/3/15.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToolDps } from '../ToolDps';
import { Msg, City, DataLoad, GetData, PreviewImg, Loading } from '../Component/index';
// import { is, fromJS } from 'immutable';
import flatpickr from 'flatpickr';
const zh = require("flatpickr/dist/l10n/zh.js").zh;

/**
 * 性别
 */
class Sex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: props.sex || '2'
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            sex: nextProps.sex
        });
    }


    render() {
        return (
            <ul className="sex-area flex-box">
                <li className="item-2">
                    <div className="text-center sex" onClick={this.props.change.bind(this, '1')}>
                        <img src="/assets/img/suit/sex-1.jpg" width="88" height="88" />
                        <div>
                            <span className="isSelect">
                                男
                            {
                                    this.state.sex == 1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }

                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2 text-center">
                    <div className="text-center sex" onClick={this.props.change.bind(this, '2')}>
                        <img src="/assets/img/suit/sex-2.jpg" width="88" height="88" />
                        <div>
                            <span className="isSelect">
                                女
                            {
                                    this.state.sex == 2 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        )
    }
}


/**
 * 选择您的脸型-女
 */
class FaceGirl extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        document.title = "选择您的脸型";
    }

    render() {
        return (
            <ul>

            </ul>
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
        let main = data.succ ? <CustomSuit data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return main;
    }
}



class CustomSuit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            btnText: '提交',
            sex: '1',//性别
            progress:2//进度
        };
    }

    componentDidMount() {
        document.title = "选择您的性别";
    }


    showMsg(isShow, tipText) {
        this.setState({
            msgShow: isShow,
            msgText: tipText,
        });
    }


    sendForm() {
        let lifeImgIds = []; //未删除的生活照ID
        let {
            sex, //性别
            faceshpe, //脸型
            colorofskin, //肤色
            bodySize, //体型
            problems, //解决问题
            styles, //风格
            heigh, //身高
            weight, //体重
            chest, //胸围
            waist, //腰围
            hip, //臀围
            professional, //职业
            countyCode, //城市
            birthday, //生日
            faceImg,//正脸照
            lifeImgs, //生活照
        } = this.state.data;

        let flag = this.tips(this.state.data);
        if (!flag) {
            return;
        }


        let formdata = new FormData();
        formdata.append('sex', sex);
        formdata.append('faceshpe', faceshpe);
        formdata.append('colorofskin', colorofskin);
        formdata.append('bodySize', bodySize);
        formdata.append('style', styles);
        formdata.append('heigh', heigh);
        formdata.append('weight', weight);
        formdata.append('problem', problems);
        formdata.append('chest', chest);
        formdata.append('waist', waist);
        formdata.append('hip', hip);
        formdata.append('professional', professional);
        formdata.append('countyCode', countyCode);
        formdata.append('birthday', birthday);
        if (faceImg.file) {
            formdata.append('headImg', faceImg.file);
        } else {
            lifeImgIds.push(faceImg.id);
        }
        lifeImgs.forEach((item, index) => {
            if (item.file) {
                formdata.append('lifeImg', item.file);
            }
            if (item.id) {
                lifeImgIds.push(item.id);
            }

        });
        formdata.append('lifeImgIds', lifeImgIds);

        this.setState({
            btnText: '提交中...'
        });

        ToolDps.post('/wx/user/save', formdata, {
            'Content-Type': 'multipart/form-data'
        }).then((res) => {
            if (res.succ) {
                this.showMsg(true, '提交成功');
                this._time = setTimeout(() => {
                    this.context.router.history.push('/fashionMoment');
                }, 1000);
            } else {
                this.showMsg(true, '提交失败');
            }
            this.setState({
                btnText: '提交'
            });
        });
    }

    tips(data) {
        let {
            faceshpe, //脸型
            colorofskin, //肤色
            bodySize, //体型
            problems, //解决问题
            styles, //风格
            faceImg,//正脸照
            lifeImgs, //生活照
        } = data;
        if (faceshpe == "") {
            this.showMsg(true, '请选择脸型');
            return false;
        }
        if (colorofskin == "") {
            this.showMsg(true, '请选择肤色');
            return false;
        }
        if (bodySize == "") {
            this.showMsg(true, '请选择体型');
            return false;
        }
        if (problems.length == 0) {
            this.showMsg(true, '请选择希望能解决的问题');
            return false;
        }
        if (styles.length == 0) {
            this.showMsg(true, '请选择喜欢的穿衣风格');
            return false;
        }
        if (faceImg.imgPath == "") {
            this.showMsg(true, '请上传正脸照片');
            return false;
        }
        if (lifeImgs.length == 0) {
            this.showMsg(true, '请上传全身照');
            return false;
        }
        return true;
    }

    render() {
        return (
            <section className="full-page customsuit-page">
                <div className="progress">
                    <span className="num"></span>
                </div>
                {
                    this.state.progress == 1 ? <Sex sex={this.state.sex} change={(sex) => { this.setState({ sex: sex }) }} /> : null
                }
                {
                    this.state.progress == 2 ? <FaceGirl sex={this.state.sex} change={(sex) => { this.setState({ sex: sex }) }} /> : null
                }
                

                <button className="btn pre-btn">
                    <span>上一步</span>
                </button>
                <button className="btn next-btn">
                    <span>下一步</span>
                </button>
            </section>
        )
    }

}


export default CustomSuit;

// export default GetData({
//     id: 'Profile', //应用关联使用的redux
//     component: Main, //接收数据的组件入口
//     url: '/wx/user/info',
//     data: '', //发送给服务器的数据
//     success: (state) => {
//         return state;
//     }, //请求成功后执行的方法
//     error: (state) => {
//         return state
//     } //请求失败后执行的方法
// });