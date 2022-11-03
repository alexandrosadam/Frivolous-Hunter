import { ENDPOINTS } from "./endpoints";
import Axios from "axios";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

type QuestionRes = {
  response_code: number;
  results: Question[];
};

export const getEasyQuestions = async (): Promise<QuestionRes> => {
  const res = await Axios.get(ENDPOINTS.question.easy);

  return res.data;
};
