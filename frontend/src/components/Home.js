import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";
import { redirect } from '../utils/http';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewCompleted: true,
      roomsList: [
        {
          "id": "abc",
          "completed": true,
          "description": "some special text",
          "title": "any here"

        },       
        {
          "completed": true,
        },
        {
          "completed": false,
        },
        {
          "completed": false,
        },
        {
          "completed": false,
        },
      ],
      modal: false,
      activeItem: {
        name: "",
        number: "",
      },
    };
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount() {
    this.refreshRooms();
  
  }
  
  handleClick() {
    this.setState(prevState => ({
      modal: true
    }));
  }

  LoginRoom(item) {
    this.setState(prevState => ({
      modal: true
    }));
  }

  refreshRooms = () => {
    axios
      .get("/api/rooms/")
      .then((res) => this.setState({ roomsList: res.data }))
      .catch((err) => console.log(err));
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/puntos/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/puntos/", item)
      .then((res) => this.refreshList());
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    console.log('this.state.roomsList', this.state.roomsList)
    const newItems = this.state.roomsList.filter(
      (item) => item.completed === viewCompleted
    );
  
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.LoginRoom(item)}
          >
            Ingresar
          </button>
        </span>
      </li>
    ));
  };
  
  render() {
    return (
      <div className="container">
          <p> hola</p>
            <ul className="list-group list-group-flush border-top-0">
              {this.renderItems()}
            </ul>
        <button onClick={this.handleClick}
          className="btn btn-primary"
          >
          Nuevo Juego
        </button>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  };
}