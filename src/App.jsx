import { useState, useEffect } from "react";
import TablaVideojuegos from "./components/TablaVideojuegos";
import { videojuegos as mockData } from "./data/videojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import Noencontrada from "./pages/Noencontrada";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlertaNotificacion from "./components/AlertaNotificacion";
import "./App.css";

function App() {
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : mockData;
  });
  const [mensajeAlerta, setMensajeAlerta] = useState("");

  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
  }, [videojuegos]);

  function agregarVideojuego(videojuegoNuevo) {
    setVideojuegos([...videojuegos, videojuegoNuevo]);
    setMensajeAlerta("¡Videojuego forjado con éxito en la bóveda!");
  }

  function eliminarVideojuego(id) {
    const filtrados = videojuegos.filter((videojuego) => videojuego.id !== id);
    setVideojuegos(filtrados);
    setMensajeAlerta("¡El videojuego ha sido destruido!");
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
    setMensajeAlerta("¡Videojuego forjado con éxito en la bóveda!");
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
      <AlertaNotificacion
        mensaje={mensajeAlerta}
        onClose={() => setMensajeAlerta("")}
      />
    </BrowserRouter>
  );
}

export default App;
