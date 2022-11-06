import { css } from "@emotion/react";

export const loader = () => css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const gameContainer = () => css`
  .difficulty-question-container {
    display: flex;
    justify-content: center;
    margin: 1rem 0;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;
    }

    .question-number {
      font-size: 1.5rem;
      margin-right: 1rem;

      @media (max-width: 600px) {
        margin-right: 0;
      }
    }

    .difficulty-level {
      font-size: 1.5rem;
    }
  }
`;

export const errorContainer = () => css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  flex-direction: column;

  .error-message {
    font-size: 2rem;
    color: red;
    margin-bottom: 1rem;
  }
`;
