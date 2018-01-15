/**
 * 申请换货
 */
import React from 'react';
import { Msg } from '../Component/index';

class ApplyChangeGoods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            files: []
        }
    }

    componentDidMount(){
        document.title='申请换货';
    }

    selectImg(e) {
        let files = e.target.files;
        if (files && files.length > 0) {
            if (this.state.files.length + files.length > 6) {//大于6张了
                this.setState({
                    msgShow: true,
                    msgText: '图片上限6张！'
                });
                return;
            }
            for (let i = 0; i < files.length; i++) {
                let readFile = new FileReader();
                readFile.onload = () => {
                    let obj = {
                        file: null,//图片文件
                        url: ''//图片base64地址
                    }
                    obj.file = files[i];
                    obj.url = readFile.result;
                    let fileArr = Array.prototype.slice.apply(this.state.files);
                    fileArr.push(obj);
                    this.setState({
                        files: fileArr
                    })
                }
                readFile.readAsDataURL(files[i]);
            }

        }
    }

    /**
     * 删除图片
     */
    deleteImg(index) {
        let fileArr = Array.prototype.slice.apply(this.state.files);
        fileArr.splice(index, 1);
        this.setState({
            files: fileArr
        });

    }

    render() {
        return (
            <section className='full-page returns-refunds-page'>
                <ul className='goods-list-area'>
                    <li>
                        <ul className='flex-box'>
                            <li>
                                <div className='goods-img' style={{ backgroundImage: 'url(/assets/img/girl.jpg)' }}></div>
                            </li>
                            <li>
                                <h4>Nike耐克官方NIKE AIR HUARACHE RUNULTRA GS大童运动鞋847568HUARACHEHUARACHEHUARACHE</h4>
                                <p className='sku'>炫黑，170/85A</p>
                            </li>
                        </ul>
                    </li>
                </ul>
                <section className='desc-area'>
                    <div className='group'>
                        <ul className='flex-box'>
                            <li>
                                <label>换货说明：</label>
                            </li>
                            <li>
                                <input placeholder='选填' />
                            </li>
                        </ul>
                    </div>
                </section>
                <section className='upload-certificate'>
                    <h5>上传凭证<span>( 最多上传6张 ）</span></h5>
                    <ul className='flex-box'>
                        {
                            this.state.files.map((item, index) => {
                                return (
                                    <li className='item-4' key={index} onClick={this.deleteImg.bind(this, index)}>
                                        <div className='img-show' style={{ backgroundImage: `url(${item.url})` }}>
                                            <span className="icon icon-fault"><span className="path1"></span><span className="path2"></span></span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        {
                            this.state.files.length <= 6 ? (
                                <li className='item-4'>
                                    <div className='upload-img-area'>
                                        <span className="icon icon-camera2"></span>
                                        <input type="file" accept="image/*" multiple className="upload-file" onChange={this.selectImg.bind(this)} />
                                    </div>
                                </li>
                            ) : null
                        }
                    </ul>
                </section>
                <section className='action-area'>
                    <button className='btn send-btn'>提交</button>
                </section>
                {this.state.msgShow ? <Msg msgShow={() => { this.setState({ msgShow: false }) }} text={this.state.msgText} /> : null}
            </section>
        )
    }
}


export default ApplyChangeGoods;