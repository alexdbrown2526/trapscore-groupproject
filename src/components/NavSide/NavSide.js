import React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const NavSide = props => {
  return (
    <>
      <SwipeableDrawer
        open={props.open}
        onClose={props.setDrawer(false)}
        onOpen={props.setDrawer(true)}
      >
        {props.children}
      </SwipeableDrawer>
    </>
  );
};

export default NavSide;
