
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.dev");

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    proxy: { // proxy URLs to backend development server
          '/wx': {
            target:'http://wxapi.dapeis.net',
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