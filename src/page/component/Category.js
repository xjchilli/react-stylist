/**
 * 类目-男
 */
import React, { Component } from 'react'
import classNames from 'classnames';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: props.sex,
            girlShop: [{ url: '/assets/img/match/shop-1-1.jpg', name: '内衣' }, { url: '/assets/img/match/shop-1-2.jpg', name: '饰品' }, { url: '/assets/img/match/shop-1-3.jpg', name: '裙子' }, { url: '/assets/img/match/shop-1-4.jpg', name: '鞋靴' }, { url: '/assets/img/match/shop-1-5.jpg', name: '彩妆' }, { url: '/assets/img/match/shop-1-6.jpg', name: '上衣' }, { url: '/assets/img/match/shop-1-7.jpg', name: '包包' }, { url: '/assets/img/match/shop-1-8.jpg', name: '裤子' }],
            boyShop: [{ url: '/assets/img/match/shop-2-1.jpg', name: '内衣' }, { url: '/assets/img/match/shop-2-2.jpg', name: '饰品' }, { url: '/assets/img/match/shop-2-3.jpg', name: '鞋靴' }, { url: '/assets/img/match/shop-2-4.jpg', name: '彩妆' }, { url: '/assets/img/match/shop-2-5.jpg', name: '上衣' }, { url: '/assets/img/match/shop-2-6.jpg', name: '包包' }, { url: '/assets/img/match/shop-2-7.jpg', name: '裤子' }],
            shops: []//选择的场景
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sex != this.state.sex) {
            this.setState({
                sex:nextProps.sex,
                shops:[]
            });
            this.props.getShop([]);
        }
    }

    select(type) {
        let tempShop = Array.prototype.slice.apply(this.state.shops);
        let index = tempShop.indexOf(type);
        if (index !== -1) {
            tempShop.splice(index, 1);
        } else {
            tempShop.push(type);
        }
        this.setState({
            shops: tempShop
        });
        this.props.getShop(tempShop);
    }

    render() {
        let { sex } = this.props;
        let shops = [];
        if (sex === 1) {//男
            shops = this.state.boyShop;
        } else {//女
            shops = this.state.girlShop;
        }
        return (
            <ul className="shop-list clear">
                {
                    shops.map((item,index) => {
                        return (
                            <li className={this.state.shops.indexOf(index + 1 + '') !== -1 ? 'active' : ''} key={index}  onClick={this.select.bind(this, index + 1 + '')}>
                                <img src={item.url} />
                                <p>{item.name}</p>
                                <span className="icon icon-sure"><span className="path1"></span><span className="path2"></span></span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}


export default Category;