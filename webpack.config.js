const webpack = require("webpack");
const dev = process.env.NODE_ENV.trim() !== "production";

module.exports = {
    resolve: {
        fallback: { "crypto": false, "crypto": require.resolve("crypto-browserify")},
    },
    entry: "./index.js",
    output: {
        path: "./",
        filename: "parse.js"
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: dev ? [] : [
        new webpack.optimize.UglifyJsPlugin()
    ],
    target: "node"

};


    


// module.exports = {
//     resolve: {
//         fallback: {
//             assert: require.resolve('assert'),
//             crypto: require.resolve('crypto-browserify'),
//             http: require.resolve('stream-http'),
//             https: require.resolve('https-browserify'),
//             os: require.resolve('os-browserify/browser'),
//             stream: require.resolve('stream-browserify'),
//         },
//     },
// };