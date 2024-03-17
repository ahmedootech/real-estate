module.exports = {
  // Other webpack configurations...

  module: {
    rules: [
      {
        test: /\.(hdr)$/i,
        use: [
          {
            loader: 'file-loader',
            'url-loader': 'file-loader',
          },
        ],
      },
    ],
  },
};
