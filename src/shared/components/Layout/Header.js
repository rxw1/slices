import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sampleSlices } = this.props;
    const { selected, sampleSlices, cropSelectedSlice } = this.props;
    return (
      <header className='mdl-layout__header'>
        <div className='mdl-layout__header-row'>
          <span className='mdl-layout-title'>{this.props.value}</span>
          <nav className='mdl-navigation'>
            <a className='mdl-navigation__link' onClick={sampleSlices}>sample</a>
            <a className='mdl-navigation__link' onClick={cropSelectedSlice.bind(null,selected[0])}>crop</a>
          </nav>
          <div className='mdl-layout-spacer'></div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  sampleSlices: PropTypes.func.isRequired
}
