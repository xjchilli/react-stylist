/**
 * 我的vip
 */
import React from 'react';

/**
 * 开通会员
 */
class Buy extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            swiperW: window.innerWidth - 50//轮播宽度
        }
    }
    componentDidMount() {
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
        });
    }

    render() {
        return (
            <header className='at-once-buy-area'>
                <img src='/assets/img/vip/bg.jpg' className='response_img' />
                <div id="vip-grade" className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" style={{ width: this.state.swiperW + 'px', backgroundImage: 'url(/assets/img/vip/vip-grade-1.jpg)' }}>
                            <span className='grade-name'>钻石会员</span>
                            <div className='price'>
                                &yen;<span className='num'>2998</span>／年
                    </div>
                            <dl>
                                <dd>全年线上线下免费搭配</dd>
                                <dd>享商品会员价9折</dd>
                            </dl>
                            <button className='btn at-once-btn'>立即开通</button>
                        </div>
                        <div className="swiper-slide" style={{ width: this.state.swiperW + 'px', backgroundImage: 'url(/assets/img/vip/vip-grade-1.jpg)' }}>
                            <span className='grade-name'>钻石会员</span>
                            <div className='price'>
                                &yen;<span className='num'>2998</span>／年
                    </div>
                            <dl>
                                <dd>全年线上线下免费搭配</dd>
                                <dd>享商品会员价9折</dd>
                            </dl>
                            <button className='btn at-once-btn'>立即开通</button>
                        </div>
                        <div className="swiper-slide" style={{ width: this.state.swiperW + 'px', backgroundImage: 'url(/assets/img/vip/vip-grade-1.jpg)' }}>
                            <span className='grade-name'>钻石会员</span>
                            <div className='price'>
                                &yen;<span className='num'>2998</span>／年
                    </div>
                            <dl>
                                <dd>全年线上线下免费搭配</dd>
                                <dd>享商品会员价9折</dd>
                            </dl>
                            <button className='btn at-once-btn'>立即开通</button>
                        </div>
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
    render() {
        return (
            <section className='vip-usage-area'>
                <h4 className='title text-center'>
                    <span>VIP特权</span>
                </h4>
                <ul className='flex-box vip-usage-range'>
                    <li className='item-3 text-center'>
                        <img src='/assets/img/vip/vip-usage-range.jpg' />
                        <div className='name'>购衣折扣</div>
                    </li>
                    <li className='item-3 text-center'>
                        <img src='/assets/img/vip/vip-usage-range.jpg' />
                        <div className='name'>购衣折扣</div>
                    </li>
                    <li className='item-3 text-center'>
                        <img src='/assets/img/vip/vip-usage-range.jpg' />
                        <div className='name'>购衣折扣</div>
                    </li>
                    <li className='item-3 text-center'>
                        <img src='/assets/img/vip/vip-usage-range.jpg' />
                        <div className='name'>购衣折扣</div>
                    </li>
                    <li className='item-3 text-center'>
                        <img src='/assets/img/vip/vip-usage-range.jpg' />
                        <div className='name'>购衣折扣</div>
                    </li>
                    <li className='item-3 text-center'>
                        <img src='/assets/img/vip/vip-usage-range.jpg' />
                        <div className='name'>购衣折扣</div>
                    </li>
                </ul>
                <div className='vip-discribe'>
                    <img src='/assets/img/vip/vip-usage-range.jpg' />
                    全年购物享9.5折优惠
                    </div>
            </section>
        )
    }
}

/**
 * 会员信息
 */
class VipMemberInfo extends React.Component {
    render() {
        return (
            <section className='member-info-area'>
                <div className='lside'>
                    <img src='/assets/img/girl.jpg' className='header-img'/>
                </div>
                <div className='rside'>
                    <span className='nickname'>哒啦哒啦</span>
                    <br/>
                    <time>2018-9-20日到期</time>
                    <button className='btn at-once-buy-btn'>立即续费</button>
                    <span className='grade-name'>钻石会员</span>
                </div>
            </section>
        )
    }
}


class VipMember extends React.Component {



    render() {
        return (
            <section className='vip-page'>
                <VipMemberInfo />
                {/* <Buy /> */}
                <VipUsage />
            </section>
        )
    }
}

export default VipMember;