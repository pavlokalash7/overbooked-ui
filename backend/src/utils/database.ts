import mongoose from 'mongoose';

import Env from '@/utils/env';
import Logger from '@/utils/logger';

export const initializeDatabase = async () => {
  try {
    // Mongoose connection options can be specified here
    await mongoose.connect(Env.DATABASE_URL, {});
    Logger.info('Database connected');
  } catch (error) {
    Logger.error(`Error connecting to database: ${error}`);
    process.exit(1);
  }
};

export const closeDatabase = async () => {
  try {
    await mongoose.connection.close();
    Logger.info('Database connection closed');
  } catch (error) {
    Logger.error(`Error closing database connection: ${error}`);
  }
};
