/**
 *
 * 搭配场景
 * Created by potato on 2017/4/27 0027.
 */
import React,{Component} from  'react'
import classNames from 'classnames';


class MatchScene extends Component{
    constructor(props){
        super(props);
        this.state={
            party:false,//宴会
            home:false,//居家
            date:false,//约会
            commerce:false,//办公
            wedding:false,//婚礼
            shopping:false,//购物
            sport:false,//运动
        }
    }

    componentDidMount(){
        new Swiper('.J-place', {
            slidesPerView : 4,
        });
    }

    setScene(type){
        this.setState({
            [type]:!this.state[type]
        });
        let newState=this.state;
        newState[type]=!newState[type];
        let sceneArr = [];
        if(newState.party){
            sceneArr.push('1');
        }

        if(newState.home){
            sceneArr.push('2');
        }

        if(newState.date){
            sceneArr.push('3');
        }

        if(newState.commerce){
            sceneArr.push('4');
        }

        if(newState.wedding){
            sceneArr.push('5');
        }

        if(newState.shopping){
            sceneArr.push('6');
        }

        if(newState.sport){
            sceneArr.push('7');
        }


        this.props.getScene(sceneArr);

    }


    render(){
        let sport = classNames('icon-box',{
            'active':this.state.sport
        });
        let party = classNames('icon-box',{
            'active':this.state.party
        });
        let shopping = classNames('icon-box',{
            'active':this.state.shopping
        });
        let commerce = classNames('icon-box',{
            'active':this.state.commerce
        });
        let date = classNames('icon-box',{
            'active':this.state.date
        });
        let home = classNames('icon-box',{
            'active':this.state.home
        });
        let wedding = classNames('icon-box',{
            'active':this.state.wedding
        });
        return (
            <div className="swiper-container swiper-box J-place">
                <div className="swiper-wrapper">
                    <div className="swiper-slide" >
                        <div className={party}   onClick={this.setScene.bind(this,'party')}>
                            <img src="/assets/img/icon_party.jpg" alt="" width={50} height={50}/>
                            <span>宴会</span>
                        </div>
                    </div>
                    <div className="swiper-slide" >
                        <div className={home}  onClick={this.setScene.bind(this,'home')}>
                            <img src="/assets/img/icon_home.jpg" alt="" width={50} height={50}/>
                            <span>居家</span>
                        </div>
                    </div>
                    <div className="swiper-slide" >
                        <div className={date}   onClick={this.setScene.bind(this,'date')}>
                            <img src="/assets/img/icon_date.jpg" alt="" width={50} height={50}/>
                            <span>约会</span>
                        </div>
                    </div>
                    <div className="swiper-slide" >
                        <div className={commerce}   onClick={this.setScene.bind(this,'commerce')}>
                            <img src="/assets/img/icon_commerce.jpg" alt="" width={50} height={50}/>
                            <span>办公</span>
                        </div>
                    </div>
                    <div className="swiper-slide" >
                        <div className={wedding}   onClick={this.setScene.bind(this,'wedding')}>
                            <img src="/assets/img/icon_wedding.jpg" alt="" width={50} height={50}/>
                            <span>婚礼</span>
                        </div>
                    </div>
                    <div className="swiper-slide" >
                        <div className={shopping}  onClick={this.setScene.bind(this,'shopping')}>
                            <img src="/assets/img/icon_shopping.jpg" alt="" width={50} height={50}/>
                            <span>购物</span>
                        </div>
                    </div>
                    <div className="swiper-slide" >
                        <div className={sport}   onClick={this.setScene.bind(this,'sport')}>
                            <img src="/assets/img/icon_sports.jpg" alt="" width={50} height={50}/>
                            <span>运动</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MatchScene;