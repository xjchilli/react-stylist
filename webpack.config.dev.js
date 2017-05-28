/**
 * Created by Administrator on 2017/5/7.
 */
var path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html


var publicPath = '/assets/'; //服务器路径
var p = path.resolve(__dirname + '/assets');

module.exports = {
    //入口文件
    entry:{
        app: './src/App.js',
        vendors: [ 'webpack-dev-server/client?http://0.0.0.0:8000', 'webpack/hot/only-dev-server'],
    },
    devtool: 'inline-source-map',
    // 出口文件
    output: {
        publicPath:publicPath,
        path: p,
        filename: 'js/[name].js'
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
                    use: ["css-loader","postcss-loader","less-loader"]
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'css/[name].css'
        }),//css单独打包
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: 'index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            hash: true, //为静态资源生成hash值
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendors',
            filename:'js/vendors.js'
        }), //所有公用js文件打包到vendors.js
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换(HMR)
        new webpack.NamedModulesPlugin(),
        // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息

    ],
    resolve: {
        extensions: [ '.js', '.jsx','.css','.less',".json"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        alias: {
            'react': path.resolve(__dirname + '/node_modules/react'),
            'react-dom': path.resolve(__dirname + '/node_modules/react-dom'),
            'react-router': path.resolve(__dirname + '/node_modules/react-router'),
            'react-redux': path.resolve(__dirname + '/node_modules/react-redux'),
            'redux': path.resolve(__dirname + '/node_modules/redux'),
            'redux-thunk': path.resolve(__dirname + '/node_modules/redux-thunk'),
            'react-addons-css-transition-group': path.resolve(__dirname + '/node_modules/react-addons-css-transition-group'),
        }
    }
};