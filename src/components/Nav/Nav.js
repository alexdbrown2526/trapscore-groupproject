import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NavTop from '../NavTop/NavTop';
import NavSide from '../NavSide/NavSide';
import NavSideHeader from '../NavSideHeader/NavSideHeader';
import NavList from '../NavList/NavList';
import NavSideBottom from '../NavSideBottom/NavSideBottom';
import NavSideBottomActions from '../NavSideBottomActions/NavSideBottomActions';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Nav extends Component {
  state = {
    sidenavOpen: false,
  };

  setDrawer = open => () => {
    console.log('setDrawer:', open);
    this.setState({
      sidenavOpen: open,
    });
  };

  navigateTo = destination => {
    // TODO: have Joe ask Luke why this doesn't work
    this.setDrawer(false);

    this.setState({
      sidenavOpen: false,
    });

    console.log('navigateTo');

    this.props.history.push(`${destination}`);

    // this.props.dispatch({
    //   type: "NAVIGATE_TO",
    //   payload: destination,
    // });
  };

  logout = () => {
    toast('Logged Out');
    this.setDrawer(false);
    // TODO: have Joe ask Luke why this doesn't work

    this.setState({
      sidenavOpen: false,
    });
    this.props.dispatch({ type: LOGIN_ACTIONS.LOGOUT });
  };

  toRegistrationPage = () => {
    this.setState({
      sidenavOpen: false,
    });
    this.props.dispatch({
      type: USER_ACTIONS.GO_TO_REGISTRATION_PAGE,
      payload: this.props.history,
    });
  };

  render() {
    return (
      <>
        <NavTop openDrawer={this.setDrawer(true)} />
        <NavSide open={this.state.sidenavOpen} setDrawer={this.setDrawer}>
          <NavSideHeader user={this.props.user} />
          <NavList navigateTo={this.navigateTo} />
          <NavSideBottom>
            <NavSideBottomActions
              logout={this.logout}
              toRegistrationPage={this.toRegistrationPage}
            />
          </NavSideBottom>
        </NavSide>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(Nav));
