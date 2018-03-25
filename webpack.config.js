const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEVELOPMENT = NODE_ENV === 'development';

module.exports = {
    entry: './frontend/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/index.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /.(css)$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader', options: {minimize: true}},
                    {loader: 'postcss-loader'},
                ]
            },
            // {
            //     test: /.(css)$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: [
            //             {loader: 'css-loader', options: {minimize: true}},
            //             {loader: 'postcss-loader'},
            //         ]
            //     })
            // },
        ]
    },

    // plugins: [
    //     new ExtractTextPlugin({
    //         filename: '/css/index.css',
    //         disable: DEVELOPMENT
    //     })
    // ]
};
