import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchCards, currentCardDetails, hideModal, showDeleteCardModal, hideDeleteCardModal, showEditCardModal, hideEditCardModal, setCurrentCard } from '../actions/cards';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

export class CardsDisplay extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCards());
  }

  handleCardDetails(cardId) {
    let card = this.props.cards.filter(card => card.id === cardId);
    this.props.dispatch(setCurrentCard(this.props.username, card[0]));
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
    const columns = [
      {
        Header: 'Player',
        accessor: 'playerName',
        style: {
          textAlign: 'left'
        },
        maxWidth: 165,
        minWidth: 100,
        sortable: true,
        filterable: true,
      },
      {
        Header: 'Card Description',
        accessor: 'cardDetails',
        style: {
          textAlign: 'left',
        },
        maxWidth: 500,
        minWidth: 200,
        sortable: true,
        filterable: true,
      },
      {
        Header: 'Card price',
        accessor: 'purchasePrice',
        Cell: props => `$${(props.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        style: {
          textAlign: 'right',
        },
        width: 80,
        maxWidth: 80,
        minWidth: 80,
      },
      {
        Header: 'Sale Price',
        accessor: 'salePrice',
        Cell: props => `$${(props.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        style: {
          textAlign: 'right',
        },
        width: 80,
        maxWidth: 80,
        minWidth: 80,
      },
      {
        Header: 'Profit',
        accessor: 'profit',
        Cell: props => props.value > 0 ? `$${(props.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '',
        style: {
          color: 'green',
          // fontWeight: 'bold',
          textAlign: 'right',
        },
        width: 80,
        maxWidth: 80,
        minWidth: 80,
      },
      {
        Header: 'Actions',
        Cell: props => {
          return (
            <div>
              <Link to='/card-details' onClick={() => this.handleCardDetails(props.original.id)}>VIEW</Link>
              <button onClick={() => this.handleCardDelete(props.original.id)}>Delete</button>
            </div>
          )
        },
        width: 200,
        maxWidth: 200,
        minWidth: 200,
      },
    ]

    let cardData = this.props.cards.filter(card => card.user === this.props.username)
    cardData.map(card => card.purchasePrice = Number(card.purchasePrice))
    cardData.map(card => card.salePrice === null || card.salePrice === undefined ? card.salePrice = 0 : card.salePrice = Number(card.salePrice));
    cardData.map(card => card.profit = card.salePrice - card.purchasePrice);

    return (
      <div className='card-display-container'>
        
        <ReactTable
          columns={columns}
          data={cardData}
          defaultPageSize={10}
          className='-striped -highlight'
        >
        </ReactTable>
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