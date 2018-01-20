/**
 * css、js打包成独立文件
 * @type {webpack}
 */
var os = require('os');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'); //js压缩
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});
var deleteFiles = require('./config/deleteFiles');



// var liveUrl = "http://potato.ittun.com";
var liveUrl = "";
var publicPath = liveUrl + '/assets/'; //服务器路径
var p = path.resolve(__dirname + '/assets');

deleteFiles(path.resolve(p + '/js'));// /assets/js文件下的js文件

//入口文件
var entry = {
    app: './src/App.js',
    vendors: ['react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-thunk', 'react-transition-group', 'prop-types', 'swiper', 'fastclick']
};

module.exports = {
    entry: entry,
    output: {
        publicPath: publicPath,
        path: p,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].[chunkhash:5].min.js',
    },
    // devtool: 'source-map',
    module: {
        rules: [{
            test: /\.css|less$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['happypack/loader?id=less']
            })
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'happypack/loader?id=happybabel',
            }]
        }, {
            test: /\.(png|jpg|jpeg)$/i,
            exclude: /^node_modules$/,
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片(只能是相对路径图片编码background:url(../img/file.png))
            use: ['url-loader?limit=8192&name=img/[hash:8].[name].[ext]']
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            use: ['file-loader?name=[name].[ext]']
        }]
    },
    plugins: [
        new webpack.DefinePlugin({ //编译成生产版本
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            "React": "react"
        }),
        //多线程处理文件
        new HappyPack({
            id: 'less',
            loaders: ['css-loader?minimize!postcss-loader!less-loader'],
            threadPool: happyThreadPool,
            cache: false,
            verbose: true
        }),
        new HappyPack({//?cacheDirectory=true,compact=false,presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime
            id: 'happybabel',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
            cache: false,
            verbose: true
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: 'index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            hash: true,
            //为静态资源生成hash值
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }), //css单独打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.js'
        }), //所有公用js文件打包到vendors.js

        //多线程压缩
        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            uglifyJS: {
                output: {
                    comments: false
                },
                compress: {
                    warnings: false, //删除没有用到的代码时不输出警告
                    drop_console: true, //删除所有的 `console` 语句
                }
            }
        }),

    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', ".json"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        alias: {
            'ToolDps': path.resolve(__dirname + '/src/ToolDps'),
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
}