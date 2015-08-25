import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import StyleSheet from 'react-style';
var styles = StyleSheet.create({
  main: {
    paddingRight: '300px',
  }
});

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleSampleSlices() {
    this.props.sampleSlices()
  }

  render() {
    const { selected, sampleSlices, cropSelectedSlice } = this.props;
    return (
      <header className='mdl-layout__header' style={styles.main}>
        <div className='mdl-layout__header-row'>
          <span className='mdl-layout-title'>slice {this.props.value.split('/')[1]}</span>
          <div className='mdl-layout-spacer'></div>
          <nav className='mdl-navigation'>
            <Link to='/slices' className='mdl-navigation__link'>slices</Link>
            <a className='mdl-navigation__link' onClick={this.handleSampleSlices.bind(this)}>sample</a>
            <a className='mdl-navigation__link' onClick={cropSelectedSlice.bind(null,selected[0])}>crop</a>
            <a className='mdl-navigation__link' onClick={cropSelectedSlice.bind(null,selected[0])}>flag</a>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  sampleSlices: PropTypes.func.isRequired
}
