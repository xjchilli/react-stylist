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
            <section className="baseinfo-area">
                <div className="item">
                    <h4 className="title">身高（cm）</h4>
                    <div className="swiper-container J-height">
                        <div className="swiper-wrapper">
                            {hegithArr}
                        </div>
                    </div>
                </div>
                <div className="item">
                    <h4 className="title">体重（kg）</h4>
                    <div className="swiper-container J-weight">
                        <div className="swiper-wrapper">
                            {weightArr}
                        </div>
                    </div>
                </div>
                <div className="item">
                    <h4 className="title">胸围（cm）</h4>
                    <div className="swiper-container J-chest">
                        <div className="swiper-wrapper">
                            {chestArr}
                        </div>
                    </div>
                </div>
                <div className="item">
                    <h4 className="title">腰围（cm）</h4>
                    <div className="swiper-container J-waistline">
                        <div className="swiper-wrapper">
                            {waistlineArr}
                        </div>
                    </div>
                </div>
                <div className="item">
                    <h4 className="title">臀围（cm）</h4>
                    <div className="swiper-container J-hipline">
                        <div className="swiper-wrapper">
                            {hiplineArr}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

//脸型、肤色和体型
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    render() {
        let { sex } = this.props.data;//1：男  2：女
        return (
            <div className="body-area">
                <h2>选择脸型、肤色和体型 *</h2>
                <ul className="type-select-area">
                    <li>
                        <div className="box">
                            <img src={sex === 1 ? "/assets/img/suit/face-icon-2.jpg" : "/assets/img/suit/face-icon.jpg"} />
                            <span className="title">选择脸型</span>
                            <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                    <li>
                        <div className="box">
                            <img src={sex === 1 ? "/assets/img/suit/skin-icon-2.jpg" : "/assets/img/suit/skin-icon.jpg"} />
                            <span className="title">选择肤色</span>
                            <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                    <li>
                        <div className="box">
                            <img src={sex === 1 ? "/assets/img/suit/body-icon-2.jpg" : "/assets/img/suit/body-icon.jpg"} />
                            <span className="title">选择体型</span>
                            <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                </ul>
                {/* 脸型 */}
                <div className="fixed face-select-area">
                    <div className="box">
                        <h3>选择脸型</h3>
                        <span className="close"></span>
                        <ul className="flex-box face-list">
                            <li className="item-2">
                                <img src="/assets/img/suit/"/>
                            </li>
                            <li className="item-2">111</li>
                        </ul>
                    </div>
                </div>
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
            <div className="resolve-area">
                <h2>希望能解决的问题 *（多选）</h2>
                <ul className="flex-box">
                    {
                        girlResolves.map((item, index) => {
                            return (
                                <li className="item-3" key={index}>
                                    <div className={this.state.problems.indexOf(item.num) !== -1 ? "cicle-area active" : "cicle-area"} onClick={this.select.bind(this, item.num)}>
                                        <img src={"assets/img/suit/solution-1-" + (index + 1) + ".jpg"} />
                                        <label>{item.value}</label>
                                        <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
                                    </div>
                                </li>
                            )
                        })
                    }
                    {
                        boyResolves.map((item, index) => {
                            return (
                                <li className="item-3" key={index}>
                                    <div className={this.state.problems.indexOf(item.num) !== -1 ? "cicle-area active" : "cicle-area"} onClick={this.select.bind(this, item.num)}>
                                        <img src={"assets/img/suit/solution-2-" + (index + 1) + ".jpg"} />
                                        <label>{item.value}</label>
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

//风格
class Style extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girlStyle: [{url:'/assets/img/suit/style-1-1.jpg',name:'中性运动风'},{url:'/assets/img/suit/style-1-2.jpg',name:'文艺复古风'},{url:'/assets/img/suit/style-1-3.jpg',name:'韩剧女主角'},{url:'/assets/img/suit/style-1-4.jpg',name:'日系小清新'},{url:'/assets/img/suit/style-1-5.jpg',name:'轻熟OL系'},{url:'/assets/img/suit/style-1-6.jpg',name:'欧美出街范'}],
            boyStyle: [{url:'/assets/img/suit/style-2-1.jpg',name:'街头潮男风'},{url:'/assets/img/suit/style-2-2.jpg',name:'绅士熟男系'}, {url:'/assets/img/suit/style-2-3.jpg',name:'纹身硬汉系'}, {url:'/assets/img/suit/style-2-4.jpg',name:'清新治愈系'}, {url:'/assets/img/suit/style-2-5.jpg',name:'暗黑禁欲系'}],
            styles: props.data.styles || []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            styles: nextProps.data.styles
        });
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
            <div className="style-area">
                <h2>喜欢的穿衣风格 *（多选）</h2>
                <ul className="flex-box">
                    {
                        styles.map((item, index) => {
                            return (
                                <li className="item-2" key={index} >
                                    <div className={this.state.styles.indexOf(index + 1 + '') !== -1 ? 'style-box active' : 'style-box'} onClick={this.select.bind(this, index + 1 + '')}>
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

//其他信息
class OtherInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeShow: false,//时间窗口显示
            data: props.data || null,
            cityShow: false, //是否显示城市窗口
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
            timeShow: false
        })
    }

    render() {
        return (
            <div className="otherInfo-area">
                <label>职业</label>
                <input type="text" maxLength={10} value={this.state.data.professional} onChange={this.getProfessional.bind(this)} />
                <label>城市</label>
                <input type="text" value={this.state.data.fullCityName} readOnly={true} onClick={() => { this.setState({ cityShow: true }) }} onFocus={(e) => { e.target.blur() }} />
                <label>生日</label>
                <div id="birthDate" className="birthDate" onClick={() => { this.setState({ timeShow: true }) }}>
                    {this.state.data.birthday}
                    {this.state.timeShow ? <Time birthday={this.state.data.birthday} getBirthDate={this.getBirthDate.bind(this)} /> : null}
                </div>
                {this.state.cityShow ? <City defaultProvince={this.state.data.provinceCode} defaultCity={this.state.data.cityCode} defaultArea={this.state.data.countyCode} getCity={this.getCity.bind(this)} close={() => { this.setState({ cityShow: false }) }} /> : null}
            </div>
        )
    }
}

/**
 * 时间
 */
class Time extends Component {
    componentDidMount() {
        this.flatpickr = flatpickr("#birthDate", {
            locale: zh,
            defaultDate: this.props.birthday || '1992-08-08',
            disableMobile: "true",
            onChange: (selectedDates, dateStr, instance) => {
                this.props.getBirthDate(dateStr);
            },
            onClose: (selectedDates, dateStr, instance) => {
                this.props.getBirthDate(dateStr);
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


//生活照
class LifePhoto extends Component {
    render() {
        return (
            <div className="lifePhoto-area">
                <h2>添加照片 *</h2>
                <ul className="flex-box upload-control-area">
                    <li className="item-2">
                        <div className="upload-area">
                            <span className="icon icon-camera"></span>
                            <p>添加一张正脸照片</p>
                            <input type="file" accept="image/*" className="upload-file" />
                        </div>
                    </li>
                    <li className="item-2">
                        <div className="upload-area">
                            <span className="icon icon-camera"></span>
                            <p>添加近期全身照</p>
                            <input type="file" multiple accept="image/*" className="upload-file" />
                        </div>
                    </li>
                </ul>
                <ul className="flex-box img-show-area">
                    <li className="item-3">
                        <div className="img-area" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}>
                            <span className="icon icon-fault"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                    <li className="item-3">
                        <div className="img-area" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}>
                            <span className="icon icon-fault"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                    <li className="item-3">
                        <div className="img-area" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}>
                            <span className="icon icon-fault"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                    <li className="item-3">
                        <div className="img-area" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}>
                            <span className="icon icon-fault"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                    <li className="item-3">
                        <div className="img-area" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}>
                            <span className="icon icon-fault"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                    <li className="item-3">
                        <div className="img-area" style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}>
                            <span className="icon icon-fault"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                </ul>
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
        // ToolDps.get('/wx/user/info').then((res) => {
        //     if (res.succ && res.info && res.info.faceshpe != "" && res.info.colorofskin != "") {
        //         let myData = merged(this.state.data, res.info);
        //         this.props.setState(myData);
        //     } else if (res.succ && res.info && res.info.sex != "") {
        //         let myData = this.state.data;
        //         myData.sex = res.info.sex;
        //         this.props.setState(myData);
        //     }
        // });

    }

    componentWillReceiveProps(nextProps) {
        // let data = nextProps.state.path[nextProps.location.pathname];
        // this.setState({
        //     data: data
        // });
    }

    selectSex(sex) {
        let myData = this.state.data;
        if (myData.sex != sex) {
            myData.sex = sex;
            myData.faceshpe = '';
            myData.colorofskin = '';
            myData.bodySize = '';
            myData.problems = [];
            myData.styles = [];
            this.props.setState(myData);
        }

    }


    showMsg(isShow, tipText) {
        this.setState({
            msgShow: isShow,
            msgText: tipText,
        });
    }

    render() {
        let girlSex = classNames('girl', {
            'active': this.state.data.sex === 2
        });
        let boySex = classNames('boy', {
            'active': this.state.data.sex === 1
        });
        return (
            <section className="customsuit-box">
                <header className="flex-box">
                    <div className="item">
                        <h2>hi , A-Reachel</h2>
                        <p>开始定制你的专属信息吧！</p>
                    </div>
                    <div className="item">
                        <img src="/assets/img/headImg.jpg" />
                        <div className="sex-area">
                            <span className={girlSex} onClick={this.selectSex.bind(this, 2)}>
                                <span className="icon icon-girl"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                            </span>
                            <span className={boySex} onClick={this.selectSex.bind(this, 1)}>
                                <span className="icon icon-man"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                            </span>

                        </div>
                    </div>
                </header>
                <BaseInfo  {...this.props} data={this.state.data} />
                <Body  {...this.props} data={this.state.data} />
                <Resolve  {...this.props} data={this.state.data} />
                <Style  {...this.props} data={this.state.data} />
                <OtherInfo  {...this.props} data={this.state.data} />
                <LifePhoto  {...this.props} data={this.state.data} />
                <button className="btn send-btn">提交</button>
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