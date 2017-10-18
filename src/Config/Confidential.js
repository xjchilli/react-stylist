/**
 * Created by potato on 2017/4/18.
 */

let p = process.env.NODE_ENV === 'production';

let confidential = {//default dev pattern
    APP_ID: 'wxfb8fb349ee5fcfc8',//Please use your owe app id;7plus:wx841ef790c7af581f     安卓:wxfb8fb349ee5fcfc8(线上) wxfb8fb349ee5fcfc8(线下)
    scope: 'snsapi_userinfo'//snsapi_base 
}
if (p) {//production pattern
    confidential.APP_ID = 'wx841ef790c7af581f';//wx351309dedea04180
    confidential.scope = "snsapi_userinfo";
}


export default confidential;