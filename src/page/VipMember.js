/**
 * 我的vip
 */
import React from 'react';
import { Msg, DataLoad, GetData } from '../Component/index';
import { vipOpenUp } from 'ToolAjax';
import WxAuth from './component/WxAuth';
import WxPayCall from './component/WxPayCall';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsapiSigna: false, //js签名是否成功
        }
    }

    componentDidMount() {
        //jsapi签名
        WxAuth().then(() => {
            this.setState({
                jsapiSigna: true
            });
        });

    }

    render() {
        let { data, loadAnimation, loadMsg } = this.props.state;
        let main = data && data.succ && this.state.jsapiSigna ? <VipMember data={data.data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}


/**
 * 开通会员
 */
class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swiperW: window.innerWidth - 50//轮播宽度
        }
        this.swiperIndex = 0;
    }
    componentDidMount() {
        let self = this;
        new Swiper('#vip-grade', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 33,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            spaceBetween: 12,
            pagination: {
                el: '.swiper-pagination',
            },
            on: {
                transitionEnd: function () { //slide改变
                    if (self.swiperIndex != this.activeIndex) {
                        self.swiperIndex = this.activeIndex;
                        self.props.gradeViewChange(self.props.data[this.activeIndex].item);
                    }
                }
            }
        });
    }

    render() {
        return (
            <header className='at-once-buy-area'>
                <img src='/assets/img/vip/bg.jpg' className='response_img' />
                <div id="vip-grade" className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            this.props.data.map((item, index) => {
                                return (
                                    <div key={index} className="swiper-slide" style={{ width: this.state.swiperW + 'px', backgroundImage: `url(${item.icon})` }}>
                                        <span className='grade-name' style={{ color: `rgb(${item.color_name})` }}>{item.name}</span>
                                        <div className='price' style={{ color: `rgb(${item.color_price})` }}>
                                            &yen;<span className='num'>{item.price}</span>／{item.unit}
                                        </div>
                                        <dl>
                                            <dd>{item.title[0]}</dd>
                                            <dd>{item.title[1]}</dd>
                                        </dl>
                                        <button className='btn at-once-btn' style={{ backgroundColor: `rgb(${item.color_price})`, color: `rgb(${item.color_btn_font})`, boxShadow: `0 0 6px rgba(${item.color_price},.6)` }} onClick={this.props.pay.bind(this,item.id)}>立即开通</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="swiper-pagination">
                        <img className="response_img" src="/assets/img/match1.jpg" />
                    </div>
                </div>
            </header>
        )
    }
}

/**
 * vip权限
 */
class VipUsage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: props.data[0].icon,
            discribe: props.data[0].description
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            icon: nextProps.data[0].icon,
            discribe: nextProps.data[0].description
        });
    }

    render() {
        return (
            <section className='vip-usage-area'>
                <h4 className='title text-center'>
                    <span>VIP特权</span>
                </h4>
                <ul className='flex-box vip-usage-range'>
                    {
                        this.props.data.map((item, index) => {
                            return (
                                <li key={index} className='item-3 text-center' onClick={() => { this.setState({ icon: item.icon, discribe: item.description }) }}>
                                    <img src={item.icon} />
                                    <div className='name'>{item.name}</div>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className='flex-box vip-discribe'>
                    <li>
                        <img src={this.state.icon} />
                    </li>
                    <li>
                        <span className='text'>{this.state.discribe}</span>
                    </li>
                </ul>
            </section>
        )
    }
}

/**
 * vip等级
 */
class VipGrade extends React.Component {
    render() {
        return (
            <section className='vip-package-list'>
                <div className='bg' onClick={this.props.close}></div>
                <dl className='list'>
                    <dt>VIP套餐</dt>
                    <dd>
                        <div className='price-area'>
                            <span className='num del'>298</span>
                            <em>元一年</em>
                            <span className='price-spread'>
                                还需补差价<em>299元</em>
                            </span>
                        </div>
                        <div className='describe'>尊享线上服务免费，享受一次免费线下服务</div>
                        <button className='btn open-up-btn'>开通</button>
                    </dd>
                    <dd>
                        <div className='price-area'>
                            <span className='num del'>298</span>
                            <em>元一年</em>
                            <span className='price-spread'>
                                还需补差价<em>299元</em>
                            </span>
                        </div>
                        <div className='describe'>尊享线上服务免费，享受一次免费线下服务</div>
                        <button className='btn open-up-btn'>开通</button>
                    </dd>
                    <dd>
                        <div className='price-area'>
                            <span className='num del'>298</span>
                            <em>元一年</em>
                            <span className='price-spread'>
                                还需补差价<em>299元</em>
                            </span>
                        </div>
                        <div className='describe'>尊享线上服务免费，享受一次免费线下服务</div>
                        <button className='btn open-up-btn'>开通</button>
                    </dd>
                </dl>
            </section>
        )
    }
}

/**
 * 会员信息
 */
class VipMemberInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vipGradeShow: false//vip等级
        }
    }
    render() {
        return (
            <section className='member-info-area'>
                <div className='lside'>
                    <img src='/assets/img/girl.jpg' className='header-img' />
                </div>
                <div className='rside'>
                    <span className='nickname'>哒啦哒啦</span>
                    <br />
                    <time>2018-9-20日到期</time>
                    <button className='btn at-once-buy-btn' onClick={() => { this.setState({ vipGradeShow: true }) }}>立即续费</button>
                    <span className='grade-name'>钻石会员</span>
                </div>
                {this.state.vipGradeShow ? <VipGrade close={() => { this.setState({ vipGradeShow: false }) }} /> : null}

            </section>
        )
    }
}


class VipMember extends React.Component {
    constructor(props) {
        super(props);
        let { user, vipConf } = props.data;
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            gradeList: vipConf,//vip等级
            vipUsageData: vipConf[0].item,
            vipMemberInfoShow: false,//vip信息
            buyShow: true//开通会员
        }
    }

    /**
     * 支付
     */
    pay(vipId) {
        vipOpenUp(vipId).then((res) => {
            console.log(res);
            if (res.succ) {
                WxPayCall(res.payInfo, (res) => {
                    if (res.type === 1) {//成功
                        // this._time = setTimeout(function () {
                        //     this.context.router.history.push('/orderDetail?orderId=' + this.props.data.orderId);
                        // }.bind(this), 1500);
                    }
                });
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '获取支付签名失败', //提示内容
                });
            }
        });


    }


    render() {
        return (
            <section className='vip-page'>
                {this.state.vipMemberInfoShow ? <VipMemberInfo /> : null}
                {this.state.buyShow ? <Buy data={this.state.gradeList} gradeViewChange={(data) => { this.setState({ vipUsageData: data }) }}  pay={this.pay.bind(this)}/> : null}
                <VipUsage data={this.state.vipUsageData} />
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}

export default GetData({
    id: 'VipMember', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/vip/index',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});