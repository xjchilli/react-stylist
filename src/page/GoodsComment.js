/**
 * 商品评价
 */
import React from 'react';

class GoodsComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,
            msgText: '', //提示内容
            files: []
        }
    }

    componentDidMount() {
        document.title = '评价';
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
            <section className='full-page comment-page'>
                <ul>
                    <li>
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
                        <section className='comment-content'>
                            <div className='box'>
                                <textarea placeholder='宝贝满足你的期待吗？留下你的意见吧～'></textarea>
                            </div>
                        </section>
                        <section className='upload-certificate'>
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
                    </li>

                </ul>
                <section className='select-score-area'>
                    <h5>评价</h5>
                    <ul className='flex-box'>
                        <li>
                            <label>服装质量与描述</label>
                        </li>
                        <li>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className='score'>3分</span>
                        </li>
                    </ul>
                    <ul className='flex-box'>
                        <li>
                            <label>发货速度</label>
                        </li>
                        <li>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className="icon icon-star1"></span>
                            <span className='score'>3分</span>
                        </li>
                    </ul>
                </section>
                <section className='action-area'>
                    <button className='btn send-btn'>提交</button>
                </section>

            </section>
        )
    }
}


export default GoodsComment;