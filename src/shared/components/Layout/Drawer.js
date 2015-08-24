import React, { PropTypes, Component } from 'react';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const languages = this.props.languages.map((language, idx) => {
      return (
        <a key={idx} className='mdl-navigation__link'>{language}</a>
      );
    })

    return (
      <div className='mdl-layout__drawer'>
        <span className='mdl-layout-title'>Slices</span>
        <span className='mdl-layout-title'><small>Languages</small></span>
        <nav className='mdl-navigation'>{languages}</nav>
      </div>
    );
  }
}

Drawer.propTypes = {
  languages: PropTypes.array.isRequired
}
