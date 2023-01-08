export const shuffleQuestions = (array: any[]) => (
  [...array].sort(() => Math.random() - 0.5)
);