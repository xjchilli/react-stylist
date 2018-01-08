/**
 * 商品详情
 */

import React from 'react';
import qs from 'query-string';
import { DataLoad, GetData } from "../Component/index";
import SkuSelect from './component/SkuSelect';


class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;

        let main = data && data.succ ? <GoodsDetail data={data.data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main;
    }
}

class GoodsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
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
        let { images, name, price, brand, rootCategoryName, secondCategoryName, attribute, detail } = this.state.data;
        return (
            <section className='full-page goods-detail-page'>
                <div ref={(el) => { this.banner = el }} className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            images.map((item, index) => <div key={index} className="swiper-slide" style={{ backgroundImage: `url(${item.url})` }}></div>)
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <section className='box banner-intro'>
                    <h3 className='title'>{name}</h3>
                    <p className='sale-price-area'>
                        <span className='unit'>&yen;</span><span className='num'>{price}</span><span className='note'>免运费</span>
                    </p>
                </section>
                <section className='box'>
                    <div className='select-sku' onClick={() => this.setState({ isShowSku: true })}>请选择 颜色 尺码</div>
                    <div className='after-sale'><span className="icon icon-gou3"></span>店铺发货&售后</div>
                </section>
                <section className='box goods-detail-area'>
                    <h4>商品详情</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td>商品品牌</td>
                                <td>{brand.name}</td>
                            </tr>
                            <tr>
                                <td>商品分类</td>
                                <td>{rootCategoryName + '/' + secondCategoryName}</td>
                            </tr>
                            {
                                attribute.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.categoryAttributeName}</td>
                                            <td>{item.attributeValueName}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <section className='editor ql-container ql-snow'>
                        <div className='ql-editor ql-blank' dangerouslySetInnerHTML={{ __html: detail }}></div>
                    </section>
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
                    this.state.isShowSku ? <SkuSelect data={this.state.data} close={() => { this.setState({ isShowSku: false }) }} /> : null
                }

            </section>
        )
    }
}


// export default GoodsDetail;


export default GetData({
    id: 'GoodsDetail', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: (props, state) => {
        let { id } = qs.parse(props.location.search);
        return `/wx/goods/${id}/detail`;
    },
    data: '',//发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});