import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import StyleSheet from 'react-style';
var styles = StyleSheet.create({
  footer: {
    padding: '16px'
  }
});

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
      <footer style={styles.footer} className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <ul className="mdl-mini-footer__link-list">
            <li>{slicesCount} slices</li>
            {/*<li><Link to='#'>upload</Link></li>*/}
            {/*<li><Link to='#'>nfo</Link></li>*/}
            <li><Link to='http://www.github.com/rwilhelm/slices'>github</Link></li>
            <li><Link to='https://github.com/phischu/fragnix'>fragnix</Link></li>
          </ul>
        </div>
      </footer>
    );
  }
}
