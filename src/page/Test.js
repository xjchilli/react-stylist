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
            sex: props.sex || 2
        }
    }

    componentDidMount() {
        document.title = "选择您的性别";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sex: nextProps.sex
        });
    }


    render() {
        return (
            <ul className="box flex-box sex-area">
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '1')}>
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
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '2')}>
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
        this.state = {
            face: props.face || ''
        }
    }

    componentDidMount() {
        document.title = "选择您的脸型";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            face: nextProps.face
        });
    }

    render() {
        return (
            <ul className="box flex-box face-area">
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '1')}>
                        <img src="/assets/img/suit/face-1-1.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                鹅蛋脸
                            {
                                    this.state.face == "1" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }

                            </span>
                        </div>
                        <p className="text-center decribe">额头、颧骨宽度相近，下颚窄，下巴圆润</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '2')}>
                        <img src="/assets/img/suit/face-1-2.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                圆脸
                            {
                                    this.state.face == "2" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }

                            </span>
                        </div>
                        <p className="text-center decribe">额头、颧骨、下颚宽度相近，下巴短圆润</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '3')}>
                        <img src="/assets/img/suit/face-1-3.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                瓜子脸
                            {
                                    this.state.face == "3" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }

                            </span>
                        </div>
                        <p className="text-center decribe">头比颧骨宽，下颚窄下巴比较尖</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '4')}>
                        <img src="/assets/img/suit/face-1-4.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                方脸
                            {
                                    this.state.face == "4" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }

                            </span>
                        </div>
                        <p className="text-center decribe">额头、颧骨、下颚宽度相近，下巴有棱角</p>
                    </div>
                </li>
            </ul>
        )
    }
}


/**
 * 选择您的脸型-男
 */
class FaceBoy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            face: props.face || ''
        }
    }

    componentDidMount() {
        document.title = "选择您的脸型";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            face: nextProps.face
        });
    }

    render() {
        return (
            <ul className="box flex-box face-area">
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '1')}>
                        <img src="/assets/img/suit/face-2-1.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                鹅蛋脸
                            {
                                    this.state.face == "1" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }

                            </span>
                        </div>
                        <p className="text-center decribe">额头、颧骨宽度相近，下颚窄，下巴圆润</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '2')}>
                        <img src="/assets/img/suit/face-2-2.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                圆脸
                            {
                                    this.state.face == "2" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }

                            </span>
                        </div>
                        <p className="text-center decribe">额头、颧骨、下颚宽度相近，下巴短圆润</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '3')}>
                        <img src="/assets/img/suit/face-2-3.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                瓜子脸
                            {
                                    this.state.face == "3" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }

                            </span>
                        </div>
                        <p className="text-center decribe">额头比颧骨宽，下颚窄下巴比较尖</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '4')}>
                        <img src="/assets/img/suit/face-2-4.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                方脸
                            {
                                    this.state.face == "4" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }

                            </span>
                        </div>
                        <p className="text-center decribe">额头、颧骨、下颚宽度相近，下巴有棱角</p>
                    </div>
                </li>
            </ul>
        )
    }
}

/**
 * 肤色-女
 */
