/**
 * 时尚圈列表
 * Created by potato on 2017/4/9.
 */
import Mock from 'mockjs';

let fashionMomentList = ()=>{
    Mock.mock(
        /^\/api\/fashionMomentList\?*/, 'get',{
            "data|10": [{
                "userName": '@name',     //模拟名称
                "age|1-100": 100,          //模拟年龄(1-100)
                "color": "@color",    //模拟色值
                "date": "@date('yyyy-MM-dd')",  //模拟时间
                "url": "@url()",     //模拟url
                "content": "@cparagraph()" //模拟文本
               }
            ]
        }
    );
}
export {fashionMomentList};