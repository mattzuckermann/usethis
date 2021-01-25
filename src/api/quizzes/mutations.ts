import Quizzes from './quizzes';
import { QuizInput, Quiz } from '../../@types/quizzes';

export const quizzesMutations = {
  Mutation: {
    async addQuiz(_: null, { quiz }: { quiz: QuizInput }): Promise<Quiz> {
      try {
        // @ts-ignore
        const newQuiz = await Quizzes.create(quiz);
        return newQuiz.populate('problems');
      } catch (err) {
        console.log(err);
      }
    },
    async removeQuiz(_: null, { slug }: { slug: string }): Promise<Quiz> {
      try {
        const deletedResult = await Quizzes.findOne({ slug });
        if (deletedResult) {
          await Quizzes.deleteOne({ slug });
        }
        return deletedResult;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
