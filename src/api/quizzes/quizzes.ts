import mongoose, { Schema } from 'mongoose';

export const QuizzesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  problems: [{ type: Schema.Types.ObjectId, ref: 'problems' }],
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
  },
  results: [{ type: Schema.Types.ObjectId, ref: 'results' }],
});

export default mongoose.models.quizzes ||
  mongoose.model('quizzes', QuizzesSchema);
