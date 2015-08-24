import React, { Component, PropTypes } from 'react';
import { Header, Drawer, Content, Footer } from '.';

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, ...other } = this.props;
    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <Header {...other} />
        <Drawer {...other} />
        <Content {...other}>
          {children}
        </Content>
        <Footer {...other} />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any
}
