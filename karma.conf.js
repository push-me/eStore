//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
       'dependencies/angular.js',
       'dependencies/angular-resource.js',
       'dependencies/angular-route.js',
       'dependencies/angular-animation.js',
       'dependencies/angular-mocks.js',
       'dependencies/firebase-app.js',
       'dependencies/firebase-auth.js',
       'dependencies/firebase-database.js',
       'firebase.config.js',
       '**/*.html',
       '**/*.module.js',
       'cart/cart.service.js',
       'cart/cartWidget.directive.js',
       'returnUnique/returnUnique.filter.js',
       'range.filter/range.filter.js',
       'pageCount.filter/pageCount.filter.js',
       'categoriesMenu/category.service.js',
       'categoriesMenu/categoriesMenu.directive.js',
       'pagination/pagination.service.js',
       'pagination/pagination.directive.js',
       'checkout/checkout.controller.js',
       '*!(.module|.spec).js',
       '**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    preprocessors: {
      '**/*.html':['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      // the name of the Angular module to create
      moduleName: "allTemplates",
      // cacheIdFromPath: function(filepath) {
      //   return 'cart/cartWidget.html'//filepath.match(/cart\/.*/)[0]
      // }
    }

  });
};
