import mongoose, { Schema } from 'mongoose';

export const ResultsSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  quizSlug: String,
  answers: [String],
  dateCreated: Date,
});

export default mongoose.models.results ||
  mongoose.model('results', ResultsSchema);
