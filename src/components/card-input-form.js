import React from 'react';
import { Field, reduxForm } from 'redux-form';

export class CardInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: '',
    }
  }

  onSubmit(values) {
    console.log(values);
  }

  handleSportChange(value) {
    this.setState({
      sport: value,
    })
  }

  render() {
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
      <div>
        <h2>Input Card Details</h2>
        <form className='card-input-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <label> Sport: </label>
          <Field
            component='select' name='sport' onChange={(e) => this.handleSportChange(e.target.value)}>
            <option value=''>- Select Sport -</option>
            <option value='Baseball'>Baseball</option>
            <option value='Basketball'>Basketball</option>
            <option value='Football'>Football</option>
            <option value='Hockey'>Hockey</option>
          </Field>
          <label htmlFor='year'>Year: </label>
          <Field
            component='select' name='year'>
            <option value=''>- Select Year -</option>
            {yearsOptions}
          </Field>
          <label htmlFor='player-name'>Player: </label>
          <Field
            component='input'
            type='text'
            name='player-name'
            placeholder=''
          />
          <label htmlFor='card-details'>Card Details: </label>
          <Field
            component='input'
            type='text'
            name='card-details'
            placeholder='ex: 2019 Topps #1'
          />
          <label> Rookie Card: </label>
          <Field
            component='input'
            name='rookie'
            id='rookie'
            type='checkbox'
          />
          <label> Serial Numbered: </label>
          <Field
            component='input'
            name='serial-numbered'
            id='serial-numbered'
            type='checkbox'
          />
          <label> Autograph: </label>
          <Field
            component='input'
            name='autograph'
            id='autograph'
            type='checkbox'
          />
          <label> Memorabilia: </label>
          <Field
            component='input'
            name='memorabilia'
            id='memorabilia'
            type='checkbox'
          />
          <label htmlFor='purchase-price'>Purchase Price: $</label>
          <Field
            component='input'
            type='text'
            name='purchase-price'
            placeholder=''
          />
          <label htmlFor='purchase-date'>Purchase Date:</label>
          <Field
            component='input'
            type='date'
            name='purchase-date'
          />
          <label htmlFor='player-name'>Sale Price: $</label>
          <Field
            component='input'
            type='text'
            name='sale-price'
            placeholder=''
          />
          <label htmlFor='sale-date'>Sale Date:</label>
          <Field
            component='input'
            type='date'
            name='sale-date'
          />
          <div>
            <button
              className='form-submit-button'
              type='submit'
              disabled={this.props.pristine || this.props.submitting}>
              Submit
            </button>
            <button
              className='form-clear-button'
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

export default reduxForm({
  form: 'cardInputForm',
})(CardInputForm);