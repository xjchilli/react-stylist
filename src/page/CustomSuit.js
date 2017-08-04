/**
 * 搭配测试
 * Created by potato on 2017/4/18 0018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import merged from 'obj-merged';
import { CSSTransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { ToolDps } from '../ToolDps';
import action from '../Action/Index';
import classNames from 'classnames';
import { Msg, City } from '../Component/index';
import { is, fromJS } from 'immutable';
import flatpickr from 'flatpickr';
const zh = require("flatpickr/dist/l10n/zh.js").zh;


//脸型
class Face extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girlFaces: ['/assets/img/face1.jpg', '/assets/img/face2.jpg', '/assets/img/face3.jpg', '/assets/img/face4.jpg'],
            boyFaces: ['/assets/img/face1-boy.jpg', '/assets/img/face2-boy.jpg', '/assets/img/face3-boy.jpg', '/assets/img/face4-boy.jpg'],
            faceshpe: props.data.faceshpe || '1' //脸型
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            faceshpe: nextProps.data.faceshpe
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    //选择脸型
    select(face) {
        let myData = this.props.data;
        myData.faceshpe = face;
        this.props.setState(myData);

    }

    render() {
        let { sex } = this.props.data;
        let faces = [];
        if (sex === 1) {//男
            faces = this.state.boyFaces;
        } else {//女
            faces = this.state.girlFaces;
        }

        return (
            <div className="swiper-slide" >
                <h2 className="title">选择你的脸型</h2>
                <section className="face-area">
                    {
                        faces.map((url, index) => {
                            return (<section className="item" key={index}>
                                <div className={this.state.faceshpe == index + 1 ? 'img-area active' : 'img-area'} onClick={this.select.bind(this, index + 1 + '')}>
                                    <img src={url} alt="" />
                                </div>
                            </section>)
                        })
                    }
                </section>
            </div>
        )
    }
}
//肤色
class Skin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girlSkin: ['/assets/img/skin1.jpg', '/assets/img/skin2.jpg', '/assets/img/skin3.jpg', '/assets/img/skin4.jpg'],
            boySkin: ['/assets/img/skin1-boy.jpg', '/assets/img/skin2-boy.jpg', '/assets/img/skin3-boy.jpg', '/assets/img/skin4-boy.jpg'],
            colorofskin: props.data.colorofskin || '1', //肤色
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            colorofskin: nextProps.data.colorofskin
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    //选择肤色
    select(skin) {
        let myData = this.props.data;
        myData.colorofskin = skin;
        this.props.setState(myData);
    }

    render() {
        let { sex } = this.props.data;
        let skins = [];
        if (sex === 1) {//男
            skins = this.state.boySkin;
        } else {//女
            skins = this.state.girlSkin;
        }

        return (
            <div className="swiper-slide" >
                <h2 className="title">选择你的肤色</h2>
                <section className="skin-area">
                    {
                        skins.map((url, index) => {
                            return (<section className="item" key={index}>
                                <div className={this.state.colorofskin == index + 1 ? 'img-area active' : 'img-area'} onClick={this.select.bind(this, index + 1 + '')}>
                                    <img src={url} alt="" />
                                </div>
                            </section>)
                        })
                    }
                </section>
            </div>
        )
    }
}
//身型
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girlBody: ['/assets/img/body1.jpg', '/assets/img/body2.jpg', '/assets/img/body3.jpg', '/assets/img/body4.jpg', '/assets/img/body5.jpg'],
            boyBody: ['/assets/img/body1-boy.jpg', '/assets/img/body2-boy.jpg', '/assets/img/body3-boy.jpg', '/assets/img/body4-boy.jpg', '/assets/img/body5-boy.jpg'],
            bodySize: props.data.bodySize || '1', //体型
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            bodySize: nextProps.data.bodySize
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    //选择体型
    select(body) {
        let myData = this.props.data;
        myData.bodySize = body;
        this.props.setState(myData);
    }

    render() {
        let { sex } = this.props.data;
        let bodys = [];
        if (sex === 1) {//男
            bodys = this.state.boyBody;
        } else {//女
            bodys = this.state.girlBody;
        }

        return (
            <div className="swiper-slide" >
                <h2 className="title">选择你的身型</h2>
                <section className="body-area">
                    {
                        bodys.map((url, index) => {
                            return (<section className="item" key={index}>
                                <div className={this.state.bodySize == index + 1 ? 'img-area active' : 'img-area'} onClick={this.select.bind(this, index + 1 + '')}>
                                    <img src={url} alt="" />
                                </div>
                            </section>)
                        })
                    }
                </section>
            </div>
        )
    }
}
//希望搭配能解决什么
class Resolve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girlResolve: [{ num: '1', value: '脸大' }, { num: '2', value: '肩宽' }, { num: '3', value: '胳膊粗' }, { num: '4', value: '小粗腿' }, { num: '5', value: '脖子粗' }, { num: '6', value: '大胸' }, { num: '7', value: '平胸' }, { num: '8', value: 'PP大' }, { num: '9', value: '小短腿' }],
            boyResolve: [{ num: '1', value: '脸大' }, { num: '2', value: '肩宽' }, { num: '3', value: '小粗腿' }, { num: '4', value: '脖子粗' }, { num: '5', value: '啤酒肚' }, { num: '6', value: '小短腿' }, { num: '7', value: '翘臀' }],
            problems: props.data.problems || []
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            problems: nextProps.data.problems
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    select(resolve) {
        let myProblemArr = Array.prototype.slice.apply(this.state.problems);
        let index = myProblemArr.indexOf(resolve);
        if (index !== -1) {
            myProblemArr.splice(index, 1);
        } else {
            myProblemArr.push(resolve);
        }

        let myData = this.props.data;
        myData.problems = myProblemArr;
        this.props.setState(myData);

    }

    render() {
        let { sex } = this.props.data;
        let girlResolves = [];
        let boyResolves = [];
        if (sex === 1) {//男
            boyResolves = this.state.boyResolve;
        } else {//女
            girlResolves = this.state.girlResolve;
        }

        return (
            <div className="swiper-slide">
                <h2 className="title">希望搭配能解决什么（多选）</h2>
                <section className="resolve-area">
                    {sex === 1 ? <img src="/assets/img/resolve-boy.jpg" alt="" /> : <img src="/assets/img/resolve.jpg" alt="" />}

                    {
                        girlResolves.map((item, index) => {
                            return (
                                <lable key={index} className={this.state.problems.indexOf(item.num) !== -1 ? 'resolve resolve' + item.num + ' active' : 'resolve resolve' + item.num + ''} onClick={this.select.bind(this, item.num)}>{item.value}</lable>
                            )
                        })
                    }
                    {
                        boyResolves.map((item, index) => {
                            return (
                                <lable key={index} className={this.state.problems.indexOf(item.num) !== -1 ? 'resolve resolveBoy resolve' + item.num + ' active' : 'resolve resolveBoy resolve' + item.num + ''} onClick={this.select.bind(this, item.num)}>{item.value}</lable>
                            )
                        })
                    }
                </section>
            </div>
        )
    }
}
//风格
class Style extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girlStyle: ['/assets/img/style1.jpg', '/assets/img/style2.jpg', '/assets/img/style3.jpg', '/assets/img/style4.jpg', '/assets/img/style5.jpg', '/assets/img/style6.jpg'],
            boyStyle: ['/assets/img/style1-boy.jpg', '/assets/img/style2-boy.jpg', '/assets/img/style3-boy.jpg', '/assets/img/style4-boy.jpg', '/assets/img/style5-boy.jpg'],
            styles: props.data.styles || []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            styles: nextProps.data.styles
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }


    select(style) {
        let arr = Array.prototype.slice.apply(this.state.styles);
        let index = arr.indexOf(style);
        if (index !== -1) {
            arr.splice(index, 1);
        } else {
            arr.push(style);
        }

        let myData = this.props.data;
        myData.styles = arr;
        this.props.setState(myData);
    }

    render() {
        let { sex } = this.props.data;
        let styles = [];
        if (sex === 1) {//男
            styles = this.state.boyStyle;
        } else {//女
            styles = this.state.girlStyle;
        }
        return (
            <div className="swiper-slide" >
                <h2 className="title">您喜欢的风格（多选）</h2>
                <section className="style-area">
                    {
                        styles.map((url, index) => {
                            return (
                                <section className="item" key={index}>
                                    <div className={this.state.styles.indexOf(index + 1 + '') !== -1 ? 'img-area active' : 'img-area'} onClick={this.select.bind(this, index + 1 + '')}>
                                        <img src={url} alt="" />
                                    </div>
                                </section>
                            )
                        })
                    }
                </section>
            </div>
        )
    }
}
//基础信息
class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data || null
        }
    }
    componentDidMount() {
        //身高
        this.height = new Swiper('.J-height', {
            initialSlide: 20,
            slidesPerView: 5,
            centeredSlides: true,
            freeMode: true,
            freeModeSticky: true,
            onTap: (swiper) => {
                swiper.slideTo(swiper.clickedIndex, 100, false);
                let heigh = swiper.slides[swiper.clickedIndex].textContent.trim();
                let myData = this.state.data;
                myData.heigh = heigh;
                this.props.setState(myData);
            },
            onTransitionEnd: (swiper) => { //slide改变
                let heigh = swiper.slides[swiper.activeIndex].textContent.trim();
                let myData = this.state.data;
                myData.heigh = heigh;
                this.props.setState(myData);
            }
        });
        //体重
        this.weight = new Swiper('.J-weight', {
            initialSlide: 25,
            slidesPerView: 5,
            centeredSlides: true,
            freeMode: true,
            freeModeSticky: true,
            onTap: (swiper) => {
                swiper.slideTo(swiper.clickedIndex, 100, false);
                let weight = swiper.slides[swiper.clickedIndex].textContent;
                let myData = this.state.data;
                myData.weight = weight;
                this.props.setState(myData);
            },
            onTransitionEnd: (swiper) => { //slide改变
                let weight = swiper.slides[swiper.activeIndex].textContent;
                let myData = this.state.data;
                myData.weight = weight;
                this.props.setState(myData);
            }
        });
        //胸围
        this.chest = new Swiper('.J-chest', {
            initialSlide: 10,
            slidesPerView: 5,
            centeredSlides: true,
            freeMode: true,
            freeModeSticky: true,
            onTap: (swiper) => {
                swiper.slideTo(swiper.clickedIndex, 100, false);
                let chest = swiper.slides[swiper.clickedIndex].textContent;
                let myData = this.state.data;
                myData.chest = chest;
                this.props.setState(myData);
            },
            onTransitionEnd: (swiper) => { //slide改变
                let chest = swiper.slides[swiper.activeIndex].textContent;
                let myData = this.state.data;
                myData.chest = chest;
                this.props.setState(myData);
            }
        });
        //腰围
        this.waistline = new Swiper('.J-waistline', {
            initialSlide: 20,
            slidesPerView: 5,
            centeredSlides: true,
            freeMode: true,
            freeModeSticky: true,
            onTap: (swiper) => {
                swiper.slideTo(swiper.clickedIndex, 100, false);
                let waist = swiper.slides[swiper.clickedIndex].textContent;
                let myData = this.state.data;
                myData.waist = waist;
                this.props.setState(myData);
            },
            onTransitionEnd: (swiper) => { //slide改变
                let waist = swiper.slides[swiper.activeIndex].textContent;
                let myData = this.state.data;
                myData.waist = waist;
                this.props.setState(myData);
            }
        });
        //臀围
        this.hipline = new Swiper('.J-hipline', {
            initialSlide: 10,
            slidesPerView: 5,
            centeredSlides: true,
            freeMode: true,
            freeModeSticky: true,
            onTap: (swiper) => {
                swiper.slideTo(swiper.clickedIndex, 100, false);
                let hip = swiper.slides[swiper.clickedIndex].textContent;
                let myData = this.state.data;
                myData.hip = hip;
                this.props.setState(myData);
            },
            onTransitionEnd: (swiper) => { //slide改变
                let hip = swiper.slides[swiper.activeIndex].textContent;
                let myData = this.state.data;
                myData.hip = hip;
                this.props.setState(myData);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        let heighIndex = Number(nextProps.data.heigh) - 145; //身高
        let weightIndex = Number(nextProps.data.weight) - 35; //体重
        let chestIndex = Number(nextProps.data.chest) - 70; //胸围
        let waistIndex = Number(nextProps.data.waist) - 50; //腰围
        let hipIndex = Number(nextProps.data.hip) - 80; //臀围
        this.height.slideTo(heighIndex, 100, false);
        this.weight.slideTo(weightIndex, 100, false);
        this.chest.slideTo(chestIndex, 100, false);
        this.waistline.slideTo(waistIndex, 100, false);
        this.hipline.slideTo(hipIndex, 100, false);

        this.setState({
            data: nextProps.data
        });


    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        //身高
        let hegithArr = [];
        for (let i = 0; i <= 75; i++) {
            hegithArr.push(<div className="swiper-slide" key={i}>{145 + i}</div>);
        }

        //体重
        let weightArr = [];
        for (let i = 0; i <= 115; i++) {
            weightArr.push(<div className="swiper-slide" key={i}>{35 + i}</div>);
        }

        //胸围
        let chestArr = [];
        for (let i = 0; i <= 40; i++) {
            chestArr.push(<div className="swiper-slide" key={i}>{70 + i}</div>);
        }

        //腰围
        let waistlineArr = [];
        for (let i = 0; i <= 40; i++) {
            waistlineArr.push(<div className="swiper-slide" key={i}>{50 + i}</div>);
        }

        //臀围
        let hiplineArr = [];
        for (let i = 0; i <= 30; i++) {
            hiplineArr.push(<div className="swiper-slide" key={i}>{80 + i}</div>);
        }

        return (
            <div className="swiper-slide" >
                <h2 className="title">基础信息</h2>
                <section className="baseinfo-area">
                    <div className="item">
                        <h4 className="title">身高（CM）</h4>
                        <div className="swiper-container J-height">
                            <div className="swiper-wrapper">
                                {hegithArr}
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <h4 className="title">体重（KG）</h4>
                        <div className="swiper-container J-weight">
                            <div className="swiper-wrapper">
                                {weightArr}
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <h4 className="title">胸围（CM）</h4>
                        <div className="swiper-container J-chest">
                            <div className="swiper-wrapper">
                                {chestArr}
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <h4 className="title">腰围（CM）</h4>
                        <div className="swiper-container J-waistline">
                            <div className="swiper-wrapper">
                                {waistlineArr}
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <h4 className="title">臀围（CM）</h4>
                        <div className="swiper-container J-hipline">
                            <div className="swiper-wrapper">
                                {hiplineArr}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
//其他信息
class Otherinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeShow: false,//时间窗口显示
            data: props.data || null,
            btnText: '提交',
            photoList: props.data.lifeImgs || [], //生活照片
            cityShow: false, //是否显示城市窗口
        }
        this._time = 0;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            photoList: nextProps.data.lifeImgs
        });
    }

    componentWillUnmount() {
        clearTimeout(this._time);
    }


    uploadPhoto(e) {
        let self = this;
        let files = e.target.files;
        if (files) {
            if (files.length + this.state.photoList.length > 5) {
                this.props.showMsg(true, '最多上传5张照片哦');
                return;
            }
            for (let i = 0; i < files.length; i++) {
                // if (!/\/(?:jpeg|jpg|png)/i.test(files[i].type)) return;
                (function (index) {
                    let targetFile = files[index];
                    let readFile = new FileReader();
                    readFile.onload = function () {
                        let imgObj = {
                            imgPath: this.result,
                            file: targetFile
                        };
                        let newPhotoList = Array.prototype.slice.apply(self.state.photoList);
                        newPhotoList.push(imgObj);
                        self.refs.file.value = '';

                        let myData = self.state.data;
                        myData.lifeImgs = newPhotoList;
                        self.props.setState(myData);
                    };
                    readFile.readAsDataURL(targetFile);
                })(i);

            }
        }
    }

    deletePhoto(e) {
        let index = e.currentTarget.getAttribute('data-index');
        let newPhotoList = this.state.photoList;
        newPhotoList.splice(index, 1);

        let myData = this.state.data;
        myData.lifeImgs = newPhotoList;
        this.props.setState(myData);
    }

    sendForm(e) {
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
        } = this.state.data;
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
        this.state.photoList.forEach((item, index) => {
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
                this.props.showMsg(true, '提交成功');
                this._time = setTimeout(() => {
                    this.context.router.push('/fashionMoment');
                }, 1000);
            } else {
                this.props.showMsg(true, '提交失败');
            }
            this.setState({
                btnText: '提交'
            });
        });
    }

    /**
     * 获取职业
     * */
    getProfessional(e) {
        let myData = this.state.data;
        myData.professional = e.target.value;
        this.props.setState(myData);
    }

    /**
     * 获取城市代码
     * */
    getCity(city) {
        let {
            currProvince,
            currCity,
            currArea,
            provinceName,
            cityName,
            areaName
        } = city;

        let myData = this.state.data;
        myData.provinceCode = currProvince; //省默认浙江省
        myData.cityCode = currCity; //城市默认杭州市
        myData.countyCode = currArea; //区默认西湖区
        myData.fullCityName = provinceName + cityName + areaName; //地址
        this.props.setState(myData);
        this.setState({
            cityShow: false
        });
    }

    /**
     * 获取生日
     * */
    getBirthDate(value) {
        let myData = this.state.data;
        myData.birthday = value;
        this.props.setState(myData);
        this.setState({
            timeShow:false
        })
    }

    render() {
        return (
            <div className="swiper-slide" >
                <section className="otherinfo-area">
                    <div className="form-ground">
                        <div className="item">
                            <label htmlFor="job">职业</label>
                        </div>
                        <div className="item">
                            <input id="job" type="text" placeholder="输入您的职业" maxLength={10} value={this.state.data.professional} onChange={this.getProfessional.bind(this)} />
                        </div>
                    </div>
                    <div className="form-ground">
                        <div className="item">
                            <label htmlFor="city">城市</label>
                        </div>
                        <div className="item">
                            <input id="city" type="text" value={this.state.data.fullCityName} readOnly={true} placeholder='请选择城市' onClick={() => { this.setState({ cityShow: true }) }} onFocus={(e) => { e.target.blur() }} />
                        </div>
                        {this.state.cityShow ? <City defaultProvince={this.state.data.provinceCode} defaultCity={this.state.data.cityCode} defaultArea={this.state.data.countyCode} getCity={this.getCity.bind(this)} close={() => { this.setState({ cityShow: false }) }} /> : null}
                    </div>
                    <div className="form-ground">
                        <div className="item">
                            <label htmlFor="birthDate">生日</label>
                        </div>
                        <div id="birthDate" className="item birthDate" onClick={() => { this.setState({ timeShow: true }) }}>
                            {this.state.data.birthday}
                            {/* <input id="birthDate" type="date" value={this.state.data.birthday} onChange={this.getBirthDate.bind(this)} /> */}
                            {this.state.timeShow ? <Time birthday={this.state.data.birthday} getBirthDate={this.getBirthDate.bind(this)} /> : null}
                        </div>
                    </div>
                    <div className="form-ground life-photo-title">
                        <div className="item">
                            <label>照片</label>
                        </div>
                        <div className="item">
                            <small>上传你最近的生活照</small>
                        </div>
                    </div>
                    <div className="life-photo-area">
                        <div className="item">
                            <div className="img icon-add">
                                <input type="file" ref='file' multiple accept="image/*" className="upload-file" onChange={this.uploadPhoto.bind(this)} />
                            </div>
                        </div>
                        {
                            this.state.photoList.map((item, index) => {
                                return <LifePhoto key={index}  {...item} index={index} deletePhoto={this.deletePhoto.bind(this)} />
                            })
                        }
                    </div>
                    <button className="sendBtn" onClick={this.sendForm.bind(this)}>{this.state.btnText}</button>
                </section>
            </div>
        )
    }
}


