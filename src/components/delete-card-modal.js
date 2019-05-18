import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {hideDeleteCardModal, deleteCard} from '../actions/cards';

export class DeleteCardModal extends React.Component {

  handleHideDeleteCard() {
    this.props.dispatch(hideDeleteCardModal());
  }

  handleDeleteCard(cardId) {
    this.props.dispatch(deleteCard(cardId));
  }

  render() {
    const showHideClassname = this.props.show ? 'modal display-block' : 'modal display-none';
    let { card } = this.props;
    if (card === null) {
      return '';
    } else {
      card = card[0];
      console.log(card.id)
      return (
        <div className={showHideClassname}>
          <section className='modal-main card-attribute-icons'>
            <div>Delete this card?</div>
            <div>{card.playerName} - {card.cardDetails}</div>
            <button onClick={() => this.handleDeleteCard(card.id)}>Delete</button>
            <button onClick={this.props.handleClose}>Cancel</button>
          </section>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    cards: state.cards.userCards,
    showModal: state.cards.showModal,
    showDeleteCardModal: state.cards.showDeleteCardModal,
    currentCard: state.cards.currentCard,
  };
};

export default requiresLogin()(connect(mapStateToProps)(DeleteCardModal));