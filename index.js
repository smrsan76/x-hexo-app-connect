/* global hexo */
"use strict";

exports = module.exports = function(app, hexoInstance){

    /*/ Dependencies /*/
    var connect = require('connect');
    var assign = require('object-assign');
    var Promise = require('bluebird');

    /*/ Requirements /*/
    var hexoApp = connect();

    function run(){

        return new Promise(function(resolve, reject){


            /*/ Step 1 => Initialize Hexo /*/
            hexoInstance
                .init()
                .then(function(){

                    /*/ Step 2 => Get Hexo Configs /*/
                    var config = hexoInstance.config.app;
                    config = assign({
                        log: false,
                        compress: false,
                        header: true,
                        serveStatic: false,
                        route: '/'
                    }, config);

                    /*/ Step 3 => Overwrite url_for() helper /*/
                    hexoInstance.extend.helper.register('url_for', require('./lib/helper/url_for'));

                    /*/ Step 4 => Extend Hexo with App /*/
                    hexoInstance
                        .extend
                        .filter
                        .exec('server_middleware', hexoApp, {context: hexoInstance})
                        .catch(function(err){

                            hexoInstance.log.fatal('An error has occurred while extending hexo with app.');

                            reject(err);

                            try{
                                hexoInstance.unwatch();
                            } catch(err) {}

                            hexoInstance.exit();

                        })
                        .then(function(){

                            /*/ Step 5 => Run (Watch/Load) Hexo /*/
                            if(config.serveStatic)

                                return hexoInstance.load();

                            return hexoInstance.watch();

                        })
                        .then(function(){

                            hexoInstance.log.info('[Hexo-App-Connect] is running on route ' + config.route);
                            resolve(config);

                        })
                        .catch(function(err){

                            hexoInstance.log.fatal('An error has occurred while running hexo.');

                            reject(err);

                            try{
                                hexoInstance.unwatch();
                            } catch(err) {}

                            hexoInstance.exit();

                        });

                })
                .catch(function(err){

                    hexoInstance.log.fatal('An error has occurred while initializing hexo.');
                    hexoInstance.exit();
                    reject(err);

                });


        });

    }


    hexoInstance.extend.filter.register('server_middleware', require('./lib/middleware/header'));
    hexoInstance.extend.filter.register('server_middleware', require('./lib/middleware/gzip'));
    hexoInstance.extend.filter.register('server_middleware', require('./lib/middleware/logger'));
    hexoInstance.extend.filter.register('server_middleware', require('./lib/middleware/route'));
    hexoInstance.extend.filter.register('server_middleware', require('./lib/middleware/static'));
    hexoInstance.extend.filter.register('server_middleware', require('./lib/middleware/redirect'));

    run()
        .then(function(appConfig){

            /*/ Step 6 => Use hexoApp as route in your app /*/
            app.use(appConfig.route, hexoApp);

        });


    return hexoApp;

};