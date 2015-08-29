import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/slices';
import Slice from '../components/Slice';
import Fragment from '../components/Fragment';
import Card from '../components/Layout/Card';

export default class SliceView extends Component {
  render() {
    const { selectedSlice, referencedSlices } = this.props;

    // FIXME should we store _only_ references in store/references, or
    // references _and_ the currently selected slice? "references" is a
    // relative term, as it's referring to the referenced slices _of_ a
    // certain (the selected) slice. maybe references should be named
    // otherSlices.

    const fragments = referencedSlices.map((slice, idx) => {
      return (
        <Card key={idx} selectSlice={this.props.selectSlice} sliceID={slice.sliceID}>
          <Fragment key={idx} fragment={slice.fragment} />
        </Card>
      );
    })

    return (
      <div>
        <Card key={selectedSlice.sliceID} selectSlice={this.props.selectSlice} sliceID={selectedSlice.sliceID}>
          <Fragment key={selectedSlice.sliceID} fragment={selectedSlice.fragment} />
        </Card>
        {fragments}
      </div>
    );
  }
}

SliceView.contextTypes = {
  router: PropTypes.object.isRequired
};

SliceView.propTypes = {
  selectedSlice: PropTypes.object.isRequired,
  referencedSlices: PropTypes.array.isRequired
};

function mapStateToProps(state) {

   // TODO make multiple selected slices possible and pass an array instead of
   // an object... @phischu

  const selectedSliceID = state.selected[0];
  const selectedSlice = state.slices.find(slice => slice.sliceID === selectedSliceID);
  const referencedSlices = state.references.map(referencedSliceID =>
    state.slices.find(slice => slice.sliceID === referencedSliceID))

  return {
    selectedSlice,
    referencedSlices
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SliceView);
