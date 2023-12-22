import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

const updateDarkMode = darkMode => {
  if (darkMode) {
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark'); // html 클래스 추가
  } else {
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
  }
};

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

 const toggleDarkMode = () => {
    const updatedMode = !darkMode;
    updateDarkMode(updatedMode);
    setDarkMode(updatedMode);
    // Material-UI 테마 모드 업데이트
    setThemeMode(updatedMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    // 사용자 기종 다크모드 확인
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);
    
     const setThemeMode = (mode) => {
    const theme = createTheme({
      palette: {
        mode: mode,
      },
    });
    setMuiTheme(theme); // Material-UI 테마 업데이트
  };

    const [muiTheme, setMuiTheme] = useState(createTheme({
    palette: {
      mode: 'light', // 기본값 light로 설정
    },
  }));

    
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {/* Material-UI ThemeProvider로 감싸서 하위 컴포넌트에 테마를 전달합니다. */}
      <ThemeProvider theme={muiTheme}>
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => useContext(DarkModeContext);