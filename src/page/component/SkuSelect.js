/**
 * 规格选择
 */
import React from 'react';

class SkuSelect extends React.Component {
    constructor(props) {
        super(props);
        let { images, price, stockNum, colors, measurements, sku } = props.data;
        this.state = {
            selectAreaH: window.innerHeight - 28,//sku容器高度
            skuLayoutH: window.innerHeight - 28 - 92,//sku选择区高度
            images: images,
            price: price,
            stockNum: stockNum,//库存
            colors: colors,
            measurements: measurements,
            sku: sku,
            colorActiveId: '',//选择的颜色id
            sizeActiveId: '',//选择的尺码id
            num: 1,//默认购买数量1
            goodsImg: images[0].url || '',//商品图片
        }
    }

    /**
     * 获取颜色数据
     */
    getColor(id) {
        let skuArr = Array.prototype.slice.apply(this.state.sku);
        let goodsImg = '';//商品图片
        let stockNum = 0;//库存
        for (let i = 0; i < skuArr.length; i++) {
            if (this.state.sizeActiveId) {
                if (skuArr[i].colorId === id && skuArr[i].measurementId === this.state.sizeActiveId) {
                    goodsImg = skuArr[i].goodsImg.url;
                    stockNum += skuArr[i].num;
                    continue;
                }
            } else {
                if (skuArr[i].colorId === id) {
                    goodsImg = skuArr[i].goodsImg.url;
                    stockNum += skuArr[i].num;
                }
            }
        }
        this.setState({
            colorActiveId: id,
            goodsImg: goodsImg,
            stockNum: stockNum,
            num: this.state.num > stockNum ? stockNum : this.state.num
        });
    }

    /**
     * 获取尺码数据
     */
    getSize(id) {
        let skuArr = Array.prototype.slice.apply(this.state.sku);
        let stockNum = 0;//库存
        for (let i = 0; i < skuArr.length; i++) {
            if (this.state.colorActiveId) {
                if (skuArr[i].colorId === this.state.colorActiveId && skuArr[i].measurementId === id) {
                    stockNum += skuArr[i].num;
                    continue;
                }
            } else {
                if (skuArr[i].measurementId === id) {
                    stockNum += skuArr[i].num;
                }
            }
        }
        this.setState({
            sizeActiveId: id,
            stockNum: stockNum,
            num: this.state.num > stockNum ? stockNum : this.state.num
        });
    }

    /**
     * 增加商品数量
     */
    add() {
        let num = this.state.num;
        num++;
        if (num > this.state.stockNum) return;
        this.setState({
            num: num
        });
    }

    /**
     * 减少商品数量
     */
    minus() {
        let num = this.state.num;
        num--;
        if (num <= 0) return;
        this.setState({
            num: num
        });
    }

    render() {
        return (
            <section className='sku-area'>
                <div className='bg' onClick={() => { this.props.close() }}></div>
                <div className='select-area' style={{ maxHeight: this.state.selectAreaH + 'px' }}>
                    <header className='sku-header'>
                        <div className='goods-img' style={{ backgroundImage: `url(${this.state.goodsImg})` }}></div>
                        <p className='price'>&yen;{this.state.price}</p>
                        <p className='store'>库存{this.state.stockNum}件</p>
                        <p>请选择 颜色 尺码</p>
                        <span className="icon icon-fault2" onClick={() => { this.props.close() }}></span>
                    </header>
                    <section className='main-layout' style={{ maxHeight: this.state.skuLayoutH + 'px' }}>
                        <h5>颜色</h5>
                        <ul className='my-sku clear'>
                            {
                                this.state.colors.map((item, index) => {
                                    return <li className={this.state.colorActiveId === item.id ? 'active' : ''} key={index} onClick={this.getColor.bind(this, item.id)}>{item.name}</li>;
                                })
                            }
                            {/* <li className='active'>炫黑</li> */}
                        </ul>
                        <h5>尺码</h5>
                        <ul className='my-sku clear'>
                            {
                                this.state.measurements.map((item, index) => {
                                    return <li className={this.state.sizeActiveId === item.type ? 'active' : ''} key={index} onClick={this.getSize.bind(this, item.type)}>{item.name}</li>
                                })
                            }
                        </ul>
                        <div className='num-area'>
                            <span className='num-title'>购买数量</span>
                            <div className='num-btn-area'>
                                <label className='minus' onClick={this.minus.bind(this)}></label>
                                <label className='text'>{this.state.num}</label>
                                <label className='add' onClick={this.add.bind(this)}></label>
                            </div>
                        </div>
                    </section>
                </div>
                <ul className='flex-box sku-action-area'>
                    <li className='item-2'>
                        <button className='btn add-shop-cart-btn'>加入购物车</button>
                    </li>
                    <li className='item-2'>
                        <button className='btn immediately-buy-btn'>立即购买</button>
                    </li>
                </ul>
            </section>
        )
    }
}

export default SkuSelect;