import React, { Component, PropTypes } from 'react';
import StyleSheet from 'react-style';
import { connectReduxForm } from 'redux-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/posts';

var styles = StyleSheet.create({
  textarea: {
    width: '100%',
    // height: '200px',
    fontSize: '1.1em',
    padding: '12px',
    // margin: '12px',
    border: 'none',
    outline: 'none',
    fontFamily: 'Hack',
    resize: 'none',
  },
  submitButton: {
    fontFamily: 'Hack',
    float: 'right'
  },
  inputBox: {
    position: 'relative',
    padding: '12px'
  }
});

export default class Input extends Component {
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
        <div style={styles.inputBox} className="mdl-cell mdl-cell--12-col">
          <form onSubmit={this.onSubmit}>
            <textarea style={styles.textarea} value={this.state.text} onChange={this.handleChange} /><br />
            <button style={styles.submitButton} className="mdl-button mdl-js-button mdl-js-ripple-effect">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

Input.contextTypes = {
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
)(Input);
