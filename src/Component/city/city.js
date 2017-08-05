/***
 * 选择城市
 *
 * usage：
 * 
 * //有默认值 浙江省杭州市西湖区
 * <City defaultProvince="330000" defaultCity="330100" defaultArea="330106"  getCity={this.getCity.bind(this)} close={()=>{this.setState({cityShow:false})}}/>
 *
 */
import React, {
    Component
} from 'react';
import {
    DataLoad
} from '../../Component/index';
import {
    ToolDps
} from '../../ToolDps';



class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadAnimation: true, //默认显示加载动画
            loadMsg: '正在加载中',
            pickCity: false,
            data: [],
            currProvince: props.defaultProvince, //当前省
            currCity: props.defaultCity, //当前市
            currArea: props.defaultArea, //当前区
        };
        this.readyDom = () => {
            let self = this;
            //省
            self.swiperProvince = new Swiper(self.refs.JProvince, {
                direction: 'vertical',
                slidesPerView: 5,
                centeredSlides: true,
                onTap: (swiper) => { //点击slide
                    swiper.slideTo(swiper.clickedIndex, 100, true);
                },
                onSlideChangeEnd: (swiper) => { //slide改变
                    let activeEle = swiper.slides[swiper.activeIndex];
                    if (!activeEle) {
                        return
                    }
                    let provinceCode = activeEle.getAttribute('data-code');
                    self.swiperCity.removeAllSlides(); //移除城市
                    self.swiperArea.removeAllSlides(); //移除区
                    self.switch(provinceCode);
                }
            });
            //市
            self.swiperCity = new Swiper(self.refs.JCity, {
                direction: 'vertical',
                slidesPerView: 5,
                centeredSlides: true,
                onTap: (swiper) => { //点击slide
                    swiper.slideTo(swiper.clickedIndex, 100, true);
                },
                onSlideChangeEnd: (swiper) => { //slide改变
                    let provinceActiveEle = self.swiperProvince.slides[self.swiperProvince.activeIndex];
                    let activeEle = swiper.slides[swiper.activeIndex];
                    if (!activeEle) {
                        return
                    }
                    let provinceCode = provinceActiveEle.getAttribute('data-code');
                    let cityCode = activeEle.getAttribute('data-code');
                    self.swiperArea.removeAllSlides(); //移除区
                    self.switch(provinceCode, cityCode);
                }
            });
            //区
            self.swiperArea = new Swiper(self.refs.JArea, {
                direction: 'vertical',
                slidesPerView: 5,
                centeredSlides: true,
                onTap: (swiper) => { //点击slide
                    swiper.slideTo(swiper.clickedIndex, 100, true);
                },
            });

            let cityData = ToolDps.localItem('cityData');
            if (cityData) {
                this.initSwiper(JSON.parse(cityData));
            } else {
                ToolDps.get('/assets/json/city.json').then((data) => {
                    ToolDps.localItem('cityData', JSON.stringify(data));
                    this.initSwiper(data);
                });
            }

        };

        //切换省/市
        this.switch = (provinceCode, cityCode) => {
            let currCity = '';
            let currArea = '';
            let cityArr = [];
            let areaArr = [];
            for (let i = 0; i < this.state.data.length; i++) {
                if (this.state.data[i].code === provinceCode) {
                    cityArr = this.state.data[i].sub;
                    areaArr = cityArr[0].sub;
                    currCity = cityArr[0].code;
                    for (let j = 0; j < cityArr.length; j++) {
                        if (cityCode && cityArr[j].code === cityCode) {
                            areaArr = cityArr[j].sub;
                            currCity = cityCode;
                        }
                        if (provinceCode && !cityCode) {
                            this.swiperCity.appendSlide('<div class="swiper-slide" data-code=' + cityArr[j].code + '>' + cityArr[j].name + '</div>');
                        }

                    }
                    for (let k = 0; k < areaArr.length; k++) {
                        this.swiperArea.appendSlide('<div class="swiper-slide" data-code=' + areaArr[k].code + '>' + areaArr[k].name + '</div>');
                    }

                    currArea = areaArr[0].code;
                    break;
                }
            }

        };

        this.initSwiper = (data) => {
            let self = this;
            let city = [];
            let area = [];
            for (let i = 0; i < data.length; i++) {
                if (!self.state.currProvince) {
                    city = data[0].sub;
                    break;
                }
                if (data[i].code === self.state.currProvince) {
                    city = data[i].sub;
                    break;
                }
            }

            for (let j = 0; j < city.length; j++) {
                if (!self.state.currCity) {
                    area = city[0].sub;
                    break;
                }
                if (city[j].code === self.state.currCity) {
                    area = city[j].sub;
                    break;
                }
            }

            for (let i = 0; i < data.length; i++) {
                self.swiperProvince.appendSlide('<div class="swiper-slide" data-code=' + data[i].code + '>' + data[i].name + '</div>');
                if (data[i].code === self.state.currProvince) {
                    self.swiperProvince.slideTo(i, 100, false);
                }
            }
            for (let i = 0; i < city.length; i++) {
                self.swiperCity.appendSlide('<div class="swiper-slide" data-code=' + city[i].code + '>' + city[i].name + '</div>');
                if (city[i].code === self.state.currCity) {
                    self.swiperCity.slideTo(i, 100, false);
                }
            }
            for (let i = 0; i < area.length; i++) {
                self.swiperArea.appendSlide('<div class="swiper-slide" data-code=' + area[i].code + '>' + area[i].name + '</div>');
                if (area[i].code === self.state.currArea) {
                    self.swiperArea.slideTo(i, 100, false);
                }
            }
            self.setState({
                data: data,
                loadAnimation: false, //默认显示加载动画
                loadMsg: '加载完成'
            });
        }



        //确定
        this.sureBtn = () => {
            let provinceEle = this.refs.JProvince.querySelector('.swiper-slide-active');
            let cityEle = this.refs.JCity.querySelector('.swiper-slide-active');
            let areaEle = this.refs.JArea.querySelector('.swiper-slide-active');
            let provinceCode = provinceEle.getAttribute('data-code');
            let provinceName = provinceEle.textContent;
            let cityCode = cityEle.getAttribute('data-code');
            let cityName = cityEle.textContent;
            let areaCode = areaEle.getAttribute('data-code');
            let areaName = areaEle.textContent;
            this.setState({
                currProvince: provinceCode,
                currCity: cityCode,
                currArea: areaCode
            });

            this.props.getCity ? this.props.getCity({
                currProvince: provinceCode,
                currCity: cityCode,
                currArea: areaCode,
                provinceName: provinceName, //省名称
                cityName: cityName, //市名称
                areaName: areaName, //区名称
            }) : null;
        }
    }

    componentDidMount() {
        this.readyDom();
    }

    render() {
        return (
            <div className="item">
                <div className='pick-city-area'>
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
                            <button onClick={this.props.close}>取消</button>
                            <button onClick={this.sureBtn}>确定</button>
                        </div>
                </div>
                </div>
            </div>
        )
    }

}

export default City;