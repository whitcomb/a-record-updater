var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config.dev');

new webpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening on port 3000');
});