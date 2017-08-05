/**
 * Created by potato on 2017/4/9.
 */
import {fashionMomentList} from './FashionMoment';
import {profile} from './Profile';
import {myWardrobeList} from './MyWardrobe';
import {wardrobeUpload} from './WardrobeUpload';
import {wardrobeDetail} from './WardrobeDetail';
import {wardrobeModify} from './WardrobeModify';
import {wardrobeDelete} from './WardrobeDelete';

let execute = ()=>{
    fashionMomentList();
    profile();
    myWardrobeList();
    wardrobeUpload();
    wardrobeDetail();
    wardrobeModify();
    wardrobeDelete();
}

module.exports=execute;

// export default  execute;


