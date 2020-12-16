import mongoose, { Schema } from 'mongoose';

export const ResultsSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.results ||
  mongoose.model('results', ResultsSchema);
