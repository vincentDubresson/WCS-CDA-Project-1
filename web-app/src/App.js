import './App.css';
import Wilder from './components/Wilder/Wilder';

const WILDERS = [
  {
    id: "aaa",
    firstName: "John",
    lastName: "Doe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.",
    school: "WCS-Lyon",
    picture: "https://i.pravatar.cc/300?img=6",
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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.",
    school: "WCS-Paris",
    picture: "https://i.pravatar.cc/300?img=22",
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
    lastName: "Michel",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.",
    school: "WCS-La-Loupe",
    picture: "https://i.pravatar.cc/?img=17",
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
                description={wilder.description}
                picture={wilder.picture}
                school={wilder.school}
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
