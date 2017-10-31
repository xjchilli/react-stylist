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
// import flatpickr from 'flatpickr';
// const zh = require("flatpickr/dist/l10n/zh.js").zh;

/**
 * 性别
 */
class Sex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: props.sex || ''
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
                <li className="item-2" onClick={this.props.change.bind(this, '1')}>
                    <div className="text-center name-area" >
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
                <li className="item-2 text-center" onClick={this.props.change.bind(this, '2')}>
                    <div className="text-center name-area" >
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
                <li className="item-2" onClick={this.props.change.bind(this, '1')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/face-2-1.jpg?s=2" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '2')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/face-2-2.jpg?s=2" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '3')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/face-2-3.jpg?s=2" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '4')}>
                    <div className="text-center name-area">
                        <img src="https://file.dapeis.com/resources/config/requirement/face-2-4.jpg?s=2" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '1')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/face-1-1.jpg?s=1" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '2')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/face-1-2.jpg?s=1" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '3')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/face-1-3.jpg?s=1" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '4')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/face-1-4.jpg?s=1" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '1')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/skin-2-1.jpg?s=2" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '2')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/skin-2-2.jpg?s=2" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '3')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/skin-2-3.jpg?s=2" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '4')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/skin-2-4.jpg?s=2" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '1')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/skin-1-1.jpg?s=1" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '2')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/skin-1-2.jpg?s=1" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '3')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/skin-1-3.jpg?s=1" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '4')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/skin-1-4.jpg?s=1" width="68" height="67" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '1')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/body-2-1.jpg?s=2" width="68" height="81" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '2')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/body-2-2.jpg?s=2" width="68" height="81" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '3')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/body-2-3.jpg?s=2" width="68" height="81" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '4')}>
                    <div className="text-center name-area">
                        <img src="https://file.dapeis.com/resources/config/requirement/body-2-4.jpg?s=2" width="68" height="81" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '5')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/body-2-5.jpg?s=2" width="68" height="81" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '1')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/body-1-1.jpg?s=1" width="68" height="81" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '2')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/body-1-2.jpg?s=1" width="68" height="81" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '3')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/body-1-3.jpg?s=1" width="68" height="81" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '4')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/body-1-4.jpg?s=1" width="68" height="81" />
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
                <li className="item-2" onClick={this.props.change.bind(this, '5')}>
                    <div className="text-center name-area" >
                        <img src="https://file.dapeis.com/resources/config/requirement/body-1-5.jpg?s=1" width="68" height="81" />
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
                    <div className={this.state.styles.indexOf('1') != -1 ? "text-center style active" : "text-center style"} onClick={this.select.bind(this, '1')}>
                        <img src="/assets/img/suit/style-2-1.jpg" />
                    </div>
                    <div className="text-center">
                        <span className="isSelect">
                            韩剧女主角
                            {
                                this.state.styles.indexOf('1') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                            }
                        </span>
                    </div>
                </li>
                <li className="item-2">
                    <div className={this.state.styles.indexOf('2') != -1 ? "text-center style active" : "text-center style"} onClick={this.select.bind(this, '2')}>
                        <img src="/assets/img/suit/style-2-2.jpg" />
                    </div>
                    <div className="text-center">
                        <span className="isSelect">
                            日系小清新
                        {
                                this.state.styles.indexOf('2') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                            }
                        </span>
                    </div>
                </li>
                <li className="item-2">
                    <div className={this.state.styles.indexOf('3') != -1 ? "text-center style active" : "text-center style"} onClick={this.select.bind(this, '3')}>
                        <img src="/assets/img/suit/style-2-3.jpg" />
                    </div>
                    <div className="text-center">
                        <span className="isSelect">
                            轻熟OL系
                            {
                                this.state.styles.indexOf('3') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                            }

                        </span>
                    </div>
                </li>
                <li className="item-2">
                    <div className={this.state.styles.indexOf('4') != -1 ? "text-center style active" : "text-center style"} onClick={this.select.bind(this, '4')}>
                        <img src="/assets/img/suit/style-2-4.jpg" />
                    </div>
                    <div className="text-center">
                        <span className="isSelect">
                            欧美出街范
                            {
                                this.state.styles.indexOf('4') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                            }
                        </span>
                    </div>
                </li>
                <li className="item-2">
                    <div className={this.state.styles.indexOf('5') != -1 ? "text-center style active" : "text-center style"} onClick={this.select.bind(this, '5')}>
                        <img src="/assets/img/suit/style-2-5.jpg" />
                    </div>
                    <div className="text-center">
                        <span className="isSelect">
                            中性运动风
                            {
                                this.state.styles.indexOf('5') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                            }
                        </span>
                    </div>
                </li>
                <li className="item-2">
                    <div className={this.state.styles.indexOf('6') != -1 ? "text-center style active" : "text-center style"} onClick={this.select.bind(this, '6')}>
                        <img src="/assets/img/suit/style-2-6.jpg" />
                    </div>
                    <div className="text-center">
                        <span className="isSelect">
                            文艺复古情怀
                            {
                                this.state.styles.indexOf('6') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                            }
                        </span>
                    </div>
                </li>
            </ul>
        )
    }
}

