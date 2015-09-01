import React, { Component, PropTypes } from 'react';

import Highlight from 'react-highlight';
import StyleSheet from 'react-style';

var styles = StyleSheet.create({
  fragment: {
    margin: '0'
  },
  chunk: {
    marginBottom: '1.5em',
    fontFamily: 'Hack',
    fontSize: '13px',
    lineHeight: '1.4em'
  },
  chunkLast: {
    fontFamily: 'Hack',
    fontSize: '13px',
    lineHeight: '1.4em'
  }
});

export default class Fragment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fragment = this.props.fragment.map((chunk, idx, arr) => {
      if (idx === arr.length - 1) {
        return <div key={idx} style={styles.chunkLast}>{chunk}</div>;
      } else {
        return <div key={idx} style={styles.chunk}>{chunk}</div>;
      }
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
