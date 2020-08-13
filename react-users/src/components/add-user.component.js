import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeContract = this.onChangeContract.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      user: "",
      title: "",
      contract: "",
      published: false,

      submitted: false,
    };
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value,
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeContract(e) {
    this.setState({
      contract: e.target.value,
    });
  }

  saveUser() {
    var data = {
      title: this.state.title,
      contract: this.state.contract,
    };

    UserDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          contract: response.data.contract,
          published: response.data.published,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      title: "",
      contract: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">User</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeUser}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.contract}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contract">Contract</label>
              <input
                type="text"
                className="form-control"
                id="contract"
                required
                value={this.state.contract}
                onChange={this.onChangeContract}
                name="contract"
              />
            </div>

            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
