/**
 * 聊天
 * Created by potato on 2017/5/17 0017.
 */
import React, { Component } from 'react';
import qs from 'query-string';
import { ToolDps } from '../ToolDps';
import { DataLoad, PreviewImg } from '../Component/index';
import merged from 'obj-merged';
import IM from './component/IM';
import autosize from 'autosize';

class List extends Component {
    constructor(props) {
        super(props);

        /**
         * 聊天列表点击事件
         */
        this.chat = (e) => {
            //查看大图片
            if (ToolDps.CName.hasClass(e.target, 'previewBigImg')) {
                let url = e.target.getAttribute('bigimgurl');
                this.props.previewImg(url);
                return;
            }
            //播放声音
            this.onChangePlayAudio(e);
        }
        //切换播放audio对象
        this.onChangePlayAudio = (e) => {
            let currEle = e.currentTarget;
            let targetEle = e.target;
            while (!ToolDps.CName.hasClass(targetEle, 'audio-area')) {
                if (targetEle == currEle) {
                    break;
                }
                targetEle = targetEle.parentElement;
            }
            if (ToolDps.CName.hasClass(targetEle, 'audio-area')) {
                let audio = targetEle.querySelector('audio');
                let img = targetEle.querySelector('.sound-icon');
                if (audio.paused) {
                    let audioAreas = document.querySelectorAll('.audio-area');
                    for (let i = 0; i < audioAreas.length; i++) {
                        audioAreas[i].querySelector('.sound-icon').setAttribute('src', '/assets/img/icon/sound.png');
                        audioAreas[i].querySelector('audio').load();
                    }
                    img.setAttribute('src', '/assets/img/icon/sound.gif');
                    audio.play();
                    audio.addEventListener('ended', this.playEnd.bind(this,img));
                } else {
                    img.setAttribute('src', '/assets/img/icon/sound.png');
                    audio.load();
                }
            }
        }

        /**
         * 播放结束
         */
        this.playEnd = (img,e) => {
            img.setAttribute('src', '/assets/img/icon/sound.png');
        }

    }

    componentDidMount() {
        //绑定图片点击事件
        document.querySelector('.chat-content').addEventListener('click', this.chat);
    }

    componentWillUnmount() {
        //取消图片点击事件
        document.querySelector('.chat-content').removeEventListener('click', this.chat);
    }


    render() {
        let {
            list
        } = this.props;
        let data = [];
        list.map((item, index) => {
            let {
                isSelf,
                headUrl,
                content
            } = item;
            let selfClass = '';
            if (isSelf) {
                selfClass = ' self';
            }
            data.push(
                <li className={"friend-area" + selfClass} key={index}>
                    {
                        selfClass ? (<img src={headUrl} alt="" />) : (
                            <a href={'/dpsProfile?collocationId=' + this.props.collocationId}>
                                <img src={headUrl} alt="" />
                            </a>
                        )

                    }

                    <div className="msgContent" dangerouslySetInnerHTML={{ __html: content }}></div>
                </li>
            )
        });


        return (
            <div>
            <ul className="chat-content">
                {data}
            </ul>
            </div> 
        )
    }
}


class Chat extends IM {
    constructor(props) {
        super(props);
        this.state = {
            loadAnimation: true,
            loadMsg: '正在加载中',
            msgText: '', //消息内容
            emotionFlag: false, //是否显示表情选择框
            emotions: [],
            list: [], //数据列表
            containerHeight: 500, //聊天内容高度
            windowHeight: window.innerHeight,//窗口高度
            footerBottom: 0,//输入框位置
            previewBigImg: false,//是否预览大图
            bigImgUrl: ''//大图url
        };
        let { selToID, headUrl, nickname } = qs.parse(props.location.search);

        this.currScrollHeight = 0; //默认当前滚动条高度
        this._time = 0;
        this.keybordTime = 0;
        this.d = this.debounce(500, this.preHistory.bind(this));
        //保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
        this.getPrePageC2CHistroyMsgInfo = {
            lastMsgTime: 0,
            MsgKey: ''
        };
        this.selType = webim.SESSION_TYPE.C2C; //当前聊天类型:单聊
        this.selToID = selToID; //好友帐号
        this.collocationId = selToID.replace('dps', '');//搭配师id
        this.friendHeadUrl = headUrl; //好友头像
        this.nickname = nickname; //好友昵称
        this.selSess = null; //当前聊天会话对象
        this.reqMsgCount = 15; //每次请求的历史消息(c2c获取群)条数，仅demo用得到



    }

