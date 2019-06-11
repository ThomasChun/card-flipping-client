import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import EditCardModal from './edit-card-modal';
import { hideEditCardModal, showEditCardModal, currentCardDetails, fetchCards } from '../actions/cards';

export class CardDetails extends React.Component {
  componentDidMount() {
    let card = this.props.cards.filter(card => card.id === this.props.match.params.id);
    this.props.dispatch(fetchCards());
    this.props.dispatch(currentCardDetails(card));
  }

  handleCardEdit(cardId) {
    this.props.dispatch(fetchCards());
    let card = this.props.cards.filter(card => card.id === cardId);
    this.props.dispatch(currentCardDetails(card));
    this.props.dispatch(showEditCardModal());
  }

  handleEditHideModal(cardId) {
    // let card = this.props.cards.filter(card => card.id === cardId);
    // this.props.dispatch(currentCardDetails(card));
    this.props.dispatch(hideEditCardModal());
  }

  render() {
    let { cards } = this.props;
    if (!cards) {
      return null;
    }
    const id = this.props.match.params.id;
    console.log(cards);
    let currentCard = cards.filter(card => card.id === id);
    console.log(id);
    let cardDetailDisplay;
    if (cards !== null && cards.length !== 0) {
      console.log('entered if block');
      cardDetailDisplay = currentCard.map((currentCard, index) => {
        console.log(currentCard);
        return (
          <section className='display-card-details' key={index}>
          <EditCardModal show={this.props.showEditCardModal} handleClose={() => this.handleEditHideModal(currentCard.id)} card={currentCard} />
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
            <Link to={{ pathname: `/dashboard` }}>BACK</Link>
          </section>
        )
      })
    }
    return (
      <div className='display-card-details-container' >
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