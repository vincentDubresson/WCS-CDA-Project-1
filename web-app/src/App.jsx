import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import CreateWilder from './pages/CreateWilder/CreateWilder';
import Home from './pages/Home/Home';
import { HOME_PATH, CREATE_WILDER_PATH } from './pages/paths';

function App() {

  return (
    <div className="App">
      <header className="AppHeader">
        <div className="HeaderContainer">
          <Link to={HOME_PATH} className="HeaderTitle"><h1>Wilders Book</h1></Link>
        </div>
      </header>
      <main className="AppMain">
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={CREATE_WILDER_PATH} element={<CreateWilder />} />
        </Routes>
      </main>
      <footer className="AppFooter">
        <div className="FooterContainer">
          <p className="FooterText">&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
