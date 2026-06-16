import { videojuegos } from "../data/videojuegos";
import "./TablaVideojuegos.css";

function TablaVideojuegos({ empleados, onEliminar, onEditar }) {
  return (
    <div className="tabla-container">
      <div className="videojegos-header">
        <h2>Tienda de Videojuegos</h2>
        <p>Catalogo</p>
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
              <th>Progreso Descarga</th>
            </tr>
          </thead>
          <tbody>
            {videojuegos.map((vj) => {
              return (
                <tr key={juego.id}>
                  <td>{juego.titulo}</td>
                  <td>{juego.genero}</td>
                  <td>{juego.plataforma}</td>
                  <td>{juego.lanzamiento}</td>
                  <td>{juego.precio}</td>
                  <td>{juego.disponible ? "Sí" : "No"}</td>
                  <td>
                    <progress value={juego.progreso} max="1"></progress>
                    <span style={{ marginLeft: "8px" }}>
                      {(juego.progreso * 100).toFixed(0)}%
                    </span>
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
