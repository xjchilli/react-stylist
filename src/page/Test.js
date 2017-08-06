/**
 * 时尚圈
 * Created by potato on 2017/4/8.
 */
import React, { Component } from 'react';
import { ToolDps } from '../ToolDps';
import { is, fromJS, Map } from 'immutable';



class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            times: 0,
            date: '1123'
        };
    }

    componentDidMount() {

    }

   

    modifyTime(e) {
        this.setState({
            date:e.target.value
        });
    }

    render() {
        return (
            <div>
                <p>日期:1</p>
                <input value={this.state.date} onChange={this.modifyTime.bind(this)} />
                <User name={this.state.date}/>
            </div>
        )
    }
}

class User extends React.Component{
    constructor(props){
        super(props);
        this.state={
            age:13,
            name:['potato']
        }
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState({
            name:this.state.name.concat(nextProps.name)
        });
    }
    
    
     shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
        // const thisProps = this.props || {}, thisState = this.state || {};

        // if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
        //     Object.keys(thisState).length !== Object.keys(nextState).length) {
        //     return true;
        // }

        // for (const key in nextProps) {
        //     if (!is(thisProps[key], nextProps[key])) {
        //         return true;
        //     }
        // }

        // for (const key in nextState) {
        //     if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
        //         return true;
        //     }
        // }
        // return false;
    }


    render(){
        console.log(1111);
        return (
            <div>
                1
            </div>
        )
    }
}


export default Test;



