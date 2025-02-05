import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default {
  entry: './editor.js',
  output: {
    filename: '[name].js',
    library: {
      type: 'module',
    },
    clean: true,
  },
  target: 'es2020',
  experiments: {
    outputModule: true,
  },
  devtool: 'source-map',
  resolve: {
    fallback: {
      // Yaml-ast-parser-custom-tags imports buffer. This can be omitted safely.
      buffer: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: [],
      customLanguages: [
        {
          label: 'yaml',
          entry: [
            'monaco-yaml/lib/esm/monaco.contribution',
            'vs/basic-languages/yaml/yaml.contribution',
          ],
          worker: {
            id: 'monaco-yaml/lib/esm/yamlWorker',
            entry: 'monaco-yaml/lib/esm/yaml.worker',
          },
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: './',
    },
  },
};
