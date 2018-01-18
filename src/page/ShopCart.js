/**
 * 购物车
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataLoad, GetData } from '../Component/index';
import merged from 'obj-merged';
import { setGoodsInfo } from '../Config/ToolStore';
import { ToolDps } from '../ToolDps';
import { Msg } from '../Component/index';

class Main extends React.Component {
    componentDidMount() {
        document.title = '购物车';
    }

    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data && data.succ ? <ShopCart data={data.data} {...this.props} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;

        return main;
    }
}


class ShopCart extends React.Component {
    constructor(props) {
        super(props);
        let list = props.data;
        for (let i = 0; i < list.length; i++) {
            list[i].checked = false;
        }
        this.state = {
            list: list,
            msgShow: false,
            msgText: '', //提示内容
        }
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
        this.el = null;//移动元素
        this.startX = 0;//开始坐标x
        this.startY = 0;//开始坐标y
        this.moveX = 0;//移动坐标x
        this.moveY = 0;//移动坐标y
        this.moveDis = 0;//移动距离
        this.moveDisLeft = 0;//左滑动距离

        this.init(list);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     list: nextProps.data
        // });
    }

    init(list) {
        let copyData = merged(this.props.state);
        copyData.data.data = list;
        copyData.path = '/shopCart';
        this.props.setState(copyData);
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

    /**
     * 计算总价
     */
    calculateTotalPrice() {
        let totalPrice = 0.00;
        let list = this.state.list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].checked) {
                totalPrice += list[i].num * Number(list[i].sku.salePrice);
            }
        }
        return totalPrice;
    }

    /**
     * 选择商品
     */
    selectGoods(skuId) {
        let list = Array.prototype.slice.apply(this.state.list);
        for (let i = 0; i < list.length; i++) {
            if (skuId === list[i].skuId) {
                list[i].checked = !list[i].checked;
                break;
            }
        }
        this.setState({
            list
        });
        this.init(list);
    }

    /**
     * 是否全选
     */
    isAllSelect() {
        let flag = true;
        let list = this.state.list;
        for (let i = 0; i < list.length; i++) {
            if (!list[i].checked) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    /**
     * 全选
     */
    selectAll() {
        let list = Array.prototype.slice.apply(this.state.list);
        for (let i = 0; i < list.length; i++) {
            list[i].checked = true;
        }
        this.setState({
            list
        });
        this.init(list);
    }

    /**
     * 全不选
     */
    notSelectAll() {
        let list = Array.prototype.slice.apply(this.state.list);
        for (let i = 0; i < list.length; i++) {
            list[i].checked = false;
        }
        this.setState({
            list
        });
        this.init(list);
    }

    /**
     * 添加商品数量
     * @skuId 规格id
     * @goodsNum 选择的商品数量
     * @goodsStore 商品库存
     */
    addGoods(skuId, goodsNum, goodsStore) {
        let list = Array.prototype.slice.apply(this.state.list);
        if (goodsNum < goodsStore) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].skuId === skuId) {
                    list[i].num = ++goodsNum;
                }
            }
        }
        this.setState({
            list
        });
        this.init(list);
    }

    minusGoods(skuId, goodsNum) {
        let num = --goodsNum;
        let list = Array.prototype.slice.apply(this.state.list);
        if (num > 0) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].skuId === skuId) {
                    list[i].num = num;
                }
            }
        }
        this.setState({
            list
        });
        this.init(list);
    }

    /**
     * 购物车删除
     * @cartId 购物车id
     */
    shopCartDelete(cartId) {
        let data = [cartId];
        ToolDps.post('/wx/cart/delete', { cartId: data }).then((res) => {
            if (res.succ) {
                let list = Array.prototype.slice.apply(this.state.list);
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === cartId) {
                        list.splice(i, 1);
                        this.setState({
                            list
                        });
                        this.init(list);
                    }
                }

            }
            // console.log(res);
        });
    }

    /**
     * 立即结算
     */
    send() {
        let list = Array.prototype.slice.apply(this.state.list);
        let data = {
            type: '1',//0:立即购买  1:购物车
            list: []
        };
        for (let i = 0; i < list.length; i++) {
            if (list[i].checked) {
                let obj = {
                    goodsName: list[i].goodsName,//商品名称
                    goodsId: list[i].goodsId,//商品id
                    num: list[i].num,//购物数量
                    skuId: list[i].skuId,//规格ID
                    colorActiveName: list[i].sku.colorName,//颜色名称
                    sizeActiveName: list[i].sku.measurementName,//尺码名称
                    supplierId: list[i].supplierId,//供应商ID
                    goodsImg: list[i].sku.goodsImg.url,//商品图片
                    salePrice: list[i].sku.salePrice,//售价
                };
                data.list.push(obj);
            }

        }
        if (data.list.length === 0) {
            this.setState({
                msgShow: true,
                msgText: '您还没有选择宝贝哦', //提示内容
            });
            return;
        }
        setGoodsInfo(data);
        // console.log(data);
        this.context.router.history.push('/orderConfirm');
    }

    render() {
        let totalPrice = this.calculateTotalPrice();
        let isAll = this.isAllSelect();
        return (
            <section className='full-page shop-cart-page'>
                {
                    this.state.list.length > 0 ? (
                        <ul className='goods-list-area'>
                            {/* <li onTouchStart={this.start.bind(this)}>
                        <span className="icon icon-not-selected"><span className="path1"></span><span className="path2"></span></span>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img sell-out' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
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
                    </li> */}
                            {
                                this.state.list.map((item, index) => {
                                    return (
                                        <li key={index} onTouchStart={this.start.bind(this)}>
                                            {
                                                item.checked ? <span className="icon icon-selected" onClick={this.selectGoods.bind(this, item.skuId)}><span className="path1"></span><span className="path2"></span></span> : <span className="icon icon-not-selected" onClick={this.selectGoods.bind(this, item.skuId)}><span className="path1"></span><span className="path2"></span></span>
                                            }
                                            <ul className='flex-box'>
                                                <li>
                                                    <Link to={'/goodsDetail?id=' + item.goodsId}>
                                                        <div className='goods-img' style={{ backgroundImage: `url(${item.sku.goodsImg.url})` }}></div>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <h4>{item.goodsName}</h4>
                                                    <p className='sku'>{item.sku.colorName}，{item.sku.measurementName}</p>
                                                    <div className='price-area'>
                                                        &yen;{item.sku.salePrice}
                                                        <div className='num-btn-area'>
                                                            <label className='minus' onClick={this.minusGoods.bind(this, item.skuId, item.num)}></label>
                                                            <label className='text'>{item.num}</label>
                                                            <label className='add' onClick={this.addGoods.bind(this, item.skuId, item.num, item.sku.num)}></label>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <button className='btn delete-btn' onClick={this.shopCartDelete.bind(this, item.id)}>删除</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    ) : (
                            <p className='text-center empty-shop-cart'>您的购物车是空的</p>
                        )
                }

                <ul className='flex-box shop-cart-footer'>
                    <li>
                        {
                            isAll ? <span className="icon icon-selected" onClick={this.notSelectAll.bind(this)}><span className="path1"></span><span className="path2"></span></span> : <span className="icon icon-not-selected" onClick={this.selectAll.bind(this)}><span className="path1"></span><span className="path2"></span></span>
                        }
                        &nbsp;全选
                        <label>合计：<span className='price'>&yen;{totalPrice}</span></label>
                    </li>
                    <li>
                        <button className='btn' onClick={this.send.bind(this)}>立即结算</button>
                    </li>
                </ul>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}

ShopCart.contextTypes = {
    router: PropTypes.object.isRequired
}


// export default ShopCart;


export default GetData({
    id: 'ShopCart', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/cart/my',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});