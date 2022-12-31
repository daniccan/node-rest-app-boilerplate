const cron = require("node-cron");
const syncService = require("../service/sync_service");

async function scheduler() {
  cron.schedule("0 0 * * *", async () => {
    syncService.runSyncJob();
  });
}

module.exports = scheduler;