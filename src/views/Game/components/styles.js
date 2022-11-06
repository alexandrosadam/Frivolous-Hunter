import { css } from "@emotion/react";

export const questionContainer = () => css`
  margin: 1.5rem 0;

  .answers-container {
    list-style: none;
  }

  li {
    list-style-type: none;
  }

  .question-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .difficulty-wrapper {
      font-size: 1.5rem;
    }

    .question {
      padding: 0 1.5rem;
      font-size: 2rem;
    }
  }

  .grid-container {
    width: 30%;
    margin: 1rem auto;

    .answer-btn {
      min-height: 3.5rem;
      width: 100%;
      padding: 0px 10px;
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
