let webpack = require("webpack");
let HtmlPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let rules = require("./webpack.config.rules")();
let path = require("path");

rules.push({
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"]
});

module.exports = {
    entry: {
        friends: "./src/friends.js"
    },
    devServer: {
        index: "friends.html"
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve("dist")
    },
    devtool: "source-map",
    module: { rules },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                drop_debugger: false,
                warnings: false
            }
        }),
        new ExtractTextPlugin("styles.css"),
        new HtmlPlugin({
            title: "Friends",
            template: "friends.hbs",
            filename: "friends.html",
            chunks: ["friends"]
        }),
        new CleanWebpackPlugin(["dist"])
    ]
};
