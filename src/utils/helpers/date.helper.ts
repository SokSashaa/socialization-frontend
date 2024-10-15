/**
 * Converts a date string to the format DD/MM/YYYY.
 *
 * @param {string} dateString - The date string to convert.
 * @return {string} The converted date string in the format DD/MM/YYYY.
 */
// eslint-disable-next-line
export const convertDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
