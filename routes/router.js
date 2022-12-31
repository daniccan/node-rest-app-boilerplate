const express = require("express");
const router = express.Router();

router.get("/health", (req, res, next) => {
  res.send("OK");
});

module.exports = router;