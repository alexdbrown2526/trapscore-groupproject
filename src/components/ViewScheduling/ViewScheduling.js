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

class ViewScheduling extends Component {
  state = {
    unassigned: [],
    traps: [
      {
        id: 0,
        schedule: [],
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
    axios({
      method: 'GET',
      url: `/api/competition/scheduling/`,
    })
      .then(response => {
        console.log(response);
        this.setState({ ...response.data });
      })
      .catch(error => {
        alert(
          'Something went wrong getting the scheduling data from the server.'
        );
        console.log(error);
      });
  };

  sendData = () => {
    // let event_id = 4;
    // axios({
    //   method: 'PUT',
    //   url: `/api/competition/squadding/${event_id}`,
    //   data: this.state,
    // });
  };

  getList = id => {
    if (id === 'unassigned') {
      return this.state.unassigned;
    } else {
      return this.state.traps[Number(id)].schedule;
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

    // if (destination.droppableId != 'unassigned') {
    // if destination is already full
    // if (
    //   this.state.traps[Number(destination.droppableId)].schedule.length > 4
    // ) {
    //   return;
    // }
    // }

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
          traps: [
            ...this.state.traps.slice(0, Number(source.droppableId)),
            {
              ...this.state.traps[source.droppableId],
              schedule: newItems,
            },
            ...this.state.traps.slice(Number(source.droppableId) + 1),
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
          traps: [
            ...this.state.traps.slice(0, Number(source.droppableId)),
            {
              ...this.state.traps[source.droppableId],
              schedule: result.source,
            },
            ...this.state.traps.slice(Number(source.droppableId) + 1),
          ],
        });
      }
      if (destination.droppableId === 'unassigned') {
        this.setState({
          unassigned: result.destination,
        });
      } else {
        this.setState({
          traps: [
            ...this.state.traps.slice(0, Number(destination.droppableId)),
            {
              ...this.state.traps[destination.droppableId],
              schedule: result.destination,
            },
            ...this.state.traps.slice(Number(destination.droppableId) + 1),
          ],
        });
      }
    }
  };

  addSquad = () => {
    let toAdd = {
      id: this.state.traps.length,
      name: 'squad' + this.state.traps.length,
      schedule: [],
    };
    let newtraps = [...this.state.traps, toAdd];

    this.setState({ traps: newtraps });
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
                box
                droppableId="unassigned"
                data={this.state.unassigned.map(item => {
                  item.mainText = item.name;
                  item.avatar = item.box_number;
                  return item;
                })}
              />
            </DndLeftSide>
            <DndRightSide>
              {/* <Typography variant="h4" className={classes.subheader}>
                traps
              </Typography> */}
              {this.state.traps.map((trap, index) => {
                return (
                  <DndCard title={trap.name}>
                    <DndList
                      box
                      droppableId={index.toString()}
                      data={trap.schedule.map(item => {
                        item.mainText = item.name;
                        // item.secondaryText = item.box_number;
                        item.avatar = item.box_number;
                        return item;
                      })}
                    />
                  </DndCard>
                );
              })}
              <pre>{JSON.stringify(this.state, null, 2)}</pre>
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

export default connect(mapStateToProps)(ViewScheduling);
