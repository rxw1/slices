import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import StyleSheet from 'react-style';
var styles = StyleSheet.create({
  main: {
    paddingRight: '300px',
  }
});
import _ from 'lodash';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.findFragment = this.findFragment.bind(this);
    this.handleSampleSlices = this.handleSampleSlices.bind(this);
  }

  handleSampleSlices() {
    this.props.sampleSlices()
  }

  findFragment(q) {
    if (q.target.value) {
      this.props.findFragment(q.target.value);
    } else {
      this.props.clearSearch();
    }
  }

  render() {
    const { selected, sampleSlices, cropSelectedSlice, references } = this.props;
    const sliceIDs = [selected.sliceID, ...references.map(ref => ref.sliceID)];
    return (
      <header className='mdl-layout__header' style={styles.main}>
        <div className='mdl-layout__header-row'>
          <span className='mdl-layout-title'>slice {this.props.value.split('/')[1]}</span>
          <div className='mdl-layout-spacer'></div>
          <nav className='mdl-navigation'>
            <Link to='/slices' className='mdl-navigation__link'>slices</Link>
            <a className='mdl-navigation__link' onClick={this.handleSampleSlices.bind(this)}>sample</a>
            <a className='mdl-navigation__link' onClick={cropSelectedSlice.bind(null, sliceIDs)}>crop</a>
          </nav>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield--align-right">
            <input onChange={this.findFragment} className="mdl-textfield__input" type="text" name="search" />
          </div>

        </div>
      </header>
    );
  }
}

Header.propTypes = {
  sampleSlices: PropTypes.func.isRequired
}
