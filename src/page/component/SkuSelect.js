/**
 * 规格选择
 */
import React from 'react';

class SkuSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectAreaH: window.innerHeight - 28,//sku容器高度
            skuLayoutH: window.innerHeight - 28 - 92,//sku选择区高度
        }
    }
    componentDidMount() {


    }
    render() {
        return (
            <section className='sku-area'>
                <div className='bg' onClick={() => { this.props.close() }}></div>
                <div className='select-area' style={{ maxHeight: this.state.selectAreaH + 'px' }}>
                    <header className='sku-header'>
                        <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/server1.jpg)' }}></div>
                        <p className='price'>&yen;799</p>
                        <p className='store'>库存100件</p>
                        <p>已选择：炫黑，170/85A</p>
                        <span className="icon icon-fault2" onClick={() => { this.props.close() }}></span>
                    </header>
                    <section className='main-layout' style={{ maxHeight: this.state.skuLayoutH + 'px' }}>
                        <h5>颜色</h5>
                        <ul className='my-sku clear'>
                            <li>炫黑</li>
                            <li>炫黑</li>
                            <li>炫黑</li>
                            <li>炫黑</li>
                            <li>炫黑</li>
                        </ul>
                        <h5>尺码</h5>
                        <ul className='my-sku clear'>
                            <li>170/85A</li>
                            <li>170/85A</li>
                            <li>170/85A</li>
                            <li>170/85A</li>
                            <li>170/85A</li>
                        </ul>
                        <div className='num-area'>
                            <span className='num-title'>购买数量</span>
                            <div className='num-btn-area'>
                                <label className='minus'></label>
                                <label className='text'>11</label>
                                <label className='add'></label>
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