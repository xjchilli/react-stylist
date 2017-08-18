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
    render() {
        return (
            <div className="body-area">
                <h2>选择脸型、肤色和体型 *</h2>
                <ul className="type-select-area">
                    <li>
                        <div className="box">
                            <img src="/assets/img/suit/face-icon.jpg" />
                            <span className="title">选择脸型</span>
                            <span className="icon icon-sure active"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                    <li>
                        <div className="box">
                            <img src="/assets/img/suit/skin-icon.jpg" />
                            <span className="title">选择脸型</span>
                            <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
                        </div>
                    </li>
                    <li>
                        <div className="box">
                            <img src="/assets/img/suit/body-icon.jpg" />
                            <span className="title">选择脸型</span>
                            <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
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
        ToolDps.get('/wx/user/info').then((res) => {
            // if (res.succ && res.info && res.info.faceshpe != "" && res.info.colorofskin != "") {
            //     let myData = merged(this.state.data, res.info);
            //     this.props.setState(myData);
            // } else if (res.succ && res.info && res.info.sex != "") {
            //     let myData = this.state.data;
            //     myData.sex = res.info.sex;
            //     this.props.setState(myData);
            // }
        });

    }

    componentWillReceiveProps(nextProps) {
        // let data = nextProps.state.path[nextProps.location.pathname];
        // this.setState({
        //     data: data
        // });
    }



    showMsg(isShow, tipText) {
        this.setState({
            msgShow: isShow,
            msgText: tipText,
        });
    }

    render() {
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
                            <span className="girl">
                                <span className="icon icon-girl"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                            </span>
                            <span className="boy active">
                                <span className="icon icon-man"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                            </span>

                        </div>
                    </div>
                </header>
                <BaseInfo  {...this.props} data={this.state.data} />
                <Body />
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