import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/slices';
import Slice from '../components/Slice';
import Fragment from '../components/Fragment';
import _ from 'lodash';

export default class SliceView extends Component {
  render() {
    const { selectedSlice, referencedSlices } = this.props;
    const fragments = [...selectedSlice, ...referencedSlices].map(slice => {
      return (
        <Fragment key={slice.sliceID} fragment={slice.fragment} />
      );
    });
    return <div>{fragments}</div>;
  }
}

SliceView.contextTypes = {
  router: PropTypes.object.isRequired
};

SliceView.propTypes = {
  selectedSlice: PropTypes.array.isRequired,
  referencedSlices: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    selectedSlice: state.selected.map(selectedSliceID => _.filter(state.slices, {sliceID: selectedSliceID})[0]),
    referencedSlices: state.references.map(referencedSliceID => _.filter(state.slices, {sliceID: referencedSliceID})[0])
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SliceView);