    componentDidMount() {
        document.title = this.nickname;


        window.addEventListener('resize', this.resetChatHeight.bind(this));

        //重置聊天内容高度
        this.resetChatHeight();
        autosize(document.querySelector('#J-input'));//textarea高度自适应

        this.signature((data) => {
            this.login(data, () => {
                this.getLastC2CHistoryMsgs(); //获取好友历史聊天记录
                this.showEmotionDialog(); //初始化表情包
            });
        });

    }


    componentWillUnmount() {
        clearTimeout(this._time);
        clearTimeout(this.keybordTime);
    }



    /**
     * 监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件
     * newMsgList 为新消息数组，结构为[Msg]
     *
     */
    onMsgNotify(newMsgList) {
        let sess, newMsg;
        //获取所有聊天会话
        let sessMap = webim.MsgStore.sessMap();
        // console.log(newMsgList);
        for (var j in newMsgList) { //遍历新消息
            newMsg = newMsgList[j];
            if (newMsg.getSession().id() == this.selToID) { //为当前聊天对象的消息
                //在聊天窗体中新增一条消息
                // console.log(newMsg);
                this.addMsg(newMsg);
            }
        }
        //消息已读上报，以及设置会话自动已读标记
        webim.setAutoRead(this.selSess, true, true);
    }


    /**
     * 获取好友聊天记录
     */
    getLastC2CHistoryMsgs(prepage) {
        let options = {
            'Peer_Account': this.selToID, //好友帐号
            'MaxCnt': this.reqMsgCount, //拉取消息条数
            'LastMsgTime': this.getPrePageC2CHistroyMsgInfo.lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
            'MsgKey': this.getPrePageC2CHistroyMsgInfo.MsgKey
        };
        webim.getC2CHistoryMsgs(
            options,
            (resp) => {
                // console.log(resp); TODO
                this.getPrePageC2CHistroyMsgInfo.lastMsgTime = resp.LastMsgTime;
                this.getPrePageC2CHistroyMsgInfo.MsgKey = resp.MsgKey;
                if (resp.MsgList.length === 0) {
                    this.setState({
                        loadAnimation: false,
                        loadMsg: '暂时没有聊天记录',
                        msgText: '',
                    });
                    return;
                }
                this.getHistoryMsgCallback(resp.MsgList, prepage);
            },
        );
    }

    /**
     * 获取历史消息
     * @msgList 为消息数组，结构为[Msg]
     */
    getHistoryMsgCallback(msgList, prepage) {
        let msg;
        prepage = prepage || false;
        //如果是加载前几页的消息，消息体需要prepend，所以先倒排一下
        if (prepage) {
            msgList.reverse();
        }
        for (let j in msgList) { //遍历新消息
            msg = msgList[j];
            if (msg.getSession().id() == this.selToID) { //为当前聊天对象的消息
                this.selSess = msg.getSession();
                //在聊天窗体中新增一条消息
                this.addMsg(msg, prepage);
            }
        }
        //消息已读上报，并将当前会话的消息设置成自动已读
        webim.setAutoRead(this.selSess, true, true);
    }

