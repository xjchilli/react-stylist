/**
 * 订单类型
 */
import React from 'react';
import { Link } from 'react-router-dom';


class OrderType extends React.Component {
    render() {
        return (
            <section className='orderType-page'>
                <ul className='text-center'>
                    <li>
                        <Link to='/orderList'>
                            <span className="icon icon-service-order"></span>
                            <br />
                            服务订单
                        </Link>
                    </li>
                    <li>
                        <Link to='/orderListGoods'>
                            <span className="icon icon-goods-order"></span>
                            <br />
                            商品订单
                        </Link>
                    </li>
                </ul>
            </section>
        )
    }
}

export default OrderType;