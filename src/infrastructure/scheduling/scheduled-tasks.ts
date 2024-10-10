import User from '@infrastructure/persistence/models/user/user-model';
import cron from 'node-cron';

// Schedule the task to run daily
cron.schedule('0 0 * * *', async () => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Delete unverified users older than a week
    const result = await User.deleteMany({
      emailVerified: false,
      createdAt: { $lte: oneWeekAgo },
    });

    console.log(`Deleted ${result.deletedCount} unverified users`);
  } catch (err) {
    console.error('Error deleting unverified users:', err);
  }
});
