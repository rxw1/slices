import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let slicesCount;
    if (this.props.hasOwnProperty('slices')) {
      slicesCount = this.props.slices.length;
    } else {
      slicesCount = 0;
    }
    return (
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <ul className="mdl-mini-footer__link-list">
            <li>{slicesCount} slices</li>
            <li><Link to='#'>download</Link></li>
            <li><Link to='http://www.github.com/rwilhelm/slices'>github</Link></li>
          </ul>
        </div>
      </footer>
    );
  }
}
