/**
 * 日期时间插件
 */
import React from 'react';

class MyDate extends React.Component {
    constructor(props) {
        super(props);
        let {
            defaultDate, //默认日期
            startDate //开始日期
        } = props.option;
        let initDate = defaultDate ? new Date(defaultDate) : new Date();//初始化时间
        let startD = startDate ? new Date(startDate) : null;//开始时间
        if (startD && startD.getTime() > initDate.getTime()) {//开始日期在初始化日期后面则（初始化时间=开始时间）
            initDate = startD;
        }
        let year = initDate.getFullYear();//年
        let month = initDate.getMonth() + 1;//月
        let day = initDate.getDate();//日
        // console.log(year, month, day);
        this.state = {
            initDate: initDate,//初始化时间
            startD: startD,//开始时间
            year: year,//当前年
            month: month,//当前月
            day: day,//当前日
            yearArr: this.getYears(year, startD) || [],//年初始化数据
            monthArr: this.getMonths(year, startD),//月初始化数据
            dayArr: this.getDayData(year, month, startD) || [],//日初始化数据
            timeText: year + '-' + month + '-' + day//显示的时间
        }
    }

    componentDidMount() {
        this.swiperYear = new Swiper(this.year, {
            initialSlide: this.state.yearArr.indexOf(this.state.year),
            direction: 'vertical',
            slidesPerView: 5,
            centeredSlides: true,
            onTap: (swiper) => { //点击slide
                swiper.slideTo(swiper.clickedIndex, 100, true);
            },
            onSlideChangeEnd: (swiper) => { //slide改变
                let activeEle = swiper.slides[swiper.activeIndex];
                // console.log(activeEle);
                if (!activeEle) {
                    return
                }
                let year = Number(activeEle.getAttribute('data-code'));
                this.setState({
                    year: year,
                    monthArr: this.getMonths(year, this.state.startD),
                    dayArr: this.getDayData(year, this.state.month, this.state.startD),
                    timeText: year + '-' + this.state.month + '-' + this.state.day
                });
            }
        });
        this.swiperMonth = new Swiper(this.month, {
            initialSlide: this.state.monthArr.indexOf(this.state.month),
            direction: 'vertical',
            slidesPerView: 5,
            centeredSlides: true,
            // observer: true,
            onTap: (swiper) => { //点击slide
                swiper.slideTo(swiper.clickedIndex, 100, true);
            },
            onSlideChangeEnd: (swiper) => { //slide改变
                let activeEle = swiper.slides[swiper.activeIndex];
                if (!activeEle) {
                    return
                }
                let month = Number(activeEle.getAttribute('data-code'));
                // let totalDays = this.getDays(this.state.year, month);
                this.setState({
                    month: month,
                    dayArr: this.getDayData(this.state.year, month, this.state.startD),
                    timeText: this.state.year + '-' + month + '-' + this.state.day
                });
            }
        });
        this.swiperDay = new Swiper(this.day, {
            initialSlide: this.state.dayArr.indexOf(this.state.day),
            direction: 'vertical',
            slidesPerView: 5,
            centeredSlides: true,
            // observer: true,
            onTap: (swiper) => { //点击slide
                swiper.slideTo(swiper.clickedIndex, 100, true);
            },
            onSlideChangeEnd: (swiper) => { //slide改变
                let activeEle = swiper.slides[swiper.activeIndex];
                if (!activeEle) {
                    return
                }
                let day = Number(activeEle.getAttribute('data-code'));
                this.setState({
                    day: day,
                    timeText: this.state.year + '-' + this.state.month + '-' + day
                });
            }
        });

        this.swiperHours = new Swiper(this.hours, {
            initialSlide: 1,
            direction: 'vertical',
            slidesPerView: 5,
            centeredSlides: true,
            // observer: true,
            onTap: (swiper) => { //点击slide
                swiper.slideTo(swiper.clickedIndex, 100, true);
            },
            onSlideChangeEnd: (swiper) => { //slide改变
                let activeEle = swiper.slides[swiper.activeIndex];
                if (!activeEle) {
                    return
                }
                // let day = Number(activeEle.getAttribute('data-code'));
                // this.setState({
                //     day: day,
                //     timeText: this.state.year + '-' + this.state.month + '-' + day
                // });
            }
        });
        this.swiperMinutes = new Swiper(this.minutes, {
            initialSlide: 1,
            direction: 'vertical',
            slidesPerView: 5,
            centeredSlides: true,
            // observer: true,
            onTap: (swiper) => { //点击slide
                swiper.slideTo(swiper.clickedIndex, 100, true);
            },
            onSlideChangeEnd: (swiper) => { //slide改变
                let activeEle = swiper.slides[swiper.activeIndex];
                if (!activeEle) {
                    return
                }
                // let day = Number(activeEle.getAttribute('data-code'));
                // this.setState({
                //     day: day,
                //     timeText: this.state.year + '-' + this.state.month + '-' + day
                // });
            }
        });

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.year !== this.state.year) {//年份change
            this.swiperMonth.update();
            let index = this.state.monthArr.indexOf(prevState.month);
            if (index !== -1) {
                this.swiperMonth.slideTo(index, 100, true);
            } else {
                this.swiperMonth.slideTo(this.state.monthArr.length - 1, 100, true);
            }
        }
        if (prevState.year !== this.state.year || prevState.month !== this.state.month) {//月份change
            this.swiperDay.update();
            let index = this.state.dayArr.indexOf(prevState.day);
            if (index !== -1) {
                this.swiperDay.slideTo(index, 100, true);
            } else {
                this.swiperDay.slideTo(this.state.dayArr.length - 1, 100, true);
            }
        }

    }

    /**
     * 获取总年数
     * @year 当前年
     * @startD 开始时间
     */
    getYears(year, startD) {
        let yearArr = [];
        if (startD) {
            for (let i = 0; i <= 70; i++) {
                yearArr.push(startD.getFullYear() + i);
            }
        } else {
            for (let i = 0; i < 140; i++) {
                yearArr.push(year - 70 + i);
            }
        }

        return yearArr;
    }

    /**
     * 获取总月份
     * @year 当前年
     * @startD 开始时间
     */
    getMonths(year, startD) {
        let monthArr = [];
        if (startD && startD.getFullYear() === year) {
            for (let j = 0; j < (12 - startD.getMonth()); j++) {
                // console.log(startD.getMonth());
                monthArr.push(startD.getMonth() + 1 + j);
            }

        } else {
            for (let i = 1; i <= 12; i++) {
                monthArr.push(i);
            }
        }

        return monthArr;
    }

    /**
     * 计算该月总共几天
     */
    getDays(year, month) {
        return new Date(year, month, 0).getDate();
    }

    /**
     * 获取该月所有天数
     * @totalDays 总天数
     * @startD 开始时间
     */
    getDayData(year, month, startD) {
        let totalDays = this.getDays(year, month);
        let dayArr = [];
        if (startD && startD.getFullYear() === year && startD.getMonth() + 1 === month) {
            for (let i = 0; i <= totalDays - startD.getDate(); i++) {
                dayArr.push(startD.getDate() + i);
            }
        } else {
            for (let j = 1; j <= totalDays; j++) {
                dayArr.push(j);
            }
        }


        return dayArr;
    }

    close() {

    }

    sure() {

    }



    render() {
        return (
            <div className='pick-date-area'>
                <div className='bg'></div>
                <div className="select-date-area" >
                    <h5 className='pick-date-title'>{this.state.timeText}</h5>
                    <div className="date-area">
                        <div className="date-item">
                            <div ref={el => this.year = el} className="swiper-container">
                                <div className="swiper-wrapper">
                                    {
                                        this.state.yearArr.map((num, index) => {
                                            return <div key={index} className="swiper-slide" data-code={num}>{num}</div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="date-item">
                            <div ref={el => this.month = el} className="swiper-container">
                                <div className="swiper-wrapper">
                                    {
                                        this.state.monthArr.map((num, index) => {
                                            return <div key={index} className="swiper-slide" data-code={num}>{num}</div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="date-item">
                            <div ref={el => this.day = el} className="swiper-container">
                                <div className="swiper-wrapper">
                                    {
                                        this.state.dayArr.map((num, index) => {
                                            return <div key={index} className="swiper-slide" data-code={num}>{num}</div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="time-area">
                        <div className="date-item">
                            <div ref={el => this.hours = el} className="swiper-container">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide" >{1}</div>
                                    <div className="swiper-slide" >{2}</div>
                                    <div className="swiper-slide" >{3}</div>
                                    <div className="swiper-slide" >{4}</div>
                                    <div className="swiper-slide" >{5}</div>
                                    <div className="swiper-slide" >{6}</div>
                                    <div className="swiper-slide" >{7}</div>
                                    <div className="swiper-slide" >{8}</div>
                                    <div className="swiper-slide" >{9}</div>
                                    <div className="swiper-slide" >{10}</div>
                                </div>
                            </div>
                        </div>
                        <div className="date-item">
                            <div ref={el => this.minutes = el} className="swiper-container">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide" >{11}</div>
                                    <div className="swiper-slide" >{12}</div>
                                    <div className="swiper-slide" >{13}</div>
                                    <div className="swiper-slide" >{14}</div>
                                    <div className="swiper-slide" >{15}</div>
                                    <div className="swiper-slide" >{16}</div>
                                    <div className="swiper-slide" >{17}</div>
                                    <div className="swiper-slide" >{18}</div>
                                    <div className="swiper-slide" >{19}</div>
                                    <div className="swiper-slide" >{20}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="action-area">
                        <button onClick={this.props.close}>取消</button>
                        <button onClick={this.sure}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyDate;