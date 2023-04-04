import { useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  getUpdateAfterSetValueCalled = false
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log("catch", error);
    }
  });

  const setValue = (value: T) => {
    try {
      if (getUpdateAfterSetValueCalled) {
        setStoredValue(value);
      }
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log("catch", error);
    }
  };

  return [storedValue, setValue];
};

export { useLocalStorage };
