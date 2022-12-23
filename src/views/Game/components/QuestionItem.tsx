/** @jsxImportSource @emotion/react */
import { FC, useState } from "react";
import { shuffleArray } from "../../../helpers/view";
import { Button, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { questionContainer } from "./styles";

type QuestionItemProps = {
  question_number: number;
  total_questions: number;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  difficulty: string;
  loadNextQuestion: () => void;
  onAnswerSelect: (isPlayerCorrect: boolean, difficulty: string) => void;
  showResultsPage: () => void;
};

const QuestionItem: FC<QuestionItemProps> = ({
  question_number,
  total_questions,
  correct_answer,
  incorrect_answers,
  question,
  difficulty,
  loadNextQuestion,
  onAnswerSelect,
  showResultsPage,
}) => {
  const [possibleAnswers] = useState(
    () => shuffleArray([correct_answer, ...incorrect_answers]) as string[]
  );
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const lastQuestion = question_number === total_questions - 1;
  const playerHasPickedAnswer = selectedAnswer !== "";

  const handlePlayerSubmit = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    const playerAnswer = event.currentTarget.innerText;
    setSelectedAnswer(playerAnswer);
    const isPlayerCorrect = playerAnswer === correct_answer.toUpperCase();
    onAnswerSelect(isPlayerCorrect, difficulty);
    if (isPlayerCorrect) toast.success("Well done. You are correct!");
    if (!isPlayerCorrect) toast.error("Oops!..You are wrong");
  };

  return (
    <section css={questionContainer}>
      <div className="question-container">
        <div className="question-info">
          <span className="question-number">
            Question: {question_number + 1}/{total_questions}
          </span>
          <span className="difficulty-level">Difficulty: {difficulty}</span>
        </div>
        <div className="question">{question}</div>
      </div>

      <Grid
        className="grid-container"
        container
        rowSpacing={2}
        alignItems="center"
        justifyContent="center"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {possibleAnswers.map((possibleAnswer, index) => {
          return (
            <Grid item xs={6} key={index}>
              <li key={index}>
                <Button
                  variant="contained"
                  className="answer-btn"
                  onClick={handlePlayerSubmit}
                  disabled={playerHasPickedAnswer}
                >
                  {possibleAnswer}
                </Button>
              </li>
            </Grid>
          );
        })}
      </Grid>

      <div className="footer-button-container">
        {lastQuestion ? (
          <Button
            variant="contained"
            className="next-btn"
            onClick={showResultsPage}
            disabled={!playerHasPickedAnswer}
          >
            Go to results
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="next-btn"
            onClick={loadNextQuestion}
            disabled={!playerHasPickedAnswer}
          >
            Next ➡
          </Button>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default QuestionItem;
