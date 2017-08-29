/***
 * 我要搭配
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import { DataLoad, GetData } from '../Component/index';
import BindTel from "./component/BindTel";
import qs from 'query-string';

class NeedMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: props.data.contact || '',
            path: '', //url路径
            isBingTelShow: false //是否显示绑定手机窗口
        }
    }
    componentDidMount() {
        document.title = "我要搭配";
        let index = ToolDps.sessionItem('sliderIndex');
        let swiper1 = new Swiper('#match-banner', {
            initialSlide: index || 0,
            pagination: '.swiper-pagination',
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 50,
                stretch: 16,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            onSlideChangeEnd: function (swiper) {
                ToolDps.sessionItem('sliderIndex', swiper.activeIndex)
            }
        });
        let swiper2 = new Swiper('#content-banner', {
            initialSlide: index || 0
        });
        swiper1.params.control = swiper2;
        swiper2.params.control = swiper1;
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
            <section className="full-page bgWhite needMatch-entry">
                <div id="match-banner" className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" ></div>
                        <div className="swiper-slide" ></div>
                        <div className="swiper-slide" ></div>
                        <div className="swiper-slide" ></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div id="content-banner" className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide content-area">
                            <h3>咨询</h3>
                            <p>先入手了一双鞋，不知道怎么搭配？直接把鞋子照片发上来去问你的搭配师吧。想要约女票去看电影，想要一个新的形象？把衣橱里的衣物发给搭配师，搭配师会给你合理的建议。</p>
                            <p>总之，任何搭配类的问题，都可以直接问搭配师。</p>
                            <p>每个搭配师根据自身的经验水平，会有自己的定价，但是MS搭配师官方给出了统一的优惠价。</p>
                            <p><em>只要在官方入口发布需求，享受统一价格<b>19.9元/次</b></em></p>
                            <Link to="/consult" className="btn to-publish-btn" onClick={this.verifyUser.bind(this, '/consult')}>发布需求</Link>
                        </div>
                        <div className="swiper-slide content-area">
                            <h3>购物</h3>
                            <p>你可以体验一下明星般的服务，只需要告知你要买什么，在什么场合穿的，搭配师就可以根据你的需求，并结合你自身的个人特点，告诉你最优的搭配购买方案。</p>
                            <p>每个搭配师根据自身的经验水平，会有自己的定价，但是MS搭配师官方给出了统一的优惠价。</p>
                            <p><em>只要在官方入口发布需求，享受统一价格<b>19.9元/次</b></em></p>
                            <Link to="/shopping" className="btn to-publish-btn" onClick={this.verifyUser.bind(this, '/shopping')}>发布需求</Link>
                        </div>
                        <div className="swiper-slide content-area">
                            <h3>陪逛</h3>
                            <p>逛街效率太低，怕被导购忽悠？可以约上搭配师陪你一起逛街，专业的搭配师给你的购买提供合理的建议，高效完成购物服务。</p>
                            <p>每个搭配师根据自身的经验水平，会有自己的定价，但是MS搭配师官方给出了统一的优惠价。</p>
                            <p><em>只要在官方入口发布需求，享受统一价格<b>99元/小时</b></em></p>
                            <p>两个小时起购，具体服务时间如果不足，可以在服务过程中，再另行向搭配师协商支付。</p>
                            <Link to="/accompanyShopping" className="btn to-publish-btn" onClick={this.verifyUser.bind(this, '/accompanyShopping')}>发布需求</Link>
                        </div>
                        <div className="swiper-slide content-area" >
                            <h3>整理</h3>
                            <p>换季没有衣服穿？总感觉去年是在裸奔？全世界的美衣都在你的衣橱里，只是你自己不知道而已。约个搭配师到家里整理衣橱，也许不用买买买，照样每天穿出新花样。</p>
                            <p>每个搭配师根据自身的经验水平，会有自己的定价，但是MS搭配师官方给出了统一的优惠价。</p>
                            <p><em>只要在官方入口发布需求，享受统一价格<b>99元/小时</b></em></p>
                            <p>两个小时起购，具体服务时间如果不足，可以在服务过程中，再另行向搭配师协商支付。</p>
                            <Link to="/neatenWardrobe" className="btn to-publish-btn" onClick={this.verifyUser.bind(this, '/neatenWardrobe')}>发布需求</Link>
                        </div>
                    </div>
                </div>
                {this.state.isBingTelShow ? <BindTel path={this.state.path} move={() => { this.setState({ isBingTelShow: false }) }} /> : null}
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