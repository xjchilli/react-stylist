/***
 * 搭配师入口
 */
import React,{Component} from  'react'
import {Link} from 'react-router';
import {Tool} from '../Tool';
import {ToolDps} from '../ToolDps';
import BindTel from "./component/BindTel";



class NeedMatch  extends Component{
    constructor(props){
        super(props);
        this.state={
            contact:'',
            isBingTelShow:false
        }
    }
    componentDidMount(){
        ToolDps.get('/wx/user/info').then((res)=>{
            if(res.succ){
                this.setState({
                    contact:res.contact
                });
            }
        });
    }

    verifyUser(event){
        if(!this.state.contact){
            event.preventDefault();
            this.setState({
                isBingTelShow:true
            });
            return;
        }

    }

    render(){
        return (
            <section className="full-page bgWhite">
                <section className="needMatch-entry">
                      <Link to="/consult" className="item" onClick={this.verifyUser.bind(this)}>咨询</Link>
                      <Link to="/shopping" className="item"  onClick={this.verifyUser.bind(this)}>购物</Link>
                      <Link to="/accompanyShopping" className="item"  onClick={this.verifyUser.bind(this)}>陪逛</Link>
                      <Link to="/neatenWardrobe" className="item"  onClick={this.verifyUser.bind(this)}>整理</Link>
                </section>
                {this.state.isBingTelShow ? <BindTel move={()=>{this.setState({isBingTelShow:false})}}/> : null}
            </section>
        );
    }
}





export default NeedMatch;