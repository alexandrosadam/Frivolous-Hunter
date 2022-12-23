import { css } from "@emotion/react";

export const gameContainer = () => css`
  .home-game-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;

    .welcome-title {
    }

    .start-game-button {
    }
  }

  .footer-button-container {
    display: flex;
    justify-content: center;

    .next-btn {
    }
  }
`;

export const loader = () => css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
