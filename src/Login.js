import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Axios from "axios";

const apiBaseUrl = "http://localhost:8080";

class Login extends Component {
  constructor(props) {
    super(props);
    var localloginComponent = [];
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
          <TextField
            hintText="Nazwa użytownika"
            floatingLabelText="nazwa użytktownika"
            onChange={(event, newValue) => this.setState({ login: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Hasło"
            floatingLabelText="Hasło"
            onChange={(event, newValue) =>
              this.setState({ password: newValue })
            }
          />
          <br />
          <RaisedButton
            label="Zaloguj"
            primary={true}
            style={style}
            onClick={(event) => this.handleClick(event)}
          />
        </div>
      </MuiThemeProvider>
    );
    this.state = {
      login: "",
      password: "",
      loginComponent: localloginComponent,
    };
  }
  componentWillMount() {
    var localloginComponent = [];
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
          <TextField
            hintText="Nazwa użytownika"
            floatingLabelText="nazwa użytktownika"
            onChange={(event, newValue) => this.setState({ login: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Hasło"
            floatingLabelText="Hasło"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <br />
          <RaisedButton
            label="Zaloguj"
            primary={true}
            style={style}
            onClick={(event) => this.handleClick(event)}
          />
        </div>
      </MuiThemeProvider>
    );
    this.setState({ loginComponent: localloginComponent });
  }
  handleClick(event) {
    const payload = {
      login: this.state.login,
      password: this.state.password
    };
    Axios.post(apiBaseUrl + "/login", payload, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Udane logowanie!");
          // TU DODAJ PRZEKIEROWANIE DO STRONY ZE STATSAMI
	} else {
          console.log("Podany użytkownik nie istnieje");
          alert("Podany użytkownik nie istnieje");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="Zaloguj" />
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
