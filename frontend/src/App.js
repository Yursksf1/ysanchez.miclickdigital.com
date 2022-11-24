import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './components/Home';
import Game from './components/Game';
import {
WELCOME_URL,
GAME
} from './urls';
function App() {
  return (
    <Router>
    <Routes>
      <Route exact path={WELCOME_URL} element={<Home/>}/>
      <Route exact path={GAME} element={<Game/>}/>
    </Routes>
  </Router>
  );
}

export default App;
