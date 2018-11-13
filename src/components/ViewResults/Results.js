import React, { Component } from "react";
import axios from "axios";

class Results extends Component {
  handleTest = () => {
    axios({
      method: "GET",
      url: "/api/competition/results",
    }).then(response => {
      console.log(response.data);
    });
  };
  render() {
    return (
      <>
        <h1>Results</h1>
        <button onClick={this.handleTest}>Test</button>
      </>
    );
  }
}

export default Results;
