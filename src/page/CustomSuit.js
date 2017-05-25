/**
 * 搭配测试
 * Created by potato on 2017/4/18 0018.
 */
import React, { Component, PropTypes } from 'react';
import merged from 'obj-merged';
import {connect} from 'react-redux';
import {ToolDps} from '../ToolDps';
import action from '../Action/Index';
import classNames from 'classnames';
import {Msg,City} from '../Component/index';

//女-脸型
class GilrFace extends Component{
    constructor(props){
        super(props);
        this.state={
            face1:true,//鹅蛋脸
            face2:false,//圆脸
            face3:false,//瓜子脸
            face4:false,//方脸
            faceshpe:'1'//脸型
        };

        let {path}=this.props.state;
        this.myData=path['/customSuitGirl'];
        this.myData.path = '/customSuitGirl';

    }

    componentWillUpdate(nextProps,nextState){
       this.myData.data.faceshpe=nextState.faceshpe;
       this.props.setState(this.myData);
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.face1 !== this.state.face1 ||  nextState.face2 !== this.state.face2 || nextState.face3 !== this.state.face3 || nextState.face4 !== this.state.face4;
    }

    render(){
        let face1 = classNames('img-area',{
            'active':this.state.face1
        });
        let face2 = classNames('img-area',{
            'active':this.state.face2
        });
        let face3 = classNames('img-area',{
            'active':this.state.face3
        });
        let face4 = classNames('img-area',{
            'active':this.state.face4
        });

        return (
            <div className="swiper-slide" >
                <h2 className="title">选择你的脸型</h2>
                <section className="face-area">
                    <section className="item">
                        <div className={face1} onClick={()=>{this.setState({ face1:true, face2:false,face3:false,face4:false,faceshpe:'1'})}}>
                            <img src="/assets/img/face1.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={face2} onClick={()=>{this.setState({ face1:false, face2:true,face3:false,face4:false,faceshpe:'2'})}}>
                            <img src="/assets/img/face2.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={face3} onClick={()=>{this.setState({ face1:false, face2:false,face3:true,face4:false,faceshpe:'3'})}}>
                            <img src="/assets/img/face3.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={face4} onClick={()=>{this.setState({ face1:false, face2:false,face3:false,face4:true,faceshpe:'4'})}}>
                            <img src="/assets/img/face4.png" alt=""/>
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}
//女-肤色
class  GirlSkin extends  Component{
    constructor(props){
        super(props);
        this.state={
            skin1:true,//晶莹白皙
            skin2:false,//自然红润
            skin3:false,//自然偏黄
            skin4:false,//活力小麦
            colorofskin: '1',//肤色
        }

        let {path}=this.props.state;
        this.myData=path['/customSuitGirl'];
        this.myData.path = '/customSuitGirl';
    }

    componentWillUpdate(nextProps,nextState){
        this.myData.data.colorofskin=nextState.colorofskin;
        this.props.setState(this.myData);
    }

   shouldComponentUpdate(nextProps,nextState){
        return nextState.skin1 !== this.state.skin1 || nextState.skin2 !== this.state.skin2 || nextState.skin3 !== this.state.skin3 || nextState.skin4 !== this.state.skin4;
   }
   render(){
       let skin1 = classNames('img-area',{
           'active':this.state.skin1
       });
       let skin2 = classNames('img-area',{
           'active':this.state.skin2
       });
       let skin3 = classNames('img-area',{
           'active':this.state.skin3
       });
       let skin4 = classNames('img-area',{
           'active':this.state.skin4
       });

       return (
           <div className="swiper-slide" >
               <h2 className="title">选择你的肤色</h2>
               <section className="skin-area">
                   <section className="item">
                       <div className={skin1} onClick={()=>{this.setState({ skin1:true, skin2:false,skin3:false,skin4:false,colorofskin:'1'})}}>
                           <img src="/assets/img/skin1.png" alt=""/>
                       </div>
                   </section>
                   <section className="item">
                       <div className={skin2} onClick={()=>{this.setState({ skin1:false, skin2:true,skin3:false,skin4:false,colorofskin:'2'})}}>
                           <img src="/assets/img/skin2.png" alt=""/>
                       </div>
                   </section>
                   <section className="item">
                       <div className={skin3} onClick={()=>{this.setState({ skin1:false, skin2:false,skin3:true,skin4:false,colorofskin:'3'})}}>
                           <img src="/assets/img/skin3.png" alt=""/>
                       </div>
                   </section>
                   <section className="item">
                       <div className={skin4} onClick={()=>{this.setState({ skin1:false, skin2:false,skin3:false,skin4:true,colorofskin:'4'})}}>
                           <img src="/assets/img/skin4.png" alt=""/>
                       </div>
                   </section>
               </section>
           </div>
       )
   }
}
//女-身型
class GirlBody extends  Component{
    constructor(props){
        super(props);
        this.state={
            body1:true,//沙漏型
            body2:false,//梨型
            body3:false,//苹果型
            body4:false,//直筒型
            body5:false,//倒三角
            bodySize: '1',//体型
        }
        let {path}=this.props.state;
        this.myData=path['/customSuitGirl'];
        this.myData.path = '/customSuitGirl';
    }

    componentWillUpdate(nextProps,nextState){
        this.myData.data.bodySize=nextState.bodySize;
        this.props.setState(this.myData);
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.body1 !== this.state.body1 || nextState.body2 !== this.state.body2 || nextState.body3 !== this.state.body3 || nextState.body4 !== this.state.body4 || nextState.body5 !== this.state.body5;
    }
    render(){
        let body1 = classNames('img-area',{
            'active':this.state.body1
        });
        let body2 = classNames('img-area',{
            'active':this.state.body2
        });
        let body3 = classNames('img-area',{
            'active':this.state.body3
        });
        let body4 = classNames('img-area',{
            'active':this.state.body4
        });

        let body5 = classNames('img-area',{
            'active':this.state.body5
        });

        return (
            <div className="swiper-slide" >
                <h2 className="title">选择你的身型</h2>
                <section className="body-area">
                    <section className="item">
                        <div className={body1} onClick={()=>{this.setState({ body1:true, body2:false,body3:false,body4:false,body5:false,bodySize:'1'})}}>
                            <img src="/assets/img/body1.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={body2} onClick={()=>{this.setState({ body1:false, body2:true,body3:false,body4:false,body5:false,bodySize:'2'})}}>
                            <img src="/assets/img/body2.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={body3} onClick={()=>{this.setState({ body1:false, body2:false,body3:true,body4:false,body5:false,bodySize:'3'})}}>
                            <img src="/assets/img/body3.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={body4} onClick={()=>{this.setState({ body1:false, body2:false,body3:false,body4:true,body5:false,bodySize:'4'})}}>
                            <img src="/assets/img/body4.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={body5} onClick={()=>{this.setState({ body1:false, body2:false,body3:false,body4:false,body5:true,bodySize:'5'})}}>
                            <img src="/assets/img/body5.png" alt=""/>
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}
//女-希望搭配能解决什么
class GirlResolve extends  Component{
    constructor(props){
        super(props);
        this.state={
            resolve1:false,//脸大
            resolve2:false,//肩宽
            resolve3:false,//胳膊粗
            resolve4:true,//小粗腿
            resolve5:false,//脖子粗
            resolve6:false,//大胸
            resolve7:false,//平胸
            resolve8:false,//PP大
            resolve9:false,//小短腿
        }
        let {path}=this.props.state;
        this.myData=path['/customSuitGirl'];
        this.myData.path = '/customSuitGirl';
    }
    componentWillUpdate(nextProps,nextState){
        let problem=[];
        if(nextState.resolve1){
            problem.push('1');
        }
        if(nextState.resolve2){
            problem.push('2');
        }
        if(nextState.resolve3){
            problem.push('3');
        }
        if(nextState.resolve4){
            problem.push('4');
        }
        if(nextState.resolve5){
            problem.push('5');
        }
        if(nextState.resolve6){
            problem.push('6');
        }
        if(nextState.resolve7){
            problem.push('7');
        }
        if(nextState.resolve8){
            problem.push('8');
        }
        if(nextState.resolve9){
            problem.push('9');
        }
        this.myData.data.problem=problem;
        this.props.setState(this.myData);
    }


    select(type){
        this.setState({[type]:!this.state[type]});
    }

    render(){
        let resolve1 = classNames('resolve resolve1',{
            'active':this.state.resolve1
        });
        let resolve2 = classNames('resolve resolve2',{
            'active':this.state.resolve2
        });
        let resolve3 = classNames('resolve resolve3',{
            'active':this.state.resolve3
        });
        let resolve4 = classNames('resolve resolve4',{
            'active':this.state.resolve4
        });

        let resolve5 = classNames('resolve resolve5',{
            'active':this.state.resolve5
        });

        let resolve6 = classNames('resolve resolve6',{
            'active':this.state.resolve6
        });

        let resolve7 = classNames('resolve resolve7',{
            'active':this.state.resolve7
        });

        let resolve8 = classNames('resolve resolve8',{
            'active':this.state.resolve8
        });

        let resolve9 = classNames('resolve resolve9',{
            'active':this.state.resolve9
        });

        return (
            <div className="swiper-slide" >
                <h2 className="title">希望搭配能解决什么（多选）</h2>
                <section className="resolve-area">
                    <img src="/assets/img/resolve.jpg" alt=""/>
                    <lable className={resolve1} onClick={this.select.bind(this,'resolve1')}>脸大</lable>
                    <lable className={resolve2} onClick={this.select.bind(this,'resolve2')}>肩宽</lable>
                    <lable className={resolve3} onClick={this.select.bind(this,'resolve3')}>胳膊粗</lable>
                    <lable className={resolve4} onClick={this.select.bind(this,'resolve4')}>小粗腿</lable>
                    <lable className={resolve5} onClick={this.select.bind(this,'resolve5')}>脖子粗</lable>
                    <lable className={resolve6} onClick={this.select.bind(this,'resolve6')}>大胸</lable>
                    <lable className={resolve7} onClick={this.select.bind(this,'resolve7')}>平胸</lable>
                    <lable className={resolve8} onClick={this.select.bind(this,'resolve8')}>PP大</lable>
                    <lable className={resolve9} onClick={this.select.bind(this,'resolve9')}>小短腿</lable>
                </section>
            </div>
        )
    }
}
//女-风格
class GirlStyle extends Component{
    constructor(props){
        super(props);
        this.state={
            style1:false,//韩系女主角
            style2:false,//日系小清新
            style3:false,//轻熟OL西
            style4:false,//欧美出街范
            style5:false,//中性运动风
            style6:false,//文艺复古情怀
        }

        let {path}=this.props.state;
        this.myData=path['/customSuitGirl'];
        this.myData.path = '/customSuitGirl';
    }

    componentWillUpdate(nextProps,nextState){
        let style=[];
        if(nextState.style1){
            style.push('1');
        }
        if(nextState.style2){
            style.push('2');
        }
        if(nextState.style3){
            style.push('3');
        }
        if(nextState.style4){
            style.push('4');
        }
        if(nextState.style5){
            style.push('5');
        }
        if(nextState.style6){
            style.push('6');
        }
        this.myData.data.style=style;
        this.props.setState(this.myData);
    }

    select(type){
        this.setState({[type]:!this.state[type]});
    }

    render(){
        let style1 = classNames('img-area',{
            'active':this.state.style1
        });
        let style2 = classNames('img-area',{
            'active':this.state.style2
        });
        let style3 = classNames('img-area',{
            'active':this.state.style3
        });
        let style4 = classNames('img-area',{
            'active':this.state.style4
        });

        let style5 = classNames('img-area',{
            'active':this.state.style5
        });

        let style6 = classNames('img-area',{
            'active':this.state.style6
        });

        return (
            <div className="swiper-slide" >
                <h2 className="title">您喜欢的风格（多选）</h2>
                <section className="style-area">
                    <section className="item">
                        <div className={style1} onClick={this.select.bind(this,'style1')}>
                            <img src="/assets/img/style1.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={style2} onClick={this.select.bind(this,'style2')}>
                            <img src="/assets/img/style2.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={style3} onClick={this.select.bind(this,'style3')}>
                            <img src="/assets/img/style3.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={style4} onClick={this.select.bind(this,'style4')}>
                            <img src="/assets/img/style4.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={style5} onClick={this.select.bind(this,'style5')}>
                            <img src="/assets/img/style5.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={style6} onClick={this.select.bind(this,'style6')}>
                            <img src="/assets/img/style6.png" alt=""/>
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}
//女-基础信息
class GirlBaseInfo extends Component{
    constructor(props){
        super(props);

        let {path}=this.props.state;
        this.myData=path['/customSuitGirl'];
        this.myData.path = '/customSuitGirl';
    }
    componentDidMount(){
        //身高
        new Swiper('.J-height', {
            initialSlide:15,
            slidesPerView : 5,
            centeredSlides : true,
            freeMode : true,
            freeModeSticky : true,
            onTap:(swiper)=>{
                swiper.slideTo(swiper.clickedIndex,100,false);
                let heigh=swiper.slides[swiper.clickedIndex].textContent.trim();
                this.myData.data.heigh=heigh;
                this.props.setState(this.myData);
            },
            onTransitionEnd:(swiper)=> {//slide改变
                let heigh=swiper.slides[swiper.activeIndex].textContent.trim();
                this.myData.data.heigh=heigh;
                this.props.setState(this.myData);
            }
        });
        //体重
        new Swiper('.J-weight', {
            initialSlide:25,
            slidesPerView : 5,
            centeredSlides : true,
            freeMode : true,
            freeModeSticky : true,
            onTap:(swiper)=>{
                swiper.slideTo(swiper.clickedIndex,100,false);
                let weight=swiper.slides[swiper.clickedIndex].textContent;
                this.myData.data.weight=weight;
                this.props.setState(this.myData);
            },
            onTransitionEnd:(swiper)=> {//slide改变
                let weight=swiper.slides[swiper.activeIndex].textContent;
                this.myData.data.weight=weight;
                this.props.setState(this.myData);
            }
        });
        //胸围
        new Swiper('.J-chest', {
            initialSlide:10,
            slidesPerView : 5,
            centeredSlides : true,
            freeMode : true,
            freeModeSticky : true,
            onTap:(swiper)=>{
                swiper.slideTo(swiper.clickedIndex,100,false);
                let chest=swiper.slides[swiper.clickedIndex].textContent;
                this.myData.data.chest=chest;
                this.props.setState(this.myData);
            },
            onTransitionEnd:(swiper)=> {//slide改变
                let chest=swiper.slides[swiper.activeIndex].textContent;
                this.myData.data.chest=chest;
                this.props.setState(this.myData);
            }
        });
        //腰围
        new Swiper('.J-waistline', {
            initialSlide:20,
            slidesPerView : 5,
            centeredSlides : true,
            freeMode : true,
            freeModeSticky : true,
            onTap:(swiper)=>{
                swiper.slideTo(swiper.clickedIndex,100,false);
                let waist=swiper.slides[swiper.clickedIndex].textContent;
                this.myData.data.waist=waist;
                this.props.setState(this.waist);
            },
            onTransitionEnd:(swiper)=> {//slide改变
                let waist=swiper.slides[swiper.activeIndex].textContent;
                this.myData.data.waist=waist;
                this.props.setState(this.myData);
            }
        });
        //臀围
        new Swiper('.J-hipline', {
            initialSlide:10,
            slidesPerView : 5,
            centeredSlides : true,
            freeMode : true,
            freeModeSticky : true,
            onTap:(swiper)=>{
                swiper.slideTo(swiper.clickedIndex,100,false);
                let hip=swiper.slides[swiper.clickedIndex].textContent;
                this.myData.data.hip=hip;
                this.props.setState(this.myData);
            },
            onTransitionEnd:(swiper)=> {//slide改变
                let hip=swiper.slides[swiper.activeIndex].textContent;
                this.myData.data.hip=hip;
                this.props.setState(this.myData);
            }
        });
    }
    render(){
        //身高
        let hegithArr=[];
        for(let i=0;i<=35;i++){
            hegithArr.push(<div className="swiper-slide" key={i}>{145+i}</div>);
        }

        //体重
        let weightArr=[];
        for(let i=0;i<=40;i++){
            weightArr.push(<div className="swiper-slide" key={i}>{35+i}</div>);
        }

        //胸围
        let chestArr=[];
        for(let i=0;i<=40;i++){
            chestArr.push(<div className="swiper-slide" key={i}>{70+i}</div>);
        }

        //腰围
        let waistlineArr=[];
        for(let i=0;i<=40;i++){
            waistlineArr.push(<div className="swiper-slide" key={i}>{50+i}</div>);
        }

        //臀围
        let hiplineArr=[];
        for(let i=0;i<=30;i++){
            hiplineArr.push(<div className="swiper-slide" key={i}>{80+i}</div>);
        }

        return (
            <div className="swiper-slide" >
                <h2 className="title">基础信息</h2>
                <section className="baseinfo-area">
                    <h4 className="title">身高（CM）</h4>
                    <div className="swiper-container J-height">
                        <div className="swiper-wrapper">
                            {hegithArr}
                        </div>
                    </div>
                    <h4 className="title">体重（KG）</h4>
                    <div className="swiper-container J-weight">
                        <div className="swiper-wrapper">
                            {weightArr}
                        </div>
                    </div>
                    <h4 className="title">胸围（CM）</h4>
                    <div className="swiper-container J-chest">
                        <div className="swiper-wrapper">
                            {chestArr}
                        </div>
                    </div>
                    <h4 className="title">腰围（CM）</h4>
                    <div className="swiper-container J-waistline">
                        <div className="swiper-wrapper">
                            {waistlineArr}
                        </div>
                    </div>
                    <h4 className="title">臀围（CM）</h4>
                    <div className="swiper-container J-hipline">
                        <div className="swiper-wrapper">
                            {hiplineArr}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
//女-其他信息
class GirlOtherinfo extends Component{
    constructor(props){
        super(props);
        this.state={
            photoList:[]//生活照片
        }
        this._time=0;
        let {path}=this.props.state;
        this.myData=path['/customSuitGirl'];
        this.myData.path = '/customSuitGirl';
    }


    componentWillUpdate(nextProps,nextState){
        this.myData.data.lifeImg=nextState.photoList;
        this.props.setState(this.myData);
    }

    componentWillUnmount(){
        clearTimeout(this._time);
    }


    uploadPhoto(e){
        let self=this;
        let files=e.target.files;
        if(files){
            if(files.length + this.state.photoList.length >5){
                alert('最多上传5张照片哦');
                return;
            }
            for(let i=0;i<files.length;i++){
                if (!/\/(?:jpeg|jpg|png)/i.test(files[i].type)) return;
                let readFile=new FileReader();
                readFile.onload=function () {
                    let imgObj={
                        url:this.result,
                        file:files[i]
                    };
                    let newPhotoList=Array.prototype.slice.apply(self.state.photoList);
                    newPhotoList.push(imgObj);
                    self.refs.file.value='';
                    self.setState({
                        photoList:newPhotoList
                    });
                };
                readFile.readAsDataURL(e.target.files[i]);
            }
        }
    }

    deletePhoto(e){
        let index=e.currentTarget.getAttribute('data-index');
        let newPhotoList=this.state.photoList;
        newPhotoList.splice(index,1);
        this.setState({
           photoList:newPhotoList
        });
    }

    sendForm(e){
        let {
            sex,//性别
            faceshpe,//脸型
            colorofskin,//肤色
            bodySize,//体型
            problem,//解决问题
            style,//风格
            heigh,//身高
            weight,//体重
            chest,//胸围
            waist,//腰围
            hip,//臀围
            professional,//职业
            cityCode,//城市
            birthday,//生日
            lifeImg//生活照
        }=this.props.state.path['/customSuitGirl'].data;
        let formdata=new FormData();
        formdata.append('sex',sex);
        formdata.append('faceshpe',faceshpe);
        formdata.append('colorofskin',colorofskin);
        formdata.append('bodySize',bodySize);
        formdata.append('problem',problem);
        formdata.append('style',style);
        formdata.append('heigh',heigh);
        formdata.append('weight',weight);
        formdata.append('problems',problem);
        formdata.append('chest',chest);
        formdata.append('waist',waist);
        formdata.append('hip',hip);
        formdata.append('professional',professional);
        formdata.append('cityCode',cityCode);
        formdata.append('birthday',birthday);
        lifeImg.forEach((item,index)=>{
            formdata.append('lifeImg',item.file);
        });

        console.log(this.props.state.path['/customSuitGirl']);

        ToolDps.post('/wx/user/save',formdata,{'Content-Type':'multipart/form-data'}).then((res)=>{
            if(res.succ){
                this.props.showMsg(true,'提交成功');
                this._time=setTimeout(()=>{
                    this.context.router.push('/fashionMoment');
                },1000);
            }else{
                this.props.showMsg(true,'提交失败');
            }
        });


    }

    /**
     * 获取职业
     * */
    getProfessional(e){
        this.myData.data.professional=e.target.value;
        this.props.setState(this.myData);
    }

    /**
     * 获取城市代码
     * */
    getCity(city){
        let {currCity} = city;
        this.myData.data.cityCode=currCity;
        this.props.setState(this.myData);
    }

    /**
     * 获取生日
     * */
    getBirthDate(e){
        this.myData.data.birthday=e.target.value;
        this.props.setState(this.myData);
    }

    render(){
        return (
            <div className="swiper-slide" >
                <section className="otherinfo-area">
                    <div className="form-ground">
                        <div className="item">
                            <label htmlFor="job">职业</label>
                        </div>
                        <div className="item">
                            <input id="job" type="text" placeholder="输入您的职业" maxLength={20} onChange={this.getProfessional.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-ground">
                        <div className="item">
                            <label htmlFor="city">城市</label>
                        </div>
                        <City defaultProvince="330000" defaultCity="330100" defaultArea="330106"  getCity={this.getCity.bind(this)}/>
                    </div>
                    <div className="form-ground">
                        <div className="item">
                            <label htmlFor="birthDate">生日</label>
                        </div>
                        <div className="item">
                            <input id="birthDate" type="date" defaultValue={'1992-08-08'} onChange={this.getBirthDate.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-ground life-photo-title">
                        <div className="item">
                            <label>照片</label>
                        </div>
                        <div className="item">
                            <small>上传你最近的生活照</small>
                        </div>
                    </div>
                    <div className="life-photo-area">
                        <div className="item">
                            <div className="img icon-add">
                                {/*accept="image/jpeg,image/png,image/gif"*/}
                                <input type="file" ref='file' multiple className="upload-file"  onChange={this.uploadPhoto.bind(this)} />
                            </div>
                        </div>
                        {
                            this.state.photoList.map((item, index) => {
                                return <LifePhoto key={index}  {...item} index={index} deletePhoto={this.deletePhoto.bind(this)} />
                            })
                        }
                    </div>
                    <button className="sendBtn" onClick={this.sendForm.bind(this)}>提交</button>
                </section>
            </div>
        )
    }
}


GirlOtherinfo.contextTypes={
    router:React.PropTypes.object.isRequired
};

//男-脸型
class BoyFace extends Component{
    constructor(props){
        super(props);
        this.state={
            face1:true,//鹅蛋脸
            face2:false,//圆脸
            face3:false,//瓜子脸
            face4:false,//方脸
            faceshpe:'1'//脸型
        };

        let {path}=this.props.state;
        this.myData=path['/customSuitBoy'];
        this.myData.path = '/customSuitBoy';

    }

    componentWillUpdate(nextProps,nextState){
        this.myData.data.faceshpe=nextState.faceshpe;
        this.props.setState(this.myData);
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.face1 !== this.state.face1 ||  nextState.face2 !== this.state.face2 || nextState.face3 !== this.state.face3 || nextState.face4 !== this.state.face4;
    }

    render(){
        let face1 = classNames('img-area',{
            'active':this.state.face1
        });
        let face2 = classNames('img-area',{
            'active':this.state.face2
        });
        let face3 = classNames('img-area',{
            'active':this.state.face3
        });
        let face4 = classNames('img-area',{
            'active':this.state.face4
        });

        return (
            <div className="swiper-slide" >
                <h2 className="title">选择你的脸型</h2>
                <section className="face-area">
                    <section className="item">
                        <div className={face1} onClick={()=>{this.setState({ face1:true, face2:false,face3:false,face4:false,faceshpe:'1'})}}>
                            <img src="/assets/img/face1.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={face2} onClick={()=>{this.setState({ face1:false, face2:true,face3:false,face4:false,faceshpe:'2'})}}>
                            <img src="/assets/img/face2.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={face3} onClick={()=>{this.setState({ face1:false, face2:false,face3:true,face4:false,faceshpe:'3'})}}>
                            <img src="/assets/img/face3.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={face4} onClick={()=>{this.setState({ face1:false, face2:false,face3:false,face4:true,faceshpe:'4'})}}>
                            <img src="/assets/img/face4.png" alt=""/>
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}
//男-肤色
class  BoySkin extends  Component{
    constructor(props){
        super(props);
        this.state={
            skin1:true,//晶莹白皙
            skin2:false,//自然红润
            skin3:false,//自然偏黄
            skin4:false,//活力小麦
            colorofskin: '1',//肤色
        }

        let {path}=this.props.state;
        this.myData=path['/customSuitBoy'];
        this.myData.path = '/customSuitBoy';
    }

    componentWillUpdate(nextProps,nextState){
        this.myData.data.colorofskin=nextState.colorofskin;
        this.props.setState(this.myData);
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.skin1 !== this.state.skin1 || nextState.skin2 !== this.state.skin2 || nextState.skin3 !== this.state.skin3 || nextState.skin4 !== this.state.skin4;
    }
    render(){
        let skin1 = classNames('img-area',{
            'active':this.state.skin1
        });
        let skin2 = classNames('img-area',{
            'active':this.state.skin2
        });
        let skin3 = classNames('img-area',{
            'active':this.state.skin3
        });
        let skin4 = classNames('img-area',{
            'active':this.state.skin4
        });

        return (
            <div className="swiper-slide" >
                <h2 className="title">选择你的肤色</h2>
                <section className="skin-area">
                    <section className="item">
                        <div className={skin1} onClick={()=>{this.setState({ skin1:true, skin2:false,skin3:false,skin4:false,colorofskin:'1'})}}>
                            <img src="/assets/img/skin1.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={skin2} onClick={()=>{this.setState({ skin1:false, skin2:true,skin3:false,skin4:false,colorofskin:'2'})}}>
                            <img src="/assets/img/skin2.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={skin3} onClick={()=>{this.setState({ skin1:false, skin2:false,skin3:true,skin4:false,colorofskin:'3'})}}>
                            <img src="/assets/img/skin3.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={skin4} onClick={()=>{this.setState({ skin1:false, skin2:false,skin3:false,skin4:true,colorofskin:'4'})}}>
                            <img src="/assets/img/skin4.png" alt=""/>
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}
//男-身型
class BoyBody extends  Component{
    constructor(props){
        super(props);
        this.state={
            body1:true,//沙漏型
            body2:false,//梨型
            body3:false,//苹果型
            body4:false,//直筒型
            body5:false,//倒三角
            bodySize: '1',//体型
        }
        let {path}=this.props.state;
        this.myData=path['/customSuitBoy'];
        this.myData.path = '/customSuitBoy';
    }

    componentWillUpdate(nextProps,nextState){
        this.myData.data.bodySize=nextState.bodySize;
        this.props.setState(this.myData);
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.body1 !== this.state.body1 || nextState.body2 !== this.state.body2 || nextState.body3 !== this.state.body3 || nextState.body4 !== this.state.body4 || nextState.body5 !== this.state.body5;
    }
    render(){
        let body1 = classNames('img-area',{
            'active':this.state.body1
        });
        let body2 = classNames('img-area',{
            'active':this.state.body2
        });
        let body3 = classNames('img-area',{
            'active':this.state.body3
        });
        let body4 = classNames('img-area',{
            'active':this.state.body4
        });

        let body5 = classNames('img-area',{
            'active':this.state.body5
        });

        return (
            <div className="swiper-slide" >
                <h2 className="title">选择你的身型</h2>
                <section className="body-area">
                    <section className="item">
                        <div className={body1} onClick={()=>{this.setState({ body1:true, body2:false,body3:false,body4:false,body5:false,bodySize:'1'})}}>
                            <img src="/assets/img/body1.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={body2} onClick={()=>{this.setState({ body1:false, body2:true,body3:false,body4:false,body5:false,bodySize:'2'})}}>
                            <img src="/assets/img/body2.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={body3} onClick={()=>{this.setState({ body1:false, body2:false,body3:true,body4:false,body5:false,bodySize:'3'})}}>
                            <img src="/assets/img/body3.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={body4} onClick={()=>{this.setState({ body1:false, body2:false,body3:false,body4:true,body5:false,bodySize:'4'})}}>
                            <img src="/assets/img/body4.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={body5} onClick={()=>{this.setState({ body1:false, body2:false,body3:false,body4:false,body5:true,bodySize:'5'})}}>
                            <img src="/assets/img/body5.png" alt=""/>
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}
//男-希望搭配能解决什么
class BoyResolve extends  Component{
    constructor(props){
        super(props);
        this.state={
            resolve1:false,//脸大
            resolve2:false,//肩宽
            resolve3:false,//胳膊粗
            resolve4:true,//小粗腿
            resolve5:false,//脖子粗
            resolve6:false,//大胸
            resolve7:false,//平胸
            resolve8:false,//PP大
            resolve9:false,//小短腿
        }
        let {path}=this.props.state;
        this.myData=path['/customSuitBoy'];
        this.myData.path = '/customSuitBoy';
    }
    componentWillUpdate(nextProps,nextState){
        let problem=[];
        if(nextState.resolve1){
            problem.push('1');
        }
        if(nextState.resolve2){
            problem.push('2');
        }
        if(nextState.resolve3){
            problem.push('3');
        }
        if(nextState.resolve4){
            problem.push('4');
        }
        if(nextState.resolve5){
            problem.push('5');
        }
        if(nextState.resolve6){
            problem.push('6');
        }
        if(nextState.resolve7){
            problem.push('7');
        }
        if(nextState.resolve8){
            problem.push('8');
        }
        if(nextState.resolve9){
            problem.push('9');
        }
        this.myData.data.problem=problem;
        this.props.setState(this.myData);
    }


    select(type){
        this.setState({[type]:!this.state[type]});
    }

    render(){
        let resolve1 = classNames('resolve resolve1',{
            'active':this.state.resolve1
        });
        let resolve2 = classNames('resolve resolve2',{
            'active':this.state.resolve2
        });
        let resolve3 = classNames('resolve resolve3',{
            'active':this.state.resolve3
        });
        let resolve4 = classNames('resolve resolve4',{
            'active':this.state.resolve4
        });

        let resolve5 = classNames('resolve resolve5',{
            'active':this.state.resolve5
        });

        let resolve6 = classNames('resolve resolve6',{
            'active':this.state.resolve6
        });

        let resolve7 = classNames('resolve resolve7',{
            'active':this.state.resolve7
        });

        let resolve8 = classNames('resolve resolve8',{
            'active':this.state.resolve8
        });

        let resolve9 = classNames('resolve resolve9',{
            'active':this.state.resolve9
        });

        return (
            <div className="swiper-slide" >
                <h2 className="title">希望搭配能解决什么（多选）</h2>
                <section className="resolve-area">
                    <img src="/assets/img/resolve.jpg" alt=""/>
                    <lable className={resolve1} onClick={this.select.bind(this,'resolve1')}>脸大</lable>
                    <lable className={resolve2} onClick={this.select.bind(this,'resolve2')}>肩宽</lable>
                    <lable className={resolve3} onClick={this.select.bind(this,'resolve3')}>胳膊粗</lable>
                    <lable className={resolve4} onClick={this.select.bind(this,'resolve4')}>小粗腿</lable>
                    <lable className={resolve5} onClick={this.select.bind(this,'resolve5')}>脖子粗</lable>
                    <lable className={resolve6} onClick={this.select.bind(this,'resolve6')}>大胸</lable>
                    <lable className={resolve7} onClick={this.select.bind(this,'resolve7')}>平胸</lable>
                    <lable className={resolve8} onClick={this.select.bind(this,'resolve8')}>PP大</lable>
                    <lable className={resolve9} onClick={this.select.bind(this,'resolve9')}>小短腿</lable>
                </section>
            </div>
        )
    }
}
//男-风格
class BoyStyle extends Component{
    constructor(props){
        super(props);
        this.state={
            style1:false,//韩系女主角
            style2:false,//日系小清新
            style3:false,//轻熟OL西
            style4:false,//欧美出街范
            style5:false,//中性运动风
            style6:false,//文艺复古情怀
        }

        let {path}=this.props.state;
        this.myData=path['/customSuitBoy'];
        this.myData.path = '/customSuitBoy';
    }

    componentWillUpdate(nextProps,nextState){
        let style=[];
        if(nextState.style1){
            style.push('1');
        }
        if(nextState.style2){
            style.push('2');
        }
        if(nextState.style3){
            style.push('3');
        }
        if(nextState.style4){
            style.push('4');
        }
        if(nextState.style5){
            style.push('5');
        }
        if(nextState.style6){
            style.push('6');
        }
        this.myData.data.style=style;
        this.props.setState(this.myData);
    }

    select(type){
        this.setState({[type]:!this.state[type]});
    }

    render(){
        let style1 = classNames('img-area',{
            'active':this.state.style1
        });
        let style2 = classNames('img-area',{
            'active':this.state.style2
        });
        let style3 = classNames('img-area',{
            'active':this.state.style3
        });
        let style4 = classNames('img-area',{
            'active':this.state.style4
        });

        let style5 = classNames('img-area',{
            'active':this.state.style5
        });

        let style6 = classNames('img-area',{
            'active':this.state.style6
        });

        return (
            <div className="swiper-slide" >
                <h2 className="title">您喜欢的风格（多选）</h2>
                <section className="style-area">
                    <section className="item">
                        <div className={style1} onClick={this.select.bind(this,'style1')}>
                            <img src="/assets/img/style1.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={style2} onClick={this.select.bind(this,'style2')}>
                            <img src="/assets/img/style2.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={style3} onClick={this.select.bind(this,'style3')}>
                            <img src="/assets/img/style3.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={style4} onClick={this.select.bind(this,'style4')}>
                            <img src="/assets/img/style4.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={style5} onClick={this.select.bind(this,'style5')}>
                            <img src="/assets/img/style5.png" alt=""/>
                        </div>
                    </section>
                    <section className="item">
                        <div className={style6} onClick={this.select.bind(this,'style6')}>
                            <img src="/assets/img/style6.png" alt=""/>
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}
//男-基础信息
class BoyBaseInfo extends Component{
    constructor(props){
        super(props);

        let {path}=this.props.state;
        this.myData=path['/customSuitBoy'];
        this.myData.path = '/customSuitBoy';
    }
    componentDidMount(){
        //身高
        new Swiper('.J-height', {
            initialSlide:20,
            slidesPerView : 5,
            centeredSlides : true,
            freeMode : true,
            freeModeSticky : true,
            onTap:(swiper)=>{
                swiper.slideTo(swiper.clickedIndex,100,false);
                let heigh=swiper.slides[swiper.clickedIndex].textContent.trim();
                this.myData.data.heigh=heigh;
                this.props.setState(this.myData);
            },
            onTransitionEnd:(swiper)=> {//slide改变
                let heigh=swiper.slides[swiper.activeIndex].textContent.trim();
                this.myData.data.heigh=heigh;
                this.props.setState(this.myData);
            }
        });
        //体重
        new Swiper('.J-weight', {
            initialSlide:20,
            slidesPerView : 5,
            centeredSlides : true,
            freeMode : true,
            freeModeSticky : true,
            onTap:(swiper)=>{
                swiper.slideTo(swiper.clickedIndex,100,false);
                let weight=swiper.slides[swiper.clickedIndex].textContent;
                this.myData.data.weight=weight;
                this.props.setState(this.myData);
            },
            onTransitionEnd:(swiper)=> {//slide改变
                let weight=swiper.slides[swiper.activeIndex].textContent;
                this.myData.data.weight=weight;
                this.props.setState(this.myData);
            }
        });
        //胸围
        new Swiper('.J-chest', {
            initialSlide:10,
            slidesPerView : 5,
            centeredSlides : true,
            freeMode : true,
            freeModeSticky : true,
            onTap:(swiper)=>{
                swiper.slideTo(swiper.clickedIndex,100,false);
                let chest=swiper.slides[swiper.clickedIndex].textContent;
                this.myData.data.chest=chest;
                this.props.setState(this.myData);
            },
            onTransitionEnd:(swiper)=> {//slide改变
                let chest=swiper.slides[swiper.activeIndex].textContent;
                this.myData.data.chest=chest;
                this.props.setState(this.myData);
            }
        });
        //腰围
        new Swiper('.J-waistline', {
            initialSlide:20,
            slidesPerView : 5,
            centeredSlides : true,
            freeMode : true,
            freeModeSticky : true,
            onTap:(swiper)=>{
                swiper.slideTo(swiper.clickedIndex,100,false);
                let waist=swiper.slides[swiper.clickedIndex].textContent;
                this.myData.data.waist=waist;
                this.props.setState(this.waist);
            },
            onTransitionEnd:(swiper)=> {//slide改变
                let waist=swiper.slides[swiper.activeIndex].textContent;
                this.myData.data.waist=waist;
                this.props.setState(this.myData);
            }
        });
        //臀围
        new Swiper('.J-hipline', {
            initialSlide:10,
            slidesPerView : 5,
            centeredSlides : true,
            freeMode : true,
            freeModeSticky : true,
            onTap:(swiper)=>{
                swiper.slideTo(swiper.clickedIndex,100,false);
                let hip=swiper.slides[swiper.clickedIndex].textContent;
                this.myData.data.hip=hip;
                this.props.setState(this.myData);
            },
            onTransitionEnd:(swiper)=> {//slide改变
                let hip=swiper.slides[swiper.activeIndex].textContent;
                this.myData.data.hip=hip;
                this.props.setState(this.myData);
            }
        });
    }
    render(){
        //身高
        let hegithArr=[];
        for(let i=0;i<=40;i++){
            hegithArr.push(<div className="swiper-slide" key={i}>{150+i}</div>);
        }

        //体重
        let weightArr=[];
        for(let i=0;i<=40;i++){
            weightArr.push(<div className="swiper-slide" key={i}>{40+i}</div>);
        }

        //胸围
        let chestArr=[];
        for(let i=0;i<=40;i++){
            chestArr.push(<div className="swiper-slide" key={i}>{70+i}</div>);
        }

        //腰围
        let waistlineArr=[];
        for(let i=0;i<=40;i++){
            waistlineArr.push(<div className="swiper-slide" key={i}>{50+i}</div>);
        }

        //臀围
        let hiplineArr=[];
        for(let i=0;i<=30;i++){
            hiplineArr.push(<div className="swiper-slide" key={i}>{80+i}</div>);
        }

        return (
            <div className="swiper-slide" >
                <h2 className="title">基础信息</h2>
                <section className="baseinfo-area">
                    <h4 className="title">身高（CM）</h4>
                    <div className="swiper-container J-height">
                        <div className="swiper-wrapper">
                            {hegithArr}
                        </div>
                    </div>
                    <h4 className="title">体重（KG）</h4>
                    <div className="swiper-container J-weight">
                        <div className="swiper-wrapper">
                            {weightArr}
                        </div>
                    </div>
                    <h4 className="title">胸围（CM）</h4>
                    <div className="swiper-container J-chest">
                        <div className="swiper-wrapper">
                            {chestArr}
                        </div>
                    </div>
                    <h4 className="title">腰围（CM）</h4>
                    <div className="swiper-container J-waistline">
                        <div className="swiper-wrapper">
                            {waistlineArr}
                        </div>
                    </div>
                    <h4 className="title">臀围（CM）</h4>
                    <div className="swiper-container J-hipline">
                        <div className="swiper-wrapper">
                            {hiplineArr}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
//男-其他信息
class BoyOtherinfo extends Component{
    constructor(props){
        super(props);
        this.state={
            photoList:[]//生活照片
        }
        this._time=0;
        let {path}=this.props.state;
        this.myData=path['/customSuitBoy'];
        this.myData.path = '/customSuitBoy';
    }


    componentWillUpdate(nextProps,nextState){
        this.myData.data.lifeImg=nextState.photoList;
        this.props.setState(this.myData);
    }

    componentWillUnmount(){
        clearTimeout(this._time);
    }

    uploadPhoto(e){
        let self=this;
        let files=e.target.files;
        if(files){
            if(files.length + this.state.photoList.length >5){
                alert('最多上传5张照片哦');
                return;
            }
            for(let i=0;i<files.length;i++){
                if (!/\/(?:jpeg|jpg|png)/i.test(files[i].type)) return;
                let readFile=new FileReader();
                readFile.onload=function () {
                    let imgObj={
                        url:this.result,
                        file:files[i]
                    };
                    let newPhotoList=Array.prototype.slice.apply(self.state.photoList);
                    newPhotoList.push(imgObj);
                    self.refs.file.value='';
                    self.setState({
                        photoList:newPhotoList
                    });
                };
                readFile.readAsDataURL(e.target.files[i]);
            }
        }
    }

    deletePhoto(e){
        let index=e.currentTarget.getAttribute('data-index');
        let newPhotoList=this.state.photoList;
        newPhotoList.splice(index,1);
        this.setState({
            photoList:newPhotoList
        });
    }

    sendForm(e){
        let {
            sex,//性别
            faceshpe,//脸型
            colorofskin,//肤色
            bodySize,//体型
            problem,//解决问题
            style,//风格
            heigh,//身高
            weight,//体重
            chest,//胸围
            waist,//腰围
            hip,//臀围
            professional,//职业
            cityCode,//城市
            birthday,//生日
            lifeImg//生活照
        }=this.props.state.path['/customSuitBoy'].data;
        let formdata=new FormData();
        formdata.append('sex',sex);
        formdata.append('faceshpe',faceshpe);
        formdata.append('colorofskin',colorofskin);
        formdata.append('bodySize',bodySize);
        formdata.append('problem',problem);
        formdata.append('style',style);
        formdata.append('heigh',heigh);
        formdata.append('weight',weight);
        formdata.append('problems',problem);
        formdata.append('chest',chest);
        formdata.append('waist',waist);
        formdata.append('hip',hip);
        formdata.append('professional',professional);
        formdata.append('cityCode',cityCode);
        formdata.append('birthday',birthday);
        lifeImg.forEach((item,index)=>{
            formdata.append('lifeImg',item.file);
        });

        console.log(this.props.state.path['/customSuitBoy'].data)

        ToolDps.post('/wx/user/save',formdata,{'Content-Type':'multipart/form-data'}).then((res)=>{
            if(res.succ){
                this.props.showMsg(true,'提交成功');
                this._time=setTimeout(()=>{
                    this.context.router.push('/fashionMoment');
                },1000);
            }else{
                this.props.showMsg(true,'提交失败');
            }
        });


    }

    /**
     * 获取职业
     * */
    getProfessional(e){
        this.myData.data.professional=e.target.value;
        this.props.setState(this.myData);
    }

    /**
     * 获取城市代码
     * */
    getCity(city){
        let {currCity} = city;
        this.myData.data.cityCode=currCity;
        this.props.setState(this.myData);
    }

    /**
     * 获取生日
     * */
    getBirthDate(e){
        this.myData.data.birthday=e.target.value;
        this.props.setState(this.myData);
    }

    render(){
        return (
            <div className="swiper-slide" >
                <section className="otherinfo-area">
                    <div className="form-ground">
                        <div className="item">
                            <label htmlFor="job">职业</label>
                        </div>
                        <div className="item">
                            <input id="job" type="text" placeholder="输入您的职业" maxLength={20} onChange={this.getProfessional.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-ground">
                        <div className="item">
                            <label htmlFor="city">城市</label>
                        </div>
                        <City defaultProvince="330000" defaultCity="330100" defaultArea="330106"  getCity={this.getCity.bind(this)}/>
                    </div>
                    <div className="form-ground">
                        <div className="item">
                            <label htmlFor="birthDate">生日</label>
                        </div>
                        <div className="item">
                            <input id="birthDate" type="date" defaultValue={'1992-08-08'} onChange={this.getBirthDate.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-ground life-photo-title">
                        <div className="item">
                            <label>照片</label>
                        </div>
                        <div className="item">
                            <small>上传你最近的生活照</small>
                        </div>
                    </div>
                    <div className="life-photo-area">
                        <div className="item">
                            <div className="img icon-add">
                                {/*accept="image/jpeg,image/png,image/gif"*/}
                                <input type="file" ref='file' multiple className="upload-file"  onChange={this.uploadPhoto.bind(this)} />
                            </div>
                        </div>
                        {
                            this.state.photoList.map((item, index) => {
                                return <LifePhoto key={index}  {...item} index={index} deletePhoto={this.deletePhoto.bind(this)} />
                            })
                        }
                    </div>
                    <button className="sendBtn" onClick={this.sendForm.bind(this)}>提交</button>
                </section>
            </div>
        )
    }
}

BoyOtherinfo.contextTypes={
    router:React.PropTypes.object.isRequired
};

//生活照
class LifePhoto extends Component{
    constructor(props){
        super(props);
    }


    delete(e){
        this.props.deletePhoto(e);
    }
    render(){
        let {url,index} =this.props;

        let svgHtml=(
            <svg viewBox="0 0 100 100" className="icon-svg-delete" data-index={index} onClick={this.delete.bind(this)}>
                <use xlinkHref="/assets/img/icon.svg#svg-delete"/>
            </svg>
        );
        return (
            <div className="item">
                <div className="img">
                    <img src={url}  alt=""/>
                    {svgHtml}
                </div>
            </div>
        )
    }
}


class CustomSuit extends Component {
    constructor(props) {
        super(props);
        this.state={
            msgShow:false,
            msgText:'',//提示内容
            girl:true,
            boy:false,
            sex:2,//性别
        };

        this.copyMyData=merged(props.state.defaults);//复制对象

        let myData = props.state.defaults;
        myData.path = '/customSuitGirl';
        this.props.setState(myData);
        myData.path = '/customSuitBoy';
        this.props.setState(myData);
    }

    componentDidMount(){
        //用户信息
        new Swiper('.J-custom-info', {
            initialSlide:0,
            direction : 'vertical',
            pagination: '.swiper-pagination',
            paginationType : 'progress',
            observer:true,
        });
    }

    componentWillUpdate(nextProps, nextState){
        if(this.state.msgShow !== nextState.msgShow){//
            return;
        }

        let myData=merged(this.copyMyData);
        if(nextState.sex === 1){//男
            myData.path = '/customSuitBoy';
        }else{//女
            myData.path = '/customSuitGirl';
        }

        myData.data.sex=nextState.sex;
        this.props.setState(myData);
    }
    /**
     * 当选择性别时前后2次选择不同是才会触发render
     * */
    shouldComponentUpdate(nextProps,nextState){
        return nextState.girl !== this.state.girl || nextState.boy !== this.state.boy || nextState.msgShow !== this.state.msgShow;
    }

    showMsg(isShow,tipText){
        this.setState({
            msgShow:isShow,
            msgText:tipText,
        });
    }

    render(){
        let girlSex = classNames('img-area',{
            'active':this.state.girl
        });
        let boySex = classNames('img-area',{
            'active':this.state.boy
        });

        return (
            <section className="full-page">
                <div className="swiper-container customsuit-swiper-box J-custom-info">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" >
                            <h2 className="title" >选择你的性别</h2>
                            <section className="sex-area">
                                <section className="item">
                                    <div className={boySex} onClick={()=>{this.setState({girl:false,boy:true,sex:1})}}>
                                        <img src="/assets/img/male.jpg" alt=""/>
                                    </div>
                                </section>
                                <section className="item">
                                    <div className={girlSex} onClick={()=>{this.setState({girl:true,boy:false,sex:2})}}>
                                        <img src="/assets/img/female.jpg" alt=""/>
                                    </div>
                                </section>
                            </section>
                        </div>
                        {/*女性信息*/}
                        {this.state.girl ? <GilrFace  {...this.props} /> : null}
                        {this.state.girl ? <GirlSkin  {...this.props} /> : null}
                        {this.state.girl ? <GirlBody  {...this.props} /> : null}
                        {this.state.girl ? <GirlResolve {...this.props} /> : null}
                        {this.state.girl ? <GirlStyle  {...this.props} /> : null}
                        {this.state.girl ? <GirlBaseInfo  {...this.props} /> : null}
                        {this.state.girl ? <GirlOtherinfo  showMsg={this.showMsg.bind(this)} {...this.props} /> : null}
                        {/*男性信息*/}
                        {this.state.boy ? <BoyFace  {...this.props} /> : null}
                        {this.state.boy ? <BoySkin  {...this.props} /> : null}
                        {this.state.boy ? <BoyBody  {...this.props} /> : null}
                        {this.state.boy ? <BoyResolve {...this.props} /> : null}
                        {this.state.boy ? <BoyStyle  {...this.props} /> : null}
                        {this.state.boy ? <BoyBaseInfo  {...this.props} /> : null}
                        {this.state.boy ? <BoyOtherinfo  showMsg={this.showMsg.bind(this)} {...this.props} /> : null}
                    </div>
                    {/*进度条*/}
                    <div className="swiper-pagination"></div>
                    {/*动画箭头*/}
                    <div className="pre-wrap"></div>
                </div>
                {this.state.msgShow ? <Msg  msgShow={()=>{this.setState({msgShow:false})}} text={this.state.msgText}/> : null}
            </section>
        )
    }

}


export default connect((state)=>{return {state: state['CustomSuit']}},action('CustomSuit'))(CustomSuit);