Otherinfo.contextTypes = {
    router: PropTypes.object.isRequired
};

/**
 * 时间
 */
class Time extends Component {
    componentDidMount() {
        this.flatpickr = flatpickr("#birthDate", {
            locale: zh,
            defaultDate: this.props.birthday,
            disableMobile: "true",
            onChange: (selectedDates, dateStr, instance) => {
                this.props.getBirthDate(dateStr);
            },
            onClose:(selectedDates, dateStr, instance)=>{
                this.props.getBirthDate(dateStr);
            }
        });
        this.flatpickr.open();

    }

    componentWillUnmount(){
       this.flatpickr.close();
    }

    render() {
        return null;
    }
}


//生活照
class LifePhoto extends Component {
    constructor(props) {
        super(props);
    }


    delete(e) {
        this.props.deletePhoto(e);
    }
    render() {
        let {
            imgPath,
            index
        } = this.props;

        return (
            <div className="item">
                <div className="img">
                    <img src={imgPath} alt="" />
                    <svg viewBox="0 0 100 100" className="icon-svg-delete" data-index={index} onClick={this.delete.bind(this)}>
                        <use xlinkHref="/assets/img/icon.svg#svg-delete" />
                    </svg>
                </div>
            </div>
        )
    }
}


class CustomSuit extends Component {
    constructor(props) {
        super(props);

        let copyMyData = merged(props.state.defaults); //复制对象
        copyMyData.path = props.location.pathname;
        props.setState(copyMyData);

        this.state = {
            data: copyMyData || null,
            msgShow: false,
            msgText: '', //提示内容
        };


    }

