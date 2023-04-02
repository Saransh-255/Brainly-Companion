/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const zip = require("gulp-zip");

gulp.task("sass", () => {
  return gulp.src("./src/styles/**/index.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"));
});
gulp.task("watch-sass", () => {
  return gulp.watch("./src/styles/**/*.scss", gulp.series("sass"));
});
gulp.task("manifest", () => {
  return gulp.src("./manifest.json")
    .pipe(gulp.dest("./dist/"));
});
gulp.task("icons", () => {
  return gulp.src("./icons/*.png")
    .pipe(gulp.dest("./dist/icons"));
});
gulp.task("zip", () => {
  return gulp.src("./dist/*")
    .pipe(zip("bcomp.zip"))
    .pipe(gulp.dest("./dist/"));
});



gulp.task("dev", gulp.parallel(gulp.series("sass", "icons", "manifest"), "watch-sass"));
gulp.task("prod", gulp.series("sass", "icons", "manifest", "zip"));