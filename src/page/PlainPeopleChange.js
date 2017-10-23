/**
 * 素人改造表单
 */
/**
 * 搭配测试
 * Created by potato on 2017/4/18 0018.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import merged from 'obj-merged';
import { ToolDps } from '../ToolDps';
import action from '../Action/Index';
import classNames from 'classnames';
import { Msg, City, PreviewImg, Loading, DataLoad } from '../Component/index';
// import { is, fromJS } from 'immutable';
import flatpickr from 'flatpickr';
const zh = require("flatpickr/dist/l10n/zh.js").zh;


//基础信息
class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data || null
        }
    }
    componentDidMount() {
        let ageIndex = Number(this.state.data.age) - 1; //年龄
        let heighIndex = Number(this.state.data.heigh) - 145; //身高
        let weightIndex = Number(this.state.data.weight) - 35; //体重
        //年龄
        this.age = new Swiper('.J-age', {
            initialSlide: ageIndex || 23,
            slidesPerView: 5,
            centeredSlides: true,
            freeMode: true,
            freeModeSticky: true,
            onTap: (swiper) => {
                swiper.slideTo(swiper.clickedIndex, 100, false);
                let age = swiper.slides[swiper.clickedIndex].textContent.trim();
                let copyData = merged(this.state.data);
                copyData.age = age;
                this.props.setPlainChange(copyData);
            },
            onTransitionEnd: (swiper) => { //slide改变
                let age = swiper.slides[swiper.activeIndex].textContent.trim();
                let copyData = merged(this.state.data);
                copyData.age = age;
                this.props.setPlainChange(copyData);
            }
        });
        //身高
        this.height = new Swiper('.J-height', {
            initialSlide: heighIndex || 20,
            slidesPerView: 5,
            centeredSlides: true,
            freeMode: true,
            freeModeSticky: true,
            onTap: (swiper) => {
                swiper.slideTo(swiper.clickedIndex, 100, false);
                let heigh = swiper.slides[swiper.clickedIndex].textContent.trim();
                let copyData = merged(this.state.data);
                copyData.heigh = heigh;
                this.props.setPlainChange(copyData);
            },
            onTransitionEnd: (swiper) => { //slide改变
                let heigh = swiper.slides[swiper.activeIndex].textContent.trim();
                let copyData = merged(this.state.data);
                copyData.heigh = heigh;
                this.props.setPlainChange(copyData);
            }
        });
        //体重
        this.weight = new Swiper('.J-weight', {
            initialSlide: weightIndex || 25,
            slidesPerView: 5,
            centeredSlides: true,
            freeMode: true,
            freeModeSticky: true,
            onTap: (swiper) => {
                swiper.slideTo(swiper.clickedIndex, 100, false);
                let weight = swiper.slides[swiper.clickedIndex].textContent;
                let copyData = merged(this.state.data);
                copyData.weight = weight;
                this.props.setPlainChange(copyData);
            },
            onTransitionEnd: (swiper) => { //slide改变
                let weight = swiper.slides[swiper.activeIndex].textContent;
                let copyData = merged(this.state.data);
                copyData.weight = weight;
                this.props.setPlainChange(copyData);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    render() {
        //年龄
        let agehArr = [];
        for (let i = 0; i <= 99; i++) {
            agehArr.push(<div className="swiper-slide" key={i}>{1 + i}</div>);
        }
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

        return (
            <ul className="baseInfo-area">
                <li className="item">
                    <h4 className="form-title">年龄（岁）</h4>
                    <div className="swiper-area">
                        <i className="swiper-pre-btn" onClick={() => { this.age.slidePrev() }}></i>
                        <div className="swiper-container J-age">
                            <div className="swiper-wrapper">
                                {agehArr}
                            </div>
                        </div>
                        <i className="swiper-next-btn" onClick={() => { this.age.slideNext() }}></i>
                    </div>
                </li>
                <li className="item">
                    <h4 className="form-title">身高（cm）</h4>
                    <div className="swiper-area">
                        <i className="swiper-pre-btn" onClick={() => { this.height.slidePrev() }}></i>
                        <div className="swiper-container J-height">
                            <div className="swiper-wrapper">
                                {hegithArr}
                            </div>
                        </div>
                        <i className="swiper-next-btn" onClick={() => { this.height.slideNext() }}></i>
                    </div>
                </li>
                <li className="item">
                    <h4 className="form-title">体重（kg）</h4>
                    <div className="swiper-area">
                        <i className="swiper-pre-btn" onClick={() => { this.weight.slidePrev() }}></i>
                        <div className="swiper-container J-weight">
                            <div className="swiper-wrapper">
                                {weightArr}
                            </div>
                        </div>
                        <i className="swiper-next-btn" onClick={() => { this.weight.slideNext() }}></i>
                    </div>
                </li>
            </ul>
        )
    }
}

//肤色和体型
class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSkin: false,
            isBody: false,
            skinNames: ['晶莹白皙', '自然红润', '自然偏黄', '活力小麦'],//肤色名字
            bodyNamesGirl: ['沙漏形', '梨形', '苹果形', '直筒形', '倒三角'],//男：体型名字
            bodyNamesBoy: ['梯形', '正三角', '矩形', '倒三角', '椭圆形']//女：体型名字
        }
    }
    render() {
        let { sex } = this.props.data;//1：男  2：女
        let skinName = "选择肤色";
        let bodyName = "选择体型";
        if (this.props.data.colorofskin != "") {
            skinName = this.state.skinNames[Number(this.props.data.colorofskin) - 1];
        }
        if (this.props.data.bodySize != "") {
            if (sex === 1) {
                bodyName = this.state.bodyNamesBoy[Number(this.props.data.bodySize) - 1];
            } else {
                bodyName = this.state.bodyNamesGirl[Number(this.props.data.bodySize) - 1];
            }

        }

        return (
            <div className="body-area">
                <h2 className="form-title">选择肤色和体型 *</h2>
                <ul className="type-select-area">
                    <li>
                        <div className={this.props.data.colorofskin != "" ? "box active" : "box"} onClick={() => { this.setState({ isSkin: true }) }}>
                            <img src={sex === 1 ? "/assets/img/suit/skin-icon-2.jpg" : "/assets/img/suit/skin-icon.jpg"} />
                            <span className="title">{skinName}</span>
                            <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                    <li>
                        <div className={this.props.data.bodySize != "" ? "box active" : "box"} onClick={() => { this.setState({ isBody: true }) }}>
                            <img src={sex === 1 ? "/assets/img/suit/body-icon-2.jpg" : "/assets/img/suit/body-icon.jpg"} />
                            <span className="title">{bodyName}</span>
                            <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                </ul>
                {/* 肤色 */}
                {this.state.isSkin ? <Skin {...this.props} data={this.props.data} close={() => { this.setState({ isSkin: false }) }} /> : null}
                {/* 体型 */}
                {this.state.isBody ? <Body {...this.props} data={this.props.data} close={() => { this.setState({ isBody: false }) }} /> : null}
            </div>
        )
    }
}


