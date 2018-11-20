import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { List } from '@material-ui/core';

import DndItem from '../DndItem/DndItem';

const styles = theme => ({
  list: {},
  dndContainer: {
    minHeight: 200,
  },
});

const DndList = props => {
  const { classes } = props;
  return (
    <List dense="true" disablePadding="true">
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <div
            className={classes.dndContainer}
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {props.data.map((item, index) => {
              return (
                <DndItem
                  key={item.id}
                  item={item}
                  index={index}
                  box={props.box}
                  disableGutters={props.disableGutters}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </List>
  );
};

DndList.propTypes = {
  data: PropTypes.array.isRequired,
  droppableId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DndList);
