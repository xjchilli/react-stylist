import Confidential from './Confidential';
import store from './Store';
import { ToolDps } from '../ToolDps';
import qs from 'query-string';


//localStorage.setItem('User',JSON.stringify({openId:'oGHrAv2QLJaScmtYKnK-oVvF81S8'}))      搭配师:4s手机oGHrAvwpDzGjKnPRxHIiCamlAR2o  安卓：oGHrAv2QLJaScmtYKnK-oVvF81S8
function generateGetCodeUrl(redirectURL) {
    let url = "https://open.weixin.qq.com/connect/oauth2/authorize";
    let appid = Confidential.APP_ID;
    let redirect_uri = encodeURI(redirectURL);
    let response_type = 'code';
    let scope = Confidential.scope;
    let hash = "wechat_redirect";

    return url + "?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=" + response_type + "&scope=" + scope + "#" + hash;
}

async function getUserInfo(code, setAuth) {
    const { dispatch } = store;
    let user = await ToolDps.get('/wx/user/getUserInfo', {
        code: code
    }).catch(() => {
        alert('授权失败');
    });
    if (user.succ) {
        dispatch({
            type: 'signinSuccess',
            target: user.user
        });
        setAuth();
    } else {
        alert(user.msg);
    }

}

/**
 * 授权
 * @param props 路由属性
 * @param setAuth 设置授权
 */
function wechatAuth(props, setAuth) {
    // localStorage.setItem('User', JSON.stringify({ openId: 'oGHrAv2QLJaScmtYKnK-oVvF81S8' }));
    // if (!ToolDps.sessionItem('redirectUrl')) {
    //     ToolDps.removeLocalItem('User');
    // }
    let user = ToolDps.localItem('User');
    if (user && JSON.parse(user).openId) { //如果用户信息已经存在
        setAuth();
        return;
    }
    const { code } = qs.parse(props.location.search);
    if (code) {
        //防止第二次分享出现无效的code问题
        const { pathname, search } = props.location;
        history.replaceState({}, pathname, search.replace('code',''));
        getUserInfo(code, setAuth);
    } else {
        ToolDps.sessionItem('redirectUrl', document.location.href);
        let url = document.location.href.split('#')[0];
        document.location = generateGetCodeUrl(url);
    }
}


export { wechatAuth };