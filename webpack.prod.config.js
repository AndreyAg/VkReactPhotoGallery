const path = require('path')
const webpack = require('webpack')
const pathToApp = path.resolve(__dirname, 'src')

module.exports = {
    mode: 'production',
    context: path.join(__dirname, 'src'),
    entry: [
        './index'
    ],
    output: {
        path: path.join(__dirname, `build`),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            include: [pathToApp],
            use: {
                loader: 'babel-loader',
                query: {
                    plugins: ['@babel/transform-runtime']
                }
            }
        }, {
            test: /\.less$/,
            use: [
                "style-loader", {
                    loader: 'css-loader',
                    options: {
                        sourceMap: false
                    }
                },
                "postcss-loader",
                {
                    loader: 'less-loader'
                }
            ]
        }]
    },
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
}