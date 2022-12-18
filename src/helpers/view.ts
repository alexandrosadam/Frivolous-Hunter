import { Question } from "../api/question";

export const shuffleArray = (
  array: Question[] | string[]
): Question[] | string[] => {
  return array.sort(() => 0.5 - Math.random());
};

export const decodeResponse = (str: string | string[]): string | string[] => {
  if (Array.isArray(str)) {
    return str.map((element) => decodeURIComponent(element));
  }
  return decodeURIComponent(str);
};

// shuffle the question's array and return 5 of them
export const shuffleQuestions = (questions: Question[]): Question[] => {
  const shuffleEasyQuestions = shuffleArray(questions);

  return shuffleEasyQuestions?.slice(0, 5) as Question[];
};
