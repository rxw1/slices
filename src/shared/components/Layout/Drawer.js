import React, { PropTypes } from 'react';

export default class Drawer {
  render() {
    const languages = this.props.languages.map((language, idx) => {
      return (
        <a key={idx} className='mdl-navigation__link'>{language}</a>
      );
    })

    return (
      <div className='mdl-layout__drawer'>
        <span className='mdl-layout-title'>Title</span>
        <nav className='mdl-navigation'>
          <a className='mdl-navigation__link'>Link</a>
          <a className='mdl-navigation__link'>Link</a>
          <a className='mdl-navigation__link'>Link</a>
          <a className='mdl-navigation__link'>Link</a>
        </nav>
        <span className='mdl-layout-title'><small>Languages</small></span>
        <nav className='mdl-navigation'>{languages}</nav>
      </div>
    );
  }
}

Drawer.propTypes = {
  children: PropTypes.any
  languages: PropTypes.array.isRequired
}
