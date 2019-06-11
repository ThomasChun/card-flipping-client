import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchCards, currentCardDetails, hideModal, showModal, showDeleteCardModal, hideDeleteCardModal, showEditCardModal, hideEditCardModal } from '../actions/cards';
import CardDetailModal from './card-detail-modal';
import DeleteCardModal from './delete-card-modal';
import EditCardModal from './edit-card-modal';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

export class CardsDisplay extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCards());
  }

  handleCardDetails(cardId) {
    let card = this.props.cards.filter(card => card.id === cardId);
    this.props.dispatch(currentCardDetails(card));
    // this.props.dispatch(showModal());
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
              {/* <button className='details-button' onClick={() => this.handleCardDetails(props.original.id)}>Details</button>
              <button onClick={() => this.handleCardEdit(props.original.id)}>Edit</button>
              <button onClick={() => this.handleCardDelete(props.original.id)}>Delete</button> */}
              <Link onClick={() => this.handleCardDetails(props.original.id)} to={{ pathname: `/card-details/${props.original.id}`, state: { id: props.original.id}}}>Edit</Link>
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

    // let cards = this.props.cards;
    // let usersCards = cards.filter(card => card.user === this.props.username); //.filter(card => card.playerName === 'C.J. McCollum')
    // // Note: set users filters in state the use if statements to filter cards based on state.
    // let displayCards = usersCards.map((card, index) => {
    //   return (
    //     <tr key={index} className={index % 2 === 0 ? 'card-display-even' : 'card-display-odd'}>
    //       <td className='data-playerName'>{card.playerName}</td>
    //       <td className='data-details'>{card.cardDetails}</td>
    //       <td className='card-attribute-icons'>
    //         {card.rookie ? <button className='rc' disabled>RC</button> : ''}
    //         {card.refractor ? <button className='ref' disabled>REF</button> : ''}
    //         {card.insert ? <button className='ins' disabled>INS</button> : ''}
    //         {card.serialNumbered ? <button className='ser' disabled>SER</button> : ''}
    //         {card.autograph ? <button className='au' disabled>AU</button> : ''}
    //         {card.memorabilia ? <button className='mem' disabled>MEM</button> : ''}
    //         {card.graded ? <button className='gr' disabled>GR</button> : ''}
    //         {card.shortPrint ? <button className='sp' disabled>SP</button> : ''}
    //         {card.error ? <button className='err' disabled>ERR</button> : ''}
    //       </td>
    //       <td className='data-purchase-price'>${card.purchasePrice}</td>
    //       <td className='data-sale-price'>${card.salePrice}</td>
    //       <td className='data-profit'>$0</td>
    //       <td className='data-spacer'></td>
    //       <td className='data-options'>
    //         <div>
    //           <button id={card.id} className='details-button' onClick={(e) => this.handleCardDetails(e.target.id)}>Details</button>
    //           <button id={card.id} className='edit-button' onClick={(e) => this.handleCardEdit(e.target.id)}>Edit</button>
    //           <button id={card.id} className='delete-button' onClick={(e) => this.handleCardDelete(e.target.id)}>Delete</button>
    //         </div>
    //       </td>
    //     </tr>
    //   )
    // })


    //<EditCardModal show={this.props.showEditCardModal} handleClose={() => this.handleEditHideModal()} card={this.props.currentCard} />
    // <CardDetailModal show={this.props.showModal} handleClose={() => this.hideModal()} card={this.props.currentCard} />
    // <DeleteCardModal show={this.props.showDeleteCardModal} handleClose={() => this.handleDeleteHideModal()} card={this.props.currentCard} />

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

{/* <div className='card-display'>
          <div className='card-display-filter-container'>
            <select>
              <option value=''>- Select Sport -</option>
              <option value='Baseball'>Baseball</option>
              <option value='Basketball'>Basketball</option>
              <option value='Football'>Football</option>
              <option value='Hockey'>Hockey</option>
            </select>
          </div>
          <table id='display-card-table' className='searchable sortable'>
            <thead>
              <tr>
                <th className='thead-player'>Player</th>
                <th className='thead-description'>Card Description</th>
                <th className='thead-attributes'>Card Attributes</th>
                <th className='thead-cost'>Cost</th>
                <th className='thead-sale-price'>Sale Price</th>
                <th className='thead-profit'>Profit / Loss</th>
                <th className='thead-spacer'></th>
                <th className='thead-options'>Options</th>
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
        </div> */}