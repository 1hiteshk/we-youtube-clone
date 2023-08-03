import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import { AppContext } from './context/contextApi';
import Header from './components/Header';
import Feed from './components/Feed';
import SearchResult from './components/SearchResult';
import VideoDetails from './components/VideoDetails';
import { useEffect, useState } from 'react';



const App = () => {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    if( theme === 'dark'){
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },[theme]);

  const handleThemeSwitch = () => {
    setTheme( theme === 'dark' ? 'light' : 'dark');
  };



  return (
    <AppContext>
      <button  onClick={handleThemeSwitch}> Dark </button>
      <BrowserRouter>
      <div className='flex flex-col h-full'>
        <div>
        <Header />
        
        </div>
        
        <Routes>
          <Route path='/' exact element={<Feed />} />    {/* exact means onload pe ye route chlega*/}
          <Route path='/searchResult/:searchQuery' element={<SearchResult />} />
          <Route path='/video/:id' element={<VideoDetails />} />
        </Routes>
      </div>
      </BrowserRouter>
    </AppContext>
  )
}

export default App
