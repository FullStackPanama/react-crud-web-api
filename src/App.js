import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import TareaNueva from "./components/tarea-nueva.component";
import Tarea from "./components/tarea.component";
import TareasLista from "./components/tareas-lista.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tareas"} className="navbar-brand">
            FullStackPanama
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tareas"} className="nav-link">
                Tareas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/tarea-nueva"} className="nav-link">
                Agregar tarea
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tareas"]} component={TareasLista} />
            <Route exact path="/tarea-nueva" component={TareaNueva} />
            <Route path="/tareas/:id" component={Tarea} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
