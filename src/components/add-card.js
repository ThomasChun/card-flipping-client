import React from 'react';
import { showAddCardModal, hideAddCardModal } from '../actions/cards';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import CardInputForm from './card-input-form';

export class AddCard extends React.Component {
  handleAddCard() {
    this.props.dispatch(showAddCardModal());
  }

  hideModal() {
    this.props.dispatch(hideAddCardModal());
  }

  render() {
    return (
      <div className='add-card-container'>
        <button className='add-card-button' onClick={() => this.handleAddCard()}>+ Add Card</button>
        <CardInputForm show={this.props.showAddCardModal} handleClose={() => this.hideModal()} user={this.props.username} />
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
    showAddCardModal: state.cards.showAddCardModal,
  };
};

export default requiresLogin()(connect(mapStateToProps)(AddCard));