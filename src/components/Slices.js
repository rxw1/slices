import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/slices';

import Card from '../components/Layout/Card';
import Fragment from '../components/Fragment';

import { find, findIndex } from 'lodash';

export default class Slices extends Component {
  render() {
    const { all, searched, selected, ...other } = this.props;

    // searched || selected || all
    const displayedSlices = () => {
      return (searched.length ? searched : selected.length ? selected : all || []).map(slice => {
        const { sliceID, fragment } = slice; // FIXME sliceID undefined when clearing before unselecting
        return (
          <Card key={sliceID} {...slice} {...other} isSelected={!findIndex(selected, {sliceID: sliceID})}>
            <Fragment fragment={fragment} />
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
  all: PropTypes.array.isRequired,
  searched: PropTypes.array,
  selected: PropTypes.array
};

function mapStateToProps(state) {
  return {
    all: state.slices,
    searched: state.searched,
    selected: state.selected ? [
      ...state.selected.map(sliceID => find(state.slices, {sliceID: sliceID})),
      ...state.references.map(sliceID => find(state.slices, {sliceID: sliceID}))
    ] : undefined
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slices);
