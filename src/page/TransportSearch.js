/**
 * 物流查询
 */

import React from 'react';

class TransportSearch extends React.Component {
    render() {
        return (
            <section className='full-page transport-search-page'>
                <header>
                    韵达快递：3813930400617
                </header>
                <ul className='step-area'>
                    <li className='end'>
                        <span className='circle'></span>
                        <p className='desc'>您已签收本次订单包裹，本次配送完成。感谢您在Ms搭配师平台购物，祝您生活愉快</p>
                        <time>2018-1-30  14:53:00</time>
                    </li>
                    <li>
                        <p className='desc'>派送中，您的订单正在派送途中，快递员叶豪正在为您派送。叶豪13588888888</p>
                        <time>2018-1-30  14:53:00</time>
                    </li>
                    <li>
                        <p className='desc'>您的快件已到达【杭州晴川站】</p>
                        <time>2018-1-30  14:53:00</time>
                    </li>
                    <li>
                        <p className='desc'>已取件。您的订单已经出库</p>
                        <time>2018-1-30  14:53:00</time>
                    </li>
                </ul>
            </section>
        )
    }
}


export default TransportSearch;