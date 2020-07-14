const path = require('path');
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
    mode:'development', // 开发模式
    entry: ["@babel/polyfill",path.resolve(__dirname,'./src/index.js')],
    output: {
      filename: 'bundle.js',      // 打包后的文件名称
      path: path.resolve(__dirname,'./dist')  // 打包后的目录
    },
    plugins:[
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'./public/index.html'),
        filename:'index.html'
      }),
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      new Webpack.HotModuleReplacementPlugin(),
      new BundleAnalyzerPlugin()
    ],
    module: {
        rules: [{
            test:/\.css$/,
            use:['vue-style-loader','css-loader',{
                loader:'postcss-loader',
                options:{
                  plugins:[require('autoprefixer')]
                }
              }]
          },{
            test:/\.less$/,
            use:['vue-style-loader','css-loader',{
                loader:'postcss-loader',
                options:{
                  plugins:[require('autoprefixer')]
                }
              },'less-loader']
          },{
            test:/\.js$/,
            use:{
              loader:'babel-loader',
              options:{
                presets:['@babel/preset-env']
              }
            },
            exclude:/node_modules/
          },{
            test:/\.vue$/,
            use:['vue-loader']
        },{
          enforce:'pre',
          test:/\.(js|vue)$/,
          loader:'eslint-loader',
          include: [path.resolve(__dirname, 'src')]
        }]
    },
    resolve:{
        alias:{
          'vue$':'vue/dist/vue.runtime.esm.js',
          ' @':path.resolve(__dirname,'./src')
        },
        extensions:['*','.js','.json','.vue']
   },
   devServer:{
    port:3000,
    hot:true,
    contentBase:'./dist'
  },
})

