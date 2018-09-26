'use strict';
var webpack = require('webpack');
var path = require('path');
var env = process.env.NODE_ENV;
var CURRENT_WORKING_DIR = process.cwd();

var config = {
    context: path.resolve(CURRENT_WORKING_DIR, 'src'),
    entry: './app.js',
    output: {
        path: path.resolve(CURRENT_WORKING_DIR, 'public'),
        filename: 'client.bundle.js',
        publicPath: '/public/'
    },
    mode: 'development',
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // all js files
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' }, // creates style nodes from JS strings
                    { loader: 'css-loader' }, // translates CSS into CommonJS
                    { loader: 'sass-loader' }, // compiles Sass to CSS
                ]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' },
                { loader: 'css-loader' }]
            },
            {
                test: /\.(woff2?|ttf|eot|svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            }            
        ]
    },
    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.js', '.jsx', '.json', '.css']
    },
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'API_URL': JSON.stringify('http://localhost:8000'),
                'process.env.NODE_ENV': JSON.stringify(env)
            }
        })
    ]
};

module.exports = config;