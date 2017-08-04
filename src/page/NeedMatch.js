/***
 * 我要搭配
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
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
                    <div className="item" >
                        <Link to="/consult" className='container' onClick={this.verifyUser.bind(this, '/consult')}>
                            <div className="content">
                                <h5>咨询<small>19.9元/次</small></h5>
                                <p>任何关于搭配、形象等问题，均可以向搭配师咨询</p>
                            </div>
                        </Link>
                        <Link to="/consultHelp" className='detail-btn'>查看详情</Link>
                    </div>
                    <div className="item" >
                        <Link to="/shopping" className='container'  onClick={this.verifyUser.bind(this, '/shopping')}>
                            <div className="content">
                                <h5>购物<small>19.9元/次</small></h5>
                                <p>买买买，买到适合你的才是王道，不知道什么样的适合自己，找我</p>
                            </div>
                        </Link>
                        <Link to="/shoppingHelp" className='detail-btn'>查看详情</Link>
                    </div>
                    <div className="item" >
                        <Link to="/accompanyShopping" className='container'  onClick={this.verifyUser.bind(this, '/accompanyShopping')}>
                            <div className="content">
                                <h5>陪逛<small>99元/小时</small></h5>
                                <p>约个搭配师陪你逛街购物是个什么体验？明星才有的待遇，你也可以拥有</p>
                            </div>
                        </Link>
                        <Link to="/accompanyShoppingHelp" className='detail-btn'>查看详情</Link>
                    </div>
                    <div className="item" >
                        <Link to="/neatenWardrobe" className='container'  onClick={this.verifyUser.bind(this, '/neatenWardrobe')}>
                            <div className="content">
                                <h5>整理<small>99元/小时</small></h5>
                                <p>全世界的美衣都在你的衣橱里，只是你自己不知道而已</p>
                            </div>
                        </Link>
                        <Link to="/neatenWardrobeHelp" className='detail-btn'>查看详情</Link>
                    </div>
                </section>
                {this.state.isBingTelShow ? <BindTel path={this.state.path} move={() => { this.setState({ isBingTelShow: false }) }} /> : null}
            </section>
        );
    }
}



export default NeedMatch;