import React from 'react';
import './App.css';
import './index.css';


const DEFAULT_VALUE = 22;
const DEFAULT_BASE_FROM = 2;
const DEFAULT_BASE_TO = 12;
const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz']  // Useful for larger bases


function validateParseIntInput(str, base) {
  if (str === '') {
    return false
  }
  str = str.toLowerCase();
  let arr = Array.from(str);
  arr.sort((a, b) => a > b ? a : b)
  return arr.every(input => isFinite(parseInt(input, base)))
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: DEFAULT_VALUE,  // value always stored as decimal
      baseFrom: DEFAULT_BASE_FROM,
      baseTo: DEFAULT_BASE_TO
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.onBaseFromChange = this.onBaseFromChange.bind(this);
    this.onBaseToChange = this.onBaseToChange.bind(this);
  }

  onValueChange(value) {
    this.setState({value});
  }

  onBaseFromChange(baseFrom) {
    this.setState({baseFrom});
  }

  onBaseToChange(baseTo) {
    this.setState({baseTo});
  }

  render() {
    return (
      <div>
        <div id="base-converter">
          <NumberBaseInput 
            value={this.state.value}
            base={this.state.baseFrom}
            onValueChange={this.onValueChange}
            onBaseChange={this.onBaseFromChange}/> 
          <i className="arrow fa fa-long-arrow-right"></i> 
          <NumberBaseInput 
            value={this.state.value}
            base={this.state.baseTo}
            onBaseChange={this.onBaseToChange}
            readOnly={true}/>
        </div>
        <hr />
        <ConversionVisualizer 
          value={this.state.value}
          baseFrom={this.state.baseFrom}
          baseTo={this.state.baseTo}/>
      </div>
    )
  }
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
    if (e.target.value < 2) base = 2;
    if (e.target.value > 36) base = 36;
    this.props.onBaseChange(base);

    if (!this.props.readOnly) { // Update internal value so the input value can stay the same
      this.props.onValueChange(
        parseInt(this.props.value.toString(this.props.base), base)
        )
    }
  }

  render() {
    const base = this.props.base;
    const value = this.props.value.toString(base);

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
            value={base}
            onChange={this.handleBaseChange}/>
          <label>(base)</label>
        </div>
      </div>
    )
  }
}

class ConversionVisualizer extends React.Component {
  renderToDecimal(value, baseFrom) {  // This could be another component?
    const startingValue = value.toString(baseFrom);
    const startingValueDigits = Array.from(String(startingValue));

    const digitTimesDecimalElements = startingValueDigits.map((item, index) => {
        let basePower = startingValueDigits.length - 1 - index;
        let plusDiv;
        if (basePower !== 0) {
          plusDiv = <div className="centered plus"> + </div>
        }
        return (  // This could be another component?
          <div>
            <span className="centered equation">
              <span className="expression">
                {item} * {baseFrom}<sup>{basePower}</sup>
              </span> 
              <span className="answer">
                = {item * baseFrom**basePower}
              </span>
            </span>
            {plusDiv}
          </div>
        )
      }
    )

    return (
      <div>
        <p className="starting-value">
          {startingValue}<sub>{baseFrom}</sub> =
        </p>
        {digitTimesDecimalElements}
        <p className="ending-value">
          = {value}<sub>10</sub>
        </p>
      </div>
    )
  }

  renderFromDecimal(value, baseTo) {
    let startingValue = value;
    let equationElements = [];

    while (value) {
      const quotient = Math.trunc(value / baseTo);
      let remainder = value % baseTo;
      let digitIndicator;

      if (remainder > 9) {
        let remainder_symbol = ALPHABET[remainder - 10];
        remainder = remainder_symbol + ` (${remainder})`
      }

      if (startingValue === value) {
        digitIndicator = (
          <span> 
            <small>
              <i className="fa fa-long-arrow-left"></i> Rightmost digit 
            </small>
          </span>
        )
      } else if (quotient === 0) {
        digitIndicator = (
          <span> 
            <small>
              <i className="fa fa-long-arrow-left"></i> Leftmost digit 
            </small>
          </span>
        )
      }


      equationElements.push(
        <div>
          <span className="centered equation">
            <span className="expression">
              {value} / {baseTo} = {quotient} 
            </span>
            <span className="remainder">
              Remainder: {remainder} {digitIndicator}
            </span>
          </span>
        </div>
      )

      value = quotient;
    }

    return (
      <div>
        <p className="starting-value">
          {startingValue}<sub>10</sub> =
        </p>
        {equationElements}
        <p className="ending-value">
          = {startingValue.toString(baseTo)}<sub>{baseTo}</sub>
        </p>
      </div>
    )
  }

  render() {
    const value = this.props.value;
    const baseFrom = this.props.baseFrom;
    const baseTo = this.props.baseTo;

    const visualizeToDecimal = (value !== 'Invalid' 
      && baseFrom !== baseTo 
      && baseFrom !== 10);
    const visualizeFromDecimal = (value !== 'Invalid' 
      && baseFrom !== baseTo
      && baseTo !== 10);

    return (
      <div className="centered" id="visualizer">
        <h2>Conversion visualized:</h2>
        <div id="visualizer-content">
          {visualizeToDecimal && this.renderToDecimal(value, baseFrom)}
          <br />
          {visualizeFromDecimal && this.renderFromDecimal(value, baseTo)}
        </div>
      </div>
    )
  }
}


export default App;