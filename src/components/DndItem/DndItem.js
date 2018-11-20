import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Avatar, ListItem, ListItemText } from '@material-ui/core';

const styles = theme => ({
  avatar: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  avatarBox: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 10,
  },
});

const DndItem = props => {
  const { classes, item, index } = props;
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
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
          <ListItem button disableGutters={props.disableGutters}>
            <Avatar className={props.box ? classes.avatarBox : classes.avatar}>
              {item.avatar}
            </Avatar>
            <ListItemText
              primary={item.mainText}
              // secondary={"Handicap: " + shooter.handicap}
            />
          </ListItem>
        </div>
      )}
    </Draggable>
  );
};

DndItem.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(DndItem);
