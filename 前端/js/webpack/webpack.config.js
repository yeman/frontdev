const path = require('path');
module.exports = {
    entry: './src/index02.js',
    output: {
    filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
           rules: [
             {
               test: /\.css$/,
               use: [
                 'style-loader',
                 'css-loader'
               ]
             },
             {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                  'file-loader'
                ]
              }
           ]
         }
  };