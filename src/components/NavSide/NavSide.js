import React, { Component } from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

class NavSide extends Component {
  render() {
    return (
      <>
        <SwipeableDrawer
          open={this.props.open}
          onClose={this.props.setDrawer(false)}
          onOpen={this.props.setDrawer(true)}
        >
          {this.props.children}
        </SwipeableDrawer>
      </>
    );
  }
}

export default NavSide;
