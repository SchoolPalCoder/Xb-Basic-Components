const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MarkdownItContainer = require("markdown-it-container");
const stripTags = require("./strip-tags");
const utils = require("./utils");

const vueMarkdown = {
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function() {
      return '<table class="table">';
    };
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence);

    const code_inline = MarkdownIt.renderer.rules.code_inline;
    MarkdownIt.renderer.rules.code_inline = function(...args) {
      args[0][args[1]].attrJoin("class", "code_inline");
      return code_inline(...args);
    };
    return source;
  },
  use: [
    [
      MarkdownItContainer,
      "demo",
      {
        validate: (params) => params.trim().match(/^demo\s*(.*)$/),
        render: function(tokens, idx) {
          if (tokens[idx].nesting === 1) {
            const html = utils.convertHtml(stripTags(tokens[idx + 1].content, "script"));
            // 移除描述，防止被添加到代码块
            tokens[idx + 2].children = [];

            return `<demo-block>
                        <div slot="desc">${html}</div>
                        <div slot="highlight">`;
          }
          return "</div></demo-block>\n";
        },
      },
    ],
  ],
};

const webpackConfig = {
  mode: "development",
  entry: "./examples/main.ts",
  devServer: {
    host: "127.0.0.1",
    port: 8086,
    publicPath: "/",
    noInfo: true,
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(process.cwd(), "./examples/dist/"),
    publicPath: "/dev/",
    filename: "[name].[hash:7].js",
    chunkFilename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts"],
    alias: {
      // main: path.resolve(__dirname, "../src"),
      // packages: path.resolve(__dirname, "../packages"),
      // examples: path.resolve(__dirname, "../examples"),
      // "xb-ui": path.resolve(__dirname, "../"),
    },
    modules: ["node_modules"],
  },
  externals: externals,
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "tslint-loader",
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.md$/,
        loader: "vue-markdown-loader",
        options: vueMarkdown,
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          preserveWhitespace: false,
        },
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.html$/,
        loader: "html-loader?minimize=false",
      },
      {
        test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: path.posix.join("static", "[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: path.posix.join("static", "[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: path.posix.join("static", "[name].[hash:7].[ext]"),
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./examples/index.html",
      filename: "./index.html",
      favicon: "./examples/favicon.ico",
    }),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
};

module.exports = webpackConfig;
