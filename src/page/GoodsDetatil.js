/**
 * 商品详情
 */

import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { DataLoad, GetData } from "../Component/index";
import SkuSelect from './component/SkuSelect';
import { myShopCart } from 'ToolAjax';


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
            selectSkuData: {
                skuId: '',//规格id
                selectSkuText: '请选择 颜色 尺码',//选择的sku
                colorActiveId: '',//选择的颜色id
                colorActiveName: '',//选择的颜色名称
                sizeActiveId: '',//选择的尺码id
                sizeActiveName: '',//选择的尺码名称
                num: 1,//默认购买数量1
                goodsImg: '',//商品图片
                salePrice: ''//售价
            },//选择的sku
            isShowSku: false,
            isTrue: true,//选择sku true:2个按钮 false:一个按钮
            buyType: 0,//0:立即购买  1:加入购物车
            shopCartGoodsNum: 0,//购物车商品个数
        }
        this.getShopCartGoodsNum();
    }

    /**
     * 获取购物车商品个数
     */
    getShopCartGoodsNum() {
        myShopCart().then((res) => {
            if (res.succ) {
                this.setState({
                    shopCartGoodsNum: res.data.length
                });
            }
        });
    }

    componentDidMount() {
        document.title = '商品详情';
        let swiper = new Swiper(this.banner, {
            pagination: '.swiper-pagination',
            paginationType: 'fraction'
        });
    }

    /**
     * 获取sku数据
     */
    getSkuData(skuData) {
        this.setState({
            selectSkuData: skuData
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
                    <div className='select-sku' onClick={() => this.setState({ isShowSku: true, isTrue: true })}>{this.state.selectSkuData.selectSkuText}</div>
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
                    <ul>
                        <li>
                            <Link to={'/shopCart?' + new Date().getTime()}>
                                <span className='cart-area'>
                                    <span className="icon icon-shop-cart"></span>
                                    {
                                        this.state.shopCartGoodsNum > 0 ? <span className='buy-num'>{this.state.shopCartGoodsNum}</span> : null
                                    }
                                </span>
                                <p className='text-center'>购物车</p>
                            </Link>
                        </li>
                        <li>
                            <button className='btn add-shop-cart-btn' onClick={() => { this.setState({ isShowSku: true, isTrue: false, buyType: 1 }) }}>加入购物车</button>
                        </li>
                        <li>
                            <button className='btn immediately-buy-btn' onClick={() => { this.setState({ isShowSku: true, isTrue: false, buyType: 0 }) }}>立即购买</button>
                        </li>
                    </ul>
                </footer>
                {
                    this.state.isShowSku ? <SkuSelect getShopCartGoodsNum={this.getShopCartGoodsNum.bind(this)} goodsName={name} buyType={this.state.buyType} isTrue={this.state.isTrue} selectSkuData={this.state.selectSkuData} getSkuData={this.getSkuData.bind(this)} data={this.state.data} close={() => { this.setState({ isShowSku: false }) }} /> : null
                }
            </section>
        )
    }
}



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