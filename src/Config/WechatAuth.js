import Confidential from './Confidential';
import store from './Store';
import { ToolDps } from '../ToolDps';
import qs from 'query-string';


//localStorage.setItem('User',JSON.stringify({openId:'oGHrAv2QLJaScmtYKnK-oVvF81S8'}))      搭配师:安卓手机oGHrAvwpDzGjKnPRxHIiCamlAR2o  7p：oGHrAv2QLJaScmtYKnK-oVvF81S8
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
        //去除code参数
        let url = document.location.href.split('#')[0];
        document.location.href = url.replace('code', '');
        setAuth();
    } else {
        //当出现无效code时执行
        ToolDps.removeLocalItem('User');
        let url = document.location.href.split('#')[0];
        document.location.href = url.replace('code', '');
        alert(user.msg);
    }

}

/**
 * 授权
 * @param props 路由属性
 * @param setAuth 设置授权
 */
function wechatAuth(props, setAuth) {
    // localStorage.setItem('User', JSON.stringify({ openId: 'oGHrAv2QLJaScmtYKnK-oVvF81S8' }));//oUNrywMuKfqK6NIh4a2M1SfwZOB0

    if (ToolDps.isWKWebview) {//保存第一次加载url 分享时用于配置信息
        ToolDps.sessionItem('authUrl', document.location.href.split('#')[0]);
    }
    let user = ToolDps.localItem('User');
    if (user && JSON.parse(user).openId) { //如果用户信息已经存在
        setAuth();
        return;
    }
    const { code } = qs.parse(props.location.search);
    if (code) {
        getUserInfo(code, setAuth);
    } else {
        let url = document.location.href.split('#')[0];
        document.location = generateGetCodeUrl(url);
    }
}


export { wechatAuth };