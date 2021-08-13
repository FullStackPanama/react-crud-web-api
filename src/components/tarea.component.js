import React, { Component } from "react";
import TareasDataService from "../services/tarea.service";

export default class Tarea extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTarea = this.getTarea.bind(this);
    this.updateEstado = this.updateEstado.bind(this);
    this.updateTarea = this.updateTarea.bind(this);
    this.deleteTarea = this.deleteTarea.bind(this);

    this.state = {
      currentTarea: {
        id: null,
        tarea: "",
        terminada: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTarea(this.props.match.params.id);
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentTarea: {
        ...prevState.currentTarea,
        tarea: description
      }
    }));
  }

  getTarea(id) {
    TareasDataService.get(id)
      .then(response => {
        this.setState({
          currentTarea: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateEstado(status) {
    var data = {
      id: this.state.currentTarea.id,
      description: this.state.currentTarea.description,
      terminada: status
    };

    TareasDataService.update(this.state.currentTarea.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTarea: {
            ...prevState.currentTarea,
            terminada: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTarea() {
    TareasDataService.update(
      this.state.currentTarea.id,
      this.state.currentTarea
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Tarea actualizada!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTarea() {
    TareasDataService.delete(this.state.currentTarea.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tareas')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTarea } = this.state;

    return (
      <div>
        {currentTarea ? (
          <div className="edit-form">
            <h4>Tarea</h4>
            <form>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id="tarea"
                  value={currentTarea.tarea}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Estado:</strong>
                </label>
                {currentTarea.terminada ? "Terminada" : "Pendiente"}
              </div>
            </form>

            {currentTarea.terminada ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateEstado(false)}
              >
                Marcar como pendiente
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateEstado(true)}
              >
                Marcar como terminada
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTarea}
            >
              Borrar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTarea}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Seleccione una tarea...</p>
          </div>
        )}
      </div>
    );
  }
}
