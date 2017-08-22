
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.dev");

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    proxy: { // proxy URLs to backend development server
          '/wx': {
            target:'http://devwx.dapeis.net',//线上服务器后端:http://wxapi.dapeis.com  线上服务器前端:http://wx.dapeis.com  测试服务器:http://wxapi.dapeis.net 开发:http://devwx.dapeis.net
            changeOrigin:true
        }
    },
    publicPath: webpackConfig.output.publicPath,//服务器资源路径
    disableHostCheck: true,
    stats: {
        colors: true
    }
});

//将其他路由，全部返回index.html
server.app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');//dev version
    // res.sendFile(__dirname + '/assets/index.html');//live version
});

server.listen(8000);