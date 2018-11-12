import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import axios from "axios";
import EditCompetition from "../CompetitionAdmin/EditCompetition";

const styles = {
  userDetail: {
    padding: 24,
    width: "100%"
  },
  contestDetail: {
    paddingLeft: 24,
    width: "100%"
  },
  list: {
    width: 240
  }
};

class SelectCompetition extends Component {
  state = {
    // Conditional Rendering Variables
    isVisible: false,
    isLogged: false,
    // 
    competitions: [],
    competitionToEdit: Number
  };

  refreshData = () => {
    axios({
      method: "GET",
      url: "/api/competition"
    }).then(response => {
      this.setState({
        ...this.state,
        competitions: response.data,
        isVisible: false
      });
    });
  };

  componentDidMount() {
    this.refreshData();
  }

  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
  };

  addNewCompetition = event => {
    event.preventDefault();

    axios({
      method: "POST",
      url: "/api/competition"
    }).then(response => {
      console.log(response.data[0]);
      this.editCompetition(response.data[0]);
    });
  };

  editCompetition = selectedCompetition => {
    this.setState({
      ...this.state,
      competitionToEdit: selectedCompetition,
      isVisible: true
    });
  };
  // Conditional Rendering for Log out
  handleLogOut = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      isLogged: true
    });
  };

  render() {
    const { classes } = this.props;
    //Conditional Rendering if statements/variables
    let displayItem;
    let viewItem;
    if (this.state.isVisible) {
      displayItem = (
        <EditCompetition
          edit={this.state.competitionToEdit}
          data={this.refreshData}
        />
      );
    }
    if (this.state.isLogged) {
      viewItem = this.props.history.push("/home");
    }
    return (
      <div className={classes.list}>
        <h1>Select Competition</h1>

        <List>
          {this.state.competitions.map(comp => {
            return (
              <ListItem key={comp.id} value={comp.id}>
                <button onClick={() => this.editCompetition(comp)}>Edit</button>
                {comp.name}
              </ListItem>
            );
          })}
        </List>

        <button onClick={this.addNewCompetition}>Add Competition</button>
        <button onClick={this.handleLogOut}>Log Out</button>
        {displayItem}
        {viewItem}
      </div>
    );
  }
}

SelectCompetition.propTypes = {
  classes: PropTypes.object.isRequired
};

const Comp = withStyles(styles)(SelectCompetition);

const mapStateToProps = reduxState => ({
  reduxState
});
export default connect(mapStateToProps)(Comp);