    /**
     * 聊天页面增加一条消息
     * @prepend 是否是获取前一页数据
     */
    addMsg(msg, prepend) {
        let isSelfSend, fromAccountImage;
        isSelfSend = msg.getIsSend(); //消息是否为自己发的
        if (isSelfSend) { //如果是自己发的消息
            fromAccountImage = this.loginInfo.headurl; //获取头像
        } else { //如果别人发的消息
            fromAccountImage = this.friendHeadUrl; //获取头像
        }
        let contentHtml = this.convertMsgtoHtml(msg);

        let list = Array.prototype.slice.apply(this.state.list);
        let obj = {
            isSelf: isSelfSend,
            headUrl: fromAccountImage,
            content: contentHtml
        };
        list.push(obj);
        clearTimeout(this._time);
        if (prepend) {
            let li = document.createElement('li');
            if (isSelfSend) {
                li.className = "friend-area self"; //自己
            } else {
                li.className = "friend-area"; //好友
            }

            li.innerHTML = '<img src=' + fromAccountImage + ' alt=""><div class="msgContent">' + contentHtml + '</div>';
            document.querySelector('.chat-content').insertBefore(li, document.querySelector('.chat-content').firstChild);
            //50代表一条聊天记录默认高度
            this.container.scrollTop = this.container.scrollHeight - this.currScrollHeight - 50;

            return;
        } else {
            this._time = setTimeout(() => {
                this.container.scrollTop = this.container.scrollHeight;
            }, 300);
        }

        this.setState({
            loadAnimation: false,
            loadMsg: '加载完成',
            msgText: '',
            list: list
        })


    }

    /**
     * 把消息转换成Html
     */
    convertMsgtoHtml(msg) {
        let html = "",
            elems, elem, type, content;
        elems = msg.getElems(); //获取消息包含的元素数组
        let count = elems.length;
        for (let i = 0; i < count; i++) {
            elem = elems[i];
            type = elem.getType(); //获取元素类型
            content = elem.getContent(); //获取元素对象
            switch (type) {
                case webim.MSG_ELEMENT_TYPE.TEXT:
                    html += this.convertTextMsgToHtml(content);
                    //转义，防XSS
                    // html = webim.Tool.formatText2Html(html);
                    break;
                case webim.MSG_ELEMENT_TYPE.FACE:
                    html += this.convertFaceMsgToHtml(content);
                    break;
                case webim.MSG_ELEMENT_TYPE.IMAGE:
                    html += this.convertImageMsgToHtml(content);
                    break;
                case webim.MSG_ELEMENT_TYPE.SOUND:
                    html += this.convertSoundMsgToHtml(content);
                    break;
                default:
                    webim.Log.error('未知消息元素类型: elemType=' + type);
                    break;
            }
        }
        return html;
    }

    //解析语音消息元素
    convertSoundMsgToHtml(content) {
        var second = content.getSecond();//获取语音时长
        var downUrl = content.getDownUrl();
        return '<section class="audio-area" style=width:' + (second + 50) + 'px >' +
            '<img class="sound-icon" src="/assets/img/icon/sound.png" width="12" height="15" />' +
            '<audio  src=' + downUrl + ' controls="controls" preload="none"></audio>' +
            '<time>' + second + '"</time>' +
            '</section>';
    }


    /**
     * 解析文本消息元素
     * @param content
     */
    convertTextMsgToHtml(content) {
        if (ToolDps.reg.isUrl(content.getText().trim())) {
            return "<a href=" + content.getText().trim() + ">" + content.getText() + "</a>";
        }
        return content.getText();
    }

    //解析表情消息元素
    convertFaceMsgToHtml(content) {
        let faceUrl = null;
        let data = content.getData();
        let index = webim.EmotionDataIndexs[data];

        let emotion = webim.Emotions[index];
        if (emotion && emotion[1]) {
            faceUrl = emotion[1];
        }
        if (faceUrl) {
            return "<img src='" + faceUrl + "'/>";
        } else {
            return data;
        }
    }



