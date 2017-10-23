/***
 * 我要搭配
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import { DataLoad, GetData } from '../Component/index';
import BindTel from "./component/BindTel";
import qs from 'query-string';
import { Footer } from '../Component/index';
import { News } from '../Component/index';

class NeedMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: props.data.contact || '',
            path: '', //url路径
            isBingTelShow: false, //是否显示绑定手机窗口
            typeTips: 0,//1:咨询 2:购买 3：陪逛 4：衣橱整理 5：素人改造套餐一 6：素人改造套餐二 7：素人改造套餐三
        }
    }
    componentDidMount() {
        document.title = "我要搭配";

    }

    /**
     * 隐藏提示
     */
    hideTips(e) {
        let targetEle = e.target
        while (targetEle.getAttribute('class') != "price-item-box") {
            targetEle = targetEle.parentElement;
            if (targetEle == e.currentTarget) {
                break;
            }
        }
        if (targetEle.getAttribute('class') != "price-item-box") {
            this.setState({
                typeTips: 0
            });
        }
    }

    /**
     * 
     * [verifyUser 验证是否绑定过手机]
     * @param  {[type]} path  [url路由]
     * @param  {[type]} event [点击事件]
     * @return {[type]}       [description]
     */
    verifyUser(path, event) {
        if (!this.state.contact) {
            event.preventDefault();
            this.setState({
                path: path,
                isBingTelShow: true
            });
            return;
        }

    }
    render() {
        return (
            <section className="full-page to-match-page" onClick={this.hideTips.bind(this)}>
                <img src="/assets/img/needMatch/head.jpg" className="response_img top-img" />
                <h2 className="title">选择服务类型</h2>
                <ul className="type-select">
                    <li>
                        <h3 className="type-title">
                            咨询
                            <span className="price">&yen;19</span>
                        </h3>
                        <p className="introduce">给你提供合理的搭配建议</p>
                        <section className="price-item-box">
                            <ul className="price-item" onClick={() => { this.setState({ typeTips: this.state.typeTips == 1 ? 0 : 1 }) }}>
                                <li className="flex-box">
                                    <div className="item">造型搭配设计</div>
                                    <div className="item">&yen;19/次</div>
                                    <div className="item">x1</div>
                                </li>
                            </ul>
                            <ul className={this.state.typeTips === 1 ? "tips active" : "tips"}>
                                <li>根据个人身材、风格及场景需求，为你解决各种搭配问题，并定制专属你的造型设计</li>
                            </ul>
                        </section>
                        <Link to="/consult" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/consult')}>立刻购买</Link>
                    </li>
                    <li>
                        <h3 className="type-title">
                            购买
                            <span className="price">&yen;38</span>
                        </h3>
                        <p className="introduce">给你提供最优的购买方案</p>
                        <section className="price-item-box">
                            <ul className="price-item" onClick={() => { this.setState({ typeTips: this.state.typeTips == 2 ? 0 : 2 }) }}>
                                <li className="flex-box">
                                    <div className="item">造型搭配设计</div>
                                    <div className="item">&yen;19/次</div>
                                    <div className="item">x1</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">购买方案</div>
                                    <div className="item">&yen;19/次</div>
                                    <div className="item">x1</div>
                                </li>
                            </ul>
                            <ul className={this.state.typeTips === 2 ? "tips tips2 active" : "tips tips2"}>
                                <li>1、根据个人身材、风格及场景需求，定制专属你的造型设计。</li>
                                <li>2、根据设计建议、价格要求，为你寻找最优的搭配购买方案，让你用更少的钱遇见更美的自己。</li>
                            </ul>
                        </section>
                        <Link to="/shopping" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/shopping')}>立刻购买</Link>
                    </li>
                    <li>
                        <h3 className="type-title">
                            陪逛
                            <span className="price">&yen;198</span>
                            <del className="origin-price">原价&yen;274</del>
                        </h3>
                        <p className="introduce">陪你逛街，高效率的搭配购买</p>
                        <section className="price-item-box">
                            <ul className="price-item" onClick={() => { this.setState({ typeTips: this.state.typeTips == 3 ? 0 : 3 }) }}>
                                <li className="flex-box">
                                    <div className="item">造型搭配设计</div>
                                    <div className="item">&yen;19/次</div>
                                    <div className="item">x2</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">购买方案</div>
                                    <div className="item">&yen;19/次</div>
                                    <div className="item">x2</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">线下陪逛</div>
                                    <div className="item">&yen;99/小时</div>
                                    <div className="item">x2</div>
                                </li>
                            </ul>
                            <ul className={this.state.typeTips === 3 ? "tips tips2 active" : "tips tips2"}>
                                <li>1、约上搭配师和你一起逛街，不仅提供量身定制的搭配方案，还能提升购物乐趣，防忽悠，高效率，够专业。</li>
                                <li>2、搭配师提供至少两次的搭配设计和购买方案。</li>
                            </ul>
                        </section>
                        <Link to="/accompanyShopping" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/accompanyShopping')}>立刻购买</Link>
                    </li>
                    <li>
                        <h3 className="type-title">
                            衣橱整理
                            <span className="price">&yen;198</span>
                        </h3>
                        <p className="introduce">帮你整理衣橱，进行衣物重组搭配</p>
                        <section className="price-item-box">
                            <ul className="price-item" onClick={() => { this.setState({ typeTips: this.state.typeTips == 4 ? 0 : 4 }) }}>
                                <li className="flex-box">
                                    <div className="item">衣橱搭配服务</div>
                                    <div className="item">&yen;99/小时</div>
                                    <div className="item">x2</div>
                                </li>
                            </ul>
                            <ul className={this.state.typeTips === 4 ? "tips tips2 active" : "tips tips2"}>
                                <li>搭配师上门整理衣橱，根据你的个人需求，结合你衣橱里的衣服，进行全新的搭配，旧衣新穿，时尚又省钱。</li>
                            </ul>
                        </section>
                        <Link to="/neatenWardrobe" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/neatenWardrobe')}>立刻购买</Link>
                    </li>
                    <li>
                        <h3 className="type-title">
                            素人改造套餐一
                            <span className="price">&yen;199</span>
                            <del className="origin-price">原价&yen;1150</del>
                        </h3>
                        <p className="introduce">专业搭配师一对一改造，个人形象设计</p>
                        <section className="price-item-box">
                            <ul className="price-item" onClick={() => { this.setState({ typeTips: this.state.typeTips == 5 ? 0 : 5 }) }}>
                                <li className="flex-box">
                                    <div className="item">服装搭配设计</div>
                                    <div className="item">&yen;200/次</div>
                                    <div className="item">x2</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">发型设计</div>
                                    <div className="item">&yen;150/次</div>
                                    <div className="item">x1</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">妆面设计</div>
                                    <div className="item">&yen;150/次</div>
                                    <div className="item">x1</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">照片拍摄</div>
                                    <div className="item">&yen;100/组</div>
                                    <div className="item">x2</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">线上咨询服务</div>
                                    <div className="item">&yen;500/月</div>
                                    <div className="item">x0.5</div>
                                </li>
                            </ul>
                            <ul className={this.state.typeTips === 5 ? "tips tips3 active" : "tips tips3"}>
                                <li>1、专业搭配师线下进行一对一改造，根据个人形象及要求设计并变装。</li>
                                <li>2、根据个人脸型及服装搭配进行发型设计和打理。</li>
                                <li>3、配合日常妆面喜好及造型风格，提供整体妆面设计。</li>
                                <li>4、造型前后的形象拍摄，留下改造前后的珍贵回忆。</li>
                                <li>5、免费提供一个月的线上咨询服务，解决你的一切搭配问题。</li>
                            </ul>
                        </section>
                        <Link to="/plainPeopleChange" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/neatenWardrobe')}>立刻购买</Link>
                    </li>
                    <li>
                        <h3 className="type-title">
                            素人改造套餐二
                            <span className="price">&yen;499</span>
                            <del className="origin-price">原价&yen;2000</del>
                        </h3>
                        <p className="introduce">专业搭配师一对一改造，个人形象设计</p>
                        <section className="price-item-box">
                            <ul className="price-item" onClick={() => { this.setState({ typeTips: this.state.typeTips == 6 ? 0 : 6 }) }}>
                                <li className="flex-box">
                                    <div className="item">服装搭配设计</div>
                                    <div className="item">&yen;200/次</div>
                                    <div className="item">x4</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">发型设计</div>
                                    <div className="item">&yen;150/次</div>
                                    <div className="item">x1</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">妆面设计</div>
                                    <div className="item">&yen;150/次</div>
                                    <div className="item">x1</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">照片拍摄</div>
                                    <div className="item">&yen;100/组</div>
                                    <div className="item">x4</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">线上咨询服务</div>
                                    <div className="item">&yen;500/月</div>
                                    <div className="item">x1</div>
                                </li>
                            </ul>
                            <ul className={this.state.typeTips === 6 ? "tips tips3 active" : "tips tips3"}>
                                <li>1、专业搭配师线下进行一对一改造，根据个人形象及要求设计并变装。</li>
                                <li>2、根据个人脸型及服装搭配进行发型设计和打理。</li>
                                <li>3、配合日常妆面喜好及造型风格，提供整体妆面设计。</li>
                                <li>4、造型前后的形象拍摄，留下改造前后的珍贵回忆。</li>
                                <li>5、免费提供一个月的线上咨询服务，解决你的一切搭配问题。</li>
                            </ul>
                        </section>
                        <Link to="/plainPeopleChange" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/neatenWardrobe')}>立刻购买</Link>
                    </li>
                    <li>
                        <h3 className="type-title">
                            素人改造套餐三
                            <span className="price">&yen;999</span>
                            <del className="origin-price">原价&yen;4050</del>
                        </h3>
                        <p className="introduce">专业搭配师一对一改造，个人形象设计</p>
                        <section className="price-item-box">
                            <ul className="price-item" onClick={() => { this.setState({ typeTips: this.state.typeTips == 7 ? 0 : 7 }) }}>
                                <li className="flex-box">
                                    <div className="item">服装搭配设计</div>
                                    <div className="item">&yen;200/次</div>
                                    <div className="item">x6</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">发型设计</div>
                                    <div className="item">&yen;150/次</div>
                                    <div className="item">x2</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">妆面设计</div>
                                    <div className="item">&yen;150/次</div>
                                    <div className="item">x3</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">照片拍摄</div>
                                    <div className="item">&yen;100/组</div>
                                    <div className="item">x6</div>
                                </li>
                                <li className="flex-box">
                                    <div className="item">线上咨询服务</div>
                                    <div className="item">&yen;500/月</div>
                                    <div className="item">x3</div>
                                </li>
                            </ul>
                            <ul className={this.state.typeTips === 7 ? "tips tips3 active" : "tips tips3"}>
                                <li>1、专业搭配师线下进行一对一改造，根据个人形象及要求设计并变装。</li>
                                <li>2、根据个人脸型及服装搭配进行发型设计和打理。</li>
                                <li>3、配合日常妆面喜好及造型风格，提供整体妆面设计。</li>
                                <li>4、造型前后的形象拍摄，留下改造前后的珍贵回忆。</li>
                                <li>5、免费提供一个月的线上咨询服务，解决你的一切搭配问题。</li>
                            </ul>
                        </section>
                        <Link to="/plainPeopleChange" className="btn to-buy-btn" onClick={this.verifyUser.bind(this, '/neatenWardrobe')}>立刻购买</Link>
                    </li>
                </ul>
                {this.state.isBingTelShow ? <BindTel path={this.state.path} move={() => { this.setState({ isBingTelShow: false }) }} /> : null}
                <News />
            </section>
        );
    }
}


class Main extends Component {
    constructor(props) {
        super(props);
        let { index } = qs.parse(props.location.search);
        //设置默认加载位置
        if (index) {
            ToolDps.sessionItem('sliderIndex', index);
        }
    }

    render() {
        let {
                data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data.succ ? <NeedMatch data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return main;
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