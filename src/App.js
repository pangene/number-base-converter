import React from 'react';
import NumberBaseInput from './NumberBaseInput.js';
import ConversionVisualizer from './ConversionVisualizer.js';
import './App.css';
import './index.css';


const DEFAULT_VALUE = 22;
const DEFAULT_BASE_FROM = 2;
const DEFAULT_BASE_TO = 12;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: DEFAULT_VALUE,  // value always stored as decimal
      baseFrom: DEFAULT_BASE_FROM,
      baseTo: DEFAULT_BASE_TO,
      validBases: true  // Hacky way of making bases work
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.onBaseFromChange = this.onBaseFromChange.bind(this);
    this.onBaseToChange = this.onBaseToChange.bind(this);
    this.validateBases = this.validateBases.bind(this);
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

  validateBases(bool) {
    this.setState({validBases: bool})
  }

  render() {
    return (
      <div>
        <div className="centered" id="base-converter">
          <NumberBaseInput 
            value={this.state.value}
            base={this.state.baseFrom}
            validBases={this.state.validBases}
            onValueChange={this.onValueChange}
            onBaseChange={this.onBaseFromChange}
            validateBases={this.validateBases}/> 
          <i className="arrow fa fa-long-arrow-right"></i> 
          <NumberBaseInput 
            value={this.state.value}
            base={this.state.baseTo}
            validBases={this.state.validBases}
            onBaseChange={this.onBaseToChange}
            validateBases={this.validateBases}
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






export default App;