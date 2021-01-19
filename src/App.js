import React from 'react';
import './App.css';
import './index.css';

const DEFAULT_VALUE = 22;
const DEFAULT_BASE_FROM = 2;
const DEFAULT_BASE_TO = 10;

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
        <NumberBaseInput 
          value={this.state.value}
          base={this.state.baseFrom}
          onValueChange={this.onValueChange}
          onBaseChange={this.onBaseFromChange}/> 
        <i className="to fa fa-long-arrow-right"></i> 
        <NumberBaseInput 
          value={this.state.value}
          base={this.state.baseTo}
          onBaseChange={this.onBaseToChange}
          readOnly={true}/>
        <hr />
        <ConversionVisualizer />
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

    let value = this.props.value.toString(base);

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
  renderToDecimal() {

  }

  renderFromDecimal() {

  }

  render() {
    return (
      <div className="centered" id="visualizer">
        <h2> Conversion visualized:</h2>
        COMING SOON
      </div>
    )
  }
}

export default App;