import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CardInput from './card-inputs';
import { required, nonEmpty, isTrimmed } from '../validators';

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
        <form className='card-input-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
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
              name='player-name'
              label='Player:'
              validate={[required, nonEmpty, isTrimmed]}
            />
            <Field
              component={CardInput}
              type='text'
              name='card-details'
              label='Card Details:'
              validate={[required, nonEmpty, isTrimmed]}
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
                name='purchase-price'
                label='Purchase Price $:'
                validate={[required, nonEmpty, isTrimmed]}
              />
              <Field
                component={CardInput}
                type='date'
                name='purchase-date'
                label='Purchase Date:'
              />
              <Field
                component={CardInput}
                type='text'
                name='purchased-from'
                label='Purchased From:'
              />
            </div>
            <div className='sold-container'>
              <Field
                component={CardInput}
                type='text'
                name='sale-price'
                label='Sale Price $:'
              />
              <Field
                component={CardInput}
                type='date'
                name='sale-date'
                label='Date Sold:'
              />
              <Field
                component={CardInput}
                type='text'
                name='listed-on'
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
                  name='serial-numbered'
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
                  name='short-print'
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

export default reduxForm({
  form: 'cardInputForm',
})(CardInputForm);