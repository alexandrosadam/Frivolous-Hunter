/** @jsxImportSource @emotion/react */
import { FC, useState } from "react";
import { useQuery } from "react-query";
import {
  getEasyQuestions,
  getHardQuestions,
  getMediumQuestions,
  Question,
} from "../../api/question";
import { decodeResponse, shuffleQuestions } from "../../helpers/view";
import QuestionItem from "./components/QuestionItem";
import { ThreeDots } from "react-loader-spinner";
import { gameContainer, loader } from "./styles";

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
      <div css={loader}>
        <ThreeDots
          height="80"
          width="80"
          color="#123ba1"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );

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

  console.log("Rendered");

  console.log("question = ", decodeResponse(question));

  return (
    <section css={gameContainer}>
      <div className="difficulty-question-container">
        <span className="question-number">
          Question {questionIndex + 1}/{questions.length}
        </span>
        <span className="difficulty-level">Difficulty: {difficulty}</span>
      </div>
      <QuestionItem
        key={questionIndex}
        correctAnswer={decodeResponse(correct_answer) as string}
        incorrectAnswers={decodeResponse(incorrect_answers) as string[]}
        question={decodeResponse(question) as string}
        difficulty={difficulty}
        onNextClick={loadNextQuestion}
        onAnswerSelect={onAnswerSelect}
      />
    </section>
  );
};

export default Game;
