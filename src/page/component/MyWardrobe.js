/**
 * 咨询---我的衣橱
 */
import React, { Component } from 'react';
import { ToolDps } from '../../ToolDps';
import { DataLoad, GetData, Msg } from '../../Component/index';


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
        let goods0 = 0,
            goods1 = 0,
            goods2 = 0,
            goods3 = 0,
            goods4 = 0,
            goods5 = 0,
            goods6 = 0,
            goods7 = 0;
        for (let i = 0; i < this.props.selectGoods.length; i++) {
            let typeCode = this.props.selectGoods[i].typeCode;
            if (typeCode == '100') {
                goods0++;
            } else if (typeCode == '101') {
                goods1++;
            } else if (typeCode == '102') {
                goods2++;
            } else if (typeCode == '103') {
                goods3++;
            } else if (typeCode == '104') {
                goods4++;
            } else if (typeCode == '105') {
                goods5++;
            } else if (typeCode == '106') {
                goods6++;
            } else if (typeCode == '107') {
                goods7++;
            }

        }


        return (
            <ul className="lside" >
                <li className={this.state.activeIndex === 1 ? "active" : ""} onClick={this.select.bind(this, 1, '100')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-dress-normal normal"></span>
                        <span className="icon icon-girl-dress-selected selected"></span>
                        {goods0 != 0 ? (<label>{goods0}</label>) : null}
                        <p>裙子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 2 ? "active" : ""} onClick={this.select.bind(this, 2, '101')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-coat-normal normal" ></span>
                        <span className="icon icon-girl-coat-selected selected"></span>
                        {goods1 != 0 ? (<label>{goods1}</label>) : null}
                        <p>上衣</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 3 ? "active" : ""} onClick={this.select.bind(this, 3, '102')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-trousers-normal normal" style={{ fontSize: '28px' }}></span>
                        <span className="icon icon-girl-trousers-selected selected" style={{ fontSize: '28px' }}></span>
                        {goods2 != 0 ? (<label>{goods2}</label>) : null}
                        <p>裤子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 4 ? "active" : ""} onClick={this.select.bind(this, 4, '103')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-underweaer-normal normal" style={{ fontSize: '17px' }}></span>
                        <span className="icon icon-girl-underweaer-selected selected" style={{ fontSize: '17px' }}></span>
                        {goods3 != 0 ? (<label>{goods3}</label>) : null}
                        <p>内衣</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 5 ? "active" : ""} onClick={this.select.bind(this, 5, '104')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-shoes-normal normal" style={{ fontSize: '16px' }}></span>
                        <span className="icon icon-girl-shoes-selected selected" style={{ fontSize: '16px' }}></span>
                        {goods4 != 0 ? (<label>{goods4}</label>) : null}
                        <p>鞋子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 6 ? "active" : ""} onClick={this.select.bind(this, 6, '105')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-bag-normal normal" style={{ fontSize: '21px' }}></span>
                        <span className="icon icon-girl-bag-selected selected" style={{ fontSize: '21px' }}></span>
                        {goods5 != 0 ? (<label>{goods5}</label>) : null}
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
                        {goods6 != 0 ? (<label>{goods6}</label>) : null}
                        <p>配饰</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 8 ? "active" : ""} onClick={this.select.bind(this, 8, '107')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-beauty-normal normal" style={{ fontSize: '28px' }}></span>
                        <span className="icon icon-girl-beauty-selected selected" style={{ fontSize: '28px' }}></span>
                        <p>美妆</p>
                        {goods7 != 0 ? (<label>{goods7}</label>) : null}
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
        let goods0 = 0,
            goods1 = 0,
            goods2 = 0,
            goods3 = 0,
            goods4 = 0,
            goods5 = 0,
            goods6 = 0;
        for (let i = 0; i < this.props.selectGoods.length; i++) {
            let typeCode = this.props.selectGoods[i].typeCode;
            if (typeCode == '200') {
                goods0++;
            } else if (typeCode == '201') {
                goods1++;
            } else if (typeCode == '202') {
                goods2++;
            } else if (typeCode == '203') {
                goods3++;
            } else if (typeCode == '204') {
                goods4++;
            } else if (typeCode == '205') {
                goods5++;
            } else if (typeCode == '206') {
                goods6++;
            }
        }
        return (
            <ul className="lside">
                <li className={this.state.activeIndex === 1 ? "active" : ""} onClick={this.select.bind(this, 1, '200')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-jacket-normal normal"></span>
                        <span className="icon icon-boy-jacket-selected selected"></span>
                        {goods0 != 0 ? (<label>{goods0}</label>) : null}
                        <p>上衣</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 2 ? "active" : ""} onClick={this.select.bind(this, 2, '201')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-trousers-normal normal" style={{ fontSize: '28px' }}></span>
                        <span className="icon icon-boy-trousers-selected selected" style={{ fontSize: '28px' }}></span>
                        {goods1 != 0 ? (<label>{goods1}</label>) : null}
                        <p>裤子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 3 ? "active" : ""} onClick={this.select.bind(this, 3, '203')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-shorts-normal normal" style={{ fontSize: '15px' }}></span>
                        <span className="icon icon-boy-shorts-selected selected" style={{ fontSize: '15px' }}></span>
                        {goods2 != 0 ? (<label>{goods2}</label>) : null}
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
                        {goods3 != 0 ? (<label>{goods3}</label>) : null}
                        <p>外套</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 5 ? "active" : ""} onClick={this.select.bind(this, 5, '205')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-shoes-normal normal" style={{ fontSize: '20px' }}></span>
                        <span className="icon icon-boy-shoes-selected selected" style={{ fontSize: '20px' }}></span>
                        {goods4 != 0 ? (<label>{goods4}</label>) : null}
                        <p>鞋子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 6 ? "active" : ""} onClick={this.select.bind(this, 6, '206')}>
                    <div className="icon-box">
                        <span className="icon icon-girl-bag-normal normal"></span>
                        <span className="icon icon-girl-bag-selected selected"></span>
                        {goods5 != 0 ? (<label>{goods5}</label>) : null}
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
                        {goods6 != 0 ? (<label>{goods6}</label>) : null}
                        <p>配饰</p>
                    </div>
                </li>
            </ul>
        )
    }
}

