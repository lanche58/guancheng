var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var imagemin = require('imagemin');
var imageminJpegtran = require('imagemin-jpegtran');
var imageminPngquant = require('imagemin-pngquant');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var del = require('del');
// var glob = require('glob');
// var postcss = require('gulp-postcss'); //去除冗余的CSS
var csscomb = require('gulp-csscomb'); //设置CSS编码风格
var cleanCSS = require('gulp-clean-css');
var fileinclude = require('gulp-file-include');
var htmlmin = require('gulp-htmlmin');
// var uncss = require('gulp-uncss');
//雪碧图
gulp.task('sprite',function(){
	var spriteData = gulp.src('./src/images/sprite/a/*.png').pipe(plugins.spritesmith({
		imgName: 'aicos.png',
		cssName: 'aicos.css',
		algorithms: 'binary-tree'
	}));
	spriteData.img.pipe(gulp.dest('./src/images/'));
	spriteData.css.pipe(gulp.dest('./src/css/sprite/'));

	var spriteData2 = gulp.src('./src/images/sprite/b/*.png').pipe(plugins.spritesmith({
		imgName: 'bicos.png',
		cssName: 'bicos.css',
		algorithms: 'binary-tree'
	}));
	spriteData2.img.pipe(gulp.dest('./src/images/'));
	spriteData2.css.pipe(gulp.dest('./src/css/sprite/'));
});
//压缩图片
gulp.task('imagemin',function(){
	imagemin(['./src/img/*.{jpg,png}'],'./dist/img/',{
		plugins: [
			imageminJpegtran(),
			imageminPngquant({quality: '65-80'})
		]
	});

	imagemin(['./src/images/*.{jpg,png}'],'./dist/images/',{
		plugins: [
			imageminJpegtran(),
			imageminPngquant({quality: '65-80'})		
		]
	});
});
//压缩代码
gulp.task('uglify',function(){
	gulp.src('src/js/uglify/*.js')
	.pipe(plugins.uglify({
		ie8: true
	}))
	.pipe(gulp.dest('dist/js/'))
});
// gulp.task('cleanCss',function(){
// 	gulp.src('src/css/*.css')
// 	.pipe(plugins.cleanCss())
// 	.pipe(gulp.dest('dest/css/'))
// });

// gulp.task('sass',function(){
// 	// nested：嵌套缩进，它是默认值
// 	// expanded：每个属性占一行
// 	// compact：每条样式占一行
// 	// compressed：整个压缩成一行
// 	sass('src/css/sass/*.scss',{style:'compact'})
//     .on('error', sass.logError)
//     .pipe(gulp.dest('src/css/concat/'))
// });
gulp.task('sass', function(){
	gulp.src('src/css/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css/concat/'))
});

//合并文件
gulp.task('concat',function(){
	gulp.src(['src/css/concat/reset.css', 'src/css/concat/common.css', 'src/css/concat/style.css'])
	.pipe(plugins.concat('style.css'))
	.pipe(plugins.autoprefixer([
      	'Chrome >= 20',
      	'Firefox >= 14', 
      	'Explorer >= 8'
    ])) //添加前缀
	// .pipe(postcss(plugins))
    // .pipe(csscomb()) //设置CSS编码风格
    .pipe(cleanCSS({ //压缩css
    	compatibility: 'ie8',
    	// keepSpecialComments: '*',
    	format: 'keep-breaks',
    	// level: { 1: { specialComments: 'all' } }
    	// advanced: false 
    }))
	.pipe(gulp.dest('dist/css/'))

	gulp.src('src/js/concat/*.js')
	.pipe(plugins.concat('plugin.js'))
	.pipe(plugins.uglify({
		ie8: true
	}))
	.pipe(gulp.dest('dist/js/'))
});
// gulp.task('csscomb', function(){
//   	gulp.src('src/**/result/style.css')
//     .pipe(csscomb())
    
//     .pipe(gulp.dest('dist/css/'))
// });

//复制文件
gulp.task('copy', function(){
	gulp.src('src/css/copy/**')
    .pipe(gulp.dest('dist/css/'))

    gulp.src('src/js/copy/**')
    .pipe(gulp.dest('dist/js/'))

    gulp.src('src/img/copy/**')
    .pipe(gulp.dest('dist/img/'))

    gulp.src('src/images/copy/**')
    .pipe(gulp.dest('dist/images/'))
});

gulp.task('copyone', function(){
    gulp.src('src/assets/**')
    .pipe(gulp.dest('dist'))
});

//自动复制文件
// gulp.task('autoCopy', function(){
//     gulp.src('src/*.html')
//     .pipe(gulp.dest('dist'))
// });
//删除文件
gulp.task('clean', function(){
	del('dist');
});

// 提取公共html
gulp.task('fileinclude', function(){
    gulp.src('src/html/*.html')//主文件
    .pipe(fileinclude({
        prefix: '@@',//变量前缀 @@include
        basepath: 'src/_include',//引用文件路径
        indent: true//保留文件的缩进
    }))
    .pipe(htmlmin({
    	removeComments: true //删除注释
    }))
    .pipe(gulp.dest('dist'));//输出文件路径
});

//检测有变化自动执行
gulp.task('auto',function(){
	// gulp.concat;
	gulp.watch(['src/img/*.{jpg,png}','src/images/*.{jpg,png}'],['imagemin']);
	//gulp.watch('dest/css/*.css',['autoprefixer']);
	//gulp.watch('src/js/*.js',['uglify']);
	gulp.watch('src/css/sass/**/*.scss',['sass']);
	gulp.watch(['src/css/concat/*.css','src/js/concat/*.js'],['concat']);
	gulp.watch(['src/**/copy/**','src/*.{html,ico}'],['copy']);
	gulp.watch(['src/html/*.html','src/_include/*.html'],['fileinclude']);

	// gulp.watch(['src/css/concat/result/*.css'],['csscomb']);
	// gulp.watch('src/css/responsive/*.scss',['sass']);
	//gulp.watch('src/css/*.css',['cleanCss']);
	//gulp.watch('src/img/sprite/**/*.*',['sprite']);
	//自动刷新浏览器
	browserSync({
    	server: {
      		baseDir: 'dist'
    	}
  	});
  	gulp.watch(['*.html', 'css/*.css', 'js/*.js'], {cwd: 'dist'}, reload);
});
gulp.task('start',['sprite','imagemin','uglify','sass','concat','copyone','copy','fileinclude']);
gulp.task('default',['auto']);