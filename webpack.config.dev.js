/**
 * css、js打包成独立文件
 * @type {webpack}
 */
var os = require('os');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

var publicPath = '/assets/'; //服务器路径
var p = path.resolve(__dirname + '/assets');


//入口文件
var entry = {
  app: './src/App.js',
  vendors: [
    'react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-thunk', 'react-transition-group', 'prop-types', 'swiper',
    'webpack-dev-server/client?http://0.0.0.0:8000', 'webpack/hot/only-dev-server'
  ]
};


module.exports = {
  entry: entry,
  output: {
    publicPath: publicPath,
    path: p,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:5].min.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.css|less$/,
      exclude: /^node_modules$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader', 'postcss-loader', 'less-loader']
      })
    }, {
      test: /\.(js|jsx)$/,
      include: path.resolve(__dirname, 'src'),
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
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }), //css单独打包
    new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
      filename: 'index.html', //生成的html存放路径，相对于 path
      template: './src/template/index.html', //html模板路径
      hash: true, //为静态资源生成hash值
    }),
    //多线程处理文件
    new HappyPack({//?cacheDirectory=true,compact=false,presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime
      id: 'happybabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      cache: false,
      verbose: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR)
    new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/vendors.js'
    }) //所有公用js文件打包到vendors.js
  ],
  externals: {//不打包文件
    "react": "React",
    "react-dom": "ReactDOM",
    'swiper': 'Swiper',
    'flatpickr':'flatpickr'
  },
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
}