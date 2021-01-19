import React from 'react';
import InfoBlurb from './InfoBlurb.js';
import './App.css';
import './index.css';

const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz']  // Useful for larger bases

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


    // These booleans decide to selectively visualize only what's needed
    // Info blurbs:

    const binaryShortcutSet = new Set([2, 8, 16]);
    let visualizeInfoBinaryShortcut = (
      (binaryShortcutSet.has(baseTo) && binaryShortcutSet.has(baseFrom))
      || (binaryShortcutSet.has(baseFrom) && binaryShortcutSet.has(baseTo))
    );

    let visualizeInfoNoDecimalBases = (baseTo !== 10 && baseFrom !== 10 
      && !visualizeInfoBinaryShortcut
    );

    // Actual visualizers:
    let visualizeToDecimal = (value !== 'Invalid' 
      && baseFrom !== baseTo 
      && baseFrom !== 10);
    let visualizeFromDecimal = (value !== 'Invalid' 
      && baseFrom !== baseTo
      && baseTo !== 10);

    let noDecimalBlurb;
    let binaryShortcutBlurb;

    if (visualizeInfoNoDecimalBases) {
      noDecimalBlurb = <InfoBlurb 
        message="Note: Converting to decimal is not necessary to change between 
        bases that are not decimal. However, our decimal-oriented education and
        intuition makes it generally easier to convert to decimal. To avoid
        converting to decimal, do all the math in terms of the numerical base 
        you want to end up in!"/>
    }

    if (visualizeInfoBinaryShortcut) {
      binaryShortcutBlurb = <InfoBlurb
        message="Note: Binary (base 2) --> Octal (base 8) or Hexadecimal (base 
        16) or vice versa has a shortcut by grouping the numbers in a particular 
        way. It is not used in this visualization currently."/>
    }

    return (
      <div className="centered" id="visualizer">
        <h2>Conversion visualized:</h2>
        <div id="visualizer-content">
          {noDecimalBlurb}
          {binaryShortcutBlurb}
          {visualizeToDecimal && this.renderToDecimal(value, baseFrom)}
          <br />
          {visualizeFromDecimal && this.renderFromDecimal(value, baseTo)}
        </div>
      </div>
    )
  }
}

export default ConversionVisualizer;