    /**
     * 解析图片消息元素
     * @param content
     * @param imageName
     * @returns {string}
     */
    convertImageMsgToHtml(content) {
        var smallImage = content.getImage(webim.IMAGE_TYPE.SMALL); //小图
        var bigImage = content.getImage(webim.IMAGE_TYPE.LARGE); //大图
        var oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN); //原图
        if (!bigImage) {
            bigImage = smallImage;
        }
        if (!oriImage) {
            oriImage = smallImage;
        }
        return "<img class='previewBigImg' src=" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "  id=" + content.getImageId() + " bigImgUrl=" + bigImage.getUrl() + " />";
    }

    /**
     * 发送消息(文本或者表情)
     */
    onSendMsg() {
        this.hideEmotion();
        let msgContent = this.state.msgText;
        if (msgContent.trim() === "") return;
        this.handleMsgSend(msgContent);
        this.setState({
            emotionFlag: false
        });
        document.querySelector('#J-input').style.height = "42px";
    }

    /**
     * 发消息处理
     */
    handleMsgSend(msgContent) {
        if (!this.selSess) {
            this.selSess = new webim.Session(this.selType, this.selToID, this.nickname, this.friendHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        let isSend = true; //是否为自己发送
        let seq = -1; //消息序列，-1表示sdk自动生成，用于去重
        let random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
        let msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
        let subType = webim.C2C_MSG_SUB_TYPE.COMMON; //消息子类型
        let msg = new webim.Msg(this.selSess, isSend, seq, random, msgTime, this.loginInfo.identifier, subType, this.loginInfo.identifierNick);
        let text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
        //解析文本和表情
        var expr = /\[[^[\]]{1,3}\]/mg;
        var emotions = msgContent.match(expr);
        if (!emotions || emotions.length < 1) {
            text_obj = new webim.Msg.Elem.Text(msgContent);
            msg.addText(text_obj);
        } else {
            for (let i = 0; i < emotions.length; i++) {
                tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]));
                if (tmsg) {
                    text_obj = new webim.Msg.Elem.Text(tmsg);
                    msg.addText(text_obj);
                }
                emotionIndex = webim.EmotionDataIndexs[emotions[i]];
                emotion = webim.Emotions[emotionIndex];

                if (emotion) {
                    face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                    msg.addFace(face_obj);
                } else {
                    text_obj = new webim.Msg.Elem.Text(emotions[i]);
                    msg.addText(text_obj);
                }
                restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length;
                msgContent = msgContent.substring(restMsgIndex);
            }
            if (msgContent) {
                text_obj = new webim.Msg.Elem.Text(msgContent);
                msg.addText(text_obj);
            }
        }
        msg.sending = 1;
        msg.originContent = msgContent;
        webim.sendMsg(msg, (resp) => {
            this.addMsg(msg);
        }, (err) => {
            console.log(err.ErrorInfo);
            //提示重发

        });
    }

    /**
     * 选择表情
     */
    selectEmotion(e) {
        let id = e.target.id;
        this.setState({
            msgText: this.state.msgText + id
        });

    }

    /**
     * 打开表情窗体
     */
    showEmotionDialog() {
        let emotionArr = [];
        for (let index in webim.Emotions) {
            emotionArr.push(<li key={index}><img id={webim.Emotions[index][0]} src={webim.Emotions[index][1]} alt="" onClick={this.selectEmotion.bind(this)} /></li>);
            // console.log(webim.Emotions[index])
        }
        this.setState({
            emotions: emotionArr
        });
    }

    hideEmotion() {
        this.setState({
            emotionFlag: false
        });

        this.keybordTime = setTimeout(() => {
            window.scrollTo(0, 100000);
        }, 300);
    }

    /**
     * 获取上一页聊天记录
     */
    getChatHistory(e) {
        let currEle = e.target;
        this.d(currEle);
    }

    preHistory(currEle) {
        if (currEle.scrollTop == 0) {
            currEle.scrollTop = 10;

            this.currScrollHeight = this.container.scrollHeight - this.container.scrollTop;
            /*console.log(this.container.scrollTop)
            console.log(this.container.scrollHeight)*/


            this.getPrePageC2CHistoryMsgs();
        }
    }


    getPrePageC2CHistoryMsgs() {
        this.getLastC2CHistoryMsgs(true);
    }

    /**
     * 上传图片
     */
    uploadPic(e) {
        this.setState({
            emotionFlag: false
        });
        let files = merged(e.target.files);
        e.target.value = '';
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG; //业务类型2-向好友发图片
            //封装上传图片请求
            let opt = {
                'file': file, //图片对象
                // 'onProgressCallBack': onProgressCallBack, //上传图片进度条回调函数
                'To_Account': this.selToID, //接收者
                'businessType': businessType //业务类型
            };
            //上传图片
            webim.uploadPic(opt,
                (resp) => {
                    this.sendPic(resp, file.name); //上传成功发送图片
                },
                (err) => {
                    console.log(err.ErrorInfo);
                }
            );

        }

    }

    /**
     * 发送图片消息
     * @param images
     * @param imgName
     */
    sendPic(images, imgName) {
        if (!this.selSess) {
            this.selSess = new webim.Session(this.selType, this.selToID, this.selToID, this.friendHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        let msg = new webim.Msg(this.selSess, true, -1, -1, -1, this.loginInfo.identifier, 0, this.loginInfo.identifierNick);
        let images_obj = new webim.Msg.Elem.Images(images.File_UUID);
        for (let i in images.URL_INFO) {
            let img = images.URL_INFO[i];
            let newImg;
            let type;
            switch (img.PIC_TYPE) {
                case 1: //原图
                    type = 1; //原图
                    break;
                case 2: //小图（缩略图）
                    type = 3; //小图
                    break;
                case 4: //大图
                    type = 2; //大图
                    break;
            }
            newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width, img.PIC_Height, img.DownUrl);
            images_obj.addImage(newImg);
        }
        msg.addImage(images_obj);
        //调用发送图片消息接口
        webim.sendMsg(msg, (resp) => {
            this.addMsg(msg);
        }, (err) => {
            console.log(err.ErrorInfo);
        });
    }

    /**
     * 防抖
     * @param idle   {number}    空闲时间，单位毫秒
     * @param action {function}  请求关联函数，实际应用需要调用的函数
     * @return {function}    返回客户调用函数
     */
    debounce(idle, action) {
        let last;
        return function () {
            let ctx = this,
                args = arguments;
            clearTimeout(last);
            last = setTimeout(function () {
                action.apply(ctx, args)
            }, idle)
        }
    }

    /**
     * 重置聊天高度
     */
    resetChatHeight() {
        // console.log(window.innerHeight);
        //重置聊天内容高度
        this.setState({
            containerHeight: window.innerHeight - 50
        });
    }

    /**
     * 预览图片
     */
    previewImg(url) {
        this.setState({
            previewBigImg: true,
            bigImgUrl: url
        });
    }

    render() {
        return (
            <div className="full-page chat-page">
                <div ref={el => this.container = el} className="container" onClick={this.hideEmotion.bind(this)} onScroll={this.getChatHistory.bind(this)} style={{ height: this.state.containerHeight }}>
                    {this.state.list.length > 0 ? <List previewImg={this.previewImg.bind(this)} collocationId={this.collocationId} list={this.state.list} /> : <DataLoad loadAnimation={this.state.loadAnimation} loadMsg={this.state.loadMsg} />}
                </div>
                <footer style={{ bottom: this.state.footerBottom + 'px' }}>
                    <svg viewBox="0 0 1024 1024" className="icon-svg-face icon-face" onClick={() => { this.setState({ emotionFlag: !this.state.emotionFlag }) }}>
                        <use xlinkHref="/assets/img/icon.svg#svg-face" />
                    </svg>
                    <div className="upload-img">
                        <svg viewBox="0 0 1024 1024" className="icon-svg-img" onClick={() => { this.setState({ emotionFlag: true }) }}>
                            <use xlinkHref="/assets/img/icon.svg#svg-img" />
                        </svg>
                        <input type="file" className="img" accept="image/*" multiple={true} onChange={this.uploadPic.bind(this)} />
                    </div>
                    <textarea id="J-input" type="text" value={this.state.msgText} onChange={(e) => { this.setState({ msgText: e.target.value }) }} onFocus={this.hideEmotion.bind(this)} />
                    <button className="btn send-btn" onClick={this.onSendMsg.bind(this)}>发送</button>
                    {this.state.emotionFlag ? (<ul className="emotions-area">{this.state.emotions}</ul>) : null}
                </footer>
                {this.state.previewBigImg ? <PreviewImg url={this.state.bigImgUrl} hidePreviewBigImg={() => { this.setState({ previewBigImg: false }) }} /> : null}
            </div>
        )
    }
}

export default Chat;