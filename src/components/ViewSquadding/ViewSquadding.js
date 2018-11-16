import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { reorder, move } from '../../modules/dragAndDrop.strategy';

import { Button, Divider, Typography } from '@material-ui/core';

import HeaderMargins from '../HeaderMargins/HeaderMargins';
import DndPage from '../DndPage/DndPage';
import DndLeftSide from '../DndLeftSide/DndLeftSide';
import DndRightSide from '../DndRightSide/DndRightSide';
import DndCard from '../DndCard/DndCard';
import DndList from '../DndList/DndList';

class ViewSquadding extends Component {
  state = {
    unassigned: [],
    squads: [
      {
        id: 0,
        members: [],
      },
    ],
  };

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.sendData();
  }

  getData = () => {
    let event_id = 4;
    axios({
      method: 'GET',
      url: `/api/competition/squadding/${event_id}`,
    })
      .then(response => {
        this.setState({ ...response.data });
      })
      .catch(error => {
        alert(
          'Something went wrong getting the squadding data from the server.'
        );
        console.log(error);
      });
  };

  sendData = () => {
    let event_id = 4;
    axios({
      method: 'PUT',
      url: `/api/competition/squadding/${event_id}`,
      data: this.state,
    });
  };

  getList = id => {
    if (id === 'unassigned') {
      return this.state.unassigned;
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

    if (destination.droppableId != 'unassigned') {
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

      if (source.droppableId === 'unassigned') {
        this.setState({
          unassigned: newItems,
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

      if (source.droppableId === 'unassigned') {
        this.setState({
          unassigned: result.source,
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
      if (destination.droppableId === 'unassigned') {
        this.setState({
          unassigned: result.destination,
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
    return (
      <>
        <DndPage>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <DndLeftSide>
              <HeaderMargins>
                <Typography variant="h4">Unsquadded</Typography>
              </HeaderMargins>
              <Divider />
              <Button onClick={this.sendData}>Save</Button>
              <DndList
                droppableId="unassigned"
                data={this.state.unassigned.map(item => {
                  item.mainText = item.first_name + ' ' + item.last_name;
                  item.avatar = item.handicap;
                  return item;
                })}
              />
            </DndLeftSide>
            <DndRightSide>
              {/* <Typography variant="h4" className={classes.subheader}>
                Squads
              </Typography> */}
              {this.state.squads.map((squad, index) => {
                return (
                  <DndCard title={squad.name}>
                    <DndList
                      droppableId={index.toString()}
                      data={squad.members.map(item => {
                        item.mainText = item.first_name + ' ' + item.last_name;
                        item.avatar = item.handicap;
                        return item;
                      })}
                    />
                  </DndCard>
                );
              })}
            </DndRightSide>
          </DragDropContext>
        </DndPage>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(ViewSquadding);
