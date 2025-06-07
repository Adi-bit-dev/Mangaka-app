import './App.css'
import MainPage from './components/mainPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComicsInfo from './components/comicsInfo';
import Auth from './components/auth';
import SearchPage from './components/searchPage';
import GenresPage from './components/genresPage';
import AboutUs from './components/aboutUsPage';
import ReadingPage from './components/readingPage';

function App() {

  localStorage.setItem("showMenu", "false");
  localStorage.setItem("isLoggedin", "false");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/comicsinfo" element={<ComicsInfo />} />
        <Route path='/auth-user' element={<Auth />} />
        <Route path='/searchPage' element={<SearchPage />} />
        <Route path='/genrePage' element={<GenresPage />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/readingPage' element={<ReadingPage />} />
      </Routes>
    </Router>
  )
}

export default App
