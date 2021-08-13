import React, { Component } from "react";
import TareasDataService from "../services/tarea.service";
import { Link } from "react-router-dom";

export default class TareasLista extends Component {
  constructor(props) {
    super(props);
    this.getTareas = this.getTareas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTarea = this.setActiveTarea.bind(this);

    this.state = {
      tareas: [],
      currentTarea: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.getTareas();
  }

  getTareas() {
    TareasDataService.getAll()
      .then(response => {
        this.setState({
          tareas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.getTareas();
    this.setState({
      currentTarea: null,
      currentIndex: -1
    });
  }

  setActiveTarea(tarea, index) {
    this.setState({
      currentTarea: tarea,
      currentIndex: index
    });
  }

  render() {
    const { tareas, currentTarea, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Listado de tareas</h4>

          <ul className="list-group">
            {tareas &&
              tareas.map((tarea, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTarea(tarea, index)}
                  key={index}
                >
                  {tarea.tarea}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentTarea ? (
            <div>
              <h4>Tarea</h4>
              <div>
                <label>
                  <strong>Descripción:</strong>
                </label>{" "}
                {currentTarea.tarea}
              </div>
              <div>
                <label>
                  <strong>Completa: </strong>
                </label>{" "}
                {currentTarea.terminada ? "Sí" : "No"}
              </div>

              <Link
                to={"/tareas/" + currentTarea.id}
                className="badge badge-warning"
              >
                Modificar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Seleccione una tarea...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
