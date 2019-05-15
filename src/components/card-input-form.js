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
          <div className='sport-and-year'>
            <div>
            <label> Sport: </label>
            <Field
              component='select' name='sport' onChange={(e) => this.handleSportChange(e.target.value)}>
              <option value=''>- Select Sport -</option>
              <option value='Baseball'>Baseball</option>
              <option value='Basketball'>Basketball</option>
              <option value='Football'>Football</option>
              <option value='Hockey'>Hockey</option>
            </Field>
            </div>
            <div>
            <label htmlFor='year'>Year: </label>
            <Field
              component='select' name='year'>
              <option value=''>- Select Year -</option>
              {yearsOptions}
            </Field>
            </div>
          </div>

          <div className='player-and-details'>
            <div>
            <label htmlFor='player-name'>Player: </label>
            <Field
              component='input'
              type='text'
              name='player-name'
              placeholder=' Mike Trout'
            />
            </div>
            <div>
            <label htmlFor='card-details'>Card: </label>
            <Field
              className='card-details'
              component='input'
              type='text'
              name='card-details'
              placeholder=' 2019 Topps #1'
            />
            </div>
            <div>
            <label htmlFor='purchased-from'>Purchased From: </label>
            <Field
              className='purchased-from'
              component='input'
              type='text'
              name='purchased-from'
              placeholder=' COMC'
            />
            </div>
            <div>
            <label htmlFor='card-details'>Sold On: </label>
            <Field
              className='sold-on'
              component='input'
              type='text'
              name='sold-on'
              placeholder=' eBay'
            />
            </div>
            <div>
            <label htmlFor='manufacturer'>Manufacturer: </label>
            <Field
              className='manufacturer'
              component='input'
              type='text'
              name='manufacturer'
              placeholder=' Topps, Bowman, etc.'
            />
            </div>
          </div>

          <div>
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
          </div>

          <div>
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
          </div>

          <div className='card-attributes'>
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
              name='short-print'
              id='short-print'
              type='checkbox'
            />
            <label> Short Print </label>
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
            <div>
            <Field
              component='input'
              name='serial-numbered'
              id='serial-numbered'
              type='checkbox'
            />
            <label> Serial Numbered </label>
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
            <div>
            <Field
              component='input'
              name='graded'
              id='graded'
              type='checkbox'
            />
            <label> Graded </label>
            </div>
          </div>

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