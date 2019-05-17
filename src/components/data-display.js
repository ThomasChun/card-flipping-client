import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';


export class DataDisplay extends React.Component {

  render() {
    let cards = this.props.cards;
    let invested = cards.length > 0 ? cards.reduce((a, obj) => a + parseFloat(obj.purchasePrice), 0).toFixed(2) : '0';
    let cardsSold = cards.filter(card => parseInt(card.salePrice) > 0);
    let totalSales = cardsSold.length > 0 ? cardsSold.reduce((a, obj) => a + parseFloat(obj.salePrice), 0).toFixed(2) : '0';
    let netProfitLoss = totalSales - invested;
    let percentCardsSold = `${parseFloat(cardsSold.length / cards.length * 100).toFixed(2)}%`;

    // Counts total amount of cards by playerName
    let playerCounts = {};
    for (let i = 0; i < cards.length; i++) {
      let player = cards[i].playerName;
      playerCounts[player] = playerCounts[player] ? playerCounts[player] + 1 : 1;
    }
    // Sorts player counts with most cards at index 0 (top) of array
    let sortedPlayerCounts = (Object.entries(playerCounts).sort((a, b) => b[1] - a[1]));
    let displayPlayerCounts = sortedPlayerCounts.map((player, index) => {
      return (
        <div key={index}>{player[0]}: {player[1]} cards</div> 
      )
    });

    return (
      <div className='data-display-container'>
        <h2>Data Display Component</h2>
        <div className='data-categories-container'>
          <div className='data-block-1'>
            <div>Total Cards: {cards.length}</div>
            <div>Cards Sold: {cardsSold.length}</div>
            <div>Percent Sold: {percentCardsSold}</div>
          </div>
          <div className='data-block-2'>
            <div>Total Invested: ${invested}</div>
            <div>Total Sales: ${totalSales}</div>
            <div>Net Profit (Loss): {netProfitLoss > 0 ? `$${netProfitLoss}` : `( -$${Math.abs(netProfitLoss)} )`}</div>
          </div>
          <div className='data-block-3'>
            <div>Investments by Player: {displayPlayerCounts}</div>
          </div>
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

export default requiresLogin()(connect(mapStateToProps)(DataDisplay));