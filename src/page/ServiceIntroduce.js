/**
 * 购买服务介绍
 */
import React from 'react';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import { DataLoad, GetData } from '../Component/index';

class Main extends React.Component {
    constructor(props) {
        super(props);
        let { id } = qs.parse(props.location.search);
        this.state = {
            id: id
        }
    }
    render() {
        let { data, loadAnimation, loadMsg } = this.props.state;
        let main = data && data.succ ? <ServiceIntroduce data={data.data} id={this.state.id} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return main
    }
}


class ServiceIntroduce extends React.Component {
    componentDidMount() {
        document.title = this.props.data.title;
    }
    render() {
        // console.log(this.props.data);
        let id = this.props.id;
        let experienceLink = '/';
        switch (id) {
            case '1':
                experienceLink = '/consult';
                break;
            case '2':
                experienceLink = '/shopping';
                break;
            case '3':
                experienceLink = '/accompanyShopping';
                break;
            case '4':
                experienceLink = '/neatenWardrobe';
                break;
            case '5':
                experienceLink = '/plainPeopleChange?projectId=5';
                break;
            case '6':
                experienceLink = '/plainPeopleChange?projectId=6';
                break;
            case '7':
                experienceLink = '/plainPeopleChange?projectId=7';
                break;
        }


        return (
            <section className='service-introduce-page'>
                <section dangerouslySetInnerHTML={{ __html: this.props.data.specifiation }}></section>
                <div className='btn-area'>
                    <Link to={experienceLink} className='btn to-experience-btn'>{this.props.data.btnVal}</Link>
                </div>
            </section>
        )
    }
}


export default GetData({
    id: 'DpsProfile', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: (props, state) => {
        let { id } = qs.parse(props.location.search);
        return "/wx/project/" + id + "/detail";
    },
    data: '', //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});