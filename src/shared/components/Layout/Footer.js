import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <div className="mdl-logo">Slices of Stuff</div>
          <ul className="mdl-mini-footer__link-list">
            <li><a href="#">Hilfe</a></li>
          </ul>
        </div>
      </footer>
    );
  }
}
