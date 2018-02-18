# x-hexo-app-connect

![Travis](https://api.travis-ci.org/smrsan76/x-hexo-app-connect.svg?branch=master)

It lets you use hexo app(s) as route(s) in your express/connect app

[![NPM](https://nodei.co/npm/x-hexo-app-connect.png)](https://nodei.co/npm/x-hexo-app-connect/)

# What is x-hexo-app-connect ?
- **Hexo-server App** - It lets you use hexo-server as route in your (connect|express|...) app.
    It means that you can extend your own server's app with hexo's app.
- **Multiple Blog** - It lets you use multiple hexo blogs as the routes of your main application.
    It means that you can have multiple hexo blogs on one server which you created !
- **No-Need to Use Hexo-server** - Your own (connect|express|...) server is enough !

# Getting Started
Do these steps below, one by one to have a clean blog using this package + hexo.
These steps are just about a __**sample**__ project.
You can use this information to develop your blog in any shapes.

## 1. Installation
1.1 - Make a sub-directory in wherever you want inside of your project directory.
e.g. if we wanted to make it in the root path of our project, use this command:
```bash
$ mkdir blog
```

1.2 - Enter this command to install [hexo-cli](https://npmjs.com/package/hexo-cli) globally.
```bash
$ sudo npm i hexo-cli -g
```

1.3 - Go to your blog's directory you made (__in step 1.1__) and enter this in terminal to initialize hexo, there:
```bash
$ hexo init
```
and after that, the blog directory tree should be something like this:
```
./
├── _config.yml
├── node_modules
│   └── ...
├── package.json
├── package-lock.json
├── scaffolds
│   ├── draft.md
│   ├── page.md
│   └── post.md
├── source
│   └── _posts
│       └── hello-world.md
└── themes
    └── landscape
        ├── _config.yml
        ├── Gruntfile.js
        ├── languages
        │   ├── default.yml
        │   ├── de.yml
        │   ├── es.yml
        │   ├── fr.yml
        │   ├── ja.yml
        │   ├── ko.yml
        │   ├── nl.yml
        │   ├── no.yml
        │   ├── pt.yml
        │   ├── ru.yml
        │   ├── zh-CN.yml
        │   └── zh-TW.yml
        ├── layout
        │   ├── archive.ejs
        │   ├── category.ejs
        │   ├── index.ejs
        │   ├── layout.ejs
        │   ├── page.ejs
        │   ├── _partial
        │   │   ├── after-footer.ejs
        │   │   ├── archive.ejs
        │   │   ├── archive-post.ejs
        │   │   ├── article.ejs
        │   │   ├── footer.ejs
        │   │   ├── gauges-analytics.ejs
        │   │   ├── google-analytics.ejs
        │   │   ├── head.ejs
        │   │   ├── header.ejs
        │   │   ├── mobile-nav.ejs
        │   │   ├── post
        │   │   │   ├── category.ejs
        │   │   │   ├── date.ejs
        │   │   │   ├── gallery.ejs
        │   │   │   ├── nav.ejs
        │   │   │   ├── tag.ejs
        │   │   │   └── title.ejs
        │   │   └── sidebar.ejs
        │   ├── post.ejs
        │   ├── tag.ejs
        │   └── _widget
        │       ├── archive.ejs
        │       ├── category.ejs
        │       ├── recent_posts.ejs
        │       ├── tagcloud.ejs
        │       └── tag.ejs
        ├── LICENSE
        ├── package.json
        ├── README.md
        ├── scripts
        │   └── fancybox.js
        └── source
            ├── css
            │   ├── _extend.styl
            │   ├── fonts
            │   │   ├── FontAwesome.otf
            │   │   ├── fontawesome-webfont.eot
            │   │   ├── fontawesome-webfont.svg
            │   │   ├── fontawesome-webfont.ttf
            │   │   └── fontawesome-webfont.woff
            │   ├── images
            │   │   └── banner.jpg
            │   ├── _partial
            │   │   ├── archive.styl
            │   │   ├── article.styl
            │   │   ├── comment.styl
            │   │   ├── footer.styl
            │   │   ├── header.styl
            │   │   ├── highlight.styl
            │   │   ├── mobile.styl
            │   │   ├── sidebar-aside.styl
            │   │   ├── sidebar-bottom.styl
            │   │   └── sidebar.styl
            │   ├── style.styl
            │   ├── _util
            │   │   ├── grid.styl
            │   │   └── mixin.styl
            │   └── _variables.styl
            ├── fancybox
            │   ├── blank.gif
            │   ├── fancybox_loading@2x.gif
            │   ├── fancybox_loading.gif
            │   ├── fancybox_overlay.png
            │   ├── fancybox_sprite@2x.png
            │   ├── fancybox_sprite.png
            │   ├── helpers
            │   │   ├── fancybox_buttons.png
            │   │   ├── jquery.fancybox-buttons.css
            │   │   ├── jquery.fancybox-buttons.js
            │   │   ├── jquery.fancybox-media.js
            │   │   ├── jquery.fancybox-thumbs.css
            │   │   └── jquery.fancybox-thumbs.js
            │   ├── jquery.fancybox.css
            │   ├── jquery.fancybox.js
            │   └── jquery.fancybox.pack.js
            └── js
                └── script.js
```

1.4 - In the blog directory, enter this command in terminal to install
[x-hexo-app-connect](https://npmjs.com/package/x-hexo-app-connect) package, there:
```bash
$ npm i x-hexo-app-connect --save
```

1.5 - Configure your blog according to [The Configurations Section](#2-configurations).

1.6 - Create a __`index.js`__ file in __your blog's root directory__.
e.g. if you want to make it using a [bash terminal](https://en.wikipedia.org/wiki/Bash_(Unix_shell)), enter this command below:
```bash
$ touch index.js
```

1.7 - Fill __`index.js`__ file (inside of your blog's directory) with this scripts:
```javascript
'use strict';

exports = module.exports = function(app){

    var blogDirPath = "/absolute/path/to/your/blog's/root/directory";
    var Hexo = require("hexo");
    var hexo = new Hexo(blogDirPath, {});

    return require('x-hexo-app-connect')(app, hexo);

};
```

1.8 - Open the file which you want to use [x-hexo-app-connect](https://npmjs.com/package/x-hexo-app-connect)
in your (connect|express|...) application. Then, use these scripts to use hexo as a route in your application:
```javascript
// some of your codes ...

// e.g. 'app' is your (connect|express|...) application
var hexoAppConnect = require("./relative/path/to/your/blog's/root/directory")(app);

// some of your codes ...
```

1.9 - After all previous steps, it's time to run your main application which
you added [x-hexo-app-connect](https://npmjs.com/package/x-hexo-app-connect) to one of it's routes.
e.g. after running, if hexo worked well; it should log something like this in your app's terminal:
```
INFO  Start processing
INFO  [x-hexo-app-connect] is running on route /blog
```
and you have simply succeed; Congratulations !!!

I suggest you read [The 'Using Hexo Themes' Section](#3-using-hexo-themes) after being
succeed.


## 2. Configurations
There are 2 ways for [x-hexo-app-connect](https://npmjs.com/package/x-hexo-app-connect) configuration.

### 1. Config :: Using Hexo `_configs.yml` File
There is a `_configs.yml` file inside of your blog's directory.
Add these configuration lines to `_configs.yml` content:
```yaml
# x-hexo-app-connect
app:
    log: false,
    compress: false,
    header: true,
    serveStatic: false
    route: /
```
The configs above are default configs, too.

### 2. Config :: Using The Third Argument
__**(>= v2.0.5) Recommended**__: Simply enter an object to the third argument of this package's function:
```javascript
hexoApp(
    yourApp,
    hexo,
    { // The Configs/Options
        log: false,
        compress: false,
        header: true,
        serveStatic: false
        route: "/"
    });
```

### Config Explanations
`log` : logs some information about hexo state.

`compress` : whether use the [compression](https://npmjs.com/package/compression) package or not.

`header` : whether set header `'X-Powered-By': 'Hexo'` or not.

`serveStatic` : whether use hexo.load() or hexo.watch() for serving blog.

`route` : determines that hexo runs on which route of your (connect|express|...) application.

> Note: Determining the `route` in it's configs is __**SO IMPORTANT**__; because it can cause
 your app to not load pages correctly. so be careful about it and I recommend you to use
 [the second approach](#2-config--using-the-third-argument)
 for configuration.

> Note: Use the complete route string which [x-hexo-app-connect](https://npmjs.com/package/x-hexo-app-connect)
connects to your (connect|express|...) app in it.


## 3. Using Hexo Themes
In hexo themes be careful when you use paths to blog's public sources, routes and ...

### For Example:
There is a problem in __the archive link__ of hexo's [landscape theme](https://github.com/hexojs/hexo-theme-landscape).

If you faced a problem like that, use the [url_for()](https://hexo.io/docs/helpers.html#url-for) helper and
the helpers which use url_for, like:

- [css()](https://hexo.io/docs/helpers.html#css)
- [js()](https://hexo.io/docs/helpers.html#js)
- [link_to()](https://hexo.io/docs/helpers.html#https://hexo.io/docs/helpers.html#link-to)

then add a slash '/' after the `archives page` url to solve that.

#### Relative Packages
* [x-hexo-app-express](https://npmjs.com/package/x-hexo-app-express)
* [hexo-server-express](https://npmjs.com/package/hexo-server-express)


#### Made with ❤️ for [hexo](https://npmjs.com/package/hexo)