import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/slices';
import Slice from '../components/Slice';
import Card from '../components/Layout/Card';
import Fragment from '../components/Fragment';

export default class Slices extends Component {
  render() {
    const { slices } = this.props;
    return (
      <pre>
        {slices.map((slice, idx) => (
          <Card key={slice.sliceID} header={slice.sliceID} selectSlice={this.props.selectSlice} sliceID={slice.sliceID}>
            <Fragment fragment={slice.fragment} />
          </Card>
        ))}
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
