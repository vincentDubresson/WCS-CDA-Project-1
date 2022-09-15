import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import CreateWilder from './pages/CreateWilder/CreateWilder';
import Home from './pages/Home/Home';

function App() {

  return (
    <div className="App">
      <header className="AppHeader">
        <div className="HeaderContainer">
          <Link to="/" className="HeaderTitle"><h1>Wilders Book</h1></Link>
        </div>
      </header>
      <main className="AppMain">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-wilder" element={<CreateWilder />} />
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
