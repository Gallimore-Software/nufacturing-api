import cron from "node-cron";
import User from "../models/userModel";

// Schedule the task to run daily
cron.schedule("0 0 * * *", async () => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Delete unverified users older than a week
    const result = await User.deleteMany({
      verified: false,
      createdAt: { $lte: oneWeekAgo },
    });

    console.log(`Deleted ${result.deletedCount} unverified users`);
  } catch (err) {
    console.error("Error deleting unverified users:", err);
  }
});
