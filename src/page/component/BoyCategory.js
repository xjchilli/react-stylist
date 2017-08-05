/**
 * 类目-男
 */
import React,{Component} from  'react'
import classNames from 'classnames';

class BoyCategory extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectShop:[],//选择的商品 //1:'内衣'2:'饰品' 3:'鞋靴'4:'彩妆'5:'上衣'6:'包袋'7:'裤装'
        }
    }


    setShop(type){
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

    render(){
        return (
            <div  className="category-box">
                <div className="category-item">
                    <div className={this.state.selectShop.indexOf('1') !== -1 ? 'category-icon-box boy active' : 'category-icon-box boy'} onClick={this.setShop.bind(this,'1')}>
                        <img src="/assets/img/category/icon_underwear_boy.jpg" width={35} height={30} alt=""/>
                    </div>
                    <div className={this.state.selectShop.indexOf('2') !== -1 ? 'category-icon-box boy active' : 'category-icon-box boy'} onClick={this.setShop.bind(this,'2')}>
                        <img src="/assets/img/category/icon_jewelry_boy.jpg" width={29} height={37} alt=""/>
                    </div>
                    <div className={this.state.selectShop.indexOf('3') !== -1 ? 'category-icon-box boy active' : 'category-icon-box boy'} onClick={this.setShop.bind(this,'3')}>
                        <img src="/assets/img/category/icon_shoe_boy.jpg" width={38} height={20} alt=""/>
                    </div>
                </div>
                <div  className="category-item">
                    <div className="person-model-show">
                        <img src="/assets/img/category/boy-body.png" className="active" alt=""/>
                        <img src="/assets/img/category/underwear2.png" className={this.state.selectShop.indexOf('1') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/jewelry2.png" className={this.state.selectShop.indexOf('2') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/shoe2.png" className={this.state.selectShop.indexOf('3') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/markup2.png" className={this.state.selectShop.indexOf('4') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/shirt2.png" className={this.state.selectShop.indexOf('5') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/bag2.png" className={this.state.selectShop.indexOf('6') !== -1 ? 'active' : ''} alt=""/>
                        <img src="/assets/img/category/pants2.png" className={this.state.selectShop.indexOf('7') !== -1 ? 'active' : ''} alt=""/>
                    </div>
                </div>
                <div className="category-item">
                    <div className={this.state.selectShop.indexOf('4') !== -1 ? 'category-icon-box boy active' : 'category-icon-box boy'} onClick={this.setShop.bind(this,'4')}>
                        <img src="/assets/img/category/icon_makeup_boy.jpg" width={27} height={38} alt=""/>
                    </div>
                    <div className={this.state.selectShop.indexOf('5') !== -1 ? 'category-icon-box boy active' : 'category-icon-box boy'} onClick={this.setShop.bind(this,'5')}>
                        <img src="/assets/img/category/icon_shirt_boy.jpg" width={35} height={32} alt=""/>
                    </div>
                    <div className={this.state.selectShop.indexOf('6') !== -1 ? 'category-icon-box boy active' : 'category-icon-box boy'} onClick={this.setShop.bind(this,'6')}>
                        <img src="/assets/img/category/icon_bag_boy.jpg" width={35} height={33} alt=""/>
                    </div>
                    <div className={this.state.selectShop.indexOf('7') !== -1 ? 'category-icon-box boy active' : 'category-icon-box boy'} onClick={this.setShop.bind(this,'7')}>
                        <img src="/assets/img/category/icon_pants_boy.jpg" width={25} height={40} alt=""/>
                    </div>

                </div>
            </div>
        )
    }
}


export default BoyCategory;