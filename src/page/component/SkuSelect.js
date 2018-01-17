/**
 * 规格选择
 */
import React from 'react';
import PropTypes from 'prop-types';
import { setGoodsInfo } from '../../Config/ToolStore';
import { Msg } from '../../Component/index';
import { ToolDps } from '../../ToolDps';

class SkuSelect extends React.Component {
    constructor(props) {
        super(props);
        let { id, images, price, stockNum, colors, measurements, sku, supplierId } = props.data;
        let { skuId, selectSkuText, colorActiveId, colorActiveName, sizeActiveId, sizeActiveName, num, goodsImg, salePrice } = props.selectSkuData;
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            selectAreaH: window.innerHeight - 28,//sku容器高度
            skuLayoutH: window.innerHeight - 28 - 92,//sku选择区高度
            images: images,
            salePrice: salePrice || price,
            stockNum: stockNum,//库存
            colors: colors,
            measurements: measurements,
            sku: sku,
            skuId: skuId || '',//规格id
            goodsId: id,//商品id
            supplierId: supplierId,//供应商id
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
     * 立即购买
     */
    shopNow() {
        let flag = this.validForm();
        if (!flag) return;
        let data = [{
            goodsName: this.props.goodsName,//商品名称
            goodsId: this.state.goodsId,//商品id
            num: this.state.num,//购物数量
            skuId: this.state.skuId,//规格ID
            colorActiveName: this.state.colorActiveName,//颜色名称
            sizeActiveName: this.state.sizeActiveName,//尺码名称
            supplierId: this.state.supplierId,//供应商ID
            goodsImg: this.state.goodsImg,//商品图片
            salePrice: this.state.salePrice,//售价
        }];
        setGoodsInfo(data);
        this.context.router.history.push('/orderConfirm');
    }

    /**
     * 加入购物车
     */
    addShopCart() {
        let flag = this.validForm();
        if (!flag) return;
        let data = {
            num: this.state.num,
            skuId: this.state.skuId
        };
        ToolDps.post('/wx/cart/add', data).then((res) => {
            if (res.succ) {
                this.setState({
                    msgShow: true,
                    msgText: '添加成功', //提示内容
                });
            } else {
                this.setState({
                    msgShow: true,
                    msgText: res.msg, //提示内容
                });
            }
        });
    }

    /**
     * 验证表单
     */
    validForm() {
        if (!this.state.colorActiveId) {
            this.setState({
                msgShow: true,
                msgText: '请选择颜色', //提示内容
            });
            return false;
        }
        if (!this.state.sizeActiveId) {
            this.setState({
                msgShow: true,
                msgText: '请选择尺码', //提示内容
            });
            return false;
        }

        return true;
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
        let skuId = '';//规格id
        for (let i = 0; i < skuArr.length; i++) {
            if (this.state.sizeActiveId) {
                if (skuArr[i].colorId === id && skuArr[i].measurementId === this.state.sizeActiveId) {
                    skuId = skuArr[i].id;
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
                skuId: skuId,//规格id
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
            skuId: skuId,//规格id
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
        let skuId = '';//规格id
        for (let i = 0; i < skuArr.length; i++) {
            if (this.state.colorActiveId) {
                if (skuArr[i].colorId === this.state.colorActiveId && skuArr[i].measurementId === id) {
                    skuId = skuArr[i].id;
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
                skuId: skuId,//规格id
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
            skuId: skuId,//规格id
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
                                <button className={this.state.stockNum === 0 ? 'btn add-shop-cart-btn disable' : 'btn add-shop-cart-btn'} onClick={this.addShopCart.bind(this)}>加入购物车</button>
                            </li>
                            <li className='item-2'>
                                <button className={this.state.stockNum === 0 ? 'btn immediately-buy-btn disable' : 'btn immediately-buy-btn'} onClick={this.shopNow.bind(this)}>立即购买</button>
                            </li>
                        </ul>
                    ) : (
                            <ul className='flex-box sku-action-area'>
                                <li className='true-btn-area'>
                                    <button className={this.state.stockNum === 0 ? 'btn immediately-buy-btn disable' : 'btn immediately-buy-btn'} onClick={this.props.buyType === 0 ? this.shopNow.bind(this) : this.addShopCart.bind(this)}>确定</button>
                                </li>
                            </ul>
                        )
                }

                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}

SkuSelect.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SkuSelect;