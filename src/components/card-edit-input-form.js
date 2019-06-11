import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CardInput from './card-inputs';
// import { required, nonEmpty, isTrimmed } from '../validators';
import { createCard } from '../actions/cards';
import { connect } from 'react-redux'

export class CardEditInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: '',
    }
  }

  onSubmit(values) {
    this.props.dispatch(createCard(this.props.user, values))
    .then(this.props.reset)
    .then(this.props.handleClose)
  }

  handleSportChange(value) {
    this.setState({
      sport: value,
    })
  }

  render() {
    const showHideClassname = this.props.show ? 'card-input-form-modal display-block' : 'card-input-form-modal display-none';
    let sport = this.state.sport;
    let currentYear = 2019;
    let years = [];
    if (sport === 'Basketball' || sport === 'Hockey') {
      while (currentYear - 1900 > 0) {
        let year = ((currentYear + 1) % 100).toString().length === 2 ? `${currentYear}/${(currentYear + 1) % 100}` : `${currentYear}/0${(currentYear + 1) % 100}`;
        years.push(year);
        currentYear--;
      }
    } else {
      while (currentYear - 1900 > 0) {
        years.push(currentYear);
        currentYear--;
      }
    }

    let yearsOptions = years.map((year, index) => (<option key={index} value={year}>{year}</option>));

    return (
      <div className={showHideClassname}>
        <form className='card-input-form card-input-form-modal-main' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <button className='card-input-form-close-button' type='button' onClick={this.props.handleClose}>X</button>
          <h2>Input Card Details</h2>
          <div className='sport-and-year'>
            <label htmlFor='sport' className='sport-label'></label>
            <Field
              component='select' name='sport' onChange={(e) => this.handleSportChange(e.target.value)}>
              <option value=''>- Select Sport -</option>
              <option value='Baseball'>Baseball</option>
              <option value='Basketball'>Basketball</option>
              <option value='Football'>Football</option>
              <option value='Hockey'>Hockey</option>
            </Field>
            <label htmlFor='year' className='year-label'></label>
            <Field
              component='select' name='year'>
              <option value=''>- Select Year -</option>
              {yearsOptions}
            </Field>
          </div>
          <div className='player-and-details'>
            <Field
              component={CardInput}
              type='text'
              name='playerName'
              label='Player:'
              // validate={[required, nonEmpty, isTrimmed]}
            />
            <Field
              component={CardInput}
              type='text'
              name='cardDetails'
              label='Card Details:'
              // validate={[required, nonEmpty, isTrimmed]}
            />
            <Field
              component={CardInput}
              type='text'
              name='brand'
              label='Brand:'
            />
          </div>
          <div className='purchase-sold-container'>
            <div className='purchase-container'>
              <Field
                component={CardInput}
                type='text'
                name='purchasePrice'
                label='Purchase Price $:'
                // validate={[required, nonEmpty, isTrimmed]}
              />
              <Field
                component={CardInput}
                type='date'
                name='purchaseDate'
                label='Purchase Date:'
              />
              <Field
                component={CardInput}
                type='text'
                name='purchasedFrom'
                label='Purchased From:'
              />
            </div>
            <div className='sold-container'>
              <Field
                component={CardInput}
                type='text'
                name='salePrice'
                label='Sale Price $:'
              />
              <Field
                component={CardInput}
                type='date'
                name='saleDate'
                label='Date Sold:'
              />
              <Field
                component={CardInput}
                type='text'
                name='listedOn'
                label='Listed On:'
              />
            </div>
          </div>
          <div className='card-attributes'>
            <div className='column'>
              <div>
                <Field
                  component='input'
                  name='rookie'
                  id='rookie'
                  type='checkbox'
                />
                <label> Rookie </label>
              </div>
              <div>
                <Field
                  component='input'
                  name='refractor'
                  id='refractor'
                  type='checkbox'
                />
                <label> Refractor </label>
              </div>
              <div>
                <Field
                  component='input'
                  name='insert'
                  id='insert'
                  type='checkbox'
                />
                <label> Insert </label>
              </div>
            </div>
            <div className='column'>
              <div>
                <Field
                  component='input'
                  name='serialNumbered'
                  id='serial-numbered'
                  type='checkbox'
                />
                <label> Serial #'ed </label>
              </div>
              <div>
                <Field
                  component='input'
                  name='autograph'
                  id='autograph'
                  type='checkbox'
                />
                <label> Autograph </label>
              </div>
              <div>
                <Field
                  component='input'
                  name='memorabilia'
                  id='memorabilia'
                  type='checkbox'
                />
                <label> Memorabilia </label>
              </div>
            </div>
            <div className='column'>
              <div>
                <Field
                  component='input'
                  name='graded'
                  id='graded'
                  type='checkbox'
                />
                <label> Graded </label>
              </div>
              <div>
                <Field
                  component='input'
                  name='shortPrint'
                  id='short-print'
                  type='checkbox'
                />
                <label> Short Print </label>
              </div>
              <div>
                <Field
                  component='input'
                  name='error'
                  id='error'
                  type='checkbox'
                />
                <label> Error </label>
              </div>
            </div>
          </div>
          <div className='form-button-container'>
            <button
              className={this.props.pristine || this.props.submitting ? 'form-submit-button-disabled' : 'form-submit-button-enabled'}
              type='submit'
              disabled={this.props.pristine || this.props.submitting}>
              Submit
            </button>
            <button
              className={this.props.pristine || this.props.submitting ? 'form-clear-button-disabled' : 'form-clear-button-enabled'}
              type='button'
              disabled={this.props.pristine || this.props.submitting} onClick={this.props.reset}>
              Clear
            </button>
          </div>
        </form>
      </div>
    )
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
CardEditInputForm = reduxForm({
  form: 'CardEditInputForm'  // a unique identifier for this form
})(CardEditInputForm)

// You have to connect() to any reducers that you wish to connect to yourself
CardEditInputForm = connect(
  state => ({
    initialValues: state.cards.currentCard[0], // pull initial values from account reducer
  }),
  // { load: loadAccount }               // bind account loading action creator
)(CardEditInputForm)

export default CardEditInputForm

// export default reduxForm({
//   form: 'CardEditInputForm',
// })(CardEditInputForm);