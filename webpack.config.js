const path = require('path');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/lib/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/react',
              '@babel/preset-env',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ],
          }
        },
      },
    ],
  },
  plugins: [
    new PeerDepsExternalsPlugin(),
  ],
};
