import mongoose, { Schema } from 'mongoose';

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

function checkArrayLength(value: string[]) {
  let result;
  switch (this.questionType) {
    case 'True/False':
      result = value.length === 2;
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

function checkCorrectChoices(value: number) {
  let totalCorrectAnswers = 0;
  for (let i = 0; i < this.choices.length; i++) {
    if (this.choices[i].isCorrect === true) {
      totalCorrectAnswers = totalCorrectAnswers++;
    }
  }
  switch (this.questionType) {
    case 'True/False':
    case 'Multiple-Choice':
      totalCorrectAnswers === 1 && totalCorrectAnswers === value;
      break;
    case 'Fill-in-the-blank':
    case 'Multiple-Answer':
      totalCorrectAnswers === value;
      break;
    default:
      return true;
  }
}

export default mongoose.models.problems ||
  mongoose.model('problems', ProblemsSchema);
