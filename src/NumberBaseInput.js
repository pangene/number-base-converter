import React from 'react';
import './App.css';
import './index.css';

function validateParseIntInput(str, base) {
  if (str === '') {
    return false
  }
  str = str.toLowerCase();
  let arr = Array.from(str);
  arr.sort((a, b) => a > b ? a : b)
  return arr.every(input => isFinite(parseInt(input, base)))
}

class NumberBaseInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleBaseChange = this.handleBaseChange.bind(this);
  }

  handleValueChange(e, base=this.props.base) {  // validates value here b/c needs e.target.value
    let value;
    if (validateParseIntInput(e.target.value, base)) {
      value = parseInt(e.target.value, base);
    } else {
      value = 'Invalid';
    }
    this.props.onValueChange(value);
  }

  handleBaseChange(e) {
    let base = e.target.value;
    // TODO: Make changing bases better
    if (e.target.value < 2 || e.target.value > 36) {
      base = 36;
      this.props.validateBases(false);
    } else {
      this.props.validateBases(true);
    }
    this.props.onBaseChange(+base);

    if (!this.props.readOnly) { // Update internal value so the input value can stay the same
      this.props.onValueChange(
        parseInt(this.props.value.toString(this.props.base), base)
        )
    }
  }

  render() {
    const base = this.props.base;

    let value;
    if (this.props.validBases) {
      value = this.props.value.toString(base);
    } else {
      value = 'Invalid'
    }

    let readOnly = '';
    if (this.props.readOnly) {
      readOnly = 'readOnly';
    }

    return (
      <div className="number-base">
        <div className="number">
          <label>(number)</label>
          <input type="text" 
            readOnly={readOnly} 
            defaultValue={value}  // So program leaves user input alone
            value = {this.props.readOnly ? value : null}
            onChange={this.handleValueChange}/>
        </div>
        <div className="base">
          <input type="text"
            defaultValue={base}
            onChange={this.handleBaseChange}/>
          <label>(base)</label>
        </div>
      </div>
    )
  }
}

export default NumberBaseInput;