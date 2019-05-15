import React from 'react';

export default class CardInputs extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.meta.active && this.props.meta.active) {
      this.input.focus();
    }
  }

  render() {
    let error;
    if (this.props.meta.touched && this.props.meta.error) {
      error = <div className='card-input-form-error'> * {this.props.meta.error}</div>
    }

    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
      warning = (
        <div className='card-input-form-warning'>{this.props.meta.warning}</div>
      );
    }

    return (
      <div className='card-inputs'>
        <label htmlFor={this.props.input.name}>
          {this.props.label}{error}{warning}
        </label>
        <br/>
        <input
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          ref={input => (this.input = input)}
          className={`card-input-form-control ${this.props.input.name}`}
        />
      </div>
    )
  }
}