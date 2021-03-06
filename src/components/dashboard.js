import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import CardsDisplay from './cards-display';
import DataDisplay from './data-display';
import { Link } from 'react-router-dom';

export class Dashboard extends React.Component {
  render() {
    return (
      <div className='main-container'>
        <div className='dashboard'>
          <Link to='/add-card'>+ Add Card</Link>
          <DataDisplay />
          <CardsDisplay />
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
    cards: state.cards.userCards,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));