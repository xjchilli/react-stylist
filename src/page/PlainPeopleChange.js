/**
 * 素人改造表单
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import merged from 'obj-merged';
import { ToolDps } from '../ToolDps';
import { offlineServer, userInfo } from 'ToolAjax';
import { storeList } from 'ToolAjax';
import action from '../Action/Index';
import classNames from 'classnames';
import { Msg, City, PreviewImg, Loading, DataLoad, Button, MyDate } from '../Component/index';
// import { is, fromJS } from 'immutable';
import flatpickr from 'flatpickr';
const zh = require("flatpickr/dist/l10n/zh.js").zh;
import qs from 'query-string';


//基础信息
class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data || null
        }
    }
    componentDidMount() {
        let self = this;
        let ageIndex = Number(this.state.data.age) - 1; //年龄
        let heighIndex = Number(this.state.data.heigh) - 145; //身高
        let weightIndex = Number(this.state.data.weight) - 35; //体重
        //年龄
        this.age = new Swiper('.J-age', {
            initialSlide: ageIndex || 23,
            slidesPerView: 5,
            centeredSlides: true,
            // freeMode: true,
            freeModeSticky: true,
            on: {
                tap: function () {
                    this.slideTo(this.clickedIndex, 100, false);
                    let age = this.slides[this.clickedIndex].textContent.trim();
                    let copyData = merged(self.state.data);
                    copyData.age = age;
                    self.props.setPlainChange(copyData);
                },
                transitionEnd: function () { //slide改变
                    let age = this.slides[this.activeIndex].textContent.trim();
                    let copyData = merged(self.state.data);
                    copyData.age = age;
                    self.props.setPlainChange(copyData);
                }
            }

        });
        //身高
        this.height = new Swiper('.J-height', {
            initialSlide: heighIndex || 20,
            slidesPerView: 5,
            centeredSlides: true,
            // freeMode: true,
            freeModeSticky: true,
            on: {
                tap: function () {
                    this.slideTo(this.clickedIndex, 100, false);
                    let heigh = this.slides[this.clickedIndex].textContent.trim();
                    let copyData = merged(self.state.data);
                    copyData.heigh = heigh;
                    self.props.setPlainChange(copyData);
                },
                transitionEnd: function () { //slide改变
                    let heigh = this.slides[this.activeIndex].textContent.trim();
                    let copyData = merged(self.state.data);
                    copyData.heigh = heigh;
                    self.props.setPlainChange(copyData);
                }
            }

        });
        //体重
        this.weight = new Swiper('.J-weight', {
            initialSlide: weightIndex || 25,
            slidesPerView: 5,
            centeredSlides: true,
            // freeMode: true,
            freeModeSticky: true,
            on: {
                tap: function () {
                    this.slideTo(this.clickedIndex, 100, false);
                    let weight = this.slides[this.clickedIndex].textContent;
                    let copyData = merged(self.state.data);
                    copyData.weight = weight;
                    self.props.setPlainChange(copyData);
                },
                transitionEnd: function () { //slide改变
                    let weight = this.slides[this.activeIndex].textContent;
                    let copyData = merged(self.state.data);
                    copyData.weight = weight;
                    self.props.setPlainChange(copyData);
                }
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


//风格
class Style extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girlStyle: [{ url: '/assets/img/suit/style-p-2-1.jpg', name: '韩剧女主角' }, { url: '/assets/img/suit/style-p-2-2.jpg', name: '日系小清新' }, { url: '/assets/img/suit/style-p-2-3.jpg', name: '轻熟OL系' }, { url: '/assets/img/suit/style-p-2-4.jpg', name: '欧美出街范' }, { url: '/assets/img/suit/style-p-2-5.jpg', name: '中性运动风' }, { url: '/assets/img/suit/style-p-2-6.jpg', name: '文艺复古情怀' }],
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
                                        <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>
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
            storeList: [],//所有门店
            startDate: this.getSevenDayForDate(),
            timeShow: false,//时间窗口显示
            data: props.data || null,
        }
        this._time = 0;
    }

    componentDidMount() {
        //获取所有门店
        storeList().then((res) => {
            if (res.succ) {
                this.setState({
                    storeList: res.data
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    /**
     * 获取7天后时间
     */
    getSevenDayForDate() {
        let startDate = new Date();
        let d = startDate.getDate();
        startDate.setDate(d + 7);
        return startDate;
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
                <div className="birthDate" onClick={() => { this.setState({ timeShow: true }) }}>
                    {this.state.data.time}
                </div>
                {
                    this.state.timeShow ? <MyDate option={{
                        defaultDate: this.state.data.time,
                        startDate: this.state.startDate,
                        sure: this.getDate.bind(this),
                        cancel: () => { this.setState({ timeShow: false }) }
                    }} /> : null
                }

                <h3 className="form-title">预约门店 *</h3>
                <select className="sex" onChange={this.store.bind(this)} value={this.state.data.mendian}>
                    <option value="">请选择需要预约的门店</option>
                    {
                        this.state.storeList.map((item, index) => {
                            return <option value={item.id} key={index}>{item.name}</option>
                        })
                    }
                </select>
                {this.state.data.mendian == "1" ? <p className="address">杭州市西湖区三墩镇华彩国际3幢8楼902室</p> : null}
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
            minDate: nowDate.getTime() + (7 * 24 * 60 * 60 * 1000),//预约时间为7天后
            disableMobile: "true",
            enableTime: true,
            time_24hr: true,
            defaultDate: this.props.initDate,
            onChange: (selectedDates, dateStr, instance) => {
                this.props.getDate(dateStr);
            },
            onClose: (selectedDates, dateStr, instance) => {
                this.props.closeTimeWindow();
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
            data: props.state || null
        }
    }


    componentDidMount() {
        //获取用户信息
        userInfo().then((res) => {
            let copyData = merged(this.state.data);
            if (res.succ) {
                let { info } = res;
                copyData.sex = info.sex;
                copyData.age = info.age || '24';
                copyData.heigh = info.heigh || '165';
                copyData.weight = info.weight || '60';
                copyData.chest = info.chest || '80';
                copyData.waist = info.waist || '70';
                copyData.hip = info.hip || '90';
                copyData.colorofskin = info.colorofskin;
                copyData.bodySize = info.bodySize;
                copyData.style = info.styles;
                copyData.professional = info.professional;
                copyData.loadAnimation = false;
                copyData.loadMsg = "加载成功";
            } else {
                copyData.loadAnimation = true;
                copyData.loadMsg = "加载成功";
            }
            this.props.setPlainChange(copyData);
        });
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.state
        });
    }


    render() {
        let main = !this.state.data.loadAnimation ? <PlainPeopleChange {...this.props} data={this.state.data} /> : <DataLoad loadAnimation={this.state.data.loadAnimation} loadMsg={this.state.data.loadMsg} />;

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
        this._time = 0;
    }

    componentDidMount() {
        document.title = "线下体验";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        })
    }

    componentWillUnmount() {
        clearTimeout(this._time);
    }

    showMsg(isShow, tipText) {
        this.setState({
            msgShow: isShow,
            msgText: tipText,
        });
    }


    sendForm() {
        let flag = this.tips(this.state.data);
        if (!flag) {
            return;
        }

        let {
            sex, //性别
            age,//年龄
            heigh, //身高
            weight, //体重
            style, //风格
            costCode,//预期花费
            time,//预约时间，格式 yyyy-mm-dd HH:mm
            mendian,//门店
        } = this.state.data;

        let data = {
            sex: sex,
            age: age,
            heigh: heigh,
            weight: weight,
            style: style,
            costCode: costCode,
            time: time,
            mendian: mendian,
        }
        //分享用户id
        let sourceUserId = ToolDps.sessionItem('sourceUserId');
        if (sourceUserId) {
            data['sourceUserId'] = sourceUserId;
            data['resourceCollocaitonId'] = ToolDps.sessionItem('resourceCollocaitonId');
        }
        this.setState({
            btnText: '提交中...'
        });

        offlineServer(data).then((res) => {
            if (res.succ) {
                this.showMsg(true, '提交成功');
                this._time = setTimeout(() => {
                    this.context.router.history.push('/pay?orderId=' + res.orderId);
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
            style, //风格
            costCode,//预期花费
            time,//预约时间
            mendian,//门店
        } = data;
        if (style.length == 0) {
            this.showMsg(true, '请选择喜欢的穿衣风格');
            return false;
        }
        if (costCode == "") {
            this.showMsg(true, '请选择预期花费');
            return false;
        }
        if (time == "") {
            this.showMsg(true, '请选择预约时间');
            return false;
        }
        if (mendian == "") {
            this.showMsg(true, '请选择门店');
            return false;
        }
        return true;
    }

    changeSex(sex) {
        let copyData = merged(this.state.data);
        copyData.sex = sex;
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
                <Style setPlainChange={this.props.setPlainChange} data={this.state.data} />
                <OtherInfo setPlainChange={this.props.setPlainChange} data={this.state.data} />
                <Button className="btn send-btn" onClick={this.sendForm.bind(this)} shineColor="#1a1a1a" >{this.state.btnText}</Button>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
                {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}
            </section >
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

