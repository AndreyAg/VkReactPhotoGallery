const path = require('path')
const webpack = require('webpack')
const pathToApp = path.resolve(__dirname, 'src')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    context: path.join(__dirname, 'src'),
    devServer: {
        contentBase: pathToApp,
        compress: true,
        port: 3000,
        hot: true,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    entry: [
        './index'
    ],
    output: {
        path: `${pathToApp}/.static`,
        filename: 'bundle.js',
        publicPath: 'http://0.0.0.0:3000/static/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [pathToApp],
            loader: 'eslint-loader'
        },{
            test: /\.js?$/,
            include: [pathToApp],
            use: {
                loader: 'babel-loader',
                query: {
                    plugins: ['@babel/transform-runtime']
                }
            }
        },{
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader?url=false',
                {
                    loader: 'less-loader'
                },
                'postcss-loader'
            ]
        }]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
}