/** @jsxImportSource @emotion/react */
import React, { FC, useState } from "react";
import { shuffleArray } from "../../../helpers/view";
import { Button, Grid } from "@mui/material";
import { questionContainer } from "./styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type QuestionItemProps = {
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  difficulty: string;
  onNextClick: () => void;
  onAnswerSelect: (isPlayerCorrect: boolean, difficulty: string) => void;
};

const QuestionItem: FC<QuestionItemProps> = ({
  correctAnswer,
  incorrectAnswers,
  question,
  difficulty,
  onNextClick,
  onAnswerSelect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const playerHasPickedAnswer = selectedAnswer !== "";
  const [possibleAnswers] = useState(
    () => shuffleArray([correctAnswer, ...incorrectAnswers]) as string[]
  );

  const handlePlayersSubmit = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    const playerAnswer = event.currentTarget.innerText;
    setSelectedAnswer(playerAnswer);
    const isPlayerCorrect = playerAnswer === correctAnswer.toUpperCase();
    onAnswerSelect(isPlayerCorrect, difficulty);
    if (isPlayerCorrect) toast.success("Well done. You are correct!");
    if (!isPlayerCorrect) toast.error("Oops!..You are wrong");
  };

  return (
    <section css={questionContainer}>
      <div className="question-container">
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
                  onClick={handlePlayersSubmit}
                  disabled={playerHasPickedAnswer}
                >
                  {possibleAnswer}
                </Button>

                <ToastContainer />
              </li>
            </Grid>
          );
        })}
      </Grid>

      <div className="next-btn-container">
        <Button
          variant="outlined"
          className="next-btn"
          onClick={onNextClick}
          disabled={!playerHasPickedAnswer}
        >
          Next ➡
        </Button>
      </div>
    </section>
  );
};

export default QuestionItem;
