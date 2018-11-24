import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { 
  Divider, 
  Typography 
} from '@material-ui/core/';

const styles = {
  userDetail: {
    padding: 24,
    width: '100%',
  },
  contestDetail: {
    paddingLeft: 24,
    width: '100%',
  },
  list: {
    width: 225,
  },
};

const NavSideHeader = props => {
  const { classes } = props;
  return (
    <>
      <div className={classes.userDetail}>
        <Typography variant="h4">TrapScore</Typography>
      </div>
      <Divider />
    </>
  );
};

NavSideHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavSideHeader);
