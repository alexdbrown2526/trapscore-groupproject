import React from 'react';

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core/';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const NavSideBottomActions = props => {
  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            props.toRegistrationPage();
          }}
        >
          <ListItemText>Registration</ListItemText>
          <ListItemSecondaryAction>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={props.logout}>
          <ListItemText>Log Out</ListItemText>
          <ListItemSecondaryAction>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  );
};

export default NavSideBottomActions;
