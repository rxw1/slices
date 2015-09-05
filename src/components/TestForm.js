import React, { Component, PropTypes } from 'react';
import StyleSheet from 'react-style';
import { connectReduxForm } from 'redux-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/posts';

var styles = StyleSheet.create({
});

export default class TestForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    event.preventDefault();
    this.props.sendFormData(data);
  }

  render() {
    const { fields: {name, address}, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <label>Input me</label>
        <textarea value="data" {...name}/>
        <button>Submit</button>
      </form>
    );
  }
}

TestForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

TestForm.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(connectReduxForm({
  form: 'test',
  fields: ['name', 'address']
})(TestForm));
