import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay = 500) => {
  const [valueDebounce, setValueDebounce] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setValueDebounce(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return valueDebounce;
};

export default useDebounce
