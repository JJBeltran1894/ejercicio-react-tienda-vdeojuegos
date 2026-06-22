import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generos, plataformas } from "../data/videojuegos";

function FormularioVideojuego({ onGuardar }) {
  const location = useLocation();
  const videojuegoRecuperado = location.state?.videojuego || null;

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [lanzamiento, setLanzamiento] = useState("");
  const [precio, setPrecio] = useState("");
  const [disponible, setDisponible] = useState("");
  const [progreso, setProgreso] = useState("");

  useEffect(() => {
    if (videojuegoRecuperado) {
      setTitulo(videojuegoRecuperado.titulo);
      setGenero(videojuegoRecuperado.genero);
      setPlataforma(videojuegoRecuperado.plataforma);
      setLanzamiento(videojuegoRecuperado.lanzamiento);
      setPrecio(videojuegoRecuperado.precio);
      setDisponible(videojuegoRecuperado.disponible);
      setProgreso(videojuegoRecuperado.progreso);
    } else {
      setTitulo("");
      setGenero("");
      setPlataforma("");
      setLanzamiento("");
      setPrecio("");
      setDisponible("");
      setProgreso("");
    }
  }, [videojuegoRecuperado]);

  function manejarGuardar() {
    const videojuego = {
      id:
        videojuegoRecuperado !== null && videojuegoRecuperado !== undefined
          ? videojuegoRecuperado.id
          : Date.now(),
      titulo: titulo,
      genero: genero,
      plataforma: plataforma,
      lanzamiento: lanzamiento,
      precio: precio,
      disponible: disponible,
      progreso: Number(progreso),
    };
    onGuardar(videojuego);
    navigate("/");
  }

  function manejarCancelar() {
    navigate("/");
  }

  return (
    <div className="form-container">
      {/* Título dinámico que cambia si estamos editando o creando */}
      <h2 className="form-title">
        {empleadoRecuperado ? "Editar Empleado" : "Registrar Empleado"}
      </h2>
      <div>
        <label>Titulo</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Mario Bros."
        />
      </div>
      <div>
        <label>Genero</label>
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="" disabled>
            Seleccione un Genero
          </option>
          {generos.map((genero) => (
            <option value={genero}>{genero}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Plataforma</label>
        <select
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
        >
          <option value="" disabled>
            Seleccione una Plataforma
          </option>
          {plataformas.map((plataforma) => (
            <option value={plataforma}>{plataforma}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Lanzamiento</label>
        <input
          type="number"
          value={lanzamiento}
          onChange={(e) => setLanzamiento(e.target.value)}
          placeholder="2001"
          min="1980"
        />
      </div>
      <div>
        <label>Precio</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="0.00"
          min="0"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={disponible}
            onChange={(e) => setDisponible(e.target.checked)}
          />
          <span>Disponible para descarga</span>
        </label>
      </div>
      <div>
        <label>
          Progreso de Descarga: {(valorDelProgreso * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={valorDelProgreso}
          onChange={(e) => setProgreso(e.target.value)}
        />
      </div>
      <div>
        <button onClick={manejarCancelar}>Cancelar</button>
        <button onClick={manejarGuardar}>Guardar Empleado</button>
      </div>
    </div>
  );
}

export default FormularioVideojuego;
