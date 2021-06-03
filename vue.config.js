//const path = require('path');
process.env.VUE_APP_VERSION = process.env.npm_package_version
module.exports = {
    parallel: false,
    outputDir: 'docs',
   // assetsDir: 'post-ops',
    filenameHashing:false,
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
