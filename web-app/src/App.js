import './App.css';
import Wilder from './components/Wilder/Wilder';

const WILDERS = [
  {
    id: "aaa",
    firstName: "John",
    lastName: "Doe",
    skills: [
      {
        id: "skill-1",
        skillName: "PHP",
      },
    ],
  },
  {
    id: "bbb",
    firstName: "Jane",
    lastName: "Doe",
    skills: [
      {
        id: "skill-2",
        skillName: "JS",
      },
    ],
  },
  {
    id: "ccc",
    firstName: "Bob",
    lastName: "L'éponge",
    skills: [
      {
        id: "skill-3",
        skillName: "PHP",
      },
      {
        id: "skill-4",
        skillName: "JS",
      },
    ],
  }
];

function App() {

  return (
    <div className="App">
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <h2>Wilders</h2>
        <section className="card-row">
          {
            WILDERS.map((wilder) => (
              <Wilder
                key={wilder.id}
                firstName={wilder.firstName}
                lastName={wilder.lastName}
                skills={wilder.skills}
              />
            ))
          }
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
