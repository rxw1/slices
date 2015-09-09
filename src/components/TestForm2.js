import React, { Component, PropTypes } from 'react';
import StyleSheet from 'react-style';
import { connectReduxForm } from 'redux-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/posts';

import Input from './Input';

import { Spring } from 'react-motion';
import { range } from 'lodash';

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const springConfig = [300, 50];
const itemsCount = 4;

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

export default class TestForm2 extends Component {
  constructor(props) {
    super(props);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.state = {
      delta: undefined,
      mouse: undefined,
      isPressed: false,
      lastPressed: undefined,
      order: []
    }
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  handleMouseDown(pos, pressY, {pageY}) {
    this.setState({
      delta: pageY - pressY,
      mouse: pressY,
      isPressed: true,
      lastPressed: pos,
    });
  }

  handleMouseMove({pageY}) {
    const {isPressed, delta, order, lastPressed} = this.state;
    if (isPressed) {
      const mouse = pageY - delta;
      const row = clamp(Math.round(mouse / 100), 0, itemsCount - 1);
      const newOrder = reinsert(order, order.indexOf(lastPressed), row);
      this.setState({mouse: mouse, order: newOrder});
    }
  }

  handleMouseUp() {
    this.setState({isPressed: false, delta: 0});
  }

  render() {
    const { mouse, isPressed, lastPressed, order } = this.state;
    const { posts } = this.props;

    const endValue = posts.map(post => {
      if (lastPressed === post && isPressed) {
        return {
          scale: {val: 1.1, config: springConfig},
          shadow: {val: 16, config: springConfig},
          y: {val: mouse, config: []},
          ...post
        };
      }
      return {
        scale: {val: 1, config: springConfig},
        shadow: {val: 1, config: springConfig},
        y: {val: posts.indexOf(post) * 100, config: springConfig},
        ...post
      };
    });

    return (
      <div className="mdl-grid">
        <Spring endValue={endValue}>
          {items =>
            <div style={styles.postBox} className="mdl-cell mdl-cell--12-col">
              {items.map(post => {
                return (
                  <div
                    key={post.id}
                    className="demo8-item"
                    onMouseDown={this.handleMouseDown.bind(null, post.id, post.y.val)}
                    onTouchStart={this.handleTouchStart.bind(null, post.id, post.y.val)}
                    style={{
                      boxShadow: `rgba(0, 0, 0, 0.2) 0px ${post.shadow.val}px ${2 * post.shadow.val}px 0px`,
                      transform: `translate3d(0, ${post.y.val}px, 0) scale(${post.scale.val})`,
                      WebkitTransform: `translate3d(0, ${post.y.val}px, 0) scale(${post.scale.val})`,
                      zIndex: post.id === lastPressed ? 99 : post.id
                    }}>
                    {post.data}
                  </div>
                );
              })}
            </div>
          }
        </Spring>
        <Input />
      </div>
    );
  }
}

TestForm2.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

TestForm2.contextTypes = {
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
)(TestForm2);
