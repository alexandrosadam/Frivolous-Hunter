/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useQuery } from "react-query";
import {
  getEasyQuestions,
  Question as QuestionType,
  getMediumQuestions,
  getHardQuestions,
} from "../../api/question";
import { shuffleQuestions } from "../../helpers/view";

const Question: FC = () => {
  const questions = [] as QuestionType[];

  // fetch the questions
  const { data: easyQuestions } = useQuery(
    ["easy-question"],
    getEasyQuestions,
    {
      select: (question) => ({ data: question.results }),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const { data: mediumQuestions } = useQuery(
    ["medium-question"],
    getMediumQuestions,
    {
      select: (question) => ({ data: question.results }),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const { data: hardQuestions } = useQuery(
    ["hard-question"],
    getHardQuestions,
    {
      select: (question) => ({ data: question.results }),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  // combined different types of difficulties into one
  if (easyQuestions?.data && mediumQuestions?.data && hardQuestions?.data) {
    const shuffledEasyQuestions = shuffleQuestions(easyQuestions.data);
    const shuffledMediumQuestions = shuffleQuestions(mediumQuestions.data);
    const shuffledHardQuestions = shuffleQuestions(hardQuestions.data);

    questions.push(
      ...shuffledEasyQuestions,
      ...shuffledMediumQuestions,
      ...shuffledHardQuestions
    );
  }

  console.log("questions = ", questions);

  return <div></div>;
};

export default Question;
