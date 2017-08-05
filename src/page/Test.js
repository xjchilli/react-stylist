/**
 * 时尚圈
 * Created by potato on 2017/4/8.
 */
import React, { Component } from 'react';
import { ToolDps } from '../ToolDps';
import flatpickr from 'flatpickr';
const zh = require("flatpickr/dist/l10n/zh.js").zh;



class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null
        }
    }

    componentDidMount() {
        let nowDate = new Date();
        flatpickr("#date", {
            locale: zh,
            minDate: nowDate,
            disableMobile: "true",
            enableTime: true,
            onChange: (selectedDates, dateStr, instance) => {
                nowDate = selectedDates[0];
                this.setState({
                    date: dateStr
                });
            },
            onOpen: () => {
                this.setState({
                    date: ToolDps.convertDate(nowDate, 'YYYY-MM-DD hh:mm')
                });
            }
        });
    }


    render() {

        return (
            <div>
                <p>日期:1</p>
                {/* <div id='date'>选择日期:{this.state.date}</div> */}
                <input type="text" id="date" value={this.state.date} placeholder="请选择时间"/>
            </div>
        )
    }
}



export default Test;



