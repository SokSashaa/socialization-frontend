/**
 * hoc для удобства работы с динамическими полями в форме
 * @param {function} callback - функция изменения поля в массиве (remove, push, insert и тд.)
 *
 */
// eslint-disable-next-line import/prefer-default-export
export const onFieldArrayControl =
  (callback, ...args) =>
  () => {
    if (callback) {
      callback(...args);
    }
  };
