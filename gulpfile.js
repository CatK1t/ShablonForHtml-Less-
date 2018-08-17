const gulp          = require('gulp');
const cleanCSS      = require('gulp-clean-css');
const autoprefixer  = require('gulp-autoprefixer');
const browsersync   = require('browser-sync');
const sourcemaps    = require('gulp-sourcemaps');
//const concat        = require('gulp-concat');
//const uglify        = require('gulp-uglify');
const gcmq          = require('gulp-group-css-media-queries');
const preproc       = require('gulp-less');

let config = {
    src : './src',
    css: {
        watch: '/precss/**/*.less',
        src: '/precss/style.less',
        dest: '/css'
    },
    preJs: {
        libs: '/libs/**/*.js',
        js: '/js',
        jsf: '/js/main.js'
    },
    html: {
        src: '/*.html'
    }
};

gulp.task('build', function(){
    gulp.src(config.src + config.css.src)
    .pipe(sourcemaps.init())
    .pipe(preproc())
    .pipe(gcmq())
    .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
    }))
    .pipe(cleanCSS(
       {level: 2}
    ))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.src + config.css.dest))
    .pipe(browsersync.reload( {stream: true} ))
});

gulp.task('browser-sync', function() {
    browsersync({
    server: {
        baseDir: config.src
    },
    notify: true,
     open: true,
     tunnel: true,
     tunnel: "projectname", 
    //Demonstration page: 		http://projectname.localtunnel.me
    })
});

gulp.task('js', function() {
	return gulp.src([
		config.src +  config.preJs.jsf, // Always at the end
		])
	//.pipe(concat('scripts.min.js'))
	//.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest(config.src +  config.preJs.js))
	.pipe(browsersync.reload({ stream: true }))
});


gulp.task('watch', ['build', /*'js',*/'browser-sync'], function(){
    gulp.watch(config.src + config.css.watch,['build']);
    gulp.watch([config.src + config.preJs.libs, config.src +  config.preJs.jsf], ['js']);
    gulp.watch(config.src + config.html.src, browsersync.reload);
});

gulp.task('default', ['watch']);
