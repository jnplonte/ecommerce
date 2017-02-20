// Karma configuration
var filesList = [
    {pattern: 'dist/js/vendor.js', watched: false},
    {pattern: 'dist/js/main.js'},
    {pattern: 'bower_components/angular-mocks/angular-mocks.js'}
];

module.exports = function (config) {
    if( typeof(config.file) == 'undefined' ){
      filesList.push({pattern: 'test/**/*.spec.js'});
    }else{
      filesList.push({pattern: 'test/'+ config.file +'.spec.js'});
    }

    config.set({
        basePath: '',

        frameworks: ['jasmine-jquery', 'jasmine'],

        plugins: [
            'karma-angular-filesort',
            'karma-phantomjs-launcher',
            'karma-jasmine-jquery',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-spec-reporter',
            'karma-coverage'
        ],

        files: filesList,

        exclude: [],

        preprocessors: {
            'dist/js/main.js': ['coverage']
        },

        reporters: ['spec', 'coverage'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        ngHtml2JsPreprocessor: {
            stripPrefix: 'application/',
            moduleName: 'ecommerce.app'
        },

        singleRun: false,

        concurrency: Infinity,

        args: ['--file']
    });
};
