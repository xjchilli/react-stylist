/**
 * css、js打包成独立文件
 *
 */
var os = require('os');
var path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});


var publicPath = '/assets/'; //服务器路径
var p = path.resolve(__dirname + '/assets');

module.exports = {
    //入口文件
    entry: {
        app: './src/App.js',
        vendors: ['react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-thunk', 'react-addons-css-transition-group'],
    },
    // 出口文件
    output: {
        publicPath: publicPath,
        path: p,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].[chunkhash:5].min.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'happypack/loader?id=happybabel',
                    }
                ]
            },
            {
                test: /\.css|less$/,
                exclude: /^node_modules$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['happypack/loader?id=less']
                })
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ //编译成生产版本
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),//css单独打包
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: 'index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            hash: true, //为静态资源生成hash值
        }),
        //多线程处理文件
        new HappyPack({
            id: 'less',
            loaders: ['css-loader!postcss-loader!less-loader'],
            threadPool: happyThreadPool,
            cache: false,
            verbose: true
        }),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true,compact=false,presets[]=es2015,presets[]=stage-0,presets[]=react'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        //多线程压缩
        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            uglifyJS: {
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.js'
        }), //所有公用js文件打包到vendors.js

    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', ".json"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        alias: {
            'react': path.resolve(__dirname + '/node_modules/react'),
            'react-dom': path.resolve(__dirname + '/node_modules/react-dom'),
            'react-router': path.resolve(__dirname + '/node_modules/react-router'),
            'react-redux': path.resolve(__dirname + '/node_modules/react-redux'),
            'redux': path.resolve(__dirname + '/node_modules/redux'),
            'redux-thunk': path.resolve(__dirname + '/node_modules/redux-thunk'),
            'react-transition-group': path.resolve(__dirname + '/node_modules/react-transition-group'),
            'prop-types': path.resolve(__dirname + '/node_modules/prop-types'),
            'obj-merged': path.resolve(__dirname + '/node_modules/obj-merged'),
            'classnames': path.resolve(__dirname + '/node_modules/classnames'),
            'swiper': path.resolve(__dirname + '/node_modules/swiper'),
        }
    }
};