class SkinGirl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skin: props.skin || ''
        }
    }

    componentDidMount() {
        document.title = "选择您的肤色";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            skin: nextProps.skin
        });
    }

    render() {
        return (
            <ul className="box flex-box face-area">
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '1')}>
                        <img src="/assets/img/suit/skin-1-1.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                白皙晶莹
                            {
                                    this.state.skin == "1" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '2')}>
                        <img src="/assets/img/suit/skin-1-2.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                自然红润
                            {
                                    this.state.skin == "2" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '3')}>
                        <img src="/assets/img/suit/skin-1-3.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                自然偏黄
                            {
                                    this.state.skin == "3" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '4')}>
                        <img src="/assets/img/suit/skin-1-4.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                活力小麦
                            {
                                    this.state.skin == "4" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
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
 * 肤色-男
 */
class SkinBoy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skin: props.skin || ''
        }
    }

    componentDidMount() {
        document.title = "选择您的肤色";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            skin: nextProps.skin
        });
    }

    render() {
        return (
            <ul className="box flex-box face-area">
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '1')}>
                        <img src="/assets/img/suit/skin-2-1.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                白皙晶莹
                            {
                                    this.state.skin == "1" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '2')}>
                        <img src="/assets/img/suit/skin-2-2.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                自然红润
                            {
                                    this.state.skin == "2" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '3')}>
                        <img src="/assets/img/suit/skin-2-3.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                自然偏黄
                            {
                                    this.state.skin == "3" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '4')}>
                        <img src="/assets/img/suit/skin-2-4.jpg" width="68" height="67" />
                        <div>
                            <span className="isSelect">
                                活力小麦
                            {
                                    this.state.skin == "4" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
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
 * 体型-女
 */
class BodyGirl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: props.body || ''
        }
    }

    componentDidMount() {
        document.title = "选择您的体型";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            body: nextProps.body
        });
    }

    render() {
        return (
            <ul className="box flex-box body-area">
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '1')}>
                        <img src="/assets/img/suit/body-1-1.jpg" width="68" height="81" />
                        <div>
                            <span className="isSelect">
                                沙漏形
                            {
                                    this.state.body == "1" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                        <p className="text-center decribe">细腰，明显的S曲线</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '2')}>
                        <img src="/assets/img/suit/body-1-2.jpg" width="68" height="81" />
                        <div>
                            <span className="isSelect">
                                梨形
                            {
                                    this.state.body == "2" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                        <p className="text-center decribe">腹部、臀、大腿脂肪较多</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '3')}>
                        <img src="/assets/img/suit/body-1-3.jpg" width="68" height="81" />
                        <div>
                            <span className="isSelect">
                                苹果形
                            {
                                    this.state.body == "3" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                        <p className="text-center decribe">腰腹赘肉较多，臀部丰满</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '4')}>
                        <img src="/assets/img/suit/body-1-4.jpg" width="68" height="81" />
                        <div>
                            <span className="isSelect">
                                直筒形
                            {
                                    this.state.body == "4" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                        <p className="text-center decribe">胸宽、腰宽、臀宽相差较小</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '5')}>
                        <img src="/assets/img/suit/body-1-5.jpg" width="68" height="81" />
                        <div>
                            <span className="isSelect">
                                倒三角
                            {
                                    this.state.body == "5" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                        <p className="text-center decribe">肩宽、无腰、窄臀</p>
                    </div>
                </li>
            </ul>
        )
    }
}

/**
 * 体型-男
 */
class BodyBoy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: props.body || ''
        }
    }

    componentDidMount() {
        document.title = "选择您的体型";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            body: nextProps.body
        });
    }

    render() {
        return (
            <ul className="box flex-box body-area">
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '1')}>
                        <img src="/assets/img/suit/body-2-1.jpg" width="68" height="81" />
                        <div>
                            <span className="isSelect">
                                梯形
                            {
                                    this.state.body == "1" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                        <p className="text-center decribe">肩部较宽，胸腹较匀称</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '2')}>
                        <img src="/assets/img/suit/body-2-2.jpg" width="68" height="81" />
                        <div>
                            <span className="isSelect">
                                正三角
                            {
                                    this.state.body == "2" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                        <p className="text-center decribe">腰腹部赘肉较多，肩部较小</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '3')}>
                        <img src="/assets/img/suit/body-2-3.jpg" width="68" height="81" />
                        <div>
                            <span className="isSelect">
                                矩形
                            {
                                    this.state.body == "3" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                        <p className="text-center decribe">胸宽、腰宽、臀宽相差较小</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '4')}>
                        <img src="/assets/img/suit/body-2-4.jpg" width="68" height="81" />
                        <div>
                            <span className="isSelect">
                                倒三角
                            {
                                    this.state.body == "4" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                        <p className="text-center decribe">肩膀宽，腰部匀称，胯部较小</p>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center name-area" onClick={this.props.change.bind(this, '5')}>
                        <img src="/assets/img/suit/body-2-5.jpg" width="68" height="81" />
                        <div>
                            <span className="isSelect">
                                椭圆形
                            {
                                    this.state.body == "5" ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                        <p className="text-center decribe">圆肩膀，腰部饱满突出</p>
                    </div>
                </li>
            </ul>
        )
    }
}


/**
 * 希望解决的问题-女
 */
