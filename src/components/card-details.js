import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import EditCardModal from './edit-card-modal';
import { hideEditCardModal, showEditCardModal, fetchCurrentCards } from '../actions/cards';

export class CardDetails extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentCards());
  }

  handleCardEdit(cardId) {
    this.props.dispatch(fetchCurrentCards());
    this.props.dispatch(showEditCardModal());
  }

  handleEditHideModal() {
    this.props.dispatch(hideEditCardModal());
  }

  render() {
    let { currentCard } = this.props;
    let cardDetailDisplay;
    if (currentCard.length === 0) {
      cardDetailDisplay = <div>loading...</div>;
    }
    
    if (currentCard !== null && currentCard.length !== 0) {
      cardDetailDisplay = currentCard.map((currentCard, index) => {
        return (
          <div className='display-card-details' key={index}>
          
            <div><b>{currentCard.playerName} {currentCard.cardDetails}</b></div>
            <div><b>Sport: </b>{currentCard.sport}</div>
            <div><b>Year: </b>{currentCard.year}</div>
            <div><b>Brand: </b>{currentCard.brand}</div>
            <div><b>Listed On:</b>{currentCard.listedOn}</div>
            <div><b>Purchase Date: </b>{currentCard.purchaseDate}</div>
            <div><b>Purchase Price: </b>${currentCard.purchasePrice}</div>
            <div><b>Purchase From: </b>{currentCard.purchasedFrom}</div>
            <div><b>Date Sold: </b>{currentCard.saleDate}</div>
            <div><b>Sale Price: </b>{currentCard.salePrice}</div>
            <div><b>Profit: </b></div>
            <div>
              <div><b>Card Attributes:</b></div>
              {currentCard.rookie ? <button className='rc' disabled>RC</button> : ''}
              {currentCard.refractor ? <button className='ref' disabled>REF</button> : ''}
              {currentCard.insert ? <button className='ins' disabled>INS</button> : ''}
              {currentCard.serialNumbered ? <button className='ser' disabled>SER</button> : ''}
              {currentCard.autograph ? <button className='au' disabled>AU</button> : ''}
              {currentCard.memorabilia ? <button className='mem' disabled>MEM</button> : ''}
              {currentCard.graded ? <button className='gr' disabled>GR</button> : ''}
              {currentCard.shortPrint ? <button className='sp' disabled>SP</button> : ''}
              {currentCard.error ? <button className='err' disabled>ERR</button> : ''}
            </div>
            <button onClick={() => this.handleCardEdit(currentCard.id)}>Edit</button>
            <Link to='/dashboard'>BACK</Link>
          </div>
        )
      })
    }
    return (
      <div className='display-card-details-container' >
        <EditCardModal show={this.props.showEditCardModal} handleClose={() => this.handleEditHideModal()} card={this.props.currentCard} />
        {cardDetailDisplay}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    cards: state.cards.userCards,
    currentCard: state.cards.currentCard,
    showEditCardModal: state.cards.showEditCardModal,
  };
};

export default requiresLogin()(connect(mapStateToProps)(CardDetails));