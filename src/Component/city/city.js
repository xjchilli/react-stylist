/***
 * 选择城市
 *
 * usage：
 * //没有默认值
 * <City >
 * //有默认值
 * <City defaultProvince="330000" defaultCity="330100" defaultArea="330106"  getCity={this.getCity.bind(this)}/>
 *
 */
import React, { Component, PropTypes } from 'react';
import {DataLoad} from '../../Component/index';
import {ToolDps} from  '../../ToolDps';
import classNames from 'classnames';


class City extends Component{
    constructor(props){
        super(props);
        this.state={
            loadAnimation: true, //默认显示加载动画
            loadMsg: '正在加载中',
            pickCity:false,
            data:[],
            currProvince:this.props.defaultProvince,//当前省
            currCity:this.props.defaultCity,//当前市
            currArea:this.props.defaultArea,//当前区
            provinceName:'',//省名称
            cityName:'',//市名称
            areaName:'',//区名称
        };
        this.readyDom=()=>{
            let self=this;
            //省
            self.swiperProvince=new Swiper(self.refs.JProvince, {
                                direction : 'vertical',
                                slidesPerView : 5,
                                centeredSlides : true,
                                onTap:(swiper)=>{//点击slide
                                    swiper.slideTo(swiper.clickedIndex,100,true);
                                },
                                onSlideChangeEnd:(swiper)=> {//slide改变
                                    let activeEle=swiper.slides[swiper.activeIndex];
                                    if(!activeEle){return}
                                    let provinceCode=activeEle.getAttribute('data-code');
                                    self.swiperCity.removeAllSlides(); //移除城市
                                    self.swiperArea.removeAllSlides();//移除区
                                    self.switch(provinceCode);
                                }
                            });
            //市
            self.swiperCity = new Swiper(self.refs.JCity, {
                            direction : 'vertical',
                            slidesPerView : 5,
                            centeredSlides : true,
                            onTap:(swiper)=>{//点击slide
                                swiper.slideTo(swiper.clickedIndex,100,true);
                            },
                            onSlideChangeEnd:(swiper)=> {//slide改变
                                let provinceActiveEle=self.swiperProvince.slides[self.swiperProvince.activeIndex];
                                let activeEle=swiper.slides[swiper.activeIndex];
                                if(!activeEle){return}
                                let provinceCode=provinceActiveEle.getAttribute('data-code');
                                let cityCode=activeEle.getAttribute('data-code');
                                self.swiperArea.removeAllSlides();//移除区
                                self.switch(provinceCode,cityCode);
                            }
                        });
            //区
            self.swiperArea=new Swiper(self.refs.JArea, {
                            direction : 'vertical',
                            slidesPerView : 5,
                            centeredSlides : true,
                            onTap:(swiper)=>{//点击slide
                                swiper.slideTo(swiper.clickedIndex,100,true);
                            },
                        });

            ToolDps.get('/assets/json/city.json').then((data)=>{
                let city=[];
                let area=[];
                let provinceName='';//省名称
                let cityName='';//市名称
                let areaName='';//区名称
                for(let i=0;i<data.length;i++){
                    if(!self.state.currProvince){
                        city=data[0].sub;
                        break;
                    }
                    if(data[i].code === self.state.currProvince){
                        city=data[i].sub;
                        break;
                    }
                }

                for(let j=0;j<city.length;j++){
                    if(!self.state.currCity){
                        area=city[0].sub;
                        break;
                    }
                    if(city[j].code === self.state.currCity){
                        area=city[j].sub;
                        break;
                    }
                }

                for(let i=0;i<data.length;i++){
                    self.swiperProvince.appendSlide('<div class="swiper-slide" data-code='+data[i].code+'>'+data[i].name+'</div>');
                    if(data[i].code === self.state.currProvince){
                        provinceName=data[i].name;
                        self.swiperProvince.slideTo(i,1000,false);
                    }
                }
                for(let i=0;i<city.length;i++){
                    self.swiperCity.appendSlide('<div class="swiper-slide" data-code='+city[i].code+'>'+city[i].name+'</div>');
                    if(city[i].code === self.state.currCity){
                        cityName=city[i].name;
                        self.swiperCity.slideTo(i,1000,false);
                    }
                }
                for(let i=0;i<area.length;i++){
                    self.swiperArea.appendSlide('<div class="swiper-slide" data-code='+area[i].code+'>'+area[i].name+'</div>');
                    if(area[i].code === self.state.currArea){
                        areaName=area[i].name;
                        self.swiperArea.slideTo(i,1000,false);
                    }
                }

                if(self.state.currProvince && self.state.currCity && self.state.currArea){
                    self.setState({
                        data:data,
                        loadAnimation: false, //默认显示加载动画
                        loadMsg: '加载完成',
                        provinceName:provinceName,//省名称
                        cityName:cityName,//市名称
                        areaName:areaName,//区名称
                    });
                }else{
                    self.setState({
                        loadAnimation: false, //默认显示加载动画
                        loadMsg: '加载完成',
                        data:data
                    });
                }
            });


        };

        //切换省/市
        this.switch=(provinceCode,cityCode)=>{
            let currCity='';
            let currArea='';
            let cityArr=[];
            let areaArr=[];
            for(let i=0;i<this.state.data.length;i++){
                if(this.state.data[i].code === provinceCode){
                    cityArr=this.state.data[i].sub;
                    areaArr=cityArr[0].sub;
                    currCity=cityArr[0].code;
                    for(let j=0;j<cityArr.length;j++){
                        if(cityCode && cityArr[j].code === cityCode){
                            areaArr=cityArr[j].sub;
                            currCity=cityCode;
                        }
                        this.swiperCity.appendSlide('<div class="swiper-slide" data-code='+cityArr[j].code+'>'+cityArr[j].name+'</div>');
                    }
                    for(let k=0;k<areaArr.length;k++){
                        this.swiperArea.appendSlide('<div class="swiper-slide" data-code='+areaArr[k].code+'>'+areaArr[k].name+'</div>');
                    }

                    currArea=areaArr[0].code;
                    break;
                }
            }

        };
        //关闭弹窗
        this.closeWindow=()=>{
            this.setState({
                pickCity:false
            });
        }
        //显示弹窗
        this.showWindow=()=>{
           this.setState({
               pickCity:true
           });
        }
        //确定
        this.sureBtn=()=>{
            let provinceEle=this.refs.JProvince.querySelector('.swiper-slide-active');
            let cityEle=this.refs.JCity.querySelector('.swiper-slide-active');
            let areaEle=this.refs.JArea.querySelector('.swiper-slide-active');
            let provinceCode = provinceEle.getAttribute('data-code');
            let provinceName = provinceEle.textContent;
            let cityCode = cityEle.getAttribute('data-code');
            let cityName = cityEle.textContent;
            let areaCode = areaEle.getAttribute('data-code');
            let areaName = areaEle.textContent;
            this.setState({
                pickCity:false,
                currProvince:provinceCode,
                currCity:cityCode,
                currArea:areaCode,
                provinceName:provinceName,//省名称
                cityName:cityName,//市名称
                areaName:areaName,//区名称
            });

            this.props.getCity ?  this.props.getCity({
                currProvince:provinceCode,
                currCity:cityCode,
                currArea:areaCode,
                provinceName:provinceName,//省名称
                cityName:cityName,//市名称
                areaName:areaName,//区名称
            }) : null;
        }
    }

