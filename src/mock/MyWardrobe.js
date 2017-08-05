/**
 * 衣橱列表查询
 * Created by potato on 2017/4/28 0028.
 */
import Mock from 'mockjs';

let myWardrobeList = ()=>{
    Mock.mock(
        /^\/api\/myWardrobeList\?*/, 'get',{
            "data|3": [{
                "typeCode|+1": [1,2,3,4,5,6,7,8],//分类Code
                "typeName|+1": ["内衣","配饰",'裙装','鞋靴','彩妆','上衣','包袋','裤装'],//分类名称
                "list|3": [{
                    'id|+1':[1,2,3,4,5,6,7,8,9],//商品ID
                    'imgUrl':'/assets/img/girl.jpg',//图片地址
                    'name':'卡其色阔腿裤'//商品名称
                }]
            }
            ]
        }
    );
}
export {myWardrobeList};