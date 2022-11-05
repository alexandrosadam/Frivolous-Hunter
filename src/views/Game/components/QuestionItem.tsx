/** @jsxImportSource @emotion/react */
import React, { FC, useState } from "react";
import { decodeResponse, shuffleArray } from "../../../helpers/view";
import { Button, Grid } from "@mui/material";
import { questionContainer } from "./styles";

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
  const playerHasPickedAnswer = selectedAnswer !== null;
  const possibleAnswers = shuffleArray([
    correctAnswer,
    ...incorrectAnswers,
  ]) as string[];

  const handlePlayersSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const playerAnswer = event.currentTarget.innerHTML;
    setSelectedAnswer(playerAnswer);
    const isPlayerCorrect = playerAnswer === correctAnswer;
    onAnswerSelect(isPlayerCorrect, difficulty);
  };

  return (
    <section css={questionContainer}>
      <div className="difficulty-question-container">
        <div className="difficulty-wrapper">Difficullty: {difficulty}</div>
        <div className="question-wrapper">{decodeResponse(question)}</div>
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
            <Grid item xs={6}>
              <li key={index}>
                <Button
                  variant="contained"
                  className="answer-btn"
                  onClick={handlePlayersSubmit}
                  // disabled={playerHasPickedAnswer}
                >
                  {decodeResponse(possibleAnswer)}
                </Button>
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
