/**
 * 提示信息
 * Created by potato on 2017/4/26 0026.
 */
import React,{Component} from  'react'

class Msg extends Component{
    constructor(props){
        super(props);
        this.state={
            text:this.props.text
        }
        this._time=null;
    }

    componentDidMount(){
        let self=this;
        self._time=setTimeout(function () {
            self.props.msgShow();
        },1500);
    }

    componentWillUnmount(){
        clearTimeout(this._time);
    }

    render(){
        return (
            <section className='dp-msg-box'>
                {this.state.text}
            </section>
        )
    }
}

Msg.defaultProps={
    text:'不能为空'
}

export default Msg;