import React, { Component } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
} from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
  },
  leftSide: {
    backgroundColor: 'lightgray',
    width: '20%',
    minWidth: 100,
    height: '100vh',
    overflowY: 'scroll',
  },
  rightSide: {
    width: '75%',
    minWidth: 100,
    height: '100vh',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
  },
  subheader: {
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
  avatar: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  card: {
    margin: theme.spacing.unit * 3,
    width: 300,
  },
});

// --------------------------------------------
// Functions
// --------------------------------------------

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};

  result.source = sourceClone;
  result.destination = destClone;

  return result;
};

// --------------------------------------------
// Component
// --------------------------------------------

class ViewSquadding extends Component {
  state = {
    unsquadded: [],
    squads: [
      {
        id: 0,
        members: [],
      },
    ],
  };

  componentDidMount() {
    console.log('ComponentDidMount');
    let event_id = 4;
    axios({
      method: 'GET',
      url: `/api/competition/squadding/${event_id}`,
    })
      .then(response => {
        console.log(response);
        this.setState({ ...response.data });
      })
      .catch(error => {
        alert(
          'Something went wrong getting the squadding data from the server.'
        );
        console.log(error);
      });
  }

  getList = id => {
    if (id === 'unsquadded') {
      return this.state.unsquadded;
    } else {
      return this.state.squads[Number(id)].members;
    }
  };

  onDragEnd = result => {
    const { source, destination } = result;

    console.log('source:', source);
    console.log('destination:', destination);

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (destination.droppableId != 'unsquadded') {
      // if destination is already full
      if (
        this.state.squads[Number(destination.droppableId)].members.length > 4
      ) {
        return;
      }
    }

    // dropped on the same table
    if (source.droppableId === destination.droppableId) {
      const newItems = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === 'unsquadded') {
        this.setState({
          unsquadded: newItems,
        });
      } else {
        this.setState({
          squads: [
            ...this.state.squads.slice(0, Number(source.droppableId)),
            {
              ...this.state.squads[source.droppableId],
              members: newItems,
            },
            ...this.state.squads.slice(Number(source.droppableId) + 1),
          ],
        });
      }
    } else {
      // if they are two different lists
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      console.log(result);

      if (source.droppableId === 'unsquadded') {
        this.setState({
          unsquadded: result.source,
        });
      } else {
        this.setState({
          squads: [
            ...this.state.squads.slice(0, Number(source.droppableId)),
            {
              ...this.state.squads[source.droppableId],
              members: result.source,
            },
            ...this.state.squads.slice(Number(source.droppableId) + 1),
          ],
        });
      }
      if (destination.droppableId === 'unsquadded') {
        this.setState({
          unsquadded: result.destination,
        });
      } else {
        this.setState({
          squads: [
            ...this.state.squads.slice(0, Number(destination.droppableId)),
            {
              ...this.state.squads[destination.droppableId],
              members: result.destination,
            },
            ...this.state.squads.slice(Number(destination.droppableId) + 1),
          ],
        });
      }
    }
  };

  addSquad = () => {
    let toAdd = {
      id: this.state.squads.length,
      name: 'squad' + this.state.squads.length,
      members: [],
    };
    let newSquads = [...this.state.squads, toAdd];

    this.setState({ squads: newSquads });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className={classes.leftSide}>
              <Typography variant="h4" className={classes.subheader}>
                Unsquadded
              </Typography>
              <Divider />
              <List>
                <Droppable droppableId="unsquadded">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      // style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {this.state.unsquadded.map((shooter, index) => {
                        return (
                          <Draggable
                            key={shooter.id}
                            draggableId={shooter.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                // style={getItemStyle(
                                //   snapshot.isDragging,
                                //   provided.draggableProps.style
                                // )}
                              >
                                <ListItem key={shooter.id} button>
                                  <Avatar className={classes.avatar}>
                                    {shooter.handicap}
                                  </Avatar>
                                  <ListItemText
                                    primary={
                                      shooter.first_name +
                                      ' ' +
                                      shooter.last_name
                                    }
                                    // secondary={"Handicap: " + shooter.handicap}
                                  />
                                </ListItem>
                              </div>
                            )}
                          </Draggable>
                        );

                        // return (
                        //   <ListItem key={shooter.id} button>
                        //     <Avatar className={classes.avatar}>
                        //       {shooter.handicap}
                        //     </Avatar>
                        //     <ListItemText
                        //       primary={
                        //         shooter.first_name + ' ' + shooter.last_name
                        //       }
                        //       // secondary={"Handicap: " + shooter.handicap}
                        //     />
                        //   </ListItem>
                        // );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
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
                      <Droppable droppableId={index.toString()}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            // style={getListStyle(snapshot.isDraggingOver)}
                          >
                            <List>
                              {squad.members.map((shooter, index) => (
                                <Draggable
                                  key={shooter.id}
                                  draggableId={shooter.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      // style={getItemStyle(
                                      //   snapshot.isDragging,
                                      //   provided.draggableProps.style
                                      // )}
                                    >
                                      <ListItem button>
                                        <Avatar className={classes.avatar}>
                                          {shooter.handicap}
                                        </Avatar>
                                        <ListItemText
                                          primary={
                                            shooter.first_name +
                                            ' ' +
                                            shooter.last_name
                                          }
                                          // secondary={"Handicap: " + shooter.handicap}
                                        />
                                      </ListItem>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </List>
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>

                      {/*
  // <List>
  //   {squad.members.map((shooter, index) => {
  //     return (
  //       <ListItem key={shooter.id} button>
  //         <Avatar className={classes.avatar}>
  //           {shooter.handicap}
  //         </Avatar>
  //         <ListItemText
  //           primary={
  //             shooter.first_name + ' ' + shooter.last_name
  //           }
  //           // secondary={"Handicap: " + shooter.handicap}
  //         />
  //       </ListItem>
  //     );
  //   })}
  // </List>

*/}
                    </CardContent>
                  </Card>
                );
              })}
              <pre>{JSON.stringify(this.state, null, 2)}</pre>
              {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
            </div>
          </DragDropContext>
        </div>
      </>
    );
  }
}

ViewSquadding.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(ViewSquadding);
