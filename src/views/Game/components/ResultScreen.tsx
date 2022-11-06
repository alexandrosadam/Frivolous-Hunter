/** @jsxImportSource @emotion/react */
import { Button } from "@mui/material";
import { FC, useState } from "react";
import DetailsModal from "./DetailsModal";
import { resultContainer } from "./styles";

export type LevelOfQuestion = {
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

const ResultScreen: FC<ResultScreenProps> = ({
  correct_answers,
  total_score,
  details_answers,
  restart_the_game,
}) => {
  const [showModal, setShowModal] = useState(false);

  const closeDetailsModal = (): void => setShowModal(false);
  const openDetailsModal = (): void => setShowModal(true);

  return (
    <>
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
          <Button variant="outlined" onClick={openDetailsModal}>
            More details
          </Button>
        </div>
      </section>
      {showModal && (
        <DetailsModal
          details_answers={details_answers}
          total_score={total_score}
          isOpen={showModal}
          onClose={closeDetailsModal}
        />
      )}
    </>
  );
};

export default ResultScreen;
