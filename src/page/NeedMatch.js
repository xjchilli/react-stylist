/***
 * 我要搭配
 */
import React, {
    Component
} from 'react'
import {
    Link
} from 'react-router-dom';
import {
    Tool
} from '../Tool';
import {
    ToolDps
} from '../ToolDps';
import BindTel from "./component/BindTel";



class NeedMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            path: '', //url路径
            isBingTelShow: false //是否显示绑定手机窗口
        }
    }
    componentDidMount() {
        document.title = "我要搭配";
        ToolDps.get('/wx/user/info').then((res) => {
            if (res.succ) {
                this.setState({
                    contact: res.contact
                });
            }
        });
    }

    /**
     * 
     * [verifyUser 验证是否绑定过手机]
     * @param  {[type]} path  [url路由]
     * @param  {[type]} event [点击事件]
     * @return {[type]}       [description]
     */
    verifyUser(path, event) {
        if (!this.state.contact) {
            event.preventDefault();
            this.setState({
                path: path,
                isBingTelShow: true
            });
            return;
        }

    }

    render() {
        return (
            <section className="full-page bgWhite">
                <section className="needMatch-entry">
                      <Link to="/consult" className="item" onClick={this.verifyUser.bind(this,'/consult')}>咨询</Link>
                      <Link to="/shopping" className="item"  onClick={this.verifyUser.bind(this,'/shopping')}>购物</Link>
                      <Link to="/accompanyShopping" className="item"  onClick={this.verifyUser.bind(this,'/accompanyShopping')}>陪逛</Link>
                      <Link to="/neatenWardrobe" className="item"  onClick={this.verifyUser.bind(this,'/neatenWardrobe')}>整理</Link>
                </section>
        {
            this.state.isBingTelShow ? <BindTel path={this.state.path} move={()=>{this.setState({isBingTelShow:false})}}/> : null
        }
            </section>
        );
    }
}



export default NeedMatch;