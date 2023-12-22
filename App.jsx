import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Outer from './src/components/Outer.jsx';
import Top from './src/components/Top';
import Shoes from './src/components/Shoes';
import ShoppingBag from './src/components/ShoppingBag';
import MainPage from './src/components/MainPage';
import ItemPage from './src/components/ItemPage';
import { CartProvider } from './src/components/CartContext.jsx';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';


const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const [mode, setMode] = React.useState('light');
  
    const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };
  
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode],
  );

  return (
     <ColorModeContext.Provider value={{ toggleColorMode }}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="dark_btn" onClick={toggleColorMode}>
            Toggle {mode === "light" ? <IoMoonOutline className="icon" /> : <IoSunnyOutline className="icon" />} Mode
        </div>
                <CartProvider>
                  <Routes>
                    <Route path={"/"} element={<MainPage/>} />
                    <Route path={"/Outer"} element={<Outer/>}/>
                    <Route path={"/Top"} element={<Top/>}/>
                    <Route path={"/Shoes"} element={<Shoes />} />
                    <Route path={"/ShoppingBag"} element={<ShoppingBag />} />
                    <Route path={"/products/:productId"} element={<ItemPage/>}/>
                  </Routes>
                </CartProvider>
            </BrowserRouter>
        </ThemeProvider>
     </ColorModeContext.Provider>
   
  );
}

export default App;