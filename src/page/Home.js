import React, {
    Component,
} from 'react';
import {
    Link
} from 'react-router-dom';

import {ToolDps} from '../ToolDps';



class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
         ToolDps.get('/wx/user/getJsapiSigna',{url:encodeURIComponent(location.href.split('#')[0])}).then((res)=>{
             console.log(res);
                 if(res.succ){


                 }
         });
    }


    render() {

        return (
            <div style={{fontSize:'18px'}}>
                <Link to="/profile">个人信息</Link>
                <br/>
                <Link to="/needMatch">我要搭配</Link>
                <br/>
                <Link to="/myDps">我的搭配师</Link>
                <br/>
                <Link to="/customSuit">搭配测试</Link>
                <br/>
                <Link to="/wardrobeList">我的衣橱</Link>
                <br/>
                <Link to="/orderList">我的订单</Link>
                <br/>
                <Link to="/fashionMoment">我的时尚圈</Link>
                <br/>
                <Link to="/promotionCode">优惠码</Link>
                {/*<button onClick={this.test.bind(this)}>扫码</button>*/}
            </div>
        );
    }
}


export default Home;