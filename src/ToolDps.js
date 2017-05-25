/**
 * ajax函数，返回一个promise对象
 * @param {Object} optionsOverride 参数设置，支持的参数如下
 * @return {Promise}
 *   该函数注册xhr.onloadend回调函数，判断xhr.status是否属于 [200,300)&&304 ，
 *   如果属于则promise引发resolve状态，允许拿到xhr对象
 *   如果不属于，或已经引发了ontimeout,onabort,则引发reject状态，允许拿到xhr对象
 *
 * 关于reject
 * 返回一个对象，包含:
 *     errorType:错误类型
 *     abort_error:   xhr对象调用abort函数
 *     timeout_error: 请求超时
 *     onerror:       xhr对象触发了onerror事件
 *     send_error:    发送请求出现错误
 *     status_error:  响应状态不属于 [200,300)&&304
 */

const ToolDps = {};

ToolDps.ajax = (mySetting) => {
    let options = {
        url: '#', //url地址，默认"#"
        type: 'GET', //请求方法，仅支持GET,POST,默认GET
        async: true, //是否异步，默认true
        timeout: 0, //请求时限，超时将在promise中调用reject函数
        data: null, //发送的数据，该函数不支持处理数据，将会直接发送
        dataType: 'text', //接受的数据的类型，默认为text
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }, //一个对象，包含请求头信息
        onprogress: function() {}, //处理onprogress的函数
        onuploadprogress: function() {}, //处理.upload.onprogress的函数
    };

    options.type = options.type.toUpperCase();

    for (let k in mySetting) {
        options[k] = mySetting[k];
    }

    let oldData = []; //存储数据
    let data = options.data; //拼接数据
    if (options.headers.hasOwnProperty('Content-Type') && options.headers['Content-Type'] === "application/x-www-form-urlencoded") {
        for (let attr in options.data) {
            oldData.push(attr + '=' + options.data[attr]);
        }
        data = oldData.join('&');
    } else if (options.headers.hasOwnProperty('Content-Type') && options.headers['Content-Type'] === "application/json") {
        data = JSON.stringify(options.data);
    }


    let user = localStorage.getItem('User');
    let openId = null;
    if (user) {
        openId = JSON.parse(user).openId; //获取opendId
    }

    let xhr = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
        options.type === "POST" ? xhr.open(options.type, options.url, options.async) : xhr.open(options.type, options.url + "?" + data, options.async);
        if (openId) {
            xhr.setRequestHeader('openId', openId);
        }
        //设置请求头
        for (let j in options.headers) {
            if (options.headers[j] === "multipart/form-data") {
                continue;
            }
            xhr.setRequestHeader(j, options.headers[j]);
        }
        //注册xhr对象事件
        xhr.timeout = options.timeout;
        xhr.onprogress = options.onprogress;
        xhr.upload.onprogress = options.onuploadprogress;
        xhr.responseType = options.dataType;

        xhr.onabort = function() {
            reject({
                errorType: 'abort_error',
                xhr: xhr
            });
        }
        xhr.ontimeout = function() {
            reject({
                errorType: 'timeout_error',
                xhr: xhr
            });
        };

        xhr.onerror = function() {
            reject({
                errorType: 'onerror',
                xhr: xhr
            });
        };
        xhr.onloadend = function() {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                if (options.url.match(/\/api\//g) && options.url.match(/api/g).length > 0) { //mock接口调用
                    let {
                        data
                    } = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    resolve(JSON.parse(xhr.responseText));
                }
            } else {
                reject({
                    errorType: 'status_error',
                    xhr: xhr
                });
            }
        };
        try {
            options.type === "POST" ? xhr.send(data) : xhr.send(null);
        } catch (e) {
            reject({
                errorType: 'send_error',
                error: e
            });
        }
    });
};

/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param headers 请求头
 */
ToolDps.post = function(pathname, data, headers) {
    let setting = {
        url: pathname, //默认ajax请求地址
        type: 'POST', //请求的方式
        data: data, //发给服务器的数据
        headers: headers || {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return ToolDps.ajax(setting);
};
/**
 * 封装ajax get请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 *  @param headers 请求头
 */
ToolDps.get = function(pathname, data, headers) {
    let setting = {
        url: pathname, //默认ajax请求地址
        type: 'GET', //请求的方式
        data: data, //发给服务器的数据
        headers: headers || {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return ToolDps.ajax(setting);
};

/**
 * 正则
 * @type {{tel: ToolDps.reg.tel}}
 */
ToolDps.reg = {
    tel: (str) => { //移动、联通、电信手机号格式
        let patt = new RegExp("^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$");
        return patt.test(str);
    },
    isUrl: (str_url) => { //url地址
        let patt = /^http|https$/i;
        return patt.test(str_url);
    },
    price: function(data) { //价格:>=0
        let patt = new RegExp("(^0$)|(^0\\.[0-9]{1,2}$)|(^[1-9][0-9]*(\\.\\d{1,2}){0,1}$)");
        return patt.test(data);
    },
    num: function(data) { //大于等于0
        let patt = new RegExp("^(0|([1-9]\\d*))$");
        return patt.test(data);
    }
}


export {
    ToolDps
};