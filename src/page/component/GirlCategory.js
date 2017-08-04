/**
 * 类目-女
 */
import React, {
    Component
} from 'react'
import classNames from 'classnames';


class GirlCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectShop:[],//选择的商品 //1:'内衣'2:'饰品'3:'裙装'4:'鞋靴'5:'彩妆'6:'上衣'7:'包袋'8:'裤装'
        }
    }

    setShop(type) {

        let tempShop = Array.prototype.slice.apply(this.state.selectShop);
        let index = tempShop.indexOf(type);
        if (index !== -1) {
            tempShop.splice(index, 1);
        } else {
            tempShop.push(type);
        }
        this.setState({
            selectShop: tempShop
        });
        this.props.getShop(tempShop);

    }


    render() {
        return (
            <div  className="category-box">
                <div className="category-item">
                    <div className={this.state.selectShop.indexOf('1') !== -1 ? 'category-icon-box active' : 'category-icon-box'} onClick={this.setShop.bind(this,'1')}>
                        <img src="/assets/img/category/icon_underwear.jpg" width={33} height={23} alt=""/>
                    </div>
                    <div className={this.state.selectShop.indexOf('2') !== -1 ? 'category-icon-box active' : 'category-icon-box'} onClick={this.setShop.bind(this,'2')}>
                        <img src="/assets/img/category/icon_jewelry.jpg" width={25} height={35} alt=""/>
                    </div>
                    <div className={this.state.selectShop.indexOf('3') !== -1 ? 'category-icon-box active' : 'category-icon-box'} onClick={this.setShop.bind(this,'3')}>
                        <img src="/assets/img/category/icon_skirt.jpg" width={35} height={23} alt=""/>
                    </div>
                    <div className={this.state.selectShop.indexOf('4') !== -1 ? 'category-icon-box active' : 'category-icon-box'} onClick={this.setShop.bind(this,'4')}>
                        <img src="/assets/img/category/icon_shoe.jpg" width={38} height={18} alt=""/>
                    </div>
                </div>
                <div className="category-item">
                    <div className="person-model-show">
                        <img src="/assets/img/category/girl-body.png" className="active" alt=""/>
                        <img src="/assets/img/category/underwear.png" className={this.state.selectShop.indexOf('1') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/jewelry.png" className={this.state.selectShop.indexOf('2') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/skirt.png" className={this.state.selectShop.indexOf('3') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/shoe.png" className={this.state.selectShop.indexOf('4') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/markup.png" className={this.state.selectShop.indexOf('5') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/shirt.png" className={this.state.selectShop.indexOf('6') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/bag.png" className={this.state.selectShop.indexOf('7') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/pants.png" className={this.state.selectShop.indexOf('8') !== -1 ? 'active' : ''} alt=""/>
                    </div>
                </div>
                <div className="category-item">
                    <div className={this.state.selectShop.indexOf('5') !== -1 ? 'category-icon-box active' : 'category-icon-box'} onClick={this.setShop.bind(this,'5')}>
                        <img src="/assets/img/category/icon_makeup.jpg" width={31} height={36} alt=""/>
                    </div>
                    <div className={this.state.selectShop.indexOf('6') !== -1 ? 'category-icon-box active' : 'category-icon-box'} onClick={this.setShop.bind(this,'6')}>
                        <img src="/assets/img/category/icon_shirt.jpg" width={35} height={27} alt=""/>
                    </div>
                    <div className={this.state.selectShop.indexOf('7') !== -1 ? 'category-icon-box active' : 'category-icon-box'} onClick={this.setShop.bind(this,'7')}>
                        <img src="/assets/img/category/icon_bag.jpg" width={27} height={27} alt=""/>
                    </div>
                    <div className={this.state.selectShop.indexOf('8') !== -1 ? 'category-icon-box active' : 'category-icon-box'} onClick={this.setShop.bind(this,'8')}>
                        <img src="/assets/img/category/icon_pants.jpg" width={24} height={40} alt=""/>
                    </div>

                </div>
            </div>
        )
    }
}

export default GirlCategory;