import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import StyleSheet from 'react-style';
import find from 'lodash/collection/find';

var styles = StyleSheet.create({
  main: {
    paddingRight: '270px',
    backgroundColor: '#C7C0B8',
  },
  input: {
    outline: 'none',
    borderBottom: '2px solid #777',
    color: '#333',
    fontFamily: 'Hack',
  },
  inputContainer: {
    width: '136px',
    marginRight: '8px'
  },
  logo: {
    fontWeight: '400',
    fontFamily: 'Hack',
    color: '#333',
  },
  button: {
    fontFamily: 'Hack',
    fontSize: '15px'
  }
});

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.findFragment = this.findFragment.bind(this);
    this.getName = this.getName.bind(this);
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
    return selectedSlice ? selectedSlice.fragment[0].split(' ')[0] : 'no selection';
  }

  render() {
    const { selected, slicesSample, clearSlices } = this.props;
    return (
      <header className='mdl-layout__header' style={styles.main}>
        <div className='mdl-layout__header-row'>
          <span style={styles.logo} className='mdl-layout-title'>{this.getName()}</span>

          <div className='mdl-layout-spacer'></div>

          <div style={styles.inputContainer} className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield--align-right">
            <input style={styles.input} onChange={this.findFragment} className="mdl-textfield__input" type="text" name="search" placeholder="search here..." />
          </div>

          <nav className='mdl-navigation'>
            <button style={styles.button} onClick={slicesSample} className="mdl-button mdl-js-button mdl-js-ripple-effect">
              sample
            </button>

            <button style={styles.button} onClick={clearSlices} className="mdl-button mdl-js-button mdl-js-ripple-effect">
              clear
            </button>
          </nav>

        </div>
      </header>
    );
  }
}

Header.propTypes = {
  slicesSample: PropTypes.func.isRequired,
  clearSlices: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  findFragment: PropTypes.func.isRequired,
}
