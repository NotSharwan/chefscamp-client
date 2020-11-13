import React, { Component } from "react";
import Welcome from "./Welcome";

const style = {
  backgroundColor: "#fad75a",
  borderRadius: "20px",
  border: "medium none",
  padding: "1.2em 1.3em",
  color: "black",
  fontSize: "25px",
  boxShadow: "0 0 5px -1px rgba(0,0,0,0.2)",
  fontWeight: "bold",
  letterSpacing: "3px",
  transition: "background 350ms cubic-bezier(0, 0, 0.25, 1) 0s",
};

class login extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    window.location.href = `https://api.codechef.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&state=xyz&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
  }

  render() {
    return (
      <div
        style={{
          paddingTop: "150px",
          height: "450px",
          border: "solid #b9b9b9 3px",
        }}
      >
        <div>
          <Welcome />
          <button
            style={{ ...style, cursor: this.props.loading ? "" : "pointer" }}
            disabled={this.props.loading}
            onClick={this.handleClick}
          >
            {this.props.loading ? "Signing in . . ." : "Login With Codechef"}
          </button>
          {this.props.message && (
            <div
              style={{
                backgroundColor: "#d94d65",
                margin: "1em",
                padding: "1em",
                width: "250px",
                borderRadius: "20px",
              }}
            >
              <strong>{this.props.message}</strong>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default login;