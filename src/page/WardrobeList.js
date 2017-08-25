/**
 * 我的衣橱
 * Created by potato on 2017/5/3 0003.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import { DataLoad, GetData, Msg } from '../Component/index';


//女性类别
class GirlType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 1//默认第一个类别
        }
    }
    //选择类别
    select(index, typeCode) {
        this.setState({
            activeIndex: index
        });
        this.props.getGarderobeList(2, typeCode);
    }

    render() {
        return (
            <ul className="lside" >
                <li className={this.state.activeIndex === 1 ? "active" : ""} onClick={this.select.bind(this, 1, '100')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-dress-normal normal"></span>
                        <span className="icon icon-girl-dress-selected selected"></span>
                        <p>裙子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 2 ? "active" : ""} onClick={this.select.bind(this, 2, '101')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-coat-normal normal" ></span>
                        <span className="icon icon-girl-coat-selected selected"></span>
                        <p>上衣</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 3 ? "active" : ""} onClick={this.select.bind(this, 3, '102')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-trousers-normal normal" style={{ fontSize: '28px' }}></span>
                        <span className="icon icon-girl-trousers-selected selected" style={{ fontSize: '28px' }}></span>
                        <p>裤子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 4 ? "active" : ""} onClick={this.select.bind(this, 4, '103')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-underweaer-normal normal" style={{ fontSize: '17px' }}></span>
                        <span className="icon icon-girl-underweaer-selected selected" style={{ fontSize: '17px' }}></span>
                        <p>内衣</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 5 ? "active" : ""} onClick={this.select.bind(this, 5, '104')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-shoes-normal normal" style={{ fontSize: '16px' }}></span>
                        <span className="icon icon-girl-shoes-selected selected" style={{ fontSize: '16px' }}></span>
                        <p>鞋子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 6 ? "active" : ""} onClick={this.select.bind(this, 6, '105')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-bag-normal normal" style={{ fontSize: '21px' }}></span>
                        <span className="icon icon-girl-bag-selected selected" style={{ fontSize: '21px' }}></span>
                        <p>包包</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 7 ? "active" : ""} onClick={this.select.bind(this, 7, '106')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-ornaments-normal normal" style={{ fontSize: '26px' }}></span>
                        <span className="icon icon-girl-ornaments-selected selected" style={{ fontSize: '26px' }}>
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                        </span>
                        <p>配饰</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 8 ? "active" : ""} onClick={this.select.bind(this, 8, '107')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-beauty-normal normal" style={{ fontSize: '28px' }}></span>
                        <span className="icon icon-girl-beauty-selected selected" style={{ fontSize: '28px' }}></span>
                        <p>美妆</p>
                    </div>
                </li>
            </ul>
        )
    }
}

//男性类别
class BoyType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 1//默认第一个类别
        }
    }
    //选择类别
    select(index, typeCode) {
        this.setState({
            activeIndex: index
        });
        this.props.getGarderobeList(1, typeCode);
    }
    render() {
        return (
            <ul className="lside">
                <li className={this.state.activeIndex === 1 ? "active" : ""} onClick={this.select.bind(this, 1, '200')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-jacket-normal normal"></span>
                        <span className="icon icon-boy-jacket-selected selected"></span>
                        <p>上衣</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 2 ? "active" : ""} onClick={this.select.bind(this, 2, '201')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-trousers-normal normal" style={{ fontSize: '28px' }}></span>
                        <span className="icon icon-boy-trousers-selected selected" style={{ fontSize: '28px' }}></span>
                        <p>裤子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 3 ? "active" : ""} onClick={this.select.bind(this, 3, '203')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-shorts-normal normal" style={{ fontSize: '15px' }}></span>
                        <span className="icon icon-boy-shorts-selected selected" style={{ fontSize: '15px' }}></span>
                        <p>内衣</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 4 ? "active" : ""} onClick={this.select.bind(this, 4, '204')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-coat-normal normal" style={{ fontSize: '28px' }}></span>
                        <span className="icon icon-boy-coat-selected selected" style={{ fontSize: '28px' }}>
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                        </span>
                        <p>外套</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 5 ? "active" : ""} onClick={this.select.bind(this, 5, '205')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-shoes-normal normal" style={{ fontSize: '20px' }}></span>
                        <span className="icon icon-boy-shoes-selected selected" style={{ fontSize: '20px' }}></span>
                        <p>鞋子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 6 ? "active" : ""} onClick={this.select.bind(this, 6, '206')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-bag-normal normal"></span>
                        <span className="icon icon-girl-bag-selected selected"></span>
                        <p>包包</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 7 ? "active" : ""} onClick={this.select.bind(this, 7, '207')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-ornaments-normal normal" style={{ fontSize: '27px' }}></span>
                        <span className="icon icon-boy-ornaments-selected selected" style={{ fontSize: '27px' }}>
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                        </span>
                        <p>配饰</p>
                    </div>
                </li>
            </ul>
        )
    }
}


class ImgPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girlCategory: [{ key: '100', value: '裙子' }, { key: '101', value: '上衣' }, { key: '102', value: '裤子' }, { key: '103', value: '内衣' }, { key: '104', value: '鞋' }, { key: '105', value: '包' }, { key: '106', value: '配饰' }, { key: '107', value: '美妆' }],//女分类
            boyCategory: [{ key: '200', value: '上衣' }, { key: '201', value: '裤子' }, { key: '202', value: '内衣' }, { key: '203', value: '外套' }, { key: '204', value: '鞋' }, { key: '205', value: '包' }, { key: '206', value: '配饰' }],//男分类
            remark: ''//备注
        }
    }
    render() {
        let categories = [];
        this.props.sex === 2 ? categories = this.state.girlCategory : categories = this.state.boyCategory;
        return (
            <section className="select-type-area">
                <div className="box">
                    <h3>选择分类</h3>
                    <ul className="flex-box img-show">
                        <li>
                            <div className="img-preview" style={{ backgroundImage: "url(" + this.props.imgSrc + ")" }}></div>
                        </li>
                        <li>
                            <textarea placeholder="添加物品描述..." value={this.state.remark} onChange={(e) => { this.setState({ remark: e.target.value }) }}></textarea>
                        </li>
                    </ul>
                    <h4>物品分类</h4>
                    <ul className="type-list">
                        {
                            categories.map((item, index) => {
                                return <li key={index} onClick={this.props.selectType.bind(this, item.key, this.state.remark)}>{item.value}</li>
                            })
                        }
                    </ul>
                </div>
            </section>
        )
    }
}


class WardrobeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: 2,//性别1：男 2:女
            loadAnimation: true,
            loadMsg: '正在加载中',
            msgShow: false,
            msgText: '', //提示内容
            imgPreview: false, //类别窗口
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
                let typeCode = '';
                data.info.sex === 2 ? typeCode = "100" : typeCode = "200";//第一次加载
                this.setState({
                    sex: data.info.sex,
                    typeCode: typeCode
                });
                this.getGarderobeList(data.info.sex, typeCode);
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
    getGarderobeList(sex, typeCode) {
        this.setState({
            typeCode: typeCode,
            loadAnimation: true,
            loadMsg: '加载中...',
            data: []
        });
        ToolDps.get('/wx/garderobe/list', { sex: sex, typeCode: typeCode }).then((data) => {
            if (data.succ) {
                this.setState({
                    loadAnimation: false,
                    loadMsg: '加载成功',
                    data: data.list[0].list
                })
            } else {
                this.setState({
                    loadAnimation: false,
                    loadMsg: '加载失败'
                })
            }
        }).catch(() => {
            this.setState({
                loadAnimation: false,
                loadMsg: '加载失败'
            })
        });
    }


    /**
     * 隐藏上传服装窗口
     */
    hideUploadClothWindow() {
        this.setState({
            imgPreview: false
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
            imgSrc: this.reader.result,
            imgPreview: true
        })

    }

    /**
     * 删除当前预览的图片
     */
    deleteCurrImg() {
        this.uploadImg.value = '';
        this.setState({
            file: '',
            imgSrc: ''
        })
    }

    //选择类别
    selectType(typeCode, remark) {
        let formdata = new FormData();
        formdata.append('typeCode', typeCode);
        formdata.append('name', '');
        formdata.append('img', this.state.file);
        formdata.append('remark', remark);
        formdata.append('sex', this.state.sex);

        ToolDps.post('/wx/garderobe/add', formdata, {
            'Content-Type': 'multipart/form-data'
        }).then((data) => {
            if (data.succ) {
                let newData = Array.prototype.slice.apply(this.state.data);
                if (typeCode == this.state.typeCode) {
                    newData.push(data.garderobe);
                }

                this.setState({
                    remark: '', //描述
                    file: '', //图片文件
                    imgSrc: '', //图片地址
                    msgShow: true,
                    msgText: '上传成功',
                    imgPreview: false,
                    data: newData
                });
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '上传失败'
                });
            }
        });


    }

    render() {
        return (
            <section className="full-page wardrobe-list-area flex-box" >
                {this.state.sex === 2 ? <GirlType getGarderobeList={this.getGarderobeList.bind(this)} /> : <BoyType getGarderobeList={this.getGarderobeList.bind(this)} />}
                <section className="rside">
                    {this.state.loadAnimation ? <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} /> : (
                        <ul className="flex-box">
                            {
                                this.state.data.map((item, index) => {
                                    return (
                                        <li className="item-3" key={index}>
                                            <Link to={"/wardrobeModify?gid=" + item.id}>
                                                <div className="img-box" style={{ backgroundImage: 'url(' + item.imgUrl + ')' }}></div>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )}
                </section>
                <section className="upload-btn">
                    <span>
                        上传
                        <br />
                        衣服
                    </span>
                    <input type="file" ref={el => this.uploadImg = el} accept="image/*" className="upload-file" onChange={this.previewImg.bind(this)} />
                </section>
                {/* 选择类别 */}
                {this.state.imgPreview ? <ImgPreview imgSrc={this.state.imgSrc} sex={this.state.sex} selectType={this.selectType.bind(this)} /> : null}
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}


export default WardrobeList;