var gulp = require("gulp");

var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

var p = require('./package.json')

var src = 'src/main/webapp/src/';
var dest = 'src/main/webapp/js/';

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('uglify', function(){
  gulp.src(src + '*.js')
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename({
      extname: '-' + p.version + '.min.js'
    }))
    .pipe(gulp.dest(dest + ''));
});
