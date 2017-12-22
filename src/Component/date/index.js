/**
 * 日期时间插件
 * 
 * usage:
 * <MyDate format='Y-m-d' option={{
 *                   defaultDate: new Date(),
 *                   startDate: '2017-12-17'
 *               }} />
 */
import React from 'react';

class MyDate extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);
        let {
            defaultDate, //默认日期
            startDate //开始日期
        } = props.option;
        let initDate = defaultDate ? new Date(defaultDate) : new Date();//初始化时间
        let startD = startDate ? new Date(startDate) : null;//开始时间
        if (startD && startD.getTime() > initDate.getTime()) {//开始日期在初始化日期后面则（初始化时间=开始时间）
            initDate = startD;
        }
        let year = initDate.getFullYear().toString();//年
        let month = initDate.getMonth() + 1;//月
        month = month < 10 ? '0' + month : month.toString();
        let day = initDate.getDate() < 10 ? '0' + initDate.getDate() : initDate.getDate().toString();//日
        let hour = initDate.getHours() < 10 ? '0' + initDate.getHours() : initDate.getHours().toString();
        let minute = initDate.getMinutes() < 10 ? '0' + initDate.getMinutes() : initDate.getMinutes().toString();
        let formatYmd = props.format === 'Y-m-d' ? true : false;//是否是年月日格式
        // console.log(year, month, day, hour, minute);

        let dateSyle = {
            transform: 'translate(-50%, -50%) scale(1)'
        }
        if (window.innerHeight <= 480 && !formatYmd) {//高度小于480px的设备
            dateSyle.transform = 'translate(-50%, -50%) scale(0.85)';
        }

        this.state = {
            dateSyle: dateSyle,
            formatYmd: formatYmd,//是否是年月日格式
            initDate: initDate,//初始化时间
            startD: startD,//开始时间
            year: year,//当前年
            month: month,//当前月
            day: day,//当前日
            hour: hour,//当前时
            minute: minute,//当前分钟
            yearArr: this.getYears(year, startD) || [],//年初始化数据
            monthArr: this.getMonths(year, startD),//月初始化数据
            dayArr: this.getDayData(year, month, startD) || [],//日初始化数据
            hoursArr: this.getHours() || [],//小时
            minutesArr: this.getMinutes() || [],//分钟
            timeText: year + '-' + month + '-' + day + (formatYmd ? '' : ' ' + hour + ':' + minute)//显示的时间
        }
        this.move = this.move.bind(this);
    }

    componentDidMount() {

        this.container.addEventListener('touchmove', this.move);
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
                    timeText: year + '-' + this.state.month + '-' + this.state.day + (this.state.formatYmd ? '' : ' ' + this.state.hour + ':' + this.state.minute)
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
                let month = activeEle.getAttribute('data-code');
                // let totalDays = this.getDays(this.state.year, month);
                this.setState({
                    month: month,
                    dayArr: this.getDayData(this.state.year, month, this.state.startD),
                    timeText: this.state.year + '-' + month + '-' + this.state.day + (this.state.formatYmd ? '' : ' ' + this.state.hour + ':' + this.state.minute)
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
                let day = activeEle.getAttribute('data-code');
                this.setState({
                    day: day,
                    timeText: this.state.year + '-' + this.state.month + '-' + day + (this.state.formatYmd ? '' : ' ' + this.state.hour + ':' + this.state.minute)
                });
            }
        });

        if (!this.state.formatYmd) {
            this.swiperHours = new Swiper(this.hours, {
                initialSlide: this.state.hoursArr.indexOf(this.state.hour),
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
                    let hour = activeEle.getAttribute('data-code');
                    this.setState({
                        hour: hour,
                        timeText: this.state.year + '-' + this.state.month + '-' + this.state.day + ' ' + hour + ':' + this.state.minute
                    });
                }
            });
            this.swiperMinutes = new Swiper(this.minutes, {
                initialSlide: this.state.minutesArr.indexOf(this.state.minute),
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
                    let minute = activeEle.getAttribute('data-code');
                    this.setState({
                        minute: minute,
                        timeText: this.state.year + '-' + this.state.month + '-' + this.state.day + ' ' + this.state.hour + ':' + minute
                    });
                }
            });
        }

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

    componentWillUnmount() {
        this.container.removeEventListener('touchmove', this.move);
    }

    move(e) {
        e.preventDefault();
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
                yearArr.push((startD.getFullYear() + i).toString());
            }
        } else {
            for (let i = 0; i < 140; i++) {
                yearArr.push((year - 70 + i).toString());
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
        if (startD && startD.getFullYear() === Number(year)) {
            for (let j = 0; j < (12 - startD.getMonth()); j++) {
                // console.log(startD.getMonth());
                let mon = startD.getMonth() + 1 + j;
                if (mon < 10) {
                    monthArr.push('0' + mon);
                } else {
                    monthArr.push(mon.toString());
                }

            }

        } else {
            for (let i = 1; i <= 12; i++) {
                if (i < 10) {
                    monthArr.push('0' + i);
                } else {
                    monthArr.push(i.toString());
                }

            }
        }

        return monthArr;
    }

    /**
     * 计算该月总共几天
     */
    getDays(year, month) {
        return new Date(Number(year), Number(month), 0).getDate();
    }

    /**
     * 获取该月所有天数
     * @totalDays 总天数
     * @startD 开始时间
     */
    getDayData(year, month, startD) {
        let totalDays = this.getDays(year, Number(month));
        let dayArr = [];
        if (startD && startD.getFullYear() === Number(year) && startD.getMonth() + 1 === Number(month)) {
            for (let i = 0; i <= totalDays - startD.getDate(); i++) {
                let d = startD.getDate() + i;
                if (d < 10) {
                    dayArr.push('0' + d);
                } else {
                    dayArr.push(d.toString());
                }

            }
        } else {
            for (let j = 1; j <= totalDays; j++) {
                if (j < 10) {
                    dayArr.push('0' + j);
                } else {
                    dayArr.push(j.toString());
                }
            }
        }


        return dayArr;
    }

    /**
     * 获取小时
     */
    getHours() {
        let hoursArr = [];
        for (let i = 0; i < 24; i++) {
            if (i < 10) {
                hoursArr.push('0' + i);
            } else {
                hoursArr.push(i + '');
            }
        }
        return hoursArr;
    }

    /**
     * 获取分钟
     */
    getMinutes() {
        let minutesArr = [];
        for (let i = 0; i < 60; i++) {
            if (i < 10) {
                minutesArr.push('0' + i);
            } else {
                minutesArr.push(i + '');
            }
        }
        return minutesArr;
    }


    /**
     * 确定
     */
    sure() {
        if (this.props.option.sure) {
            this.props.option.sure(this.state.timeText);
            this.cancel();
        }
    }

    /**
     * 取消
     */
    cancel() {
        if (this.props.option.cancel) {
            this.props.option.cancel();
        }
    }


    render() {
        return (
            <div ref={(el) => { this.container = el }} className='pick-date-area'>
                <div className='bg'></div>
                <div className="select-date-area" style={this.state.dateSyle}>
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
                    {
                        !this.state.formatYmd ? (
                            <div className="time-area">
                                <div className="date-item">
                                    <div ref={el => this.hours = el} className="swiper-container">
                                        <div className="swiper-wrapper">
                                            {
                                                this.state.hoursArr.map((num, index) => <div key={index} className="swiper-slide" data-code={num}>{num}</div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="date-item">
                                    <div ref={el => this.minutes = el} className="swiper-container">
                                        <div className="swiper-wrapper">
                                            {
                                                this.state.minutesArr.map((num, index) => <div key={index} className="swiper-slide" data-code={num}>{num}</div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    <div className="action-area">
                        <button onClick={this.cancel.bind(this)}>取消</button>
                        <button onClick={this.sure.bind(this)}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

MyDate.defaultProps = {
    format: 'Y-m-d H i'//Y:1999 or 2003  m:01 through 12  d:01 to 31  H:00 to 23   i：00 to 59
}

export default MyDate;