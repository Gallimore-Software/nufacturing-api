"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const userModel_1 = __importDefault(require("@models/userModel"));
// Schedule the task to run daily
node_cron_1.default.schedule("0 0 * * *", async () => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        // Delete unverified users older than a week
        const result = await userModel_1.default.deleteMany({
            emailVerified: false,
            createdAt: { $lte: oneWeekAgo },
        });
        console.log(`Deleted ${result.deletedCount} unverified users`);
    }
    catch (err) {
        console.error("Error deleting unverified users:", err);
    }
});
