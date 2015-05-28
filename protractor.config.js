exports.config = {
 	baseUrl: 'http://localhost:3000/',
	specs: [
		'e2e/**/*.spec.js'
	],  
  capabilities: {
    browserName: 'chrome'
//    browserName: 'firefox'
//    browserName: 'safari'
  },
	onPrepare: function() {
		require('protractor-http-mock').config = {
			rootDirectory: __dirname,
			protractorConfig: 'protractor.config.js'
		}
	}
}
