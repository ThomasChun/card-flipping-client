import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchCards, currentCardDetails, hideModal, showModal, showDeleteCardModal, hideDeleteCardModal, showEditCardModal, hideEditCardModal } from '../actions/cards';
import CardDetailModal from './card-detail-modal';
import DeleteCardModal from './delete-card-modal';
import EditCardModal from './edit-card-modal';

export class CardsDisplay extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCards());
  }

  handleCardDetails(cardId) {
    let card = this.props.cards.filter(card => card.id === cardId);
    this.props.dispatch(currentCardDetails(card));
    this.props.dispatch(showModal());
  }

  handleCardEdit(cardId) {
    let card = this.props.cards.filter(card => card.id === cardId);
    this.props.dispatch(currentCardDetails(card));
    this.props.dispatch(showEditCardModal());
  }

  handleEditHideModal() {
    this.props.dispatch(hideEditCardModal());
  }

  handleCardDelete(cardId) {
    let card = this.props.cards.filter(card => card.id === cardId);
    this.props.dispatch(currentCardDetails(card));
    this.props.dispatch(showDeleteCardModal());
  }

  handleDeleteHideModal() {
    this.props.dispatch(hideDeleteCardModal());
  }

  hideModal() {
    this.props.dispatch(hideModal());
  }

  render() {
    let cards = this.props.cards;
    let usersCards = cards.filter(card => card.user === this.props.username);
    let displayCards = usersCards.map((card, index) => {
      return (
        <tr key={index} className={index % 2 === 0 ? 'card-display-even' : 'card-display-odd'}>
          <td className='data-playerName'>{card.playerName}</td>
          <td className='data-details'>{card.cardDetails}</td>
          <td className='card-attribute-icons'>
            {card.rookie ? <button className='rc' disabled>RC</button> : ''}
            {card.refractor ? <button className='ref' disabled>REF</button> : ''}
            {card.insert ? <button className='ins' disabled>INS</button> : ''}
            {card.serialNumbered ? <button className='ser' disabled>SER</button> : ''}
            {card.autograph ? <button className='au' disabled>AU</button> : ''}
            {card.memorabilia ? <button className='mem' disabled>MEM</button> : ''}
            {card.graded ? <button className='gr' disabled>GR</button> : ''}
            {card.shortPrint ? <button className='sp' disabled>SP</button> : ''}
            {card.error ? <button className='err' disabled>ERR</button> : ''}
          </td>
          <td className='data-purchase-price'>${card.purchasePrice}</td>
          <td className='data-sale-price'>${card.salePrice}</td>
          <td className='data-profit'>$0</td>
          <td className='data-spacer'></td>
          <td className='data-options'>
            <div>
              <button id={card.id} className='details-button' onClick={(e) => this.handleCardDetails(e.target.id)}>Details</button>
              <button id={card.id} className='edit-button' onClick={(e) => this.handleCardEdit(e.target.id)}>Edit</button>
              <button id={card.id} className='delete-button' onClick={(e) => this.handleCardDelete(e.target.id)}>Delete</button>
            </div>
          </td>
        </tr>
      )
    })

    return (
      <div className='card-display-container'>
        <EditCardModal show={this.props.showEditCardModal} handleClose={() => this.handleEditHideModal()} card={this.props.currentCard} />
        <CardDetailModal show={this.props.showModal} handleClose={() => this.hideModal()} card={this.props.currentCard} />
        <DeleteCardModal show={this.props.showDeleteCardModal} handleClose={() => this.handleDeleteHideModal()} card={this.props.currentCard} />
        <div className='card-display'>
          <table>
            <thead>
              <tr>
                <td className='thead-player'>Player</td>
                <td className='thead-description'>Card Description</td>
                <td className='thead-attributes'>Card Attributes</td>
                <td className='thead-cost'>Cost</td>
                <td className='thead-sale-price'>Sale Price</td>
                <td className='thead-profit'>Profit / Loss</td>
                <td className='thead-spacer'></td>
                <td className='thead-options'>Options</td>
              </tr>
            </thead>
            <tbody>
              {displayCards}
            </tbody>
            <tfoot>
              <tr>
                <td className='tfoot-player'>Player</td>
                <td className='tfoot-description'>Card Description</td>
                <td className='tfoot-attributes'>Card Attributes</td>
                <td className='tfoot-cost'>Cost</td>
                <td className='tfoot-sale-price'>Sale Price</td>
                <td className='tfoot-profit'>Profit / Loss</td>
                <td className='tfoot-spacer'></td>
                <td className='tfoot-options'>Options</td>
              </tr>
            </tfoot>
          </table>
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
    showModal: state.cards.showModal,
    showDeleteCardModal: state.cards.showDeleteCardModal,
    showEditCardModal: state.cards.showEditCardModal,
    currentCard: state.cards.currentCard,
  };
};

export default requiresLogin()(connect(mapStateToProps)(CardsDisplay));