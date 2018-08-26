const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
plugins: [
   ….
   new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, './firebase-messaging-sw.js'),
   })
]

const CopyWebpackPlugin = require('copy-webpack-plugin');
plugins: [
   ….
   new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, './firebase-messaging-sw.js'),
   }),
   new CopyWebpackPlugin([
      'firebase-messaging-sw.js',
   ])
]