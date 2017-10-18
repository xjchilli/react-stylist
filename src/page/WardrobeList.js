/**
 * 我的衣橱
 * Created by potato on 2017/5/3 0003.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToolDps } from '../ToolDps';
import { DataLoad, GetData, Msg, PreviewImg, Loading } from '../Component/index';


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
                <li className={this.state.activeIndex === 3 ? "active" : ""} onClick={this.select.bind(this, 3, '202')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-shorts-normal normal" style={{ fontSize: '15px' }}></span>
                        <span className="icon icon-boy-shorts-selected selected" style={{ fontSize: '15px' }}></span>
                        <p>内衣</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 4 ? "active" : ""} onClick={this.select.bind(this, 4, '203')}>
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
                <li className={this.state.activeIndex === 5 ? "active" : ""} onClick={this.select.bind(this, 5, '204')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-shoes-normal normal" style={{ fontSize: '20px' }}></span>
                        <span className="icon icon-boy-shoes-selected selected" style={{ fontSize: '20px' }}></span>
                        <p>鞋子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 6 ? "active" : ""} onClick={this.select.bind(this, 6, '205')}>
                    <div className="icon-box">
                        <span className="icon icon-boy-hat-normal normal"></span>
                        <span className="icon icon-boy-hat-selected selected"></span>
                        <p>帽子</p>
                    </div>
                </li>
                <li className={this.state.activeIndex === 7 ? "active" : ""} onClick={this.select.bind(this, 7, '206')}>
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


//删除图片
class DeleteImg extends Component {

    /**
    * 衣橱删除
    */
    delete() {
        ToolDps.post('/wx/garderobe/delete', {
            gid: this.props.gid
        }).then((res) => {
            if (res.succ) {
                this.props.delete();
                this.props.close();
            }
        });
    }


    render() {
        return (
            <section className="delete-img-area">
                <section className="btn-area">
                    <button className="btn" onClick={this.delete.bind(this)}>删除这件衣服</button>
                    <button className="btn" onClick={this.props.close}>取消</button>
                </section>
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
            deleteImgWindow: false,
            gid: '',//图片id
            typeCode: '', //类别Code
            data: [],
            imgLoading: false//图片加载loading
        }
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
     * 预览图片
     */
    previewImg(e) {
        let files = e.target.files;
        if (files && files[0]) {
            let readFile = new FileReader();
            readFile.onload = () => {
                this.selectType(files[0]);
            }
            readFile.readAsDataURL(files[0]);
        }
    }

    //选择类别
    selectType(file) {
        let formdata = new FormData();
        formdata.append('typeCode', this.state.typeCode);
        formdata.append('name', '');
        formdata.append('img', file);
        formdata.append('remark', '');
        formdata.append('sex', this.state.sex);
        this.setState({
            imgLoading: true
        });

        ToolDps.post('/wx/garderobe/add', formdata, {
            'Content-Type': 'multipart/form-data'
        }).then((data) => {
            if (data.succ) {
                let newData = Array.prototype.slice.apply(this.state.data);
                newData.push(data.garderobe);
                this.setState({
                    remark: '', //描述
                    file: '', //图片文件
                    imgSrc: '', //图片地址
                    msgShow: true,
                    msgText: '上传成功',
                    data: newData,
                    imgLoading: false
                });
            } else {
                this.setState({
                    msgShow: true,
                    msgText: '上传失败',
                    imgLoading: false
                });
            }
        });
    }

    //删除图片
    deleteImg() {
        let data = Array.prototype.slice.apply(this.state.data);
        let newData = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == this.state.gid) {
                continue;
            }
            newData.push(data[i]);
        }
        this.setState({
            data: newData
        });
    }

    /**
   * 长按
   */
    longPress(e) {
        e.preventDefault();
        this.pressStartTime = new Date();
    }


    /**
     * 长按结束
     */
    pressEnd(gid, bigImgUrl, e) {
        let time = new Date().getTime() - this.pressStartTime;
        if (time > 800) {
            this.setState({
                deleteImgWindow: true,
                gid: gid
            });
        } else {
            this.setState({
                previewBigImg: true,
                bigImgUrl: bigImgUrl
            });
        }
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
                                        <li className="item-3" key={index} >
                                            <div id={"gid-" + item.id} className="img-box" style={{ backgroundImage: 'url(' + item.imgUrl + ')' }} onTouchStart={this.longPress.bind(this)}  onTouchEnd={this.pressEnd.bind(this, item.id, item.imgUrl)} ></div>
                                        </li>
                                    )
                                })
                            }
                            {
                                this.state.imgLoading ? (
                                    <li className="item-3" >
                                        <Loading />
                                    </li>
                                ) : null
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
                {/* 提示 */}
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
                {/* 删除图片 */}
                {this.state.deleteImgWindow ? <DeleteImg gid={this.state.gid} delete={this.deleteImg.bind(this)} close={() => { this.setState({ deleteImgWindow: false }) }} /> : null}
                {/* 图片预览 */}
                {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}

            </section>
        )
    }
}


export default WardrobeList;