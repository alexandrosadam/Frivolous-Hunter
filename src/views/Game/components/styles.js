import { css } from "@emotion/react";

export const questionContainer = () => css`
  margin: 1.5rem 0;

  .answers-container {
    list-style: none;
  }

  li {
    list-style-type: none;
  }

  .difficulty-question-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .difficulty-wrapper {
      font-size: 1.5rem;
    }

    .question-wrapper {
      font-size: 2rem;
    }
  }

  .grid-container {
    width: 30%;
    margin: 0 auto;

    .answer-btn {
      padding: 1rem;
      width: 100%;
    }
  }

  .next-btn-container {
    display: flex;
    margin-top: 2rem;

    .next-btn {
      margin: 0 auto;
      font-size: 1.5rem;
    }
  }
`;
