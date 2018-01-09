/**
 * 规格选择
 */
import React from 'react';

class SkuSelect extends React.Component {
    constructor(props) {
        super(props);
        let { images, price, stockNum, colors, measurements, sku } = props.data;
        let { selectSkuText, colorActiveId, colorActiveName, sizeActiveId, sizeActiveName, num, goodsImg, salePrice } = props.selectSkuData;
        this.state = {
            selectAreaH: window.innerHeight - 28,//sku容器高度
            skuLayoutH: window.innerHeight - 28 - 92,//sku选择区高度
            images: images,
            salePrice: salePrice || price,
            stockNum: stockNum,//库存
            colors: colors,
            measurements: measurements,
            sku: sku,
            selectSkuText: selectSkuText || '请选择 颜色 尺码',//选择的sku
            colorActiveId: colorActiveId || '',//选择的颜色id
            colorActiveName: colorActiveName || '',//选择的颜色名称
            sizeActiveId: sizeActiveId || '',//选择的尺码id
            sizeActiveName: sizeActiveName || '',//选择的尺码名称
            num: num || 1,//默认购买数量1
            goodsImg: goodsImg || images[0].url,//商品图片
        }
    }

    /**
     * 获取颜色数据
     */
    getColor(id, name) {
        let skuArr = Array.prototype.slice.apply(this.state.sku);
        let goodsImg = '';//商品图片
        let stockNum = 0;//库存
        let selectSkuText = '';
        let num = 0;
        let salePrice = '';
        for (let i = 0; i < skuArr.length; i++) {
            if (this.state.sizeActiveId) {
                if (skuArr[i].colorId === id && skuArr[i].measurementId === this.state.sizeActiveId) {
                    goodsImg = skuArr[i].goodsImg.url;
                    stockNum += skuArr[i].num;
                    salePrice = skuArr[i].salePrice;
                    continue;
                }
            } else {
                if (skuArr[i].colorId === id) {
                    goodsImg = skuArr[i].goodsImg.url;
                    stockNum += skuArr[i].num;
                    salePrice = skuArr[i].salePrice;
                }
            }
        }

        selectSkuText = this.getSlectSkuTextTip(name, this.state.sizeActiveName);
        num = this.getNum(stockNum);

        this.props.getSkuData(
            {
                selectSkuText: selectSkuText,//选择的sku
                colorActiveId: id,//选择的颜色id
                colorActiveName: name,//选择的颜色名称
                sizeActiveId: this.state.sizeActiveId,//选择的尺码id
                sizeActiveName: this.state.sizeActiveName,//选择的尺码名称
                num: num,//默认购买数量1
                goodsImg: goodsImg,//商品图片
                salePrice: salePrice//售价
            }
        );

        this.setState({
            colorActiveId: id,
            colorActiveName: name,
            selectSkuText: selectSkuText,
            goodsImg: goodsImg,
            stockNum: stockNum,
            num: num,
            salePrice: salePrice
        });
    }

    /**
     * 获取尺码数据
     */
    getSize(id, name) {
        let skuArr = Array.prototype.slice.apply(this.state.sku);
        let stockNum = 0;//库存
        let selectSkuText = '';
        let num = 0;
        let salePrice = '';
        for (let i = 0; i < skuArr.length; i++) {
            if (this.state.colorActiveId) {
                if (skuArr[i].colorId === this.state.colorActiveId && skuArr[i].measurementId === id) {
                    stockNum += skuArr[i].num;
                    salePrice = skuArr[i].salePrice;
                    continue;
                }
            } else {
                if (skuArr[i].measurementId === id) {
                    stockNum += skuArr[i].num;
                    salePrice = skuArr[i].salePrice;
                }
            }
        }

        selectSkuText = this.getSlectSkuTextTip(this.state.colorActiveName, name);
        num = this.getNum(stockNum);

        this.props.getSkuData(
            {
                selectSkuText: selectSkuText,//选择的sku
                colorActiveId: this.state.colorActiveId,//选择的颜色id
                colorActiveName: this.state.colorActiveName,//选择的颜色名称
                sizeActiveId: id,//选择的尺码id
                sizeActiveName: name,//选择的尺码名称
                num: num,//默认购买数量1
                goodsImg: this.state.goodsImg,//商品图片
                salePrice: salePrice//售价
            }
        );

        this.setState({
            sizeActiveId: id,
            sizeActiveName: name,
            selectSkuText: selectSkuText,
            stockNum: stockNum,
            num: num,
            salePrice: salePrice
        });
    }

    /**
     * 获取sku的名称提示
     */
    getSlectSkuTextTip(colorName, sizeName) {
        let selectSkuText = '请选择 颜色 尺码';
        if (!colorName && sizeName) {
            selectSkuText = '请选择 颜色';
        } else if (colorName && !sizeName) {
            selectSkuText = '请选择 尺码';
        } else if (colorName && sizeName) {
            selectSkuText = `已选择：${colorName}，${sizeName}`;
        }

        return selectSkuText;
    }

    //计算数量
    getNum(stockNum) {
        let num = 0;
        if (this.state.num === 0 && stockNum > 0) {
            num = 1;
        } else if (this.state.num > stockNum) {
            num = stockNum;
        } else {
            num = this.state.num;
        }
        return num;
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
                        <p className='price'>&yen;{this.state.salePrice}</p>
                        <p className='store'>库存{this.state.stockNum}件</p>
                        <p>{this.state.selectSkuText}</p>
                        <span className="icon icon-fault2" onClick={() => { this.props.close() }}></span>
                    </header>
                    <section className='main-layout' style={{ maxHeight: this.state.skuLayoutH + 'px' }}>
                        <h5>颜色</h5>
                        <ul className='my-sku clear'>
                            {
                                this.state.colors.map((item, index) => {
                                    return <li className={this.state.colorActiveId === item.id ? 'active' : ''} key={index} onClick={this.getColor.bind(this, item.id, item.name)}>{item.name}</li>;
                                })
                            }
                            {/* <li className='active'>炫黑</li> */}
                        </ul>
                        <h5>尺码</h5>
                        <ul className='my-sku clear'>
                            {
                                this.state.measurements.map((item, index) => {
                                    return <li className={this.state.sizeActiveId === item.type ? 'active' : ''} key={index} onClick={this.getSize.bind(this, item.type, item.name)}>{item.name}</li>
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
                {
                    this.props.isTrue ? (
                        <ul className='flex-box sku-action-area'>
                            <li className='item-2'>
                                <button className={this.state.stockNum === 0 ? 'btn add-shop-cart-btn disable' : 'btn add-shop-cart-btn'}>加入购物车</button>
                            </li>
                            <li className='item-2'>
                                <button className={this.state.stockNum === 0 ? 'btn immediately-buy-btn disable' : 'btn immediately-buy-btn'}>立即购买</button>
                            </li>
                        </ul>
                    ) : (
                            <ul className='flex-box sku-action-area'>
                                <li className='true-btn-area'>
                                    <button className={this.state.stockNum === 0 ? 'btn immediately-buy-btn disable' : 'btn immediately-buy-btn'}>确定</button>
                                </li>
                            </ul>
                        )
                }


            </section>
        )
    }
}

export default SkuSelect;