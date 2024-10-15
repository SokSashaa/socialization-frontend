// eslint-disable-next-line import/prefer-default-export
export const transformAnswers = (answers) =>
  Object.keys(answers).reduce((acc, key) => {
    const answersQuestion = answers[key];

    // eslint-disable-next-line
    return Array.isArray(answersQuestion)
      ? [...acc, ...answersQuestion.map((a) => +a)]
      : answersQuestion === ''
        ? acc
        : [...acc, +answersQuestion];
  }, []);