class SolutionGirl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solutions: props.solutions || []
        }
    }

    componentDidMount() {
        document.title = "您希望搭配能解决什么？(可多选)";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            solutions: nextProps.solutions
        });
    }

    /**
     * 选择
     */
    select(val) {
        let newArr = Array.prototype.slice.apply(this.state.solutions);
        let index = newArr.indexOf(val);
        if (index != -1) {
            newArr.splice(index, 1);
        } else {
            newArr.push(val);
            //大胸：6和平胸：7只能选一个
            if (val == "6") {//大胸
                let i = newArr.indexOf('7');
                if (i != -1) {
                    newArr.splice(i, 1);
                }
            } else if (val == "7") {//平胸
                let i = newArr.indexOf('6');
                if (i != -1) {
                    newArr.splice(i, 1);
                }
            }
        }
        this.props.change(newArr);

    }

    render() {
        return (
            <section className="solutions-area">
                <div className="solution-box-girl">
                    <img src="/assets/img/suit/solution-1.jpg" width="270" height="319" />
                    <span className="text-1" onClick={this.select.bind(this, '1')}>
                        脸大
                        {
                            this.state.solutions.indexOf('1') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                    <span className="text-2" onClick={this.select.bind(this, '2')}>
                        肩宽
                        {
                            this.state.solutions.indexOf('2') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                    <span className="text-3" onClick={this.select.bind(this, '3')}>
                        胳膊粗
                        {
                            this.state.solutions.indexOf('3') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>

                    <span className="text-4" onClick={this.select.bind(this, '4')}>
                        小粗腿
                        {
                            this.state.solutions.indexOf('4') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                    <span className="text-5" onClick={this.select.bind(this, '5')}>
                        脖子粗
                        {
                            this.state.solutions.indexOf('5') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                    <span className="text-6" onClick={this.select.bind(this, '6')}>
                        大胸
                        {
                            this.state.solutions.indexOf('6') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>

                    <span className="text-7" onClick={this.select.bind(this, '7')}>
                        平胸
                        {
                            this.state.solutions.indexOf('7') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                    <span className="text-8" onClick={this.select.bind(this, '8')}>
                        PP大
                        {
                            this.state.solutions.indexOf('8') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                    <span className="text-9" onClick={this.select.bind(this, '9')}>
                        小短腿
                        {
                            this.state.solutions.indexOf('9') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                </div>
            </section>
        )
    }
}


/**
 * 希望解决的问题-男
 */
class SolutionBoy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solutions: props.solutions || []
        }
    }

    componentDidMount() {
        document.title = "您希望搭配能解决什么？(可多选)";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            solutions: nextProps.solutions
        });
    }

    /**
     * 选择
     */
    select(val) {
        let newArr = Array.prototype.slice.apply(this.state.solutions);
        let index = newArr.indexOf(val);
        if (index != -1) {
            newArr.splice(index, 1);
        } else {
            newArr.push(val);
        }
        this.props.change(newArr);

    }

    render() {
        return (
            <section className="solutions-area">
                <div className="solution-box-boy">
                    <img src="/assets/img/suit/solution-2.jpg" width="276" height="323" />
                    <span className="text-1" onClick={this.select.bind(this, '1')}>
                        脸大
                        {
                            this.state.solutions.indexOf('1') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                    <span className="text-2" onClick={this.select.bind(this, '2')}>
                        肩宽
                        {
                            this.state.solutions.indexOf('2') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                    <span className="text-3" onClick={this.select.bind(this, '5')}>
                        啤酒肚
                        {
                            this.state.solutions.indexOf('5') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>

                    <span className="text-4" onClick={this.select.bind(this, '3')}>
                        小粗腿
                        {
                            this.state.solutions.indexOf('3') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                    <span className="text-5" onClick={this.select.bind(this, '4')}>
                        脖子粗
                        {
                            this.state.solutions.indexOf('4') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                    <span className="text-6" onClick={this.select.bind(this, '7')}>
                        翘臀
                        {
                            this.state.solutions.indexOf('7') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>

                    <span className="text-7" onClick={this.select.bind(this, '6')}>
                        小短腿
                        {
                            this.state.solutions.indexOf('6') != -1 ? <span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span> : null
                        }
                    </span>
                </div>
            </section>
        )
    }
}


/**
 * 喜欢什么风格-女
 */
class StyleGirl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: props.styles || []
        }
    }

    componentDidMount() {
        document.title = "喜欢什么风格（可多选）";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            styles: nextProps.styles
        });
    }

    /**
    * 选择
    */
    select(val) {
        let newArr = Array.prototype.slice.apply(this.state.styles);
        let index = newArr.indexOf(val);
        if (index != -1) {
            newArr.splice(index, 1);
        } else {
            newArr.push(val);
        }
        this.props.change(newArr);
    }

    render() {
        return (
            <ul className="box flex-box style-area">
                <li className="item-2">
                    <div className="text-center style" onClick={this.props.change.bind(this, '1')}>
                        <img src="/assets/img/suit/style-2-1.jpg" />
                        <div>
                            <span className="isSelect">
                                韩剧女主角
                            {
                                    this.state.solutions.indexOf('6') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center style" onClick={this.props.change.bind(this, '2')}>
                        <img src="/assets/img/suit/style-2-2.jpg" />
                        <div>
                            <span className="isSelect">
                                日系小清新
                            {
                                    this.state.solutions.indexOf('6') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center style" onClick={this.props.change.bind(this, '3')}>
                        <img src="/assets/img/suit/style-2-3.jpg" />
                        <div>
                            <span className="isSelect">
                                轻熟OL系
                            {
                                    this.state.solutions.indexOf('6') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }

                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center style" onClick={this.props.change.bind(this, '4')}>
                        <img src="/assets/img/suit/style-2-4.jpg" />
                        <div>
                            <span className="isSelect">
                                欧美出街范
                            {
                                    this.state.solutions.indexOf('6') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center style" onClick={this.props.change.bind(this, '3')}>
                        <img src="/assets/img/suit/style-2-5.jpg" />
                        <div>
                            <span className="isSelect">
                                中性运动风
                            {
                                    this.state.solutions.indexOf('6') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
                <li className="item-2">
                    <div className="text-center style" onClick={this.props.change.bind(this, '4')}>
                        <img src="/assets/img/suit/style-2-6.jpg" />
                        <div>
                            <span className="isSelect">
                                文艺复古情怀
                            {
                                    this.state.solutions.indexOf('6') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                                }
                            </span>
                        </div>
                    </div>
                </li>
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
            sex: 2,//性别
            face: '',//脸型
            skin: '',//肤色
            body: '',//体型
            solutions: [],//希望解决的问题
            progress: 6//进度
        };
    }

    componentDidMount() {

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
                {/* 女脸型 */}
                {
                    this.state.progress == 2 && this.state.sex == 2 ? <FaceGirl face={this.state.face} change={(face) => { this.setState({ face: face }) }} /> : null
                }
                {/* 男脸型 */}
                {
                    this.state.progress == 2 && this.state.sex == 1 ? <FaceBoy face={this.state.face} change={(face) => { this.setState({ face: face }) }} /> : null
                }
                {/* 女肤色 */}
                {
                    this.state.progress == 3 && this.state.sex == 2 ? <SkinGirl skin={this.state.skin} change={(skin) => { this.setState({ skin: skin }) }} /> : null
                }
                {/* 男肤色 */}
                {
                    this.state.progress == 3 && this.state.sex == 1 ? <SkinBoy skin={this.state.skin} change={(skin) => { this.setState({ skin: skin }) }} /> : null
                }
                {/* 女体型 */}
                {
                    this.state.progress == 4 && this.state.sex == 2 ? <BodyGirl body={this.state.body} change={(body) => { this.setState({ body: body }) }} /> : null
                }
                {/* 男体型 */}
                {
                    this.state.progress == 4 && this.state.sex == 1 ? <BodyBoy body={this.state.body} change={(body) => { this.setState({ body: body }) }} /> : null
                }
                {/* 女希望解决的问题 */}
                {
                    this.state.progress == 5 && this.state.sex == 2 ? <SolutionGirl solutions={this.state.solutions} change={(solutions) => { this.setState({ solutions: solutions }) }} /> : null
                }
                {/* 男希望解决的问题 */}
                {
                    this.state.progress == 5 && this.state.sex == 1 ? <SolutionBoy solutions={this.state.solutions} change={(solutions) => { this.setState({ solutions: solutions }) }} /> : null
                }
                {/* 女风格 */}
                {
                    this.state.progress == 6 && this.state.sex == 2 ? <StyleGirl styles={this.state.styles} change={(styles) => { this.setState({ styles: styles }) }} /> : null
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