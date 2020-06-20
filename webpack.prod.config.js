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
                options: {
                    plugins: [
                        '@babel/transform-runtime',
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-proposal-optional-chaining",
                        "transform-function-bind",
                        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true}]
                    ],
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        },{
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