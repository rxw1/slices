import React, { Component, PropTypes } from 'react';
import StyleSheet from 'react-style';
import { Link } from 'react-router';

import Highlight from 'react-highlight';
// import 'css!highlight.js/styles/default.css';
// import './main.css';
// import './main.css';
// require("style!raw!highlight.js/styles/default.css");

var styles = StyleSheet.create({
  li: {
    listStyleType: 'none'
  },
  ul: {
    paddingLeft: 0
  },
  slice: {
    margin: '12px'
  },
  fragment: {
    margin: '24px !important'
  }
});

export default class Fragment extends Component {
  constructor(props) {
    super(props);
    this.selectFragment = this.selectFragment.bind(this);
  }

  selectFragment(sliceID) {
    this.props.selectFragment(sliceID);
  }

  render() {
    const fragment = this.props.fragment.map((chunk, idx) => {
      return <span key={idx}>{chunk}</span>;
    });

    return (
      <Highlight style={styles.fragment}>
        {fragment}
      </Highlight>
    );
  }
}

Fragment.propTypes = {
  fragment: PropTypes.array.isRequired
};
