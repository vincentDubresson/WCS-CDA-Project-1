import './App.scss';
import Home from './pages/Home';

function App() {

  return (
    <div className="App">
      <header className="AppHeader">
        <div className="HeaderContainer">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="AppMain">
        <Home />
      </main>
      <footer className="AppFooter">
        <div className="FooterContainer">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
