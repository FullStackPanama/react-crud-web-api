import React, { Component } from "react";
import TareasDataService from "../services/tarea.service";

export default class TareaNueva extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTarea = this.saveTarea.bind(this);
    this.newTarea = this.newTarea.bind(this);

    this.state = {
      id: null,
      tarea: "",
      terminada: false,

      submitted: false
    };
  }

  onChangeDescription(e) {
    this.setState({
      tarea: e.target.value
    });
  }

  saveTarea() {
    var data = {
      tarea: this.state.tarea,
      terminada: this.state.terminada
    };

    TareasDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          tarea: response.data.tarea,
          terminada: response.data.terminada,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTarea() {
    this.setState({
      id: null,
      tarea: "",
      terminada: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Se ha agregado una nueva tarea!</h4>
            <button className="btn btn-success" onClick={this.newTarea}>
              Agregar
            </button>
          </div>
        ) : (
          <div>

            <div className="form-group">
              <label htmlFor="tarea">Descripción</label>
              <input
                type="text"
                className="form-control"
                id="tarea"
                required
                value={this.state.tarea}
                onChange={this.onChangeDescription}
                name="tarea"
              />
            </div>

            <button onClick={this.saveTarea} className="btn btn-success">
              Guardar
            </button>
          </div>
        )}
      </div>
    );
  }
}
