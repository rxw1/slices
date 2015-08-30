import React, { PropTypes, Component } from 'react';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { slicesWithInstances, likedSlices, getAllSlices } = this.props;
    // const languages = this.props.languages.map((language, idx) => {
    //   return (
    //     <a key={idx} className='mdl-navigation__link'>{language}</a>
    //   );
    // })

    return (
      <div className='mdl-layout__drawer'>
        <span className='mdl-layout-title'>Slices</span>

        <nav className='mdl-navigation'>
          <a className='mdl-navigation__link' onClick={likedSlices}>
            Liked Slices
          </a>
          <a className='mdl-navigation__link' onClick={slicesWithInstances}>
            Slices with Instances
          </a>
          <a className='mdl-navigation__link' onClick={getAllSlices}>
            All Slices
          </a>
        </nav>
      </div>
    );
  }
}

Drawer.propTypes = {
  languages: PropTypes.array.isRequired,
  likedSlices: PropTypes.func.isRequired,
  slicesWithInstances: PropTypes.func.isRequired,
}

        // <nav className='mdl-navigation'>{languages}</nav>
        // <span className='mdl-layout-title'><small>Languages</small></span>
