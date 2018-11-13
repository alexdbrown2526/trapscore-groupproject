import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import axios from "axios";
import EditCompetition from "../CompetitionAdmin/EditCompetition";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
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
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class SelectCompetition extends Component {
  state = {
    // Conditional Rendering Variables
    isVisible: false,
    isLogged: false,
    // Modal Variable
    open: false,
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
      isVisible: true,
      open: true
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

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    //Conditional Rendering if statements/variables
    let displayItem;
    let viewItem;
    if (this.state.isVisible) {
      displayItem = (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <EditCompetition
              edit={this.state.competitionToEdit}
              data={this.refreshData}
            />
          </div>
        </Modal>
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
                <Button onClick={() => this.editCompetition(comp)}>Edit</Button>
                {comp.name}
              </ListItem>
            );
          })}
        </List>

        <Button onClick={this.addNewCompetition}>Add Competition</Button>
        <Button onClick={this.handleLogOut}>Log Out</Button>
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
export default connect(mapStateToProps)(withRouter(Comp));
