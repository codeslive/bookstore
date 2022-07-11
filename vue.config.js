//去掉console.log输出语句
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
	publicPath: '/bookstore',
	//关闭map包
	productionSourceMap: false,
	configureWebpack: config => {
		
		//解决资源(asset)和入口起点超过指定文件限制的警告
		config.performance = {
			maxEntrypointSize: 1000000,
			maxAssetSize: 1000000
		};

		//打包时自动忽略
		config.externals = {
			'vue': 'Vue',
			'element-ui': 'ElementUI',
		};

		config.plugins.push(
			new UglifyJsPlugin({
				uglifyOptions: {
					warnings: false,//去除警告
					//生产环境自动删除console
					compress: {
						drop_debugger: true,
						drop_console: true,
						pure_funcs: ['console.log']
					}
				},
				sourceMap: false,
				parallel: true
			}),
		);

		// 公共代码抽离
		config.optimization = {
			splitChunks: {
				cacheGroups: {
					vendor: {
						chunks: 'all',
						test: /node_modules/,
						name: 'vendor',
						minChunks: 1,
						maxInitialRequests: 5,
						minSize: 0,
						priority: 100
					},
					common: {
						chunks: 'all',
						test: /[\\/]src[\\/]js[\\/]/,
						name: 'common',
						minChunks: 2,
						maxInitialRequests: 5,
						minSize: 0,
						priority: 60
					},
					styles: {
						name: 'styles',
						test: /\.(sa|sc|c)ss$/,
						chunks: 'all',
						enforce: true
					},
					runtimeChunk: {
						name: 'manifest'
					}
				}
			}
		};


	},
	devServer : {
		proxy:{
			// api设置：后端数据端口的路径
			'/api':{
				//后端数据的接口地址
				target : 'http://111.229.37.167',
				//允许跨域访问
				changOrigin : true,
			}
		}
	}
	

}