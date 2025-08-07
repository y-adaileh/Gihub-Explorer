import { useEffect, useState } from 'react';

function useDebounce(searchTerm: string) {
  const [debounce, setDebounce] = useState<string>('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounce(searchTerm);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return [debounce];
}

export default useDebounce;
