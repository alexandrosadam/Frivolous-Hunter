/** @jsxImportSource @emotion/react */
import { Button } from "@mui/material";
import { FC, useState } from "react";
import { resultContainer } from "./styles";

type LevelOfQuestion = {
  easy: number;
  medium: number;
  hard: number;
};

type ResultScreenProps = {
  correct_answers: number;
  total_score: number;
  details_answers: LevelOfQuestion;
  restart_the_game: () => void;
};

const levelOfDifficulties = {
  easy: 0,
  medium: 0,
  hard: 0,
};

const ResultScreen: FC<ResultScreenProps> = ({
  correct_answers = 3,
  total_score = 58,
  details_answers,
  restart_the_game,
}) => {
  // keep the modal state for more details
  const [openDetails, setOpenDetails] = useState(false);
  const [level, setLevel] = useState(levelOfDifficulties);
  const handleMoreDetails = () => {};

  return (
    <section css={resultContainer}>
      <div className="result-header">Congratulations!!</div>
      <div className="correct-answers">
        Correct answers {correct_answers}/15
      </div>
      <div className="score-container">
        Your score is <br />
        <strong>{total_score}</strong>
      </div>
      <div className="btns-container">
        <Button
          className="retry-btn"
          variant="contained"
          onClick={restart_the_game}
        >
          Retry
        </Button>
        <Button variant="outlined">More details</Button>
      </div>
    </section>
  );
};

export default ResultScreen;
