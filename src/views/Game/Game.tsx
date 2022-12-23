/** @jsxImportSource @emotion/react */
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Button } from "@mui/material";
import {
  getEasyQuestions,
  getHardQuestions,
  getMediumQuestions,
  Question,
} from "../../api/question";
import { convertDifficultyToPoints, decodeResponse } from "../../helpers/view";
import QuestionItem from "./components/QuestionItem";
import { ThreeDots } from "react-loader-spinner";
import { errorContainer, gameContainer, loader } from "./styles";
import ResultScreen from "./components/ResultScreen";

const defaultGameState = {
  score: 0,
  questionIndex: 0,
  startOfTheGame: true,
  gameIsOver: false,
};

const defaultLevelOfDifficulties = {
  easy: 0,
  medium: 0,
  hard: 0,
};

const Game: FC = () => {
  const [game, setGame] = useState(defaultGameState);
  const [answersLevel, setAnswersLevel] = useState(defaultLevelOfDifficulties);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const lastQuestion = game.questionIndex === gameQuestions.length - 1;

  // destruct properties
  const { score, questionIndex, startOfTheGame, gameIsOver } = game;
  const { easy, medium, hard } = answersLevel;

  useEffect(() => {
    refetchEasy();
    refetchMedium();
    refetchHard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startOfTheGame]);

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

  // handle loading state until data is fetched
  const isLoading =
    easyQuestionStatus === "loading" ||
    mediumQuestionStatus === "loading" ||
    hardQuestionStatus === "loading";

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

  const startQuizGame = () => {
    setGameQuestions([
      ...(easyQuestions?.data as Question[]),
      ...(mediumQuestions?.data as Question[]),
      ...(hardQuestions?.data as Question[]),
    ]);

    setGame({
      ...game,
      startOfTheGame: false,
    });
  };

  const restartGame = (): void => {
    setGame({
      ...game,
      score: 0,
      questionIndex: 0,
      startOfTheGame: true,
      gameIsOver: false,
    });
  };

  const loadNextQuestion = () => {
    if (lastQuestion) setGame({ ...game, gameIsOver: true });
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

  const showResultsPage = () => setGame({ ...game, gameIsOver: true });

  // handle if an error is occurred when fetching the data
  const error =
    easyQuestionStatus === "error" ||
    mediumQuestionStatus === "error" ||
    hardQuestionStatus === "error";

  if (error) {
    setGame({ ...game, gameIsOver: true });

    return (
      <section css={errorContainer}>
        <div className="error-message">There was an error occurred..</div>
        <Button className="retry-btn" variant="contained" onClick={restartGame}>
          Retry
        </Button>
      </section>
    );
  }

  const showQuestions = !isLoading && !startOfTheGame && !gameIsOver;
  const questionData = gameQuestions[questionIndex] ?? {};
  const { correct_answer, incorrect_answers, question, difficulty } =
    questionData;

  return (
    <section css={gameContainer}>
      {game.startOfTheGame && (
        <section className="home-game-page">
          <h2 className="welcome-title">Welcome to Frivolous Hunter game!</h2>
          <div>
            <Button
              className="start-game-button"
              variant="contained"
              onClick={startQuizGame}
            >
              Start
            </Button>
          </div>
        </section>
      )}

      {showQuestions && (
        <QuestionItem
          key={questionIndex}
          question_number={questionIndex}
          total_questions={gameQuestions.length}
          correct_answer={decodeResponse(correct_answer) as string}
          incorrect_answers={decodeResponse(incorrect_answers) as string[]}
          question={decodeResponse(question) as string}
          difficulty={difficulty}
          loadNextQuestion={loadNextQuestion}
          onAnswerSelect={onAnswerSelect}
          showResultsPage={showResultsPage}
        />
      )}

      {gameIsOver && (
        <ResultScreen
          correct_answers={correctAnswers}
          total_score={score}
          details_answers={answersLevel}
          restart_the_game={restartGame}
        />
      )}
    </section>
  );
};

export default Game;
