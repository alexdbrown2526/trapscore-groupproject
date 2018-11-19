import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 3,
    width: 300
  }
});

const DndCard = props => {
  const { classes, title } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton>
            <SettingsIcon />
          </IconButton>
        }
        title={title}
      />
      {props.children}
      <CardContent />
    </Card>
  );
};

DndCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(DndCard);
