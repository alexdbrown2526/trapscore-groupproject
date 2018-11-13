import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import SettingsIcon from "@material-ui/icons/Settings";

const styles = theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
  },
  leftSide: {
    backgroundColor: "lightgray",
    width: "20%",
    minWidth: 100,
    height: "100vh",
    overflowY: "auto",
  },
  rightSide: {
    width: "75%",
    minWidth: 100,
    height: "100%",
    overflowY: "auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
  },
  subheader: {
    width: "100%",
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
  avatar: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
  card: {
    margin: theme.spacing.unit * 3,
    width: 300,
  },
});

class Squadding extends Component {
  state = {
    unsquadded: [],
    squads: [],
  };

  componentDidMount() {
    console.log("ComponentDidMount");
    let event_id = 4;
    axios({
      method: "GET",
      url: `/api/competition/squadding/${event_id}`,
    })
      .then(response => {
        console.log(response);
        this.setState({ ...response.data });
      })
      .catch(error => {
        alert(
          "Something went wrong getting the squadding data from the server."
        );
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <div className={classes.leftSide}>
            <Typography variant="h4" className={classes.subheader}>
              Unsquadded
            </Typography>
            <Divider />
            <List>
              {this.state.unsquadded.map((shooter, index) => {
                return (
                  <ListItem key={shooter.id} button>
                    <Avatar className={classes.avatar}>
                      {shooter.handicap}
                    </Avatar>
                    <ListItemText
                      primary={shooter.first_name + " " + shooter.last_name}
                      // secondary={"Handicap: " + shooter.handicap}
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
          <div className={classes.rightSide}>
            <Typography variant="h4" className={classes.subheader}>
              Squads
            </Typography>
            {this.state.squads.map((squad, index) => {
              return (
                <Card className={classes.card}>
                  <CardHeader
                    action={
                      <IconButton>
                        <SettingsIcon />
                      </IconButton>
                    }
                    title={squad.name}
                  />
                  <CardContent>
                    <List>
                      {this.state.unsquadded.map((shooter, index) => {
                        return (
                          <ListItem key={shooter.id} button>
                            <Avatar className={classes.avatar}>
                              {shooter.handicap}
                            </Avatar>
                            <ListItemText
                              primary={
                                shooter.first_name + " " + shooter.last_name
                              }
                              // secondary={"Handicap: " + shooter.handicap}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </CardContent>
                </Card>
              );
            })}
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
            {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
          </div>
        </div>
      </>
    );
  }
}

Squadding.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Squadding));
