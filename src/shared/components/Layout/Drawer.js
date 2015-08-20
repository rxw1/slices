import React, { PropTypes } from 'react';

export default class Drawer {
  render() {
    const { children } = this.props;
    return (
      <div className='mdl-layout__drawer'>
        <span className='mdl-layout-title'>Title</span>
        <nav className='mdl-navigation'>
          <a className='mdl-navigation__link'>Link</a>
          <a className='mdl-navigation__link'>Link</a>
          <a className='mdl-navigation__link'>Link</a>
          <a className='mdl-navigation__link'>Link</a>
        </nav>
      </div>
    );
  }
}

Drawer.propTypes = {
  children: PropTypes.any
}
