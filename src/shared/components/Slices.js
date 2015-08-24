import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/types';
import Slice from '../components/Slice';

export default class Slices extends Component {
  render() {
    const { slices } = this.props;
    return (
      <pre>
        {slices.map(slice =>
          (<Slice key={slice.sliceID} {...slice} />))}
      </pre>
    );
  }
}

Slices.contextTypes = {
  router: PropTypes.object.isRequired
};

Slices.propTypes = {
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
)(Slices);
