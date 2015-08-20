import React, { Component, PropTypes } from 'react';

import { Header, Drawer, Content, Footer } from '.';

export default class Layout extends Component {
  render() {
    const { children, handleSampleSlices } = this.props;
    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <Header handleSampleSlices={handleSampleSlices} />
        <Drawer />
        <Content>
          {children}
        </Content>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any.isRequired
};
