import React, { PropTypes, Component } from 'react';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { likedSlices, slicesWithInstances, getAllSlices } = this.props;

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
  likedSlices: PropTypes.func.isRequired,
  slicesWithInstances: PropTypes.func.isRequired,
  getAllSlices: PropTypes.func.isRequired
}
