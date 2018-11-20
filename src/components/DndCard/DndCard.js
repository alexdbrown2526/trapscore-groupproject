import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 3,
    width: theme.spacing.unit * 50,
  },
  cardNoMargin: {
    // margin: theme.spacing.unit * 3,
    width: theme.spacing.unit * 50,
  },
});

const DndCard = props => {
  const { classes, title } = props;
  return (
    <Card className={props.noMargin ? classes.cardNoMargin : classes.card}>
      <CardHeader action={props.cornerButton} title={title} />
      <CardContent>{props.children}</CardContent>
      <CardActions>{props.cardActions ? props.cardActions : null}</CardActions>
    </Card>
  );
};

DndCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(DndCard);
