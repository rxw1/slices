import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/slices';

import Card from '../components/Layout/Card';
import Fragment from '../components/Fragment';

export default class Slices extends Component {
  render() {
    const { ...other } = this.props;

    // searched || all
    const displayedSlices = () => {
      const slices = this.props.searched.length ? this.props.searched : this.props.slices || [];
      return slices.map(slice => {
        return (
          <Card key={slice.sliceID} selectSlice={this.props.select} sliceID={slice.sliceID} liked={slice.liked} {...other}>
            <Fragment fragment={slice.fragment} />
          </Card>
        );
      })
    }

    return (
      <div>
        <pre>{displayedSlices()}</pre>
      </div>
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
    slices: state.slices,
    searched: state.searched
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slices);
