//const path = require('path');

module.exports = {
    parallel: false,
    outputDir: 'docs',
    assetsDir: 'post-ops',
    publicPath: process.env.NODE_ENV === "production" ? "/post-ops/" : "/post-ops/",

    "devServer": {
		"port": 8383
	},

    css: {
        requireModuleExtension: true,
        extract: true
    },

    transpileDependencies: [
      'vuetify'
    ]
}    
