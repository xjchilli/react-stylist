/**
 * 衣橱删除
 * Created by potato on 2017/5/4 0004.
 */
import Mock from 'mockjs';

let wardrobeDelete = ()=>{
    Mock.mock(
        /^\/api\/wardrobeDelete\?*/, 'get',{
            "data": {
                "succ":true,//true 成功 false 失败
            }
        }
    );
}
export {wardrobeDelete};