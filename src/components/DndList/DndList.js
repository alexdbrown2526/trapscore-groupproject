import React from "react";

import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

import { List } from "@material-ui/core";

import { Droppable } from "react-beautiful-dnd";
import DndItem from "../DndItem/DndItem";

const styles = theme => ({
  list: {},
  dndContainer: {
    minHeight: 200
  }
});

const DndList = props => {
  const { classes } = props;
  return (
    <List dense={true} disablePadding={true}>
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <div className={classes.dndContainer} ref={provided.innerRef}>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DndList);
