const gulp = require("gulp");
const zip = require("gulp-zip");
const del = require("del");

gulp.task("clean", () => {
  return del(["languages", "bundled"]);
});

exports.bundle = () =>
  gulp
    .src([
      "**/*",
      "!bundled/**",
      "!node_modules/**",
      "!src/**",
      "!.eslintrc.js",
      "!.gitignore",
      "!gulpfile.js",
      "!package.json",
      "!package-lock.json",
      "!readme.md",
      "!webpack.config copy.js",
      "!webpack.config.js",
    ])
    .pipe(zip("custom-html.zip"))
    .pipe(gulp.dest("bundled"));
