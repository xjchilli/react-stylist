/**
 * 个人信息
 * Created by potato on 2017/4/16.
 */
import Mock from 'mockjs';

let profile = ()=>{
    Mock.mock(
        /^\/api\/profile\?*/, 'get',{
            "data": {
                "userName": '@name',     //模拟名称
                "age|1-100": 100,          //模拟年龄(1-100)
                "color": "@color",    //模拟色值
                "date": "@date('yyyy-MM-dd')",  //模拟时间
                "url": "@url()",     //模拟url
                "content": "@cparagraph()" //模拟文本
            }
        }
    );
}
export {profile};