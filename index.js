/* global hexo */
"use strict";

exports = module.exports = function(app, hexoInstance, opts){

    /*/ Dependencies /*/
    var connect = require('connect');
    var assign = require('object-assign');
    var Promise = require('bluebird');

    /*/ Requirements /*/
    var hexoApp = connect();

    function run(){

        return new Promise(function(resolve, reject){

            /*/ Step 1 => Get Configs/Options from The Third Argument /*/
            opts = typeof(opts) !== "object" ? {} : opts;

            var config = assign({
                log: false,
                compress: false,
                header: true,
                serveStatic: false,
                route: '/'
            }, opts);

            /*/ Step 2 => Initialize Hexo /*/
            hexoInstance
                .init()
                .then(function(){

                    /*/ Step 3 => Get Hexo Configs from _config.yml File /*/
                    config = typeof(hexoInstance.config.app) !== "object" ?
                                config:
                                assign(
                                    assign({}, config),
                                    hexoInstance.config.app
                                );

                    /*/ Step 4 => Apply Configs/Options on The Configs of Intended Hexo Instance /*/
                    hexoInstance.config.app = config;

                    /*/ Step 5 => Overwrite url_for() helper /*/
                    hexoInstance.extend.helper.register('url_for', require('./lib/helper/url_for'));

                    /*/ Step 6 => Extend Hexo with App /*/
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

                            /*/ Step 7 => Run (Watch/Load) Hexo /*/
                            if(config.serveStatic)

                                return hexoInstance.load();

                            return hexoInstance.watch();

                        })
                        .then(function(){

                            hexoInstance.log.info('[Hexo-App-Connect] is running on route ' + config.route);

                            /*/ Step 8 => Use hexoApp as route in your app /*/
                            app.use(config.route, hexoApp);

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

    run();

    return hexoApp;

};