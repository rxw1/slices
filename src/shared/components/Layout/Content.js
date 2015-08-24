import React, { Component, PropTypes } from 'react';

export default class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className='mdl-layout__content'>
        <div className='page-content'>
          {this.props.children}
        </div>
      </main>
    );
  }
}

Content.propTypes = {
  children: PropTypes.any
}
