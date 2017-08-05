/**
 * 衣橱详情
 * Created by potato on 2017/5/3 0003.
 */
import Mock from 'mockjs';

let wardrobeDetail = ()=>{
    Mock.mock(
        /^\/api\/wardrobeDetail\?*/, 'get',{
            "data": {
                'id|+1':[1,2,3,4,5,6,7,8,9],//商品ID
                "typeCode|+1": [1,2,3,4,5,6,7,8],//分类Code
                "typeName|+1": ["内衣","配饰",'裙装','鞋靴','彩妆','上衣','包袋','裤装'],//分类名称
                'imgUrl':'/assets/img/girl.jpg',//图片地址
                'name':'卡其色阔腿裤',//商品名称
                'remark':'@sentence(5)',//备注
                "succ":true,//true 成功 false 失败
            }
        }
    );
}
export {wardrobeDetail};