export const ENDPOINT = {
  question: (amount: number, difficulty: string) =>
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&encode=url3986`,
};
