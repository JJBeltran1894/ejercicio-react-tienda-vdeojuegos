import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generos, plataformas } from "../data/videojuegos";
import "./FormularioVideojuego.css";

function FormularioVideojuego({ onGuardar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const videojuegoRecuperado = location.state?.videojuego || null;
  const [errores, setErrores] = useState({});

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  //const [lanzamiento, setLanzamiento] = useState("");
  const [precio, setPrecio] = useState("");
  const [disponible, setDisponible] = useState(false); // Mejor inicializar en false
  const [progreso, setProgreso] = useState(0); // Mejor inicializar en 0

  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [calificacion, setCalificacion] = useState("");

  useEffect(() => {
    if (videojuegoRecuperado) {
      setTitulo(videojuegoRecuperado.titulo || "");
      setGenero(videojuegoRecuperado.genero || "");
      setPlataforma(videojuegoRecuperado.plataforma || "");
      setPrecio(videojuegoRecuperado.precio || "");
      setDisponible(videojuegoRecuperado.disponible || false);
      setProgreso(videojuegoRecuperado.progreso || 0);
      setFechaLanzamiento(videojuegoRecuperado.fechaLanzamiento || "");
      setSinopsis(videojuegoRecuperado.sinopsis || "");
      setCalificacion(videojuegoRecuperado.calificacion || "");
    } else {
      setTitulo("");
      setGenero("");
      setPlataforma("");
      setPrecio("");
      setDisponible(false);
      setProgreso(0);
      setFechaLanzamiento("");
      setSinopsis("");
      setCalificacion("");
    }
  }, [videojuegoRecuperado]);

  function manejarGuardar() {
    if (e) e.preventDefault();
    const erroresDetectados = validarFormulario();

    if (Object.keys(erroresDetectados).length > 0) {
      setErrores(erroresDetectados);
      return; // Fin de la ejecución, no se guarda el juego
    }

    setErrores({});

    const añoCalculado = fechaLanzamiento ? fechaLanzamiento.split("-")[0] : "";
    const videojuego = {
      id:
        videojuegoRecuperado !== null && videojuegoRecuperado !== undefined
          ? videojuegoRecuperado.id
          : Date.now(),
      titulo: titulo,
      genero: genero,
      plataforma: plataforma,
      lanzamiento: añoCalculado,
      precio: precio,
      disponible: disponible,
      progreso: Number(progreso),
      fechaLanzamiento: fechaLanzamiento,
      sinopsis: sinopsis,
      calificacion: Number(calificacion),
    };
    onGuardar(videojuego);
    navigate("/");
  }

  function manejarCancelar() {
    navigate("/");
  }

  function validarFormulario() {
    const erroresActivos = {};
    if (!titulo.trim()) {
      erroresActivos.titulo = "El título no puede estar vacio";
    }
    if (sinopsis.trim().length < 10) {
      erroresActivos.sinopsis =
        "La descripción debe tener al menos 10 caracteres";
    }
    const nota = Number(calificacion);
    if (!calificacion || nota < 1 || nota > 100) {
      erroresActivos.calificacion = "La nota debe estar entre 1 y 100";
    }
    return erroresActivos;
  }

  const fechaMaxima = new Date().toISOString().split("T")[0];

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
        {errores.titulo && (
          <span className="error-mensaje">{errores.titulo}</span>
        )}
      </div>

      <div className="form-group">
        <label>Sinopsis / Descripción</label>
        <textarea
          value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)}
          minLength="10"
          maxLength="250"
          placeholder="Escribe una breve reseña del juego... (10 a 250 caracteres)"
          rows="4"
        ></textarea>
        {errores.sinopsis && (
          <span className="error-mensaje">{errores.sinopsis}</span>
        )}
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
          <label>Fecha de Lanzamiento</label>
          <input
            type="date"
            value={fechaLanzamiento}
            onChange={(e) => setFechaLanzamiento(e.target.value)}
            max={fechaMaxima}
            min="1980-01-01"
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

      <div className="form-group">
        <label>Calificación de la Crítica</label>
        <input
          type="number"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
          placeholder="Rango de 1 a 100 (Ej: 95)"
          min="1"
          max="100"
        />
        {errores.calificacion && (
          <span className="error-mensaje">{errores.calificacion}</span>
        )}
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
