/**
 * 类目-男
 */
import React,{Component} from  'react'
import classNames from 'classnames';

class BoyCategory extends Component{
    constructor(props) {
        super(props);
        this.state = {
            //1:'内衣'2:'饰品'3:'裙装'4:'鞋靴'5:'彩妆'6:'上衣'7:'包袋'8:'裤装'
            boyCategory1:false,
            boyCategory2:false,
            boyCategory4:false,
            boyCategory5:false,
            boyCategory6:false,
            boyCategory7:false,
            boyCategory8:false,
        }
    }


    setShop(type){
        this.setState({
            [type]:!this.state[type]
        });
        let newState=this.state;
        newState[type]=!newState[type];
        let shop = [];
        if(newState.boyCategory1){
            shop.push('1');
        }

        if(newState.boyCategory2){
            shop.push('2');
        }


        if(newState.boyCategory4){
            shop.push('4');
        }

        if(newState.boyCategory5){
            shop.push('5');
        }

        if(newState.boyCategory6){
            shop.push('6');
        }

        if(newState.boyCategory7){
            shop.push('7');
        }

        if(newState.boyCategory8){
            shop.push('8');
        }

        this.props.getShop(shop);
    }


    render(){
        let boyCategory1 = classNames('category-icon-box',{
            'active':this.state.boyCategory1
        });
        let boyCategoryImg1 = classNames({
            'active':this.state.boyCategory1
        });

        let boyCategory2 = classNames('category-icon-box',{
            'active':this.state.boyCategory2
        });
        let boyCategoryImg2 = classNames({
            'active':this.state.boyCategory2
        });
        let boyCategory4 = classNames('category-icon-box',{
            'active':this.state.boyCategory4
        });

        let boyCategoryImg4 = classNames({
            'active':this.state.boyCategory4
        });

        let boyCategory5 = classNames('category-icon-box',{
            'active':this.state.boyCategory5
        });

        let boyCategory6 = classNames('category-icon-box',{
            'active':this.state.boyCategory6
        });
        let boyCategoryImg6 = classNames({
            'active':this.state.boyCategory6
        });
        let boyCategory7 = classNames('category-icon-box',{
            'active':this.state.boyCategory7
        });
        let boyCategoryImg7 = classNames({
            'active':this.state.boyCategory7
        });
        let boyCategory8 = classNames('category-icon-box',{
            'active':this.state.boyCategory8
        });
        let boyCategoryImg8 = classNames({
            'active':this.state.boyCategory8
        });

        return (
            <div  className="category-box">
                <div className="category-item">
                    <div className={boyCategory1} onClick={this.setShop.bind(this,'boyCategory1')}>
                        <img src="/assets/img/category/icon_underwear.jpg" width={33} height={23} alt=""/>
                    </div>
                    <div className={boyCategory2} onClick={this.setShop.bind(this,'boyCategory2')}>
                        <img src="/assets/img/category/icon_jewelry.jpg" width={20} height={29} alt=""/>
                    </div>
                    <div className={boyCategory4} onClick={this.setShop.bind(this,'boyCategory4')}>
                        <img src="/assets/img/category/icon_shoe.jpg" width={38} height={18} alt=""/>
                    </div>
                </div>
                <div ref='test' className="category-item">
                    <div className="person-model-show">
                        <img src="/assets/img/category/boy-body.png" className="active" alt=""/>
                        <img src="/assets/img/category/underwear2.png" className={boyCategoryImg1} alt=""/>
                        <img src="/assets/img/category/jewelry2.png" className={boyCategoryImg2} alt=""/>
                        <img src="/assets/img/category/shoe2.png" className={boyCategoryImg4} alt=""/>
                        <img src="/assets/img/category/shirt2.png" className={boyCategoryImg6} alt=""/>
                        <img src="/assets/img/category/bag2.png" className={boyCategoryImg7} alt=""/>
                        <img src="/assets/img/category/pants2.png" className={boyCategoryImg8} alt=""/>
                    </div>
                </div>
                <div className="category-item">
                    <div className={boyCategory5} onClick={this.setShop.bind(this,'boyCategory5')}>
                        <img src="/assets/img/category/icon_makeup.jpg" width={14} height={33} alt=""/>
                    </div>
                    <div className={boyCategory6} onClick={this.setShop.bind(this,'boyCategory6')}>
                        <img src="/assets/img/category/icon_shirt.jpg" width={35} height={27} alt=""/>
                    </div>
                    <div className={boyCategory7} onClick={this.setShop.bind(this,'boyCategory7')}>
                        <img src="/assets/img/category/icon_bag.jpg" width={27} height={27} alt=""/>
                    </div>
                    <div className={boyCategory8} onClick={this.setShop.bind(this,'boyCategory8')}>
                        <img src="/assets/img/category/icon_pants.jpg" width={24} height={40} alt=""/>
                    </div>

                </div>
            </div>
        )
    }
}


export default BoyCategory;