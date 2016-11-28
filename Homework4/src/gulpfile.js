var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var path = {
    css:  'styles/*.css',
    html: 'templates/*.html',
  	images: 'images/*.*',
	fonts: 'fonts/*.*',
 vendor: {
      css: 'src/vendor/css/*.css'
   },
 dist: {
      css:  'dist/styles/',
      html: 'dist/',
	 images: 'dist/images/',
	 	fonts: 'dist/fonts/',
	 vendor: 'dist/vendor/'
 }

};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.dist.css));

});

gulp.task('css-min', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.dist.css));
});


gulp.task('fonts', function () {
  return gulp.src(path.fonts)
    .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('images', function () {
  return gulp.src(path.images)
    .pipe(gulp.dest(path.dist.images));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});
gulp.task('vendor-css', function () {
  return gulp.src(path.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(path.dist.vendor));
});

gulp.task('vendor-css-min', function () {
  return gulp.src(path.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.dist.vendor));
});

gulp.task('build', ['html', 'css', 'images', 'fonts']);
gulp.task('prod', ['html', 'css-min', 'vendor-css-min', 'img']);
gulp.task('watch', function () {
  	gulp.watch(path.css, ['css']);
  	gulp.watch(path.html, ['html']);
	gulp.watch(path.html, ['images']);
	gulp.watch(path.html, ['fonts']);
 	gulp.watch(path.vendor.css, ['vendor-css']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
