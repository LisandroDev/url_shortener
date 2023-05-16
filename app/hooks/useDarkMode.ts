import { useEffect, useState } from 'react';

type themes = 'light' | 'dark';

const useDarkMode = () => {
  const [theme, setTheme] = useState<themes>('light');

  useEffect(() => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (document.querySelector('html')?.hasAttribute('data-theme')) {
      document.querySelector('html')?.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  return { theme, toggleTheme };
};

export default useDarkMode;
