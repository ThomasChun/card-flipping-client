import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import CardsDisplay from './cards-display';
import AddCard from './add-card';
import DataDisplay from './data-display';

export class Dashboard extends React.Component {
  render() {
    return (
      <div className='main-container'>
        <div className='dashboard'>
          <DataDisplay />
          <AddCard />
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