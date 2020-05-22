import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import Login from "./Login";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password_first: "",
      password: "",
    };
  }
  handleClick(event) {
    const apiBaseUrl = "http://localhost:8080";
    const self = this;
    if (
      this.state.login.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password_first.length > 0
    ) {
      const payload = {
        login: this.state.login,
        password: this.state.password,
        password_first: this.state.password_first,
      };
      if (this.state.password !== this.state.password_first) {
        alert("Hasła muszą być takie same!");
      } else {
        axios
          .post(apiBaseUrl + "/register", payload)
          .then(function (response) {
            console.log("RESPONSE:::", response);

            if (response.status === 200) {
              const loginscreen = [];
              const loginmessage = "Prawidłowa rejestracja!";
              self.props.parentContext.setState({
                loginscreen: loginscreen,
                loginmessage: loginmessage,
                buttonLabel: "Zarejestruj",
                isLogin: false,
              });
              loginscreen.push(
                <Login
                  parentContext={this}
                  appContext={self.props.appContext}
                />
              );
            } else {
              console.log("Wystąpił problem: ", response.status);
            }
          })
          .catch(function (error) {
            // To dlatego że mi się nie chce dopisywać na backendzie obsługi przypadku dla istniejącego usera
            alert("Podany login jest zajęty.")
            console.log("ERROR::::", error);
          });
      }
    } else {
      if (this.state.login.length === 0) {
        alert("Podaj nazwę użytownika.");
      } else if (this.state.password.length === 0) {
        alert("Hasło nie może być puste.");
      } else if (this.state.password_first.length === 0) {
        alert("Musisz powtórzyć hasło!");
      } else {
        alert("Nieznany błąd formularza!");
      }
    }
  }
  render() {
    let userhintText, userLabel;
    userhintText = "Podaj nazwę użytkownika";
    userLabel = "Login";
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Rejestracja" />
            <TextField
              hintText={userhintText}
              floatingLabelText={userLabel}
              onChange={(event, newValue) => this.setState({ login: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Podaj hasło"
              floatingLabelText="Hasło"
              onChange={(event, newValue) =>
                this.setState({ password_first: newValue })
              }
            />
            <br />
            <TextField
              type="password"
              hintText="Powtórz hasło"
              floatingLabelText="Powtórz hasło"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Zarejestruj"
              primary={true}
              style={style}
              onClick={(event) => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;
