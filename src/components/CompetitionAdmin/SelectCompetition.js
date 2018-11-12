import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import axios from "axios";
import EditCompetition from '../CompetitionAdmin/EditCompetition';

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
    isVisible: false,
    isLogged: false,
    isEdit: false,
    competitions: [],
    competitionToEdit: Number
  };

  componentDidMount() {
    axios({
      method: "GET",
      url: "/api/competition"
    }).then(response => {
      this.setState({
        ...this.state,
        competitions: response.data
      });
    });
  }

  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      isVisible: !this.state.isVisible
    });
    axios({
      method: "POST",
      url: "/api/competition"
    }).then(response => {
      console.log(response.data[0].id);
      this.setState({
        ...this.state,
        competitionToEdit: response.data[0].id
      });
console.log('This Comp id:', this.state.competitionToEdit);

    });
  };

  editCompetition = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      isEdit: !this.state.isEdit
      //Push all of the competition info into local state, pass as props into EditCompetition below
    });
  };

  handleLogOut = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      isLogged: !this.state.isLogged
    });
  };

  render() {
    const { classes } = this.props;
    let displayItem;
    let viewItem;
    let editItem;
    if (this.state.isVisible) {
      displayItem =   <EditCompetition edit={this.state.competitionToEdit} />
    }
    if (this.state.isLogged) {
      viewItem = this.props.history.push("/home");
    }
    if (this.state.isEdit) {
      editItem =  <EditCompetition edit={this.state.competitionToEdit} />
    }
    return (
      <div className={classes.list}>
        <h1>Select Competition</h1>

        <List>
          {this.state.competitions.map(comp => {
            return (
              <ListItem key={comp.id} value={comp.id}>
                <button onClick={this.editCompetition}>Edit</button>
                {comp.name}
              </ListItem>
            );
          })}
        </List>

        <button onClick={this.handleSubmit}>Add Competition</button>
        <button onClick={this.handleLogOut}>Log Out</button>
        {displayItem}
        {viewItem}
        {editItem}
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