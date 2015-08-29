import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import StyleSheet from 'react-style';
var styles = StyleSheet.create({
  main: {
    paddingRight: '300px',
  }
});

import find from 'lodash/collection/find';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.findFragment = this.findFragment.bind(this);
    this.handleSampleSlices = this.handleSampleSlices.bind(this);
    this.getName = this.getName.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
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

  getName() {
    if (!this.props.slices.length) return 'no slices, sorry.';
    const selectedSliceID = this.props.selected[0];
    const selectedSlice = find(this.props.slices, { sliceID: selectedSliceID });
    return selectedSlice ? selectedSlice.fragment[0].split(' ')[0] : 'whoops';
  }

  toggleLike() {

  }

  render() {
    const { selected, sampleSlices, cropSelectedSlice, references, toggleLike, fetchSlicesWithInstances } = this.props;

    // FIXME for now just get the first sliceID of the selection props array.
    // instead it should be possible to select multiple slices. for that we
    // should fetch multiple names in the header and display the selected
    // slice(s) in a more prominent way.

    return (
      <header className='mdl-layout__header' style={styles.main}>
        <div className='mdl-layout__header-row'>
          <span className='mdl-layout-title'>{this.getName()}</span>
          <div className='mdl-layout-spacer'></div>
          <nav className='mdl-navigation'>
            <Link to='/slices' className='mdl-navigation__link'>slices</Link>
            <a className='mdl-navigation__link' onClick={this.handleSampleSlices}>sample</a>
            <a className='mdl-navigation__link' onClick={cropSelectedSlice}>clear</a>
            <a className='mdl-navigation__link' onClick={this.toggleLike(this.props.selected[0])}>like</a>
            <a className='mdl-navigation__link' onClick={fetchSlicesWithInstances}>w/instances</a>
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