//肤色
class Skin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girlSkin: [{ name: '晶莹白皙', url: 'https://file.dapeis.com/resources/config/requirement/skin-1-1.jpg' }, { name: '自然红润', url: 'https://file.dapeis.com/resources/config/requirement/skin-1-2.jpg' }, { name: '自然偏黄', url: 'https://file.dapeis.com/resources/config/requirement/skin-1-3.jpg' }, { name: '活力小麦', url: 'https://file.dapeis.com/resources/config/requirement/skin-1-4.jpg' }],
            boySkin: [{ name: '晶莹白皙', url: 'https://file.dapeis.com/resources/config/requirement/skin-2-1.jpg' }, { name: '自然红润', url: 'https://file.dapeis.com/resources/config/requirement/skin-2-2.jpg' }, { name: '自然偏黄', url: 'https://file.dapeis.com/resources/config/requirement/skin-2-3.jpg' }, { name: '活力小麦', url: 'https://file.dapeis.com/resources/config/requirement/skin-2-4.jpg' }],
            data: props.data, //肤色
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }


    //选择肤色
    select(skin) {
        let copyData = merged(this.state.data);
        copyData.colorofskin = skin;
        this.props.setPlainChange(copyData);
        this.props.close();
    }
    render() {
        let { sex } = this.state.data;
        let skins = [];
        if (sex === 1) {//男
            skins = this.state.boySkin;
        } else {//女
            skins = this.state.girlSkin;
        }
        return (
            <div className="fixed face-select-area">
                <div className="box">
                    <h3>选择肤色</h3>
                    <span className="close" onClick={this.props.close}></span>
                    <ul className="flex-box img-list">
                        {
                            skins.map((item, index) => {
                                return (
                                    <li className="item-2" key={index}>
                                        <div className={this.state.data.colorofskin == index + 1 ? "img-box active" : "img-box"} onClick={this.select.bind(this, index + 1 + '')}>
                                            <img src={item.url} />
                                            <p>{item.name}</p>
                                            <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
                                        </div>
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

//体型
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girlBody: [{ name: '沙漏形', url: 'https://file.dapeis.com/resources/config/requirement/body-1-1.jpg' }, { name: '梨形', url: 'https://file.dapeis.com/resources/config/requirement/body-1-2.jpg' }, { name: '苹果形', url: 'https://file.dapeis.com/resources/config/requirement/body-1-3.jpg' }, { name: '直筒形', url: 'https://file.dapeis.com/resources/config/requirement/body-1-4.jpg' }, { name: '倒三角', url: 'https://file.dapeis.com/resources/config/requirement/body-1-5.jpg' }],
            boyBody: [{ name: '梯形', url: 'https://file.dapeis.com/resources/config/requirement/body-2-1.jpg' }, { name: '正三角', url: 'https://file.dapeis.com/resources/config/requirement/body-2-2.jpg' }, { name: '矩形', url: 'https://file.dapeis.com/resources/config/requirement/body-2-3.jpg' }, { name: '倒三角', url: 'https://file.dapeis.com/resources/config/requirement/body-2-4.jpg' }, { name: '椭圆形', url: 'https://file.dapeis.com/resources/config/requirement/body-2-5.jpg' }],
            data: props.data, //体型
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }


    //选择体型
    select(body) {
        let copyData = merged(this.state.data);
        copyData.bodySize = body;
        this.props.setPlainChange(copyData);
        this.props.close();
    }
    render() {
        let { sex } = this.state.data;
        let bodys = [];
        if (sex === 1) {//男
            bodys = this.state.boyBody;
        } else {//女
            bodys = this.state.girlBody;
        }

        return (
            <div className="fixed face-select-area">
                <div className="box face-box">
                    <h3>选择体型</h3>
                    <span className="close" onClick={this.props.close}></span>
                    <ul className="flex-box img-list">
                        {
                            bodys.map((item, index) => {
                                return (
                                    <li className="item-2" key={index}>
                                        <div className={this.state.data.bodySize == index + 1 ? "img-box active" : "img-box"} onClick={this.select.bind(this, index + 1 + '')}>
                                            <img src={item.url} />
                                            <p>{item.name}</p>
                                            <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
                                        </div>
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


//风格
class Style extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girlStyle: [{ url: '/assets/img/suit/style-p-2-1.jpg', name: '中性运动风' }, { url: '/assets/img/suit/style-p-2-2.jpg', name: '文艺复古风' }, { url: '/assets/img/suit/style-p-2-3.jpg', name: '韩剧女主角' }, { url: '/assets/img/suit/style-p-2-4.jpg', name: '日系小清新' }, { url: '/assets/img/suit/style-p-2-5.jpg', name: '轻熟OL系' }, { url: '/assets/img/suit/style-p-2-6.jpg', name: '欧美出街范' }],
            boyStyle: [{ url: '/assets/img/suit/style-p-1-1.jpg', name: '街头潮男风' }, { url: '/assets/img/suit/style-p-1-2.jpg', name: '绅士熟男系' }, { url: '/assets/img/suit/style-p-1-3.jpg', name: '纹身硬汉系' }, { url: '/assets/img/suit/style-p-1-4.jpg', name: '清新治愈系' }, { url: '/assets/img/suit/style-p-1-5.jpg', name: '暗黑禁欲系' }],
            data: props.data
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }


    select(style) {
        let arr = Array.prototype.slice.apply(this.state.data.style);
        let index = arr.indexOf(style);
        if (index !== -1) {
            arr.splice(index, 1);
        } else {
            arr.push(style);
        }

        let copyData = merged(this.state.data);
        copyData.style = arr;
        this.props.setPlainChange(copyData);
    }

    render() {
        let sex = this.state.data.sex;
        let styles = [];
        if (sex === 1) {//男
            styles = this.state.boyStyle;
        } else {//女
            styles = this.state.girlStyle;
        }

        return (
            <div className="style-area">
                <h2 className="form-title">喜欢的穿衣风格 *（多选）</h2>
                <ul className="flex-box">
                    {
                        styles.map((item, index) => {
                            return (
                                <li className="item-2" key={index} >
                                    <div className={this.state.data.style.indexOf(index + 1 + '') !== -1 ? 'style-box active' : 'style-box'} onClick={this.select.bind(this, index + 1 + '')}>
                                        <img src={item.url} />
                                        <div className="bg"></div>
                                        <span className="triangle"></span>
                                        <label>{item.name}</label>
                                        <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

//生活照
class LifePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            imgLoding: false,//正脸照上传loading图
            imgLoding2: false,//全身照上传loading图
            data: props.data || null
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
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
        ToolDps.post('/wx/user/uploadPrestigeImg', formdata, {
            'Content-Type': 'multipart/form-data'
        }).then((res) => {
            if (res.succ) {
                if (type == "face") {
                    let copyData = merged(this.state.data);
                    copyData.faceLifeImg = res.img;
                    copyData.faceLifeImgPara = res.imgPara;
                    this.props.setPlainChange(copyData);
                    this.setState({
                        imgLoding: false
                    });
                } else if (type == "all") {
                    let copyData = merged(this.state.data);
                    copyData.bodyLifeImg = res.img;
                    copyData.bodyLifeImgPara = res.imgPara;
                    this.props.setPlainChange(copyData);
                    this.setState({
                        imgLoding2: false,
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
                <h2 className="form-title">添加照片 *</h2>
                <ul className="flex-box upload-control-area">
                    <li className="item-2">
                        <div className={this.state.data.faceLifeImg ? "upload-area active" : "upload-area"} >
                            <span className="icon icon-camera"></span>
                            <p>添加一张正脸照片</p>
                            <div className="img-show" style={{ backgroundImage: 'url(' + this.state.data.faceLifeImg + ')' }} ></div>
                            <input type="file" accept="image/*" className="upload-file" onChange={this.selectImg.bind(this, 'face')} />
                            {
                                this.state.imgLoding ? <Loading /> : null
                            }
                        </div>
                    </li>
                    <li className="item-2">
                        <div className={this.state.data.bodyLifeImg ? "upload-area active" : "upload-area"}>
                            <span className="icon icon-camera"></span>
                            <p>添加近期全身照</p>
                            <div className="img-show" style={{ backgroundImage: 'url(' + this.state.data.bodyLifeImg + ')' }} ></div>
                            <input type="file" accept="image/*" className="upload-file" onChange={this.selectImg.bind(this, 'all')} />
                            {
                                this.state.imgLoding2 ? <Loading /> : null
                            }
                        </div>
                    </li>
                </ul>
                {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}
            </div>
        )
    }
}

//其他信息
class OtherInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeShow: false,//时间窗口显示
            data: props.data || null,
        }
        this._time = 0;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    /**
     * 获取职业
     * */
    getProfessional(e) {
        let copyData = merged(this.state.data);
        copyData.professional = e.target.value;
        this.props.setPlainChange(copyData);
    }


    

    //预期花费
    changeCost(e) {
        let copyData = merged(this.state.data);
        copyData.costCode = e.target.value;
        this.props.setPlainChange(copyData);
    }

    /**
     * 获取时间
     * */
    getDate(value) {
        let copyData = merged(this.state.data);
        copyData.time = value;
        this.props.setPlainChange(copyData);
    }

    //门店
    store(e) {
        let copyData = merged(this.state.data);
        copyData.mendian = e.target.value;
        this.props.setPlainChange(copyData);
    }

    //改善需求
    remarks(e){
        let copyData = merged(this.state.data);
        copyData.remarks = e.target.value;
        this.props.setPlainChange(copyData);
    }

    render() {
        return (
            <div className="otherInfo-area">
                <h3 className="form-title">预期花费 *</h3>
                <select className="sex" onChange={this.changeCost.bind(this)} value={this.state.data.costCode}>
                    <option value="">平均每套衣服预计花费价格</option>
                    <option value="1">0-300</option>
                    <option value="2">300-500</option>
                    <option value="3">500-1000</option>
                    <option value="4">1000-3000</option>
                    <option value="5">>3000</option>
                    <option value="6">不限</option>
                </select>
                <h3 className="form-title">预约时间 *</h3>
                <div id="birthDate" className="birthDate" onClick={() => { this.setState({ timeShow: true }) }}>
                    {this.state.data.time}
                    {this.state.timeShow ? <Time birthday={this.state.data.time} getDate={this.getDate.bind(this)} /> : null}
                </div>
                <h3 className="form-title">预约门店 *</h3>
                <select className="sex" onChange={this.store.bind(this)} value={this.state.data.mendian}>
                    <option value="">请选择需要预约的门店</option>
                    <option value="1">杭州市西湖区三墩镇华彩国际3幢8楼02室</option>
                </select>
                <h3 className="form-title">联系方式 *</h3>
                <input type="text" value={this.state.data.contact} disabled/>
                <h3 className="form-title">职业</h3>
                <input type="text" maxLength={10} value={this.state.data.professional} onChange={this.getProfessional.bind(this)} />
                <h3 className="form-title">改善需求</h3>
                <textarea placeholder="您对此次改造有何期望，比如想参加什么场合、掩盖什么身材缺点，或者喜欢的造型特点等！" value={this.state.data.remarks} onChange={this.remarks.bind(this)}></textarea>
                <h3 className="form-title">温馨提示</h3>
                <p className="note">搭配师将在1-2个工作日内给您答复。如有任何疑问，可关注“Ms 搭配师”微信公众号，联系我们。</p>
            </div>
        )
    }
}

/**
 * 时间
 */
class Time extends Component {
    componentDidMount() {
        let nowDate = new Date();
        this.flatpickr = flatpickr("#birthDate", {
            locale: zh,
            minDate: nowDate,
            disableMobile: "true",
            enableTime: true,
            onChange: (selectedDates, dateStr, instance) => {
                this.props.getDate(dateStr);
            },
            onClose: (selectedDates, dateStr, instance) => {
                this.props.getDate(dateStr);
            }
        });
        this.flatpickr.open();

    }

    componentWillUnmount() {
        this.flatpickr.close();
    }

    render() {
        return null;
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadAnimation: true,
            loadMsg: '加载中...',
            data: props.state || null
        }
    }


    componentDidMount() {
        ToolDps.get('/wx/user/info').then((res) => {
            if (res.succ) {
                let { info } = res;
                let copyData = merged(this.state.data);
                copyData.sex = info.sex;
                copyData.age = info.age;
                copyData.heigh = info.heigh;
                copyData.weight = info.weight;
                copyData.colorofskin = info.colorofskin;
                copyData.bodySize = info.bodySize;
                copyData.style = info.styles;
                copyData.contact = res.contact;
                copyData.professional = info.professional;
                this.props.setPlainChange(copyData);
                this.setState({
                    loadAnimation: false,
                    loadMsg: '加载成功'
                });
            } else {
                this.setState({
                    loadAnimation: true,
                    loadMsg: '加载失败'
                });
            }
        });
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.state
        });
    }


    render() {
        let main = !this.state.loadAnimation ? <PlainPeopleChange {...this.props} data={this.state.data} /> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />;

        return main;
    }
}


class PlainPeopleChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewBigImg: false,//是否预览大图
            bigImgUrl: '',//大图url
            data: props.data || null,
            msgShow: false,
            msgText: '', //提示内容
            btnText: '提交'
        };
    }

    componentDidMount() {
        document.title = "素人改造";


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        })
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

    changeSex(sex) {
        let copyData = merged(this.state.data);
        copyData.sex = sex;
        copyData.colorofskin = '';
        copyData.bodySize = '';
        copyData.style = [];
        this.props.setPlainChange(copyData);
    }

    render() {
        return (
            <section className="plain-change-page">
                <h3 className="form-title">性别</h3>
                <select className="sex" onChange={(e) => { this.changeSex(Number(e.target.value)) }} value={this.state.data.sex}>
                    <option value="1">男</option>
                    <option value="2">女</option>
                </select>
                <BaseInfo setPlainChange={this.props.setPlainChange} data={this.state.data} />
                <Type setPlainChange={this.props.setPlainChange} data={this.state.data} />
                <Style setPlainChange={this.props.setPlainChange} data={this.state.data} />
                <LifePhoto setPlainChange={this.props.setPlainChange} data={this.state.data} />
                <OtherInfo setPlainChange={this.props.setPlainChange} data={this.state.data} />

                <button className="btn send-btn" onClick={this.sendForm.bind(this)}>{this.state.btnText}</button>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
                {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}
            </section>
        )
    }

}


PlainPeopleChange.contextTypes = {
    router: PropTypes.object.isRequired
};


export default connect((state) => {
    return {
        state: state['PlainChange']
    }
}, action('PlainChange'))(Main);

