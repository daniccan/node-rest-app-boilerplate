const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const httpErrors = require("http-errors");
const logger = require("./src/utils/logger");
const router = require("./routes/router");
const cron_middleware = require("./src/controller/cron_controller");

cron_middleware()
  .then((res) => {
    logger.info(`Scheduler initialized`);
  })
  .catch((err) => {
    logger.error(`Error in initializing scheduler: ${err}`);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "Content-Disposition");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.removeHeader("X-Powered-By");
  res.header("Content-Security-Policy", "frame-ancestors 'none'");
  res.header(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("X-Frame-Options", "DENY");
  res.header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  res.header("Referrer-Policy", "no-referrer");
  res.header("Pragma", "no-cache");
  res.header("Last-Modified", new Date());
  res.header("Expires", "0");
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use("/api/v1/", router);

app.use(function (req, res, next) {
  next(httpErrors(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: "error",
    data: err.message,
    message: "Something went wrong!!! Please try again later.",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  logger.info("App listening on port " + port);
});