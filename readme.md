## Front-end components
##### Bower Package List
* [Jquery](https://github.com/jquery/jquery)
* [Modernizr](http://modernizr.com/)

### Gulp
[Gulp](http://gulpjs.com) for front-end development automated tasks. Check link for more information.
##### Gulp Package list
* [gulp-util](https://github.com/gulpjs/gulp-util)
* [gulp-clean](https://github.com/peter-vilja/gulp-clean)
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
* [gulp-changed](https://github.com/sindresorhus/gulp-changed)
* [gulp-clean](https://github.com/peter-vilja/gulp-clean)
* [gulp-concat](https://github.com/wearefractal/gulp-concat)
* [gulp-filesize](https://github.com/Metrime/gulp-filesize)
* [gulp-rename](https://github.com/hparra/gulp-rename)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-uglify](https://github.com/terinjokes/gulp-uglify)
* [gulp-watch](https://github.com/floatdrop/gulp-watch)
* [gulp-strip-comments](https://www.npmjs.com/package/gulp-strip-comments)
* [gulp-foreach](https://www.npmjs.com/package/gulp-foreach)
* [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)


## Starting application on local enviroment
#### 1. Install npm modules with 
```sh
[sudo] npm install
[sudo] npm install --global forever
```
#### 2. Then you can just run with following command
```sh
forever start app/app.js
```
Go ahead and hit [http://localhost:8080/](http://localhost:8080/)
#### * Restarting local server:
```sh
forever restart app/app.js
```
#### * Stoping local server:
```sh
forever stop app/app.js
```

## Front-end development enviroment
#### 1. If you are working on scss or js files, you should install gulp and bower first
```sh
[sudo] npm install --global gulp
[sudo] npm install --global bower
```
#### 2. After installing gulp and bower you can run 
```sh
gulp development
```
This will handle all minify and compile processes for you without any extra cli commands. For more information check Gulpfile.js on application root.
