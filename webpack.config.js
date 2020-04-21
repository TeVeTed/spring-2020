const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const Nib = require('nib');

const outPath = resolve(__dirname, './dist');
const packageJSON = require('./package.json');

const HtmlWebpackPluginInstance = new HtmlWebpackPlugin({
	template: resolve(__dirname, './public/index.html'),
	filename: 'index.html',
	inject: true,
	minify: {
		minifyJS: true,
		minifyCSS: true,
		removeComments: true,
		useShortDoctype: true,
		collapseWhitespace: true,
		collapseInlineTagWhitespace: true
	},
	meta: {
		title: packageJSON.name,
		description: packageJSON.description,
		keywords: Array.isArray(packageJSON.keywords) ? packageJSON.keywords.join(',') : undefined,
	}
});

const isDevelopment = process.env.NODE_ENV !== 'production'

const getPublicPath = () => isDevelopment ? '/' : './';

module.exports = {
	mode: isDevelopment ? 'development' : 'production',

	devtool: 'source-map',

	bail: true,

	entry: {
		main: resolve('./src/index.tsx')
	},

	output: {
		path: outPath,
		publicPath: getPublicPath(),
		filename: `js/${isDevelopment ? '[name].js' : '[name].[hash].js'}`
	},

	devServer: {
		port: 8008,
		overlay: true,
		stats: 'errors-only',
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				loader: 'source-map-loader',
				enforce: 'pre'
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				include: resolve(__dirname, 'src'),
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: '[name].[hash].[ext]',
					outputPath: 'assets/',
				}
			},
			{
				test: /\.css$/,
				use: [
					isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
					}
				]
			},
			{
				test: /\.(styl|css)$/,
				use: [
					isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'stylus-loader',
						options: {
							use: Nib(),
							import: '~nib/lib/nib/index.styl'
						}
					}
				]
			}
		]
	},

	performance: {
		maxEntrypointSize: 300000,
		hints: isDevelopment ? false : 'warning',
	},

	optimization: isDevelopment
		? {}
		: {
			minimizer: [
				new TerserPlugin({
					cache: true,
					parallel: true,
				}),
			],
		},

	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.ts',
			'.tsx',
			'.css',
			'.styl'
		],
		alias: {
			'@': resolve('./src'),
		}
	},

	plugins: [
		new Dotenv({
			path: isDevelopment ? './.env.development' : './.env.production',
			safe: true,
		}),

		HtmlWebpackPluginInstance,

		new MiniCssExtractPlugin({
			filename: isDevelopment ? 'css/[name].css' : 'css/[name].[hash].css'
		}),

		new OptimizeCssAssetsPlugin()
	]
};
