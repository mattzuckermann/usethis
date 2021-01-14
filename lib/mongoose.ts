import mongoose from 'mongoose';

const connectDb = (
  handler: (req: string, res: string) => Promise<void>
) => async (req: string, res: string): Promise<void> => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return handler(req, res);
};

const db = mongoose.connection;

db.once('open', () => {
  // Make console color green
  console.log('\x1b[33m', 'Connected to mongo ✅');
  // Reset console color
  console.log('\x1b[0m', '');
});

export default connectDb;
