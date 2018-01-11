/**
 * 购物车
 */
import React from 'react';

class ShopCart extends React.Component {
    constructor(props) {
        super(props);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
        this.el = null;//移动元素
        this.startX = 0;//开始坐标x
        this.startY = 0;//开始坐标y
        this.moveX = 0;//移动坐标x
        this.moveY = 0;//移动坐标y
        this.moveDis = 0;//移动距离
        this.moveDisLeft = 0;//左滑动距离
    }

    componentDidMount() {
        document.title = '购物车';
    }

    start(e) {
        this.el = e.currentTarget;
        this.startX = e.targetTouches[0].pageX;
        this.startY = e.targetTouches[0].pageY;
        this.el.addEventListener('touchmove', this.move);
        this.el.addEventListener('touchend', this.end);
        // console.log(this.startX);
    }

    move(e) {
        this.moveX = e.targetTouches[0].pageX;
        this.moveY = e.targetTouches[0].pageY;
        if (Math.abs(this.moveY - this.startY) > 10) {//上下滚动超过10px代表滚动条滑动
            return;
        }
        this.moveDis = this.moveX - this.startX;
        if (this.moveDis < 0 && this.moveDisLeft === 0) {//左滑动
            if (this.moveDis <= -10) {
                this.el.style.transform = `translateX(-54px)`;
            } else {
                this.el.style.transform = `translateX(${this.moveDis}px)`;
            }
        } else if (this.moveDis > 0 && this.moveDisLeft === -54) {//右滑动
            let dist = this.moveDisLeft + this.moveDis;
            if (this.moveDis >= 10) {
                this.el.style.transform = `translateX(0px)`;
            } else {
                this.el.style.transform = `translateX(${dist}px)`;
            }
        }
        // console.log(this.startX, this.moveX, this.moveDis);
    }

    end() {
        if (this.moveDis <= -10) {//左滑动
            this.moveDisLeft = -54;
            this.el.style.transform = `translateX(-54px)`;
        } else if (this.moveDis >= 10) {//右滑动
            this.moveDisLeft = 0;
            this.el.style.transform = `translateX(0px)`;
        } else if (this.moveDis > -10 && this.moveDis < 0 && this.moveDisLeft === 0) {//左滑动小于10px
            this.moveDisLeft = 0;
            this.el.style.transform = `translateX(0px)`;
        } else if (this.moveDis < 10 && this.moveDis > 0 && this.moveDisLeft === -54) {//右滑动小于10px
            this.moveDisLeft = -54;
            this.el.style.transform = `translateX(-54px)`;
        }
        this.el.removeEventListener('touchmove', this.move);
    }

    render() {
        return (
            <section className='full-page shop-cart-page'>
                <ul className='goods-list-area'>
                    <li onTouchStart={this.start.bind(this)}>
                        <span className="icon icon-not-selected"><span className="path1"></span><span className="path2"></span></span>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <div className='price-area'>
                                    &yen;799.00
                                    <div className='num-btn-area'>
                                        <label className='minus' ></label>
                                        <label className='text'>1</label>
                                        <label className='add'></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className='btn delete-btn'>删除</button>
                    </li>
                    <li onTouchStart={this.start.bind(this)}>
                        <span className="icon icon-selected"><span className="path1"></span><span className="path2"></span></span>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <div className='price-area'>
                                    &yen;799.00
                                    <div className='num-btn-area'>
                                        <label className='minus' ></label>
                                        <label className='text'>1</label>
                                        <label className='add'></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className='btn delete-btn'>删除</button>
                    </li>
                    <li onTouchStart={this.start.bind(this)}>
                        <span className="icon icon-not-selected"><span className="path1"></span><span className="path2"></span></span>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <div className='price-area'>
                                    &yen;799.00
                                    <div className='num-btn-area'>
                                        <label className='minus' ></label>
                                        <label className='text'>1</label>
                                        <label className='add'></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className='btn delete-btn'>删除</button>
                    </li>
                    <li onTouchStart={this.start.bind(this)}>
                        <span className="icon icon-selected"><span className="path1"></span><span className="path2"></span></span>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <div className='price-area'>
                                    &yen;799.00
                                    <div className='num-btn-area'>
                                        <label className='minus' ></label>
                                        <label className='text'>1</label>
                                        <label className='add'></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className='btn delete-btn'>删除</button>
                    </li>
                    <li onTouchStart={this.start.bind(this)}>
                        <span className="icon icon-not-selected"><span className="path1"></span><span className="path2"></span></span>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <div className='price-area'>
                                    &yen;799.00
                                    <div className='num-btn-area'>
                                        <label className='minus' ></label>
                                        <label className='text'>1</label>
                                        <label className='add'></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className='btn delete-btn'>删除</button>
                    </li>
                    <li onTouchStart={this.start.bind(this)}>
                        <span className="icon icon-selected"><span className="path1"></span><span className="path2"></span></span>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <div className='price-area'>
                                    &yen;799.00
                                    <div className='num-btn-area'>
                                        <label className='minus' ></label>
                                        <label className='text'>1</label>
                                        <label className='add'></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className='btn delete-btn'>删除</button>
                    </li>
                    <li onTouchStart={this.start.bind(this)}>
                        <span className="icon icon-not-selected"><span className="path1"></span><span className="path2"></span></span>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <div className='price-area'>
                                    &yen;799.00
                                    <div className='num-btn-area'>
                                        <label className='minus' ></label>
                                        <label className='text'>1</label>
                                        <label className='add'></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className='btn delete-btn'>删除</button>
                    </li>
                    <li onTouchStart={this.start.bind(this)}>
                        <span className="icon icon-selected"><span className="path1"></span><span className="path2"></span></span>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                                <div className='price-area'>
                                    &yen;799.00
                                    <div className='num-btn-area'>
                                        <label className='minus' ></label>
                                        <label className='text'>1</label>
                                        <label className='add'></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className='btn delete-btn'>删除</button>
                    </li>
                </ul>
                <ul className='flex-box shop-cart-footer'>
                    <li>
                        <span className="icon icon-selected"><span className="path1"></span><span className="path2"></span></span>
                        &nbsp;全选
                        <label>合计：<span className='price'>&yen;36895.00</span></label>
                    </li>
                    <li>
                        <button className='btn'>立即结算</button>
                    </li>
                </ul>
            </section>
        )
    }
}

export default ShopCart;