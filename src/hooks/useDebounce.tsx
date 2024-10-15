import { useState, useEffect, useRef } from 'react';

/**
 * Returns a debounced value that updates after a specified delay.
 *
 * @param {any} value - The value to debounce.
 * @param {number} [delay=500] - The delay in milliseconds.
 * @return {any} The debounced value.
 */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
