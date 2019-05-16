import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
// import NavBar from './nav-bar';
import CardInputForm from './card-input-form';
import CardsDisplay from './cards-display';

export class Dashboard extends React.Component {
  render() {
    return (
      <div className='main-container'>
        <div className='dashboard'>
          <CardsDisplay />
          <CardInputForm user={this.props.username}/>
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