const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const routes = require("./routes");
const cssRouter = require("./routes/css");

const app = express();

// compile SASS files
const cssConfig = require("./config/css");
const { compileSassFiles } = require("../utilities/compile_sass");
compileSassFiles(cssConfig.sassFilesToCompile);

if (process.env.NODE_ENV !== "production") app.use("/styles/css", cssRouter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const port = process.env.SERVER_PORT || 4700;

function start(){
  app.listen(port, () =>
    console.log(`app listening at http://localhost:${port}`)
  );
}

module.exports = {
  app,
  start
};
