import React from 'react';
import './App.css';
import './index.css';

class InfoBlurb extends React.Component {
  render() {
    return (
      <div className="rounded-border info">
        <i className="fa fa-info-circle"></i>
        <p>
          {this.props.message}
        </p>
      </div>
    )
  }  
}

export default InfoBlurb;