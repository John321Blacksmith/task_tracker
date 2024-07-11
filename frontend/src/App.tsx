import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppNavBar } from './components/global/navBar';
import MainPage from './pages/mainPage';
import AppMenu from './components/global/menuBar';

function App() {
  return (
   <>
    <AppNavBar/>
    <AppMenu/>
    <Routes>
      <Route path='' element={<MainPage/>}/>
    </Routes>
   </>
  );
}

export default App;