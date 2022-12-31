const responder = require("../utils/responder");
const syncService = require("../service/sync_service");

let SyncController = {
  runSyncJob: async (request, response, next) => {
    try {
      await syncService.runSyncJob();
      responder.sendResponse(response, 204, null);
    } catch (error) {
      return next(error);
    }
  },
}

module.exports = SyncController;