import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generos, plataformas } from "../data/videojuegos";
import "./FormularioVideojuego.css"; // <-- Importación del estilo

function FormularioVideojuego({ onGuardar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const videojuegoRecuperado = location.state?.videojuego || null;

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [lanzamiento, setLanzamiento] = useState("");
  const [precio, setPrecio] = useState("");
  const [disponible, setDisponible] = useState(false); // Mejor inicializar en false
  const [progreso, setProgreso] = useState(0); // Mejor inicializar en 0

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
      setDisponible(false);
      setProgreso(0);
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
      <h2 className="form-title">
        {videojuegoRecuperado ? "Forjar Edición" : "Invocar Videojuego"}
      </h2>

      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Diablo IV"
        />
      </div>

      <div className="form-group">
        <label>Género</label>
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="" disabled>
            Seleccione un Género
          </option>
          {generos.map((genero) => (
            <option key={genero} value={genero}>
              {genero}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Plataforma</label>
        <select
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
        >
          <option value="" disabled>
            Seleccione una Plataforma
          </option>
          {plataformas.map((plataforma) => (
            <option key={plataforma} value={plataforma}>
              {plataforma}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group half-width">
          <label>Lanzamiento</label>
          <input
            type="number"
            value={lanzamiento}
            onChange={(e) => setLanzamiento(e.target.value)}
            placeholder="2024"
            min="1980"
          />
        </div>

        <div className="form-group half-width">
          <label>Precio ($)</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={disponible}
            onChange={(e) => setDisponible(e.target.checked)}
          />
          <span className="checkbox-text">
            Disponible para descarga en la bóveda
          </span>
        </label>
      </div>

      <div className="form-group">
        <label>
          Progreso de Descarga:{" "}
          <span className="progreso-text">{(progreso * 100).toFixed(0)}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={progreso}
          onChange={(e) => setProgreso(e.target.value)}
          className="epic-slider"
        />
      </div>

      <div className="form-actions">
        <button className="btn-cancelar" onClick={manejarCancelar}>
          Huir (Cancelar)
        </button>
        <button className="btn-guardar" onClick={manejarGuardar}>
          Forjar (Guardar)
        </button>
      </div>
    </div>
  );
}

export default FormularioVideojuego;
