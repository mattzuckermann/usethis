import mongoose, { Schema } from 'mongoose';
import Quizzes from '../quizzes/quizzes';

export const ResultsSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  quizSlug: String,
  answers: [String],
  dateCreated: Date,
});

/* Cascading Removal Middleware on Quizzes Collection */
ResultsSchema.pre('deleteOne', async function () {
  await Quizzes.findOneAndUpdate(
    { results: this._conditions._id },
    { $pull: { results: this._conditions._id } },
    { new: true }
  );
});

export default mongoose.models.results ||
  mongoose.model('results', ResultsSchema);
