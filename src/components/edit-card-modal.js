import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import CardEditInputForm from './card-edit-input-form';
import { hideEditCardModal } from '../actions/cards';

export class EditCardModal extends React.Component {
  hideModal() {
    this.props.dispatch(hideEditCardModal());
    // this.props.dispatch(clearCurrentCardDetails());
  }

  render() {
    const showHideClassname = this.props.show ? 'modal display-block' : 'modal display-none';
    let { card } = this.props;
    if (card === null) {
      return '';
    } else {
      card = card[0];
      return (
        <div className={showHideClassname}>
          <section className='modal-main card-attribute-icons'>
            <CardEditInputForm show={true} handleClose={()=> this.hideModal()} user={this.props.username} card={this.props.currentCard}/>
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
    showEditCardModal: state.cards.showEditCardModal,
    currentCard: state.cards.currentCard,
  };
};

export default requiresLogin()(connect(mapStateToProps)(EditCardModal));