import mongoose, { Schema } from 'mongoose';
import { Problem } from '../../@types/schema';
export const ProblemsSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
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
      validator: checkArrayLength,
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
  quizCategory: {
    type: String,
    required: true,
  },
});

function checkArrayLength(this: Problem, value: string[]) {
  let result: boolean;
  switch (this.questionType) {
    case 'True/False':
      return value.length === 2;
      break;
    case 'Multiple-Choice':
    case 'Multiple-Answer':
    case 'Fill-in-the-blank':
      result = value.length > 2;
      break;
    default:
      result = true;
  }
  return result;
}

function checkCorrectChoices(this: Problem, value: number) {
  let totalCorrectAnswers = 0;
  let result = true;
  for (let i = 0; i < this.choices.length; i++) {
    if (this.choices[i].isCorrect === true) {
      totalCorrectAnswers = totalCorrectAnswers++;
    }
  }
  switch (this.questionType) {
    case 'True/False':
    case 'Multiple-Choice':
      result = totalCorrectAnswers === 1 && totalCorrectAnswers === value;
      break;
    case 'Fill-in-the-blank':
    case 'Multiple-Answer':
      result = totalCorrectAnswers === value;
      break;
    default:
      return result;
  }
}

export default mongoose.models.problems ||
  mongoose.model('problems', ProblemsSchema);
