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
            onChange={(event, newValue) => this.setState({ login: newValue })}
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
      password: this.state.password,
    };
    Axios.post(apiBaseUrl + "/login", payload, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.data.code === 200) {
          console.log("Udane logowanie!");
          //       var uploadScreen=[];
          //       uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole}/>)
          //       self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        } else if (response.data.code === 204) {
          console.log("Nieprawidłowy login lub hasło");
          alert(response.data.success);
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