    componentDidMount() {
        document.title = "填写个人信息";
        //用户信息
        new Swiper('.J-custom-info', {
            initialSlide: 0,
            direction: 'vertical',
            pagination: '.swiper-pagination',
            paginationType: 'progress',
            observer: true,
        });
        ToolDps.get('/wx/user/info').then((res) => {
            if (res.succ && res.info && res.info.faceshpe != "" && res.info.colorofskin != "") {
                let myData = merged(this.state.data, res.info);
                this.props.setState(myData);
            } else if (res.succ && res.info && res.info.sex != "") {
                let myData = this.state.data;
                myData.sex = res.info.sex;
                this.props.setState(myData);
            }
        });

    }

    componentWillReceiveProps(nextProps) {
        let data = nextProps.state.path[nextProps.location.pathname];
        this.setState({
            data: data
        });
    }



    showMsg(isShow, tipText) {
        this.setState({
            msgShow: isShow,
            msgText: tipText,
        });
    }

    selectSex(sex) {
        let myData = this.state.data;
        if (myData.sex != sex) {
            myData.sex = sex;
            myData.faceshpe = '1';
            myData.colorofskin = '1';
            myData.bodySize = '1';
            myData.problems = ['4'];
            myData.styles = [];
            this.props.setState(myData);
        }

    }

