import React from "react";
import "./TablaVideojuegos.css";
import { useNavigate } from "react-router-dom";

// Recibimos 'videojuegos' por props, como pide el taller
function TablaVideojuegos({ videojuegos, onEditar, onEliminar }) {
  const navigate = useNavigate();

  function navegarEditar(juego) {
    navigate("/editar", { state: { videojuego: juego } });
  }
  return (
    <div className="tabla-container">
      <div className="videojuegos-header">
        <h2>Catálogo</h2>
        <p className="subtitle">De Reliquias y Aventuras</p>
      </div>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Título</th>
              <th>Género</th>
              <th>Plataforma</th>
              <th>Lanzamiento</th>
              <th>Precio</th>
              <th>Disponible</th>
              <th>Progreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {videojuegos.map((juego) => {
              return (
                <tr key={juego.id}>
                  <td className="col-id">{juego.id}</td>
                  <td className="col-titulo">{juego.titulo}</td>
                  <td className="col-genero">{juego.genero}</td>
                  <td>{juego.plataforma}</td>
                  <td>{juego.lanzamiento}</td>
                  <td className="col-precio">${juego.precio}</td>
                  <td>
                    <span
                      className={
                        juego.disponible ? "badge-disponible" : "badge-agotado"
                      }
                    >
                      {juego.disponible ? "Sí" : "No"}
                    </span>
                  </td>
                  <td className="col-progreso">
                    <div className="progress-wrapper">
                      <progress value={juego.progreso} max="1"></progress>
                      <span>{(juego.progreso * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="acciones-cell">
                    <button
                      className="btn-accion btn-editar"
                      onClick={() => navegarEditar(juego)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-accion btn-eliminar"
                      onClick={() => onEliminar(juego.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaVideojuegos;
