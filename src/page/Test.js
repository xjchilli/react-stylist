/**
 * 时尚圈
 * Created by potato on 2017/4/8.
 */
import React from 'react';
import { ToolDps } from '../ToolDps';
import { is, fromJS, Map } from 'immutable';



class Test extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            date: '0'
        };

    }

    componentDidMount() {
   
    }

    render() {
        console.log(this.state.date);
        return (
            <div>
                {this.state.date}
                <button onClick={()=>{this.setState({date:'1'})}}>1</button>
                <button onClick={()=>{this.setState({date:'2'})}}>2</button>
            </div>
        )
    }
}





export default Test;



