import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/slices';
import Slice from '../components/Slice';
import Card from '../components/Layout/Card';
import Fragment from '../components/Fragment';

export default class Slices extends Component {
  render() {
    const { slices, searched } = this.props;

    const searchResults = searched.map(result => {
      return (
        <Card key={result._id} header={result._score} selectSlice={this.props.selectSlice} sliceID={result._source.sliceID}>
          <Fragment fragment={result._source.fragment} />
        </Card>
      );
    })

    return (
      <div>
        <pre>{searchResults}</pre>
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
