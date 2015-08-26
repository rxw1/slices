import React, { Component, PropTypes } from 'react';
import StyleSheet from 'react-style';
import { Link } from 'react-router';

import Highlight from 'react-highlight';

var styles = StyleSheet.create({
  fragment: {
    margin: '0'
  }
});

export default class Fragment extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillMount() {
  //    this.method = _.debounce(this.findFragment, 2000);
  // }

  render() {
    const { sliceID } = this.props;
    const fragment = this.props.fragment.map((chunk, idx) => {
      return <span key={idx}>{chunk}</span>;
    });

    return (
      <div>
        <Highlight style={styles.fragment} className='haskell'>
          {fragment}
        </Highlight>
      </div>
    );
  }
}

Fragment.propTypes = {
  fragment: PropTypes.array.isRequired,
  selectSlice: PropTypes.func.isRequired
};

Fragment.contextTypes = {
  router: PropTypes.object.isRequired
};
