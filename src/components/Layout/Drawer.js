import React, { PropTypes, Component } from 'react';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.go = this.go.bind(this);
  }

  go(target) {
    if (global.hasOwnProperty('window')) {
      this.context.router.transitionTo(target);
    }
  }

  render() {
    const { likedSlices, slicesWithInstances, getAllSlices } = this.props;

    return (
      <div className='mdl-layout__drawer'>
        <span className='mdl-layout-title'>Slices</span>
        <span className='mdl-layout-title'>Navigation</span>
        <nav className='mdl-navigation'>
          <a className='mdl-navigation__link' onClick={this.go.bind(null, '/slices')}>
            Slices
          </a>
        </nav>
        <span className='mdl-layout-title'>Stored Resources</span>
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

Drawer.contextTypes = {
  router: PropTypes.object.isRequired
};

Drawer.propTypes = {
  likedSlices: PropTypes.func.isRequired,
  slicesWithInstances: PropTypes.func.isRequired,
  getAllSlices: PropTypes.func.isRequired
}
