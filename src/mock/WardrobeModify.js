/**
 * 衣橱修改
 * Created by potato on 2017/5/4 0004.
 */
import Mock from 'mockjs';

let wardrobeModify = ()=>{
    Mock.mock(
        /^\/api\/wardrobeModify\?*/, 'post',{
            "data": {
                "succ":true,//true 成功 false 失败
            }
        }
    );
}
export {wardrobeModify};