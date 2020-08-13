import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeContract = this.onChangeContract.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        title: "",
        contract: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeUser(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          title: title,
        },
      };
    });
  }

  onChangeContract(e) {
    const contract = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        contract: contract,
      },
    }));
  }

  getUser(id) {
    UserDataService.get(id)
      .then((response) => {
        this.setState({
          currentUser: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentUser.id,
      title: this.state.currentUser.title,
      contract: this.state.currentUser.contract,
      published: status,
    };

    UserDataService.update(this.state.currentUser.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentUser: {
            ...prevState.currentUser,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(this.state.currentUser.id, this.state.currentUser)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteUser() {
    UserDataService.delete(this.state.currentUser.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/users");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">User</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentUser.title}
                  onChange={this.onChangeUser}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contract">Contract</label>
                <input
                  type="text"
                  className="form-control"
                  id="contract"
                  value={currentUser.contract}
                  onChange={this.onChangeContract}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentUser.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentUser.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}
