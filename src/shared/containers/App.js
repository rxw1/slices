import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Slices from '../components/Slices';
import Layout from '../components/Layout/Layout';
import * as actions from '../actions/types';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location, children, slices } = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);

    return (
      <Layout>
        <Slices slices={slices}>
        </Slices>
      </Layout>
    );
  }
}

App.propTypes = {
  slices: PropTypes.array.isRequired
};

App.contextTypes = {
  router: PropTypes.object.isRequired
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
)(App);
