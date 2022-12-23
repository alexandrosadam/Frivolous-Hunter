import { ENDPOINT } from "./endpoints";
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

export const getQuestions = async (
  amount: number,
  difficulty: string
): Promise<QuestionRes> => {
  const res = await Axios.get(ENDPOINT.question(amount, difficulty));

  return res.data;
};
