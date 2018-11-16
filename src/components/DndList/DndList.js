import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import { List } from '@material-ui/core';

import DndItem from '../DndItem/DndItem';

const DndList = props => {
  return (
    <List>
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {props.data.map((item, index) => {
              return <DndItem item={item} index={index} />;
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
};

export default DndList;
