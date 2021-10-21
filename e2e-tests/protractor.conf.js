//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },
  onPrepare: ()=> { browser.manage().window().setSize(1600, 1000); },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',
  SELENIUM_PROMISE_MANAGER: false,

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
