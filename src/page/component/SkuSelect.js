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
                <div className='bg'></div>
                <div className='select-area' style={{ maxHeight: this.state.selectAreaH + 'px' }}>
                    <header className='sku-header'>
                        <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/server1.jpg)' }}></div>
                        <p className='price'>&yen;799</p>
                        <p className='store'>库存100件</p>
                        <p>已选择：炫黑，170/85A</p>
                        <span className="icon icon-fault2"></span>
                    </header>
                    <section className='main-layout' style={{ maxHeight: this.state.skuLayoutH + 'px' }}>
                        <h5>颜色</h5>
                        <ul className='color-area clear'>
                            <li>炫黑</li>
                            <li>炫黑</li>
                            <li>炫黑</li>
                            <li>炫黑</li>
                            <li>炫黑</li>
                        </ul>
                    </section>
                </div>
            </section>
        )
    }
}

export default SkuSelect;