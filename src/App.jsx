import { useState } from "react";
import TablaVideojuegos from "./components/TablaVideojuegos";
import { videojuegos as mockData } from "./data/videojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import Noencontrada from "./pages/Noencontrada";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [videojuegos, setVideojuegos] = useState(mockData);

  function agregarVideojuego(videojuegoNuevo) {
    setEmpleados([...videojuegos, videojuegoNuevo]);
  }
  function eliminarVideojuego(id) {
    const filtrados = videojuegos.filter((videojuego) => videojuego.id !== id);
    setEmpleados(filtrados);
  }

  function editarVideojuego(videojuegoEditado) {
    const actualizados = videojuegos.map((videojuego) => {
      if (videojuego.id === videojuegoEditado.id) {
        return videojuegoEditado;
      } else {
        return videojuego;
      }
    });
    setVideojuegos(actualizados);
  }

  function manejarGuardar(videojuego) {
    const existe = videojuegos.find((juego) => juego.id === videojuego.id);
    if (existe) {
      editarVideojuego(videojuego);
    } else {
      agregarVideojuego(videojuego);
    }
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <TablaVideojuegos
              videojuegos={videojuegos}
              onEliminar={eliminarVideojuego}
            />
          }
        />
        <Route
          path="/nuevo"
          element={<FormularioVideojuego onGuardar={manejarGuardar} />}
        />
        <Route
          path="/editar"
          element={<FormularioVideojuego onGuardar={manejarGuardar} />}
        />
        <Route path="*" element={<Noencontrada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
