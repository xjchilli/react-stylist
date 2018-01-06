/**
 * 商品详情
 */

import React from 'react';
import SkuSelect from './component/SkuSelect';

class GoodsDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowSku: true
        }
    }

    componentDidMount() {
        document.title = '商品详情';
        let swiper = new Swiper(this.banner, {
            pagination: '.swiper-pagination',
            paginationType: 'fraction'
        });
    }
    render() {
        return (
            <section className='full-page goods-detail-page'>
                <div ref={(el) => { this.banner = el }} className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" style={{ backgroundImage: 'url(/assets/img/server1.jpg)' }}>1</div>
                        <div className="swiper-slide" style={{ backgroundImage: 'url(/assets/img/server2.jpg)' }}>2</div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <section className='box banner-intro'>
                    <h3 className='title'>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568</h3>
                    <p className='sale-price-area'>
                        <span className='unit'>&yen;</span><span className='num'>799</span><span className='note'>免运费</span>
                    </p>
                </section>
                <section className='box'>
                    <div className='select-sku'>请选择 规格</div>
                    <div className='after-sale'><span className="icon icon-gou3"></span>店铺发货&售后</div>
                </section>
                <section className='box goods-detail-area'>
                    <h4>商品详情</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td>商品品牌</td>
                                <td>1111</td>
                            </tr>
                            <tr>
                                <td>商品分类</td>
                                <td>1111</td>
                            </tr>
                            <tr>
                                <td>材质</td>
                                <td>1111</td>
                            </tr>
                            <tr>
                                <td>佩戴方式</td>
                                <td>1111</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <footer>
                    <ul className='flex-box'>
                        <li className='item-2'>
                            <button className='btn add-shop-cart-btn'>加入购物车</button>
                        </li>
                        <li className='item-2'>
                            <button className='btn immediately-buy-btn'>立即购买</button>
                        </li>
                    </ul>
                </footer>
                {
                    this.state.isShowSku ? <SkuSelect close={() => { this.setState({ isShowSku: false }) }} /> : null
                }

            </section>
        )
    }
}


export default GoodsDetail;