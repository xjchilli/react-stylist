/***
 * 我要搭配
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import { DataLoad, GetData } from '../Component/index';
import qs from 'query-string';
import { News } from '../Component/index';


class NeedMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list
        }
    }

    componentDidMount() {
        document.title = "我要搭配";
    }


    render() {
        return (
            <section className="to-match-page"  >
                <img src="/assets/img/needMatch/head.jpg" className="response_img top-img" />
                <h2 className="title">选择服务类型</h2>
                <ul className="type-select">
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={"/serviceIntroduce?id=" + item.id}>
                                        <h3 className="type-title">
                                            {item.name}
                                            <span className="price">&yen;{item.transactionPrice}</span>
                                            {
                                                item.originalPrice != item.transactionPrice ? (<del className="origin-price">原价&yen;{item.originalPrice}</del>) : null
                                            }
                                        </h3>
                                        <p className="introduce">{item.remarks}</p>
                                        <section className="price-item-box">
                                            <ul className="price-item" >
                                                {
                                                    item.items.map((list, i) => {
                                                        return (
                                                            <li className="flex-box" key={i}>
                                                                <div className="item">{list.title}</div>
                                                                <div className="item">&yen;{list.money}/{list.unit}</div>
                                                                <div className="item">x{list.num}</div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </section>
                                    </Link>
                                    {/* <Link to={"/serviceIntroduce?id=" + item.id} className="btn to-buy-btn" >立刻购买</Link> */}
                                    {
                                        item.id == 1 ? <Link to="/consult" className="btn to-buy-btn" >立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 2 ? <Link to="/shopping" className="btn to-buy-btn" >立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 3 ? <Link to="/accompanyShopping" className="btn to-buy-btn" >立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 4 ? <Link to="/neatenWardrobe" className="btn to-buy-btn" >立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 5 ? <Link to={"/plainPeopleChange?projectId=5"} className="btn to-buy-btn" >立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 6 ? <Link to="/plainPeopleChange?projectId=6" className="btn to-buy-btn" >立刻购买</Link> : null
                                    }
                                    {
                                        item.id == 7 ? <Link to="/plainPeopleChange?projectId=7" className="btn to-buy-btn" >立刻购买</Link> : null
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
                <News />
            </section>
        );
    }
}


class Main extends Component {
    render() {
        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data && data.succ ? <NeedMatch list={data.project} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={''} />;

        return main;
    }
}

export default GetData({
    id: 'NeedMatch', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/project',
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});