/**
 * 图片预览
 */
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


class MyWardrobe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: props.sex || 2,//性别1：男 2:女
            loadAnimation: true,
            loadMsg: '正在加载中',
            msgShow: false,
            msgText: '', //提示内容
            imgPreview: false, //类别窗口
            typeCode: props.sex === 2 ? "100" : "200", //类别Code
            file: '', //图片文件
            imgSrc: '', //图片地址
            data: [],
            selectGoods: props.garderobeArr || []//选择的物品
        }
        this.index = -1;//选中下标
        this.reader = new FileReader();
    }

    componentDidMount() {
        this.getGarderobeList(this.state.sex, this.state.typeCode);
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

    /**
     * 选择物品
     * @param {*} id  图片id
     * @param {*} url  图片url
     */
    selectGoods(id, url) {
        let imgObj = {
            id: id,
            url: url,
            typeCode: this.state.typeCode
        }
        if (this.state.selectGoods.length === 6) {
            this.setState({
                msgShow: true,
                msgText: '最多选择6张'
            });
            return;
        }
        let newArr = Array.prototype.slice.apply(this.state.selectGoods);
        let flag = this.checkSelected(id);
        if (flag) {
            newArr.splice(this.index, 1);
        } else {
            newArr.push(imgObj);
        }

        this.setState({
            selectGoods: newArr
        });
    }

    /**
     * 检查是否被选中
     */
    checkSelected(imgId) {
        let flag = false;
        for (let i = 0; i < this.state.selectGoods.length; i++) {
            if (this.state.selectGoods[i].id == imgId) {
                flag = true;
                this.index = i;
                break;
            }
            flag = false;
        }
        return flag;
    }

    addCloth() {
        if (this.state.selectGoods.length > 6) {
            this.setState({
                msgShow: true,
                msgText: '最多选择6张', //提示内容
            });
            return;
        }
        this.props.addCloth(this.state.selectGoods);
    }


    render() {
        return (
            <section className="full-page wardrobe-list-area flex-box consult-my-wardrobe" >
                {this.state.sex === 2 ? <GirlType selectGoods={this.state.selectGoods} getGarderobeList={this.getGarderobeList.bind(this)} /> : <BoyType selectGoods={this.state.selectGoods} getGarderobeList={this.getGarderobeList.bind(this)} />}
                <section className="rside">
                    {this.state.loadAnimation ? <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} /> : (
                        <ul className="flex-box">
                            {
                                this.state.data.map((item, index) => {
                                    return (
                                        <li className="item-3" key={index}>
                                            <div className={this.checkSelected(item.id) ? "img-box active" : "img-box"} style={{ backgroundImage: 'url(' + item.imgUrl + ')' }} onClick={this.selectGoods.bind(this, item.id, item.imgUrl)}>
                                                <span className="icon icon-gou"></span>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )}
                </section>
                <section className="upload-btn add-btn" onClick={this.addCloth.bind(this)}>
                    <span>
                        确认
                        <br />
                        添加
                    </span>
                </section>
                <section className="upload-btn">
                    <span>
                        上传
                        <br />
                        衣服
                    </span>
                    <input type="file" ref={el => this.uploadImg = el} accept="image/*" className="upload-file" onChange={this.previewImg.bind(this)} />
                </section>
                <section className="close-btn" onClick={this.props.closeMyWardrobe}>
                    <span className="icon icon-close"></span>
                </section>

                {/* 选择类别 */}
                {this.state.imgPreview ? <ImgPreview imgSrc={this.state.imgSrc} sex={this.state.sex} selectType={this.selectType.bind(this)} /> : null}
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}



export default MyWardrobe;