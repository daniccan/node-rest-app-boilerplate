const express = require("express");
const router = express.Router();
const syncController = require("../src/controller/sync_controller");

router.get("/health", (req, res, next) => {
  res.send("OK");
});

router
  .route("/sync")
  .post(syncController.runSyncJob);

module.exports = router;