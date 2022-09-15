import './App.scss';
import Home from './pages/Home';

function App() {

  return (
    <div className="App">
      <header>
        <div className="HeaderContainer">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="MainContainer">
        <Home />
      </main>
      <footer>
        <div className="FooterContainer">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
