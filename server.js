
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config");

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    // hot: true,
    publicPath: webpackConfig.output.publicPath,//服务器资源路径
    disableHostCheck: true,
    stats: {
        colors: true
    }
});

server.listen(9000);