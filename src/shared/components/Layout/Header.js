import React, { Component, PropTypes } from 'react';

export default class Header extends Component {

  constructor() {
    super();
    this.handleSampleSlices = this.handleSampleSlices.bind(this);
  }

  handleSampleSlices() {
    this.props.sampleSlices();
  }

  render() {
    // const { children } = this.props;
    return (
      <header className='mdl-layout__header'>
        <div className='mdl-layout__header-row'>
          <span className='mdl-layout-title'>Slices</span>
          <div className='mdl-layout-spacer'></div>
          <nav className='mdl-navigation'>
            <a className='mdl-navigation__link' onClick={this.handleSampleSlices}>Andere laden</a>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  // children: PropTypes.any
}

