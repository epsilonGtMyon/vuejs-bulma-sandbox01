const fs = require('fs')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pageRoot = path.resolve(__dirname, 'src/pages') + '/'

const entries = (function () {

  //通常のページ用
  const pageEntries = {};
  fs.readdirSync(pageRoot).forEach(pageFolder => {
    fs.readdirSync(`${pageRoot}/${pageFolder}`)
      .filter(fileName => fileName === 'index.js')
      .forEach(fileName => {
        pageEntries[pageFolder] = `${pageRoot}/${pageFolder}/${fileName}`
      })
  })

  //--------------------------------------
  //追加
  const optionals = {}
  optionals['global-style'] = path.resolve(__dirname, 'src/common/css/global-style.scss')

  const es = Object.assign({}, pageEntries, optionals);
  return es;
})();

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist/compiled')
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: [
              { loader: 'vue-style-loader' },
              { loader: 'css-loader' },
              { loader: 'sass-loader' }
            ]
          },
          {
            use: [
              { loader: MiniCssExtractPlugin.loader },
              { loader: 'css-loader' },
              { loader: 'sass-loader' }
            ]
          }
        ]
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          context: ''
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules.*\.js/,
          name: 'vendors',
          chunks: 'all',
          priority: 1,
          enforce: true
        },
        appCommon: {
          test: /src\\common.*\.js/,
          name: 'app-common',
          chunks: 'all',
          priority: 0,
          enforce: true
        }
      }
    }
  },

  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 9000,
    publicPath: '/dist/compiled',
    open: 'chrome',
    openPage: 'page/'
  },
  devtool: 'source-map '

}
