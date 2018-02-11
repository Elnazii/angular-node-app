const path = require('path');

module.exports = {
    entry: {
        app: './app/index.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    devServer : {
        inline : true,
        port : 3000
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'html-loader' },
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader?' + JSON.stringify({
                        presets: ['es2015']
                    })
                ]
            }
        ]
    }
};