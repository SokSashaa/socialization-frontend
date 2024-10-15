/**
 * Retrieves an item from local storage based on the provided key.
 *
 * @param {string} key - The key of the item to retrieve.
 * @return {string | null} The retrieved value from local storage,
 * or null if local storage is not supported.
 */
// eslint-disable-next-line
export const getLocalStorageItem = (key) => {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    console.error('Local storage is not supported.');
    return null;
  } catch (error) {
    console.error('Error accessing local storage:', error);
    return null;
  }
};