    componentDidMount(){
        this.readyDom();
    }

    render(){
        let pickCity = classNames('pick-city-area',{
            'active':this.state.pickCity
        });


        return (
            <div className="item">
                <input id="city" type="text"  data-province={this.state.currProvince} data-city={this.state.currCity} data-area={this.state.currArea}  value={this.state.provinceName+this.state.cityName+this.state.areaName} readOnly={true}  placeholder={this.props.placeholderText} onClick={this.showWindow.bind(this)} onFocus={(e)=>{e.target.blur()}}/>
                <div className={pickCity}>
                    <div className="select-city-area" >
                        <div className="city-area">
                            {
                                this.state.data.length === 0 ? <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} /> : null
                            }
                            <div className="city-item">
                                <div ref='JProvince' className="swiper-container">
                                    <div className="swiper-wrapper">
                                    </div>
                                </div>
                            </div>
                            <div className="city-item">
                                <div ref='JCity' className="swiper-container J-city">
                                    <div className="swiper-wrapper">
                                    </div>
                                </div>
                            </div>
                            <div className="city-item">
                                <div ref='JArea' className="swiper-container J-area">
                                    <div className="swiper-wrapper">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="action-area">
                            <button onClick={this.closeWindow}>取消</button>
                            <button onClick={this.sureBtn}>确定</button>
                        </div>
                </div>
                </div>
            </div>
        )
    }

}

City.defaultProps={
   placeholderText:'请选择城市'//input placeholder属性默认值
}
export default City;