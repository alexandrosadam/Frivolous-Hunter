/** @jsxImportSource @emotion/react */
import React, { FC, useState } from "react";
import { decodeResponse, shuffleArray } from "../../../helpers/view";

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
    <section>
      <div>Difficullty: {difficulty}</div>
      <div>{decodeResponse(question)}</div>
      <ul>
        {possibleAnswers.map((possibleAnswer, index) => {
          return (
            <li key={index}>
              <button
                className=""
                onClick={handlePlayersSubmit}
                // disabled={playerHasPickedAnswer}
              >
                {decodeResponse(possibleAnswer)}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className=""
        onClick={onNextClick}
        disabled={!playerHasPickedAnswer}
      >
        Next ➡
      </button>
    </section>
  );
};

export default QuestionItem;
