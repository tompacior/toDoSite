'use strict';

const { watch, src, dest, series, parallel } = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano');
const sass = require('gulp-sass');
const { init, write } = require('gulp-sourcemaps');
const browserSync = require("browser-sync").create();
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');



sass.compiler = require('node-sass');

const config ={
  app: {
    fonts: "./src/fonts/*",
    images: "./src/images/**/*.*",
    js: "./src/js/**/*.js",
    sass: "./src/sass/**/*.scss",
    html: "./src/*.html"
  },
  dist: {
    base: "./dist/",
    fonts: "./dist/fonts",
    images:"./dist/images",
    css: "./dist/css",
    js: "./dist/js"
  }
}

//NORMAL TASKS

//sacc to css and copy to destination folder
function sassTask(done) {
 src(config.app.sass)
  .pipe(init())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([autoprefixer(), cssnano()]))
  .pipe(write())
  .pipe(dest(config.dist.css))
  .pipe(browserSync.stream());
  done();
};


//add fonts to Destination folder
function fontsTask(done){
  src(config.app.fonts)
    .pipe(dest(config.dist.fonts))
    .pipe(browserSync.stream());
  done();
}

//add images to destination folder
function imagesTask(done){
  src(config.app.images)
    .pipe(dest(config.dist.images))
    .pipe(browserSync.stream());
  done();
}

//add html file to destinatin folder
function htmlTask(done){
  src(config.app.html)
    .pipe(dest(config.dist.base))
    .pipe(browserSync.stream());
  done();
}

//add js file to destination folder
function jsTask(done){
  src(config.app.js)
    .pipe(init())//for sourceMap
    .pipe(babel({
      presets: ['@babel/preset-env']
      }))//need before uglify becouse uglify don't support ES6
    .pipe(uglify().on('error', console.error))//min.js file
    .pipe(write())//for sourceMap
    .pipe(rename("app.min.js"))//rename file + min.js
    .pipe(dest(config.dist.js))
    .pipe(browserSync.stream());
  done();
}

// Static server
function browserSyncTask() {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      ui: {
        port: 8080
      },
      port: 3004
  });
  watchAll();
};

//WATCH TASKS
function watchAll (){
  watch(config.app.images, imagesTask);
  watch(config.app.fonts, fontsTask);
  watch(config.app.html, htmlTask);
  watch(config.app.js, jsTask);
  watch(config.app.sass, sassTask);
}




//EXPORTS
exports.watch =  watchAll;
exports.default = browserSyncTask;