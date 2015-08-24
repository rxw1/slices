import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/types';
import Slice from '../components/Slice';

export default class SlicesIndex extends Component {
  render() {
    const { slices } = this.props;
    return (
      <pre>
        {slices.map((slice, idx) => {
          return <Slice key={idx} {...slice} />;
        })}
      </pre>
    );
  }
}

SlicesIndex.contextTypes = {
  router: PropTypes.object.isRequired
};

SlicesIndex.propTypes = {
  slices: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    slices: state.slices
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlicesIndex);
