import React, { Component, PropTypes } from 'react';
import StyleSheet from 'react-style';
import { connectReduxForm } from 'redux-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/posts';

import Input from './Input';

var styles = StyleSheet.create({
  postBox: {
  },
  posts: {
    width: '90%',
    fontSize: '1.1em',
    padding: '12px',
    fontFamily: 'Hack',
    margin: '12px 24px',
    border: '1px solid #333',
  }
});

export default class TestForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      text: ''
    }
  }

  onSubmit() {
    event.preventDefault();
    if (this.state.text === '') return;
    this.props.sendFormData(this.state.text);
    this.setState({
      text: ''
    })
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  render() {
    return (
      <div className="mdl-grid">
        <div style={styles.postBox} className="mdl-cell mdl-cell--12-col">
          {this.props.posts.map(post => {
            return <pre style={styles.posts}>{post.data}</pre>;
          })}
        </div>
        <Input />
      </div>
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
)(TestForm);
