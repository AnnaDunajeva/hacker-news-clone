const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'index_bundle.js',
        publicPath: process.env.NODE_ENV === 'production' ? '/hacker-news-clone/' :'/'
    },
    module: {
        rules: [
            {test:/\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader','css-loader']}
        ]
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ],
    devServer: {
        historyApiFallback: true
    }
}