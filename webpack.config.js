var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
    //devtool: 'cheap-module-eval-source-map',
    //devtool: 'source-map',
    entry: [
        //'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        //new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include: [
                    path.resolve(__dirname, "src")
                ]
            }
        ],
        loaders: [
            {
                //loaders: ['react-hot', 'babel-loader'],
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname, "src")
                ],
                test: /\.js$/,
                plugins: ['transform-runtime']
            },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    }
};