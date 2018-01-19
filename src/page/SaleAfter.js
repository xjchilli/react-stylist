/**
 * 申请售后
 */
import React from 'react';
import { Link } from 'react-router-dom';

class SaleAfter extends React.Component {
    componentDidMount() {
        document.title = '选择服务类型';
    }


    render() {
        return (
            <section className='full-page service-type-page'>
                <ul className='goods-list-area'>
                    <li>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className='type-select-area'>
                    <li>
                        <Link to='/applyChangeGoods'>
                            <h5>直接换货</h5>
                            <p>已收到货，需要退换已收到的货物</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/applyReturnsAndRefunds'>
                            <h5>退货退款</h5>
                            <p>与卖家协商一致的前提下</p>
                        </Link>
                    </li>
                </ul>

            </section>
        )
    }
}

export default SaleAfter;