import React, { Component } from "react";
import axios from "axios";
import { get } from "https";

class UrlTestComponent extends Component {
  state = {
    toTry: {
      id: null,
      hash: "",
    },
    competition: {},
  };

  async componentDidMount() {
    await this.setState({
      toTry: {
        id: this.props.match.params.id,
        hash: this.props.match.params.hash,
      },
    });
    this.tryToGetCompetition();
  }

  tryToGetCompetition = () => {
    let toTry = this.state.toTry;
    console.log("trying:", toTry);
    axios({
      method: "GET",
      url: `/api/registration/${toTry.id}&${toTry.hash}`,
    }).then(response => {
      console.log(response.data);
      this.setState({ competition: response.data });
    });
  };

  sendTest = () => {
    let toTry = this.state.toTry;
    let toSend = { name: "Bobby DropTables" };
    axios({
      method: "POST",
      url: `/api/registration/${toTry.id}&${toTry.hash}`,
      data: toSend,
    });
  };

  render() {
    return (
      <>
        <h1>Test Component</h1>
        <h4>Competition: {this.state.competition.name}</h4>
        <h4>Location: {this.state.competition.location}</h4>
        <button onClick={this.sendTest}>CLICK ME</button>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </>
    );
  }
}

export default UrlTestComponent;
