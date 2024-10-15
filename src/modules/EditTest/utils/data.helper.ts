/**
 * Transforms the test object by mapping over its questions and answers.
 *
 * @param {Object} test - The test object to be transformed.
 * @return {Object} The transformed test object with updated questions and answers.
 */
export const transformTest = (test) => {
  const transformedQuestions = test.questions.map((q) => {
    const { open, id: idQ, ...restQ } = q;

    const transformedAnswers = q.answers.map((a) => {
      const { id: idA, ...restA } = a;
      return restA;
    });

    return { ...restQ, answers: transformedAnswers };
  });

  return { ...test, questions: transformedQuestions };
};

/**
 * Transforms the response object by mapping over its questions
 * and setting the 'open' property to false.
 *
 * @param {Object} test - The test object to be transformed.
 * @return {Object} The transformed test object with updated questions.
 */
export const transformResponse = (test) => {
  const transformedQuestions = test.questions.map((question) => ({
    ...question,
    open: false,
  }));

  return { ...test, questions: transformedQuestions };
};

export const getQuestionPosition = (questions, qId) => questions.findIndex((q) => q.id === qId);
