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

      @media (max-width: 600px) {
        text-align: center;
        font-size: 1.5rem;
      }
    }
  }

  .grid-container {
    width: 30%;
    margin: 1rem auto;

    @media (max-width: 1100px) {
      width: 85%;
      margin: 2rem auto;
    }

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

export const resultContainer = () => css`
  .result-header {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    font-size: 2rem;
    font-weight: bold;
  }

  .correct-answers {
    display: flex;
    justify-content: center;
    font-size: 1.25rem;
  }

  .score-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 2rem auto;
    font-size: 1.5rem;
    border: 1px solid black;
    width: 13%;
    padding: 1rem;

    @media (max-width: 500px) {
      width: 50%;
    }
    @media only screen and (min-width: 501px) and (max-width: 1050px) {
      width: 28%;
    }
  }

  .btns-container {
    display: flex;
    justify-content: center;

    .retry-btn {
      margin-right: 1rem;
    }
  }
`;

export const modalContainer = () => css`
  .modal-title {
    text-align: center;
  }

  .details-container {
    display: flex;
    justify-content: center;
  }
`;
