/**
 * slider组件
 *
 * Created by potato on 2017/3/17.
 * usage:
 * import {Slider} from '../Component/index';
 * @boj 组件对象
 * height(obj){
 *
 * }
 * @boj 组件对象
 * heightAfter(obj){
 *
 * }
 * <Slider min={10} max={200} step={1} defaultValue={30}  onRange={this.height} afterChange={this.heightAfter} />
 */
import React, { Component } from 'react';

class Slider extends Component{
    constructor(props){
        super(props);
        this.state={
            min:props.min,//最小值
            max:props.max,//最大值
            step:props.step,//间隔
            defaultValue:props.defaultValue//默认值
        }
        this.debouncing=this.debounce(1000,props.afterChange);

    }
    componentDidMount(){
        this.setPercent(this.state.defaultValue);
    }

    getInputRange(e){
        this.setState({
            defaultValue:e.target.value//默认值
        });
        this.setPercent(e.target.value);
        if(this.props.onRange){//滑动时立即回调
            this.props.onRange(e.target);
        }
        if(this.props.afterChange){//停止滑动后回调
           this.debouncing(e.target);
        }
    }
    //设置百分比
    setPercent(defaultValue){
        let long=this.state.max-this.state.min;//滑动条长度
        let defaultVal=defaultValue-this.state.min;//默认值
        let wPercent=defaultVal/long*100 + "%";//占控件的百分比
       this.refs.range.style.backgroundSize=wPercent + ' 100%';

    }
    /***
     * 防抖原理
     * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
     * @param idle 空闲时间
     * @param action 请求关联函数，实际应用需要调用的函数
     * @returns {Function}  返回客户调用函数
     */
    debounce(idle, action) {
        var last,self=this;
        return function(){
            var args = arguments;
            clearTimeout(last);
            last = setTimeout(function(){
                action.apply(self, args);
            }, idle)
        }
    }


    render(){
        return (
                <div className="dps-slider">
                    <input type="range" ref="range"  min={this.state.min} max={this.state.max} step={this.state.step} defaultValue={this.state.defaultValue} onInput={this.getInputRange.bind(this)} />
                    <span className="num">{this.state.defaultValue}</span>
                </div>
        );
    }
}


export default Slider;