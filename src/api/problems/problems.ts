import mongoose, { Schema } from 'mongoose';
import Quizzes from '../quizzes/quizzes';
import { Problem } from '../../@types/problems';

export const ProblemsSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['MULTICHOICE', 'MULTIANSWER', 'TRUEFALSE', 'FILLBLANK'],
    required: true,
  },
  choices: {
    type: [
      {
        answer: String,
        isCorrect: Boolean,
      },
    ],
    validate: {
      validator: checkChoicesArrayLength,
      message:
        'Choices string array is not the proper length for this type of problem.',
    },
    required: true,
  },
  correctAnswers: {
    type: Number,
    validate: {
      validator: checkCorrectChoices,
      message:
        'The expected number of correct answers for this type of problem does not match how many problems there are with a true isCorrect boolean.',
    },
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

/* Cascading Removal Middleware on Quizzes Collection */
ProblemsSchema.pre('deleteOne', async function (this: any) {
  // @ts-ignore
  await Quizzes.findOneAndUpdate(
    { problems: this._conditions._id },
    { $pull: { problems: this._conditions._id } },
    { new: true }
  );
});

function checkChoicesArrayLength(this: Problem, value: string[]) {
  let result: boolean;
  switch (this.questionType as any) {
    case 'TRUEFALSE':
      result = value.length === 2;
      break;
    case 'MULTICHOICE':
    case 'MULTIANSWER':
    case 'FILLBLANK':
      result = value.length > 2;
      break;
    default:
      result = false;
  }
  return result;
}

function checkCorrectChoices(this: Problem, value: number) {
  let totalCorrectAnswers = 0;
  let result = true;
  for (let i = 0; i < this.choices.length; i++) {
    if (this.choices[i].isCorrect === true) {
      totalCorrectAnswers = totalCorrectAnswers + 1;
    }
  }
  switch (this.questionType as any) {
    case 'TRUEFALSE':
    case 'MULTICHOICE':
      result = totalCorrectAnswers === 1 && totalCorrectAnswers === value;
      break;
    case 'FILLBLANK':
    case 'MULTIANSWER':
      result = totalCorrectAnswers === value;
      break;
    default:
      result = false;
  }
  return result;
}

export default mongoose.models.problems ||
  mongoose.model('problems', ProblemsSchema);
