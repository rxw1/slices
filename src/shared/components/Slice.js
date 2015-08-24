import React, { Component, PropTypes } from 'react';
import StyleSheet from 'react-style';
// import Highlight from 'react-highlight';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/slices';
import { Link } from 'react-router';
import _ from 'lodash';

var styles = StyleSheet.create({
  li: {
    listStyleType: 'none'
  },
  ul: {
    paddingLeft: 0
  },
  slice: {
    margin: '12px'
  },
  fragment: {
    margin: '24px !important'
  }
});

export default class Slice extends Component {
  constructor(props) {
    super(props);
    this.selectSlice = this.selectSlice.bind(this);
  }

  selectSlice(sliceID) {
    console.log(sliceID);
    this.props.selectSlice(sliceID);
  }

  render() {
    const { id, sliceID } = this.props;

    const fragments = this.props.fragment.map((fragment, idx) => {
      return <span key={idx}>{fragment}</span>;
    });

    const instances = this.props.instances.map((instance, idx) => {
      return <li key={idx} style={styles.li}>{instance}</li>;
    });

    const language = this.props.language.map((lang, idx) => {
      return <li key={idx} style={styles.li}>{lang}</li>;
    });

    const uses = _.chain(this.props.uses)
    .map(use => {
      let identifier;

      // TODO
      if (use.usedName.hasOwnProperty('valueName')) {
        identifier = use.usedName.valueName.identifier;
      } else if (use.usedName.hasOwnProperty('typeName')) {
        identifier = use.usedName.typeName.identifier;
      } else {
        identifier = JSON.stringify(use.usedName);
        // identifier = `${use.usedName.constructorTypeName.identifier}/${use.usedName.constructorName.identifier}`;
      }

      if (use.reference.hasOwnProperty('otherSlice')) {
        return (<li key={use.reference} style={styles.li}>
          <Link to={`/slices/${use.reference.otherSlice}`}>{identifier}</Link>
        </li>);
      } else {
        return (<li key={use.reference} style={styles.li}>
          {identifier}
        </li>);
      }

    })
    .sortBy('key')
    .uniq('key')
    .value();

    return (
      <div style={styles.slice}>

        <h4 onClick={this.selectSlice.bind(null, sliceID)}>
          {sliceID}
        </h4>

        <div style={styles.fragment}>
            {fragments}
        </div>

        <div className='mdl-grid'>
          <div className='mdl-cell mdl-cell--4-col'>
            <h5>Instances</h5>
            <ul style={styles.ul}>
              {instances}
            </ul>
          </div>

          <div className='mdl-cell mdl-cell--4-col'>
            <h5>Languages</h5>
            <ul style={styles.ul}>
              {language}
            </ul>
          </div>

          <div className='mdl-cell mdl-cell--4-col'>
            <h5>Uses</h5>
            <ul style={styles.ul}>
              {uses}
            </ul>
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

Slice.propTypes = {
  sliceID: PropTypes.number.isRequired,
  instances: PropTypes.array.isRequired,
  uses: PropTypes.array.isRequired,
  fragment: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    ...state.slice
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slice);
