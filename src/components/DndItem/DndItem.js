import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Avatar, 
  ListItem, 
  ListItemText 
} from '@material-ui/core';

import { Draggable } from 'react-beautiful-dnd';

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
        >
          <ListItem button disableGutters={props.disableGutters}>
            <Avatar className={props.box ? classes.avatarBox : classes.avatar}>
              {item.avatar}
            </Avatar>
            <ListItemText
              primary={item.mainText}
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
