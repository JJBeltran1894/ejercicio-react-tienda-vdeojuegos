import { useState } from "react";
import TablaVideojuegos from "./components/TablaVideojuegos";
import { videojuegos as mockData } from "./data/videojuegos";
//import './App.css'

function App() {
  const [juegos, setJuegos] = useState(mockData);

  return (
    <main
      style={{
        padding: "20px",
        backgroundColor: "#05070a",
        minHeight: "100vh",
      }}
    >
      <TablaVideojuegos videojuegos={juegos} />
    </main>
  );
}

export default App;
