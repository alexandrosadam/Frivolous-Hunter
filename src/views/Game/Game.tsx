/** @jsxImportSource @emotion/react */
import { FC, useState } from "react";
import { useQuery } from "react-query";
import {
  getEasyQuestions,
  getHardQuestions,
  getMediumQuestions,
  Question,
} from "../../api/question";
import { shuffleQuestions } from "../../helpers/view";
import QuestionItem from "./components/QuestionItem";
import { ThreeDots } from "react-loader-spinner";

const convertDifficultyToPoints = (difficulty: string): number => {
  if (difficulty === "easy") return 15;
  if (difficulty === "medium") return 18;
  return 25;
};

const defaultGameState = {
  score: 0,
  questionIndex: 0,
  isGameOver: false,
};

const Game: FC = () => {
  const [game, setGame] = useState(defaultGameState);
  const { score, questionIndex, isGameOver } = game;

  const questions = [] as Question[];

  // fetch the questions
  const { data: easyQuestions, status: easyQuestionStatus } = useQuery(
    ["easy-question"],
    getEasyQuestions,
    {
      select: (question) => ({ data: question.results }),
    }
  );

  const { data: mediumQuestions, status: mediumQuestionStatus } = useQuery(
    ["medium-question"],
    getMediumQuestions,
    {
      select: (question) => ({ data: question.results }),
    }
  );

  const { data: hardQuestions, status: hardQuestionStatus } = useQuery(
    ["hard-question"],
    getHardQuestions,
    {
      select: (question) => ({ data: question.results }),
    }
  );

  const isLoading =
    easyQuestionStatus === "loading" ||
    mediumQuestionStatus === "loading" ||
    hardQuestionStatus === "loading";

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

  if (isLoading)
    return (
      <div className="loader-container">
        <ThreeDots
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );
  console.log(questions);

  const questionData = questions[questionIndex] ?? [];
  const { correct_answer, incorrect_answers, question, difficulty } =
    questionData;

  const loadNextQuestion = () => {
    if (questionIndex >= questions.length - 1) {
      setGame({ ...game, isGameOver: true });
    }
    setGame({ ...game, questionIndex: questionIndex + 1 });
  };

  const onAnswerSelect = (
    isPlayerCorrect: boolean,
    difficulty: string
  ): void => {
    const points = convertDifficultyToPoints(difficulty);
    if (isPlayerCorrect) {
      setGame({ ...game, score: score + points });
    }
  };

  if (isGameOver) {
    // create an end screen component
  }

  return (
    <>
      {/* TODO: create stats component<Stats></Stats> */}
      <QuestionItem
        key={questionIndex}
        correctAnswer={correct_answer}
        incorrectAnswers={incorrect_answers}
        question={question}
        difficulty={difficulty}
        onNextClick={loadNextQuestion}
        onAnswerSelect={onAnswerSelect}
      />
    </>
  );
};

export default Game;
