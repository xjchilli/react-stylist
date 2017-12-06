/**
 * 日期时间插件
 */
import React from 'react';

class MyDate extends React.Component {
    constructor(props) {
        super(props);
        let { defaultDate } = props.option;
        let initDate = new Date(defaultDate);//初始化时间
        let year = initDate.getFullYear();//年
        let month = initDate.getMonth() + 1;//月
        let day = initDate.getDate();//日
        console.log(year, month, day);
        let yearArr = [];
        for (let i = 0; i < 140; i++) {
            yearArr.push(year - 70 + i);
        }
        this.state = {
            yearArr: yearArr || [],//年初始化数据
            monthArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],//月初始化数据
            dayArr: []//日初始化数据
        }
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
                    <div className="date-area">
                        <div className="date-item">
                            <div ref={el => this.year = el} className="swiper-container">
                                <div className="swiper-wrapper">
                                </div>
                            </div>
                        </div>
                        <div className="date-item">
                            <div ref={el => this.month = el} className="swiper-container">
                                <div className="swiper-wrapper">
                                </div>
                            </div>
                        </div>
                        <div className="date-item">
                            <div ref={el => this.day = el} className="swiper-container">
                                <div className="swiper-wrapper">
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