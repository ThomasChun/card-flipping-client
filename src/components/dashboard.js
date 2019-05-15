import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import NavBar from './nav-bar';
import CardInputForm from './card-input-form';

export class Dashboard extends React.Component {
  render() {
    return (
      <div className='main-container'>
        <NavBar />
        <div className='dashboard'>
          Dashboard
          <CardInputForm />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));