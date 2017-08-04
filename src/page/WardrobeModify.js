/**
 * 衣橱修改
 * Created by potato on 2017/5/3 0003.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { ToolDps } from '../ToolDps';
import { DataLoad, GetData, Msg } from '../Component/index';




class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let {
            data,
            loadAnimation,
            loadMsg
        } = this.props.state;
        let main = data && data.succ ? <WardrobeModify data={data} /> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return (
            <div>
                {main}
            </div>
        )
    }
}

class WardrobeModify extends Component {
    constructor(props) {
        super(props);
        let data = props.data;
        this.state = {
            sex: 2,//性别1：男 2:女
            girlCategory: [{ key: '100', value: '裙子' }, { key: '101', value: '上衣' }, { key: '102', value: '裤子' }, { key: '103', value: '内衣' }, { key: '104', value: '鞋' }, { key: '105', value: '包' }, { key: '106', value: '配饰' }, { key: '107', value: '美妆' }],//女分类
            boyCategory: [{ key: '200', value: '上衣' }, { key: '201', value: '裤子' }, { key: '202', value: '内衣' }, { key: '203', value: '外套' }, { key: '204', value: '鞋' }, { key: '205', value: '包' }, { key: '206', value: '配饰' }],//男分类
            msgShow: false,
            msgText: '', //提示内容
            gid: data.id || '', //衣橱ID
            name: data.name || '', //商品名称
            remark: data.remark || '', //描述
            typeCode: data.typeCode || '', //类别Code
            file: null, //图片,不修改时 为null
            imgSrc: data.imgUrl || '', //图片地址sa
        }
        this.reader = new FileReader();
        this._time = 0;
    }

    componentWillReceiveProps(nextProps) {
        let { data } = nextProps;
        this.setState({
            gid: data.id, //衣橱ID
            name: data.name, //商品名称
            remark: data.remark, //描述
            typeCode: data.typeCode, //类别Code
            imgSrc: data.imgUrl, //图片地址
        });
    }

    componentDidMount() {
        document.title = "衣橱修改";
        ToolDps.get('/wx/user/info').then((data) => {
            if (data.succ) {
                this.setState({
                    sex: data.info.sex
                });
            } else {
                this.setState({
                    msgShow: false,
                    msgText: '获取个人信息失败', //提示内容
                })
            }
        }).catch(() => {
            this.setState({
                msgShow: false,
                msgText: '获取个人信息失败', //提示内容
            })
        });


    }

    componentWillUnmount() {
        this.reader.removeEventListener('load', this.preview);
        clearTimeout(this._time);
    }


    /**
     * 预览图片
     */
    previewImg(e) {
        let files = e.target.files;
        if (files && files[0]) {
            // if (!/\/(?:jpeg|jpg|png)/i.test(files[0].type)) return;
            this.reader.addEventListener('load', this.preview.bind(this, files[0]));
            this.reader.readAsDataURL(files[0]);
        }
    }

    /**
     * 预览
     * @param file
     */
    preview(file) {
        this.setState({
            file: file,
            imgSrc: this.reader.result
        })

    }

    /**
     * 删除当前预览的图片
     */
    deleteCurrImg() {
        this.refs.uploadImg.value = '';
        this.setState({
            file: '',
            imgSrc: ''
        })
    }

    /**
     * 衣橱修改
     */
    modify() {
        if (this.state.typeCode === "") {
            this.setState({
                msgShow: true,
                msgText: '请选择物品分类'
            });
            return;
        }

        if (this.state.file === '') {
            this.setState({
                msgShow: true,
                msgText: '请上传图片'
            });
            return;
        }

        this.setState({
            uploadBtn: '上传中...'
        });

        let formdata = new FormData();
        formdata.append('gid', this.state.gid);
        formdata.append('typeCode', this.state.typeCode);
        formdata.append('img', this.state.file);
        formdata.append('name', this.state.name);
        formdata.append('remark', this.state.remark);
        formdata.append('sex', this.state.sex);

        ToolDps.post('/wx/garderobe/modify', formdata, {
            'Content-Type': 'multipart/form-data'
        }).then((data) => {
            let obj = {
                msgShow: true,
                msgText: '',
                uploadBtn: '确认上传',
            }
            if (data.succ) {
                obj.msgText = "修改成功";
            } else {
                obj.msgText = "修改失败";
            }
            this.setState(obj);
        }, (err) => {
            this.setState({
                msgShow: true,
                msgText: '修改失败',
            });
        });


    }

    /**
     * 衣橱删除
     */
    delete() {
        ToolDps.post('/wx/garderobe/delete', {
            gid: this.state.gid
        }).then((res) => {
            if (res.succ) {
                this.setState({
                    msgShow: true,
                    msgText: '删除成功',
                });
                this._time = setTimeout(() => {
                    this.context.router.push('/wardrobeList');
                }, 1000);
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '删除失败',
                });
            }
        });
    }

    render() {
        let categories = [];
        this.state.sex === 2 ? categories = this.state.girlCategory : categories = this.state.boyCategory;
        return (
            <section className="full-page">
                <div className='upload-clothing-bg wardrobe-modify'>
                    <div className="box">
                        <div className="group">
                            <div className="item">
                                <input type="text" placeholder="物品名称" className="goods-name" accept="image/*" onChange={(e) => { this.setState({ name: e.target.value }) }} value={this.state.name} />
                            </div>
                            <div className="item category-area">
                                <select className="category" onChange={(e) => { this.setState({ typeCode: e.target.value }) }} value={this.state.typeCode}>
                                    <option value="">物品分类</option>
                                    {
                                        categories.map((item, index) => {
                                            return <option key={index} value={item.key}>{item.value}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="group">
                            <div className="item img-show">
                                <svg viewBox="5 0 209.6 200" className="icon-svg-cloth" >
                                    <use xlinkHref="/assets/img/icon.svg#svg-cloth" />
                                </svg>
                                {this.state.imgSrc !== "" ? <img src={this.state.imgSrc} className="preview-img" alt="" /> : null}
                                <input type="file" ref='uploadImg' accept="image/*" className="upload-file" onChange={this.previewImg.bind(this)} />
                                {this.state.imgSrc !== "" ? <svg viewBox="0 0 100 100" className="icon-svg-delete close" onClick={this.deleteCurrImg.bind(this)}><use xlinkHref="/assets/img/icon.svg#svg-delete" /></svg> : null}
                            </div>
                            <div className="item">
                                <textarea placeholder="添加物品描述" maxLength={300} onChange={(e) => { this.setState({ remark: e.target.value }) }} value={this.state.remark}></textarea>
                            </div>
                        </div>
                        <div className="action-area">
                            <button onClick={this.modify.bind(this)}>修改</button>
                            <button onClick={this.delete.bind(this)}>删除</button>
                        </div>
                    </div>
                </div>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}

WardrobeModify.contextTypes = {
    router: PropTypes.object.isRequired
}

export default GetData({
    id: 'WardrobeDetail', //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: '/wx/garderobe/detail',
    data: (props, state) => {
        let { gid } = qs.parse(props.location.search);
        return { gid: gid }
    }, //发送给服务器的数据
    success: (state) => {
        return state;
    }, //请求成功后执行的方法
    error: (state) => {
        return state
    } //请求失败后执行的方法
});