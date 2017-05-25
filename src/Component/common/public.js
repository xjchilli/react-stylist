import React,{Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory,Link} from 'react-router'
import action from '../../Action/Index';


class Header extends Component{
    render(){
        return (
            <header>
                <img src="../img/head.jpg" className="head-img" />
                <h2>大智汇v8</h2>
                <input type="checkbox" className="select-btn active" />
            </header>
        );
    }
}


class FooterInit extends Component{
    constructor(props){
        super(props);
        // var i=this.props.index;
        // if(i==1){
        //     browserHistory.push('/login');
        // }

    }
    render(){
        var muUrl=this.props.User ? '/me' : '/login';
        var arr=[];
        arr[this.props.index]='active';
        return (
            <footer>
                <Link to="/"  className={arr[0]}>
                    <img src="../img/icon-1.png" className="one" />
                    <img src="../img/icon-1-active.png" className="two" />
                    <p>交易</p>
                </Link>
                <Link to="/position" className={arr[1]}>
                    <img src="../img/icon-2.png" className="one"/>
                    <img src="../img/icon-2-active.png" className="two"/>
                    <p>持仓</p>
                </Link>
                <Link to="/find" className={arr[2]}>
                    <img src="../img/icon-3.png" className="one"/>
                    <img src="../img/icon-3-active.png" className="two"/>
                    <p>发现</p>
                </Link>
                <Link to={muUrl} className={arr[3]}>
                    <img src="../img/icon-4.png" className="one"/>
                    <img src="../img/icon-4-active.png" className="two"/>
                    <p>我</p>
                </Link>
            </footer>
        );
    }
}

FooterInit.defaultProps={
    index:0
}

var Footer=connect((state)=>{return {User:state.User}},action('User'))(FooterInit);


export  {Header,Footer};
