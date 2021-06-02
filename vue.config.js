//const path = require('path');

module.exports = {
    parallel: false,
    outputDir: 'docs',
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/liquid-trader",

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
