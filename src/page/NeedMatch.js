/***
 * 我要搭配
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import BindTel from "./component/BindTel";

class NeedMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            path: '', //url路径
            isBingTelShow: false //是否显示绑定手机窗口
        }
    }
    componentDidMount() {
        document.title = "我要搭配";
        let swiper1 = new Swiper('#match-banner', {
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
            }
        });
        let swiper2 = new Swiper('#content-banner', {

        });
        swiper1.params.control = swiper2;
        swiper2.params.control = swiper1;


        ToolDps.get('/wx/user/info').then((res) => {
            if (res.succ) {
                this.setState({
                    contact: res.contact
                });
            }
        });


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
                        <div className="swiper-slide" style={{ backgroundImage: "url(assets/img/match1.jpg)" }}></div>
                        <div className="swiper-slide" style={{ backgroundImage: "url(assets/img/match2.jpg)" }}></div>
                        <div className="swiper-slide" style={{ backgroundImage: "url(assets/img/match3.jpg)" }}></div>
                        <div className="swiper-slide" style={{ backgroundImage: "url(assets/img/match4.jpg)" }}></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div id="content-banner" className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide content-area">
                            <h3>咨询</h3>
                            <p>入手了一双鞋，不知道怎么搭配？直接把鞋子照片发上来去问你的搭配师吧。想要约女票去看电影，想要一个新的形象？把衣橱里的衣物发给搭配师，搭配师会给你合理的建议。</p>
                            <p>总之，任何搭配类的问题，都可以直接问搭配师。</p>
                            <p>每个搭配师根据自身的经验水平，会有自己的定价，但是MS搭配师官方给出了统一的优惠价。</p>
                            <p><em>只要在官方入口发布需求，享受统一价格<b>19.9元/次</b></em></p>
                            <Link to="/consult" className="btn to-publish-btn" onClick={this.verifyUser.bind(this, '/consult')}>发布需求</Link>
                        </div>
                        <div className="swiper-slide">2</div>
                        <div className="swiper-slide">3</div>
                        <div className="swiper-slide" >4</div>
                    </div>
                </div>


                {/* <div className="item" >
                        <Link to="/consult" className='container' onClick={this.verifyUser.bind(this, '/consult')}>
                            <div className="content">
                                <h5>咨询<small>19.9元/次</small></h5>
                                <p>任何关于搭配、形象等问题，均可以向搭配师咨询</p>
                            </div>
                        </Link>
                        <Link to="/consultHelp" className='detail-btn'>查看详情</Link>
                    </div>
                    <div className="item" >
                        <Link to="/shopping" className='container'  onClick={this.verifyUser.bind(this, '/shopping')}>
                            <div className="content">
                                <h5>购物<small>19.9元/次</small></h5>
                                <p>买买买，买到适合你的才是王道，不知道什么样的适合自己，找我</p>
                            </div>
                        </Link>
                        <Link to="/shoppingHelp" className='detail-btn'>查看详情</Link>
                    </div>
                    <div className="item" >
                        <Link to="/accompanyShopping" className='container'  onClick={this.verifyUser.bind(this, '/accompanyShopping')}>
                            <div className="content">
                                <h5>陪逛<small>99元/小时</small></h5>
                                <p>约个搭配师陪你逛街购物是个什么体验？明星才有的待遇，你也可以拥有</p>
                            </div>
                        </Link>
                        <Link to="/accompanyShoppingHelp" className='detail-btn'>查看详情</Link>
                    </div>
                    <div className="item" >
                        <Link to="/neatenWardrobe" className='container'  onClick={this.verifyUser.bind(this, '/neatenWardrobe')}>
                            <div className="content">
                                <h5>整理<small>99元/小时</small></h5>
                                <p>全世界的美衣都在你的衣橱里，只是你自己不知道而已</p>
                            </div>
                        </Link>
                        <Link to="/neatenWardrobeHelp" className='detail-btn'>查看详情</Link>
                    </div> */}

                {this.state.isBingTelShow ? <BindTel path={this.state.path} move={() => { this.setState({ isBingTelShow: false }) }} /> : null}
            </section>
        );
    }
}



export default NeedMatch;