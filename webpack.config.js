const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackMonitor = require('webpack-monitor');
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'eslint-loader'
                    },
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            context: path.resolve(__dirname, 'context'), // Allow to redefine basic loader context for `local-ident-name`
                            hashPrefix: 'hash', // Allow to add custom hash to generate more unique classes
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            modules: true,
                        },
                    },
                    {

                        loader: 'sass-loader',
                    }
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new WebpackMonitor({
            capture: true,
            target: './monitor/myStatsStore.json',
            launch: false,
            port: 3030,
        }),
    ],
    devtool: 'source-map'
};