/**
 * 喜欢什么风格-男
 */
class StyleBoy extends Component {
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
                    <div className={this.state.styles.indexOf('1') != -1 ? "text-center style active" : "text-center style"} onClick={this.select.bind(this, '1')}>
                        <img src="/assets/img/suit/style-1-1.jpg" />
                    </div>
                    <div className="text-center">
                        <span className="isSelect">
                            街头潮男风
                            {
                                this.state.styles.indexOf('1') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                            }
                        </span>
                    </div>
                </li>
                <li className="item-2">
                    <div className={this.state.styles.indexOf('2') != -1 ? "text-center style active" : "text-center style"} onClick={this.select.bind(this, '2')}>
                        <img src="/assets/img/suit/style-1-2.jpg" />
                    </div>
                    <div className="text-center">
                        <span className="isSelect">
                            绅士熟男系
                            {
                                this.state.styles.indexOf('2') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                            }
                        </span>
                    </div>
                </li>
                <li className="item-2">
                    <div className={this.state.styles.indexOf('3') != -1 ? "text-center style active" : "text-center style"} onClick={this.select.bind(this, '3')}>
                        <img src="/assets/img/suit/style-1-3.jpg" />
                    </div>
                    <div className="text-center">
                        <span className="isSelect">
                            纹身硬汉系
                            {
                                this.state.styles.indexOf('3') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                            }

                        </span>
                    </div>
                </li>
                <li className="item-2">
                    <div className={this.state.styles.indexOf('4') != -1 ? "text-center style active" : "text-center style"} onClick={this.select.bind(this, '4')}>
                        <img src="/assets/img/suit/style-1-4.jpg" />
                    </div>
                    <div className="text-center">
                        <span className="isSelect">
                            清新治愈系
                            {
                                this.state.styles.indexOf('4') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                            }
                        </span>
                    </div>
                </li>
                <li className="item-2">
                    <div className={this.state.styles.indexOf('5') != -1 ? "text-center style active" : "text-center style"} onClick={this.select.bind(this, '5')}>
                        <img src="/assets/img/suit/style-1-5.jpg" />
                    </div>
                    <div className="text-center">
                        <span className="isSelect">
                            暗黑禁欲系
                            {
                                this.state.styles.indexOf('5') != -1 ? (<span className="icon icon-gou2"><span className="path1"></span><span className="path2"></span></span>) : null
                            }
                        </span>
                    </div>
                </li>
            </ul>
        )
    }
}


/**
 * 基础信息
 */
class BaseInfo extends Component {
    componentDidMount() {
        document.title = "基础信息";
        //年龄
        this.age = new Swiper('.J-age', {
            initialSlide: 23,
            slidesPerView: 5,
            centeredSlides: true,
            freeMode: true,
            freeModeSticky: true,
            onTap: (swiper) => {
                swiper.slideTo(swiper.clickedIndex, 100, false);
                let age = swiper.slides[swiper.clickedIndex].textContent.trim();
                this.props.changeAge(age);
            },
            onTransitionEnd: (swiper) => { //slide改变
                let age = swiper.slides[swiper.activeIndex].textContent.trim();
                this.props.changeAge(age);
            }
        });
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
                this.props.changeHeight(heigh);
            },
            onTransitionEnd: (swiper) => { //slide改变
                let heigh = swiper.slides[swiper.activeIndex].textContent.trim();
                this.props.changeHeight(heigh);
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
                this.props.changeWeight(weight);
            },
            onTransitionEnd: (swiper) => { //slide改变
                let weight = swiper.slides[swiper.activeIndex].textContent;
                this.props.changeWeight(weight);
            }
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
                    <h4 className="base-title">年龄（岁）</h4>
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
                    <h4 className="base-title">身高（cm）</h4>
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
                    <h4 className="base-title">体重（kg）</h4>
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


/**
 * 其他信息
 */
class OtherInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeShow: false,//时间窗口显示
            cityShow: false, //是否显示城市窗口
            provinceCode: '330000',//省
            cityCode: '330100',//市
            countyCode: '330106',//区
            fullCityName: '',//城市名字
        }
    }

    componentDidMount() {
        document.title = "基础信息(选填)";
    }

    componentWillReceiveProps(nextProps) {
        this.setState({

        });
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
        let fullCityName = provinceName + cityName + areaName; //地址
        this.setState({
            cityShow: false,
            provinceCode: currProvince,
            cityCode: currCity,
            countyCode: currArea,
            fullCityName
        });
        this.props.changeCountyCode(currArea);
    }
    render() {

        return (
            <section className="otherInfo-area">
                <label>职业</label>
                <input type="text" maxLength={10} value={this.props.professional} onChange={(e) => { this.props.changeProfessional(e.target.value) }} />
                <label>城市</label>
                <input type="text" value={this.state.fullCityName} readOnly={true} onClick={() => { this.setState({ cityShow: true }) }} onFocus={(e) => { e.target.blur() }} />
                {this.state.cityShow ? <City defaultProvince={this.state.provinceCode} defaultCity={this.state.cityCode} defaultArea={this.state.countyCode} getCity={this.getCity.bind(this)} close={() => { this.setState({ cityShow: false }) }} /> : null}
            </section>
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
            sex: props.data.info.sex || 2,//性别
            face: '',//脸型
            skin: '',//肤色
            body: '',//体型
            solutions: [],//希望解决的问题
            styles: [],//风格
            age: '',//年龄
            height: '',//身高
            weight: '',//体重
            professional: '',//职业
            countyCode: '',//区
            progress: 1//进度
        };
        this._time = 0;
    }

    componentWillUnmount() {
        clearTimeout(this._time);
    }

    /**
     * 修改性别
     */
    changeSex(sex) {
        if (sex != this.state.sex) {
            this.setState({
                sex: sex,
                face: '',//脸型
                skin: '',//肤色
                body: '',//体型
                solutions: [],//希望解决的问题
                styles: [],//风格
            });
        }
    }

    showMsg(isShow, tipText) {
        this.setState({
            msgShow: isShow,
            msgText: tipText,
        });
    }

    sendForm() {
        let formdata = new FormData();
        formdata.append('sex', this.state.sex);
        formdata.append('faceshpe', this.state.face);
        formdata.append('colorofskin', this.state.skin);
        formdata.append('bodySize', this.state.body);
        formdata.append('problem', this.state.solutions);
        formdata.append('style', this.state.styles);
        formdata.append('birthday', this.state.age);
        formdata.append('heigh', this.state.height);
        formdata.append('weight', this.state.weight);
        formdata.append('professional', this.state.professional);
        formdata.append('countyCode', this.state.countyCode);

        ToolDps.post('/wx/user/save', formdata, {
            'Content-Type': 'multipart/form-data'
        }).then((res) => {
            if (res.succ) {
                this.showMsg(true, '提交成功');
                this._time = setTimeout(() => {
                    this.context.router.history.push('/profile');
                }, 1000);
            } else {
                this.showMsg(true, '提交失败');
            }
        });
    }

    /**
     * 下一步
     */
    nextStep() {
        let step = this.state.progress;
        if (step == 2) {//第2步
            if (this.state.face == "") {
                this.showMsg(true, '请选择脸型');
                return;
            }
        } else if (step == 3) {
            if (this.state.skin == "") {
                this.showMsg(true, '请选择肤色');
                return;
            }
        } else if (step == 4) {
            if (this.state.body == "") {
                this.showMsg(true, '请选择体型');
                return;
            }
        } else if (step == 5) {
            if (this.state.solutions.length == 0) {
                this.showMsg(true, '请选择需要解决的问题');
                return;
            }
        } else if (step == 6) {
            if (this.state.styles.length == 0) {
                this.showMsg(true, '请选择风格');
                return;
            }
        } else if (step >= 8) {
            this.sendForm();//提交表单
            return;
        }
        this.setState({
            progress: ++step
        });
    }

    render() {
        let percent = this.state.progress / 8 * 100;
        return (
            <section className="full-page customsuit-page">
                <div className="progress">
                    <span className="num" style={{ width: percent + '%' }}></span>
                </div>
                {
                    this.state.progress == 1 ? <Sex sex={this.state.sex} change={this.changeSex.bind(this)} /> : null
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
                {/* 男风格 */}
                {
                    this.state.progress == 6 && this.state.sex == 1 ? <StyleBoy styles={this.state.styles} change={(styles) => { this.setState({ styles: styles }) }} /> : null
                }
                {/* 基础信息 */}
                {
                    this.state.progress == 7 ? <BaseInfo changeAge={(age) => { this.setState({ age: age }) }} changeHeight={(height) => { this.setState({ height: height }) }} changeWeight={(weight) => { this.setState({ weight: weight }) }} /> : null
                }
                {/* 基础信息(选填) */}
                {
                    this.state.progress == 8 ? <OtherInfo professional={this.state.professional} changeProfessional={(value) => { this.setState({ professional: value }) }} changeCountyCode={(value) => { this.setState({ countyCode: value }) }} /> : null
                }
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}

                {
                    this.state.progress != 1 ? (
                        <button className="btn pre-btn" onClick={() => { this.setState({ progress: --this.state.progress }) }}>
                            <span>上一步</span>
                        </button>
                    ) : null
                }

                <button className="btn next-btn" onClick={this.nextStep.bind(this)}>
                    {this.state.progress == 8 ? "完成" : (<span>下一步</span>)}

                </button>
            </section>
        )
    }

}

CustomSuit.contextTypes = {
    router: PropTypes.object.isRequired
};


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