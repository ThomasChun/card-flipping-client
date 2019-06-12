import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
// import CardInputForm from './card-input-form';
import AddCardForm from './add-card-form';
import { showAddCardModal, hideAddCardModal } from '../actions/cards';
import { Link } from 'react-router-dom';

export class AddCardPage extends React.Component {
  handleAddCard() {
    this.props.dispatch(showAddCardModal());
  }

  hideModal() {
    this.props.dispatch(hideAddCardModal());
  }

  render() {
    return (
      <div className='main-container'>
        <div className='dashboard'>
          <Link to='/dashboard'>Back to Dashboard</Link>
          <AddCardForm user={this.props.username} />
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

export default requiresLogin()(connect(mapStateToProps)(AddCardPage));