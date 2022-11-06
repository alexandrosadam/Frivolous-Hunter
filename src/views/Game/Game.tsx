/** @jsxImportSource @emotion/react */
import { FC, useEffect, useState } from "react";
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
import ResultScreen from "./components/ResultScreen";

const convertDifficultyToPoints = (difficulty: string): number => {
  if (difficulty === "easy") return 15;
  if (difficulty === "medium") return 18;
  return 25;
};

const defaultGameState = {
  score: 0,
  questionIndex: 0,
};

const levelOfDifficulties = {
  easy: 0,
  medium: 0,
  hard: 0,
};

const Game: FC = () => {
  const [game, setGame] = useState(defaultGameState);
  const [answersLevel, setAnswersLevel] = useState(levelOfDifficulties);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    refetchEasy();
    refetchMedium();
    refetchHard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  // destruct properties
  const { score, questionIndex } = game;
  const { easy, medium, hard } = answersLevel;

  const questions = [] as Question[];

  // fetch the different types of questions
  const {
    data: easyQuestions,
    status: easyQuestionStatus,
    refetch: refetchEasy,
  } = useQuery(["easy-question"], getEasyQuestions, {
    select: (question) => ({ data: question.results }),
    refetchOnWindowFocus: false,
  });

  const {
    data: mediumQuestions,
    status: mediumQuestionStatus,
    refetch: refetchMedium,
  } = useQuery(["medium-question"], getMediumQuestions, {
    select: (question) => ({ data: question.results }),
    refetchOnWindowFocus: false,
  });

  const {
    data: hardQuestions,
    status: hardQuestionStatus,
    refetch: refetchHard,
  } = useQuery(["hard-question"], getHardQuestions, {
    select: (question) => ({ data: question.results }),
    refetchOnWindowFocus: false,
  });

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

  const restartGame = (): void => {
    setGame({ ...game, score: 0, questionIndex: 0 });
    setGameOver((toggle) => !toggle);
  };

  const loadNextQuestion = () => {
    if (questionIndex >= questions.length - 1) {
      setGameOver((toggle) => !toggle);
    }
    setGame({ ...game, questionIndex: questionIndex + 1 });
  };

  const onAnswerSelect = (
    isPlayerCorrect: boolean,
    difficulty: string
  ): void => {
    if (isPlayerCorrect) {
      setGame({
        ...game,
        score: score + convertDifficultyToPoints(difficulty),
      });
      if (difficulty === "easy")
        setAnswersLevel({ ...answersLevel, easy: easy + 1 });
      if (difficulty === "medium")
        setAnswersLevel({ ...answersLevel, medium: medium + 1 });
      if (difficulty === "hard")
        setAnswersLevel({ ...answersLevel, hard: hard + 1 });

      setCorrectAnswers((prev) => prev + 1);
    }
  };

  if (gameOver) {
    return (
      <ResultScreen
        correct_answers={correctAnswers}
        total_score={score}
        details_answers={answersLevel}
        restart_the_game={restartGame}
      />
    );
  }

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
        question_number={questionIndex}
        correct_answer={decodeResponse(correct_answer) as string}
        incorrect_answers={decodeResponse(incorrect_answers) as string[]}
        question={decodeResponse(question) as string}
        difficulty={difficulty}
        onNextClick={loadNextQuestion}
        onAnswerSelect={onAnswerSelect}
      />
    </section>
  );
};

export default Game;
