import React from 'react';

export default class CardDetailModal extends React.Component {
  render() {
    const showHideClassname = this.props.show ? 'modal display-block' : 'modal display-none';
    let { card } = this.props;
    console.log(card);

    if (card === null) {
      return '';
    } else {
      card = card[0];
      return (
        <div className={showHideClassname}>
          <section className='modal-main card-attribute-icons'>
            <div><b>{card.playerName} {card.cardDetails}</b></div>
            <div><b>Sport: </b>{card.sport}</div>
            <div><b>Year: </b>{card.year}</div>
            <div><b>Brand: </b>{card.brand}</div>
            <div><b>Listed On:</b>{card.listedOn}</div>
            <div><b>purchase Date: </b>{card.purchaseDate}</div>
            <div><b>Purchase Price: </b>${card.purchasePrice}</div>
            <div><b>Purchase From: </b>{card.purchasedFrom}</div>
            <div><b>Date Sold: </b>{card.saleDate}</div>
            <div><b>Sale Price: </b>{card.salePrice}</div>
            <div><b>Profit: </b></div>
            <div>
              <div><b>Card Attributes:</b></div>
              {card.rookie ? <button className='rc' disabled>RC</button> : ''}
              {card.refractor ? <button className='ref' disabled>REF</button> : ''}
              {card.insert ? <button className='ins' disabled>INS</button> : ''}
              {card.serialNumbered ? <button className='ser' disabled>SER</button> : ''}
              {card.autograph ? <button className='au' disabled>AU</button> : ''}
              {card.memorabilia ? <button className='mem' disabled>MEM</button> : ''}
              {card.graded ? <button className='gr' disabled>GR</button> : ''}
              {card.shortPrint ? <button className='sp' disabled>SP</button> : ''}
              {card.error ? <button className='err' disabled>ERR</button> : ''}
            </div>
            <button onClick={this.props.handleClose}>close</button>
          </section>
        </div>
      );
    }
  }
}