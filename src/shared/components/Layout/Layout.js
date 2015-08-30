import React, { Component, PropTypes } from 'react';
import { Header, Drawer, Content, Footer } from '.';
import StyleSheet from 'react-style';

var styles = StyleSheet.create({
  layout: {
    backgroundColor: '#D2CCC6',
    'font': '15px Roboto Mono',
    // 'fontFamily': 'Roboto Mono',
    // 'fontWeight': '400'
  }
});

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, ...other } = this.props;
    return (
      <div style={styles.layout} className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <Header {...other} />
        <Content {...other}>
          {children}
        </Content>
        <Drawer {...other} />
        <Footer {...other} />
      </div>
    );
  }
}

Layout.contextTypes = {
  router: PropTypes.object.isRequired
}

Layout.propTypes = {
  children: PropTypes.any
}