    render() {
        let boySex = classNames('img-area', {
            'active': this.state.data.sex === 1
        });
        let girlSex = classNames('img-area', {
            'active': this.state.data.sex === 2
        });


        return (
            <section className="full-page">
                <div className="swiper-container customsuit-swiper-box J-custom-info">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" >
                            <h2 className="title" >选择你的性别</h2>
                            <section className="sex-area">
                                <section className="item">
                                    <div className={boySex} onClick={this.selectSex.bind(this, 1)}>
                                        <img src="/assets/img/male.jpg" alt="" />
                                    </div>
                                </section>
                                <section className="item">
                                    <div className={girlSex} onClick={this.selectSex.bind(this, 2)}>
                                        <img src="/assets/img/female.jpg" alt="" />
                                    </div>
                                </section>
                            </section>
                        </div>
                        {/*女性信息*/}
                        <Face  {...this.props} data={this.state.data} />
                        <Skin  {...this.props} data={this.state.data} />
                        <Body  {...this.props} data={this.state.data} />
                        <Resolve {...this.props} data={this.state.data} />
                        <Style  {...this.props} data={this.state.data} />
                        <BaseInfo  {...this.props} data={this.state.data} />
                        <Otherinfo showMsg={this.showMsg.bind(this)} {...this.props} data={this.state.data} />
                    </div>
                    {/*进度条*/}
                    <div className="swiper-pagination"></div>
                    {/*动画箭头*/}
                    <div className="pre-wrap"></div>
                </div>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }

}



export default connect((state) => {
    return {
        state: state['CustomSuit']
    }
}, action('CustomSuit'))(CustomSuit);