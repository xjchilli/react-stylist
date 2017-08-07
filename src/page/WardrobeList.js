/**
 * 我的衣橱
 * Created by potato on 2017/5/3 0003.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Msg from "../Component/tips/msg";
import { ToolDps } from '../ToolDps';



class SwiperSlide extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() { }

    render() {
        let {
            data
        } = this.props;
        return (

            <div className="swiper-slide">
                <Link to={'/wardrobeModify?gid=' + data.id} >
                    <div className='img-area' >
                        <img src={data.imgUrl} alt="" />
                        <p className="img-describe">{data.name}</p>
                    </div>
                </Link>
            </div>

        )
    }
}

class ClothCategory extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = "我的衣橱";
        new Swiper('.J-consult-my-wardrobe', {
            slidesPerView: 3,
            spaceBetween: 10,
            slidesOffsetBefore: 30,
            slidesOffsetAfter: 30,
            observer: true,
        });
    }


    render() {
        let {
            data
        } = this.props;
        return (
            <div className="cloth-category">
                <h4 className="wardrobe-title" data-code={data.typeCode}>{data.typeName}</h4>
                <div className="swiper-container  J-consult-my-wardrobe">
                    <div className="swiper-wrapper">
                        {
                            data.list.map((slider, index) => {
                                return <SwiperSlide data={slider} key={index} />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class WardrobeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: 2,//性别1：男 2:女
            girlCategory: [{ key: '100', value: '裙子' }, { key: '101', value: '上衣' }, { key: '102', value: '裤子' }, { key: '103', value: '内衣' }, { key: '104', value: '鞋' }, { key: '105', value: '包' }, { key: '106', value: '配饰' }, { key: '107', value: '美妆' }],//女分类
            boyCategory: [{ key: '200', value: '上衣' }, { key: '201', value: '裤子' }, { key: '202', value: '内衣' }, { key: '203', value: '外套' }, { key: '204', value: '鞋' }, { key: '205', value: '包' }, { key: '206', value: '配饰' }],//男分类
            serachTip: '加载中...',
            uploadBtn: '确认上传',
            msgShow: false,
            msgText: '', //提示内容
            uploadClothing: false, //上传服装
            name: '', //商品名称
            remark: '', //描述
            typeCode: '', //类别Code
            file: '', //图片文件
            imgSrc: '', //图片地址
            data: [],
        }
        this.reader = new FileReader();
    }

    componentDidMount() {
        document.title = '我的衣橱';
        ToolDps.get('/wx/user/info').then((data) => {
            if (data.succ) {
                this.setState({
                    sex: data.info.sex
                });

                this.getGarderobeList(data.info.sex);
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
    }

    /**
     * 获取衣橱列表
     */
    getGarderobeList(sex) {
        ToolDps.get('/wx/garderobe/list', { sex: sex }).then((data) => {
            if (data.succ) {
                if (data.list.length === 0) {
                    this.setState({
                        serachTip: '暂时没有您的数据'
                    })
                } else {
                    this.setState({
                        data: data.list
                    })
                }
            } else {
                this.setState({
                    serachTip: '加载失败'
                })
            }
        }).catch(() => {
            this.setState({
                serachTip: '加载失败'
            })
        });
    }


    /**
     * 显示上传服装窗口
     */
    showUploadClothWindow() {
        this.setState({
            uploadClothing: true
        });
    }

    /**
     * 隐藏上传服装窗口
     */
    hideUploadClothWindow() {
        this.setState({
            uploadClothing: false
        });
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

    upload() {
        if (this.state.typeCode === "") {
            this.setState({
                msgShow: true,
                msgText: '请选择物品分类'
            });
            return;
        }

        if (this.state.file === "") {
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
        formdata.append('typeCode', this.state.typeCode);
        formdata.append('img', this.state.file);
        formdata.append('name', this.state.name);
        formdata.append('remark', this.state.remark);
        formdata.append('sex', this.state.sex);

        ToolDps.post('/wx/garderobe/add', formdata, {
            'Content-Type': 'multipart/form-data'
        }).then((data) => {
            if (data.succ) {
                let resetData = {
                    typeCode: data.typeCode,
                    typeName: data.typeName,
                    list: []
                };
                resetData.list.push(data.garderobe);

                let newData = Array.prototype.slice.apply(this.state.data);
                if (newData.length == 0) {
                    newData.push(resetData);
                } else {
                    for (let i = 0; i < this.state.data.length; i++) {
                        if (newData[i].typeCode == data.typeCode) {
                            newData[i].list.push(data.garderobe);
                            break;
                        }
                        if (i == newData.length - 1 && newData[i].typeCode != data.typeCode) {
                            newData.push(resetData);
                        }
                    }
                }


                this.setState({
                    name: '', //商品名称
                    remark: '', //描述
                    typeCode: '', //类别Code
                    file: '', //图片文件
                    imgSrc: '', //图片地址
                    msgShow: true,
                    msgText: '上传成功',
                    uploadBtn: '确认上传',
                    uploadClothing: false,
                    data: newData
                });
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '上传失败',
                    uploadBtn: '确认上传'
                });
            }
        });


    }

    render() {
        let content = classNames('content', {
            'remove-css-overflow-scrolling': this.state.uploadClothing
        });
        let uploadClothing = classNames('upload-clothing-bg', {
            'active': this.state.uploadClothing
        });

        let categories = [];
        this.state.sex === 2 ? categories = this.state.girlCategory : categories = this.state.boyCategory;

        return (
            <section className="consult-my-wardrobe full-page wardrobe-list-container">
                <section className={content}>
                    {
                        this.state.data.map((clothCategory, index) => {
                            return <ClothCategory key={index} data={clothCategory} />;
                        })
                    }

                    {
                        this.state.data.length == 0 ? <p style={{ textAlign: 'center', fontSize: '1.8rem' }}>{this.state.serachTip}</p> : null
                    }

                    <div className="action-area">
                        <button onClick={this.showUploadClothWindow.bind(this)}>上传</button>
                    </div>
                    <div className={uploadClothing}>
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
                                    {this.state.file !== "" ? <img src={this.state.imgSrc} className="preview-img" alt="" /> : null}
                                    <input type="file" ref='uploadImg' accept="image/*" className="upload-file" onChange={this.previewImg.bind(this)} />
                                    {this.state.file !== "" ? <svg viewBox="0 0 100 100" className="icon-svg-delete close" onClick={this.deleteCurrImg.bind(this)}><use xlinkHref="/assets/img/icon.svg#svg-delete" /></svg> : null}
                                </div>
                                <div className="item">
                                    <textarea placeholder="添加物品描述" onChange={(e) => { this.setState({ remark: e.target.value }) }} value={this.state.remark}></textarea>
                                </div>
                            </div>
                            <div className="action-area">
                                <button onClick={this.hideUploadClothWindow.bind(this)}>取消</button>
                                <button onClick={this.upload.bind(this)}>{this.state.uploadBtn}</button>
                            </div>
                        </div>
                    </div>
                </section>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}


export default WardrobeList;