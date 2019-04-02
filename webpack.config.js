/**
 * To the extent possible under law, Dennis Schulmeister-Zimolong has waived all
 * copyright and related or neighboring rights to UI5 Web Components Beispiel.
 * This work is published from: Germany.
 */
"use strict";

// Imports
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");

// Webpack base configuration
const extractCSS = new ExtractTextPlugin("style.css");

let webpackConfig = {
    entry: {
        "index": path.join(__dirname, "index.js"),
    },
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, process.env.npm_package_config_build_dir),
        publicPath: `${process.env.npm_package_config_public_url}/`,
    },
    devtool: "source-map",

    module: {
        rules: [{
            test: /\.css$/,
            use: extractCSS.extract({
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: "global",
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        },
                    },
                ],
                fallback: "style-loader",
            }),
        }, {
            test: /\.less$/,
            use: extractCSS.extract({
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: "global",
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        },
                    },
                    "less-loader",
                ],
                fallback: "style-loader",
            }),
        },{
            test: /\.(svg|jpg|png|gif|eot|ttf|woff|woff2)$/,
            use: "url-loader",
        },{
            test: /\.(htm|html)/,
            use: "html-loader",
        }],
    },

    plugins: [
        extractCSS,

        // FIXME: UglifyJs#harmony still has problems with lecture-slides.js
        // new UglifyJSPlugin({
        //     // cheap source map options don't work with the plugin!
        //     "sourceMap": true,
        // }),

        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery',
        //     Popper: ['popper.js', 'default'],
        // }),
    ]
};

// Export configuration
module.exports = webpackConfig;
