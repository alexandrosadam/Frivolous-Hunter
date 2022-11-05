import { Question } from "../api/question";

// shuffle the question's array and return 5 of them
export const shuffleQuestions = (questions: Question[]): Question[] => {
  const shuffleEasyQuestions = questions.sort(() => 0.5 - Math.random());

  return shuffleEasyQuestions?.slice(0, 5);
};
