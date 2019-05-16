import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchCards } from '../actions/cards';

export class CardsDisplay extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCards());
  }

  render() {
    console.log(this.props.cards)
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
          <td className='data-options'><div><button className='details-button'>Details</button><button>Edit</button><button>Delete</button></div></td>
        </tr>
      )
    })

    return (
      <div className='card-display-container'>
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
  };
};

export default requiresLogin()(connect(mapStateToProps)(CardsDisplay));