const logger = require("../utils/logger");

let SyncService = {
  runSyncJob: async () => {
    logger.info("Run Sync Job!!!");

    logger.info("End Sync Job!!!");
  }
}

module.exports = SyncService;