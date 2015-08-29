import React, { Component, PropTypes } from 'react';

import Highlight from 'react-highlight';
import StyleSheet from 'react-style';

var styles = StyleSheet.create({
  fragment: {
    margin: '0'
  }
});

export default class Fragment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fragment = this.props.fragment.map((chunk, idx) => {
      return <span key={idx}>{chunk}</span>;
    });

    return (
      <Highlight style={styles.fragment} className='haskell'>{fragment}</Highlight>
    );
  }
}

Fragment.propTypes = {
  fragment: PropTypes.array.isRequired
};

Fragment.contextTypes = {
  router: PropTypes.object.isRequired
};
