/**
 * 类目-女
 */
import React,{Component} from  'react'
import classNames from 'classnames';


class GirlCategory extends Component{
    constructor(props) {
        super(props);
        this.state = {
            //1:'内衣'2:'饰品'3:'裙装'4:'鞋靴'5:'彩妆'6:'上衣'7:'包袋'8:'裤装'
            girlCategory1:false,//内衣
            girlCategory2:false,//饰品
            girlCategory3:false,//裙装
            girlCategory4:false,//鞋靴
            girlCategory5:false,//彩妆
            girlCategory6:false,//上衣
            girlCategory7:false,//包袋
            girlCategory8:false,//裤装
        }
    }

    setShop(type){
        this.setState({
            [type]:!this.state[type]
        });
        let newState=this.state;
        newState[type]=!newState[type];
        let shop = [];

        if(newState.girlCategory1){
            shop.push('1');
        }

        if(newState.girlCategory2){
            shop.push('2');
        }

        if(newState.girlCategory3){
            shop.push('3');
        }

        if(newState.girlCategory4){
            shop.push('4');
        }

        if(newState.girlCategory5){
            shop.push('5');
        }

        if(newState.girlCategory6){
            shop.push('6');
        }

        if(newState.girlCategory7){
            shop.push('7');
        }

        if(newState.girlCategory8){
            shop.push('8');
        }


        this.props.getShop(shop);

    }


    render(){
        let girlCategory1 = classNames('category-icon-box',{
            'active':this.state.girlCategory1
        });
        let girlCategoryImg1 = classNames({
            'active':this.state.girlCategory1
        });

        let girlCategory2 = classNames('category-icon-box',{
            'active':this.state.girlCategory2
        });
        let girlCategoryImg2 = classNames({
            'active':this.state.girlCategory2
        });
        let girlCategory3 = classNames('category-icon-box',{
            'active':this.state.girlCategory3
        });
        let girlCategoryImg3 = classNames({
            'active':this.state.girlCategory3
        });
        let girlCategory4 = classNames('category-icon-box',{
            'active':this.state.girlCategory4
        });

        let girlCategoryImg4 = classNames({
            'active':this.state.girlCategory4
        });

        let girlCategory5 = classNames('category-icon-box',{
            'active':this.state.girlCategory5
        });

        let girlCategory6 = classNames('category-icon-box',{
            'active':this.state.girlCategory6
        });
        let girlCategoryImg6 = classNames({
            'active':this.state.girlCategory6
        });
        let girlCategory7 = classNames('category-icon-box',{
            'active':this.state.girlCategory7
        });
        let girlCategoryImg7 = classNames({
            'active':this.state.girlCategory7
        });
        let girlCategory8 = classNames('category-icon-box',{
            'active':this.state.girlCategory8
        });
        let girlCategoryImg8 = classNames({
            'active':this.state.girlCategory8
        });

        return (
            <div  className="category-box">
                <div className="category-item">
                    <div className={girlCategory1} onClick={this.setShop.bind(this,'girlCategory1')}>
                        <img src="/assets/img/category/icon_underwear.jpg" width={33} height={23} alt=""/>
                    </div>
                    <div className={girlCategory2} onClick={this.setShop.bind(this,'girlCategory2')}>
                        <img src="/assets/img/category/icon_jewelry.jpg" width={20} height={29} alt=""/>
                    </div>
                    <div className={girlCategory3} onClick={this.setShop.bind(this,'girlCategory3')}>
                        <img src="/assets/img/category/icon_skirt.jpg" width={35} height={23} alt=""/>
                    </div>
                    <div className={girlCategory4} onClick={this.setShop.bind(this,'girlCategory4')}>
                        <img src="/assets/img/category/icon_shoe.jpg" width={38} height={18} alt=""/>
                    </div>
                </div>
                <div ref='test' className="category-item">
                    <div className="person-model-show">
                        <img src="/assets/img/category/girl-body.png" className="active" alt=""/>
                        <img src="/assets/img/category/underwear.png" className={girlCategoryImg1} alt=""/>
                        <img src="/assets/img/category/jewelry.png" className={girlCategoryImg2} alt=""/>
                        <img src="/assets/img/category/skirt.png" className={girlCategoryImg3} alt=""/>
                        <img src="/assets/img/category/shoe.png" className={girlCategoryImg4} alt=""/>
                        <img src="/assets/img/category/shirt.png" className={girlCategoryImg6} alt=""/>
                        <img src="/assets/img/category/bag.png" className={girlCategoryImg7} alt=""/>
                        <img src="/assets/img/category/pants.png" className={girlCategoryImg8} alt=""/>
                    </div>
                </div>
                <div className="category-item">
                    <div className={girlCategory5} onClick={this.setShop.bind(this,'girlCategory5')}>
                        <img src="/assets/img/category/icon_makeup.jpg" width={14} height={33} alt=""/>
                    </div>
                    <div className={girlCategory6} onClick={this.setShop.bind(this,'girlCategory6')}>
                        <img src="/assets/img/category/icon_shirt.jpg" width={35} height={27} alt=""/>
                    </div>
                    <div className={girlCategory7} onClick={this.setShop.bind(this,'girlCategory7')}>
                        <img src="/assets/img/category/icon_bag.jpg" width={27} height={27} alt=""/>
                    </div>
                    <div className={girlCategory8} onClick={this.setShop.bind(this,'girlCategory8')}>
                        <img src="/assets/img/category/icon_pants.jpg" width={24} height={40} alt=""/>
                    </div>

                </div>
            </div>
        )
    }
}

export default GirlCategory;