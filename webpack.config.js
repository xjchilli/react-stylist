/**
 * Created by Administrator on 2017/5/7.
 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var publicPath = '/dist/'; //服务器路径
var path = __dirname + '/dist/';
module.exports = {
    // 入口文件
    // entry: './src/App.js',
    entry:[
        'webpack-dev-server/client?http://0.0.0.0:9000',
        // 为 webpack-dev-server 的环境打包代码
        // 然后连接到指定服务器域名与端口

        'webpack/hot/only-dev-server',
        // 为热替换(HMR)打包好代码
        // only- 意味着只有成功更新运行代码才会执行热替换(HMR)
        './src/App.js',
    ],
    devtool: 'inline-source-map',
    // 出口文件
    output: {
        publicPath:publicPath,
        path: path,
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015','stage-0', 'react'],
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.css|less$/,
                exclude: /^node_modules$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","less-loader"]
                })
               /* use:[
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'less-loader'}
                ]*/
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'app.css'
        }),//css单独打包
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: 'index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            hash: true, //为静态资源生成hash值
        }),
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换(HMR)
        new webpack.NamedModulesPlugin(),
        // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    ],
    resolve: {
        extensions: [ '.js', '.jsx','.css']
    }
};