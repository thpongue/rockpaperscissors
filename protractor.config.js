// conf.js
exports.config = {
 	baseUrl: 'http://localhost:8001/',
	specs: [
		'e2e/**/*.js'
	],  
  capabilities: {
    browserName: 'chrome'
  },
	onPrepare: function(){
		require('protractor-http-mock').config = {
			rootDirectory: __dirname,
			protractorConfig: 'protractor.config.js'
		}
	}
}
