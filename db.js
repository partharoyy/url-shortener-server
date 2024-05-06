import mongoose from 'mongoose';

export async function dbConnectionHandler(url) {
  return mongoose.connect(url);
}
