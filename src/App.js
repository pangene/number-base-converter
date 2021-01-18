import React from 'react';
import './App.css';
import './index.css';

const DEFAULT_VALUE = 22;
const DEFAULT_BASE_FROM = 2;
const DEFAULT_BASE_TO = 10;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: DEFAULT_VALUE,  // value always stored as decimal
      baseFrom: DEFAULT_BASE_FROM,
      baseTo: DEFAULT_BASE_TO
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleBaseFromChange = this.handleBaseFromChange.bind(this);
    this.handleBaseToChange = this.handleBaseToChange.bind(this);
  }

  handleValueChange(value) {
    this.setState({value});
  }

  handleBaseFromChange(baseFrom) {
    this.setState({baseFrom});
  }

  handleBaseToChange(baseTo) {
    this.setState({baseTo});
  }

  render() {
    return (
      <div>
        <NumberBaseInput 
          value={this.state.value}
          base={this.state.baseFrom}
          onValueChange={this.handleValueChange}
          onBaseChange={this.handleBaseFromChange}/> 
        <i className="to fa fa-long-arrow-right"></i> 
        <NumberBaseInput 
          value={this.state.value}
          base={this.state.baseTo}
          onBaseChange={this.handleBaseToChange}
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

  handleValueChange(e) {
    this.props.onValueChange(e.target.value);
  }

  handleBaseChange(e) {
    this.props.onBaseChange(e.target.value);
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
          <input type="text" id="value" readOnly={readOnly} 
            value={value}
            onChange={this.handleValueChange}/>
        </div>
        <div className="base">
          <input type="text" id="base" 
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