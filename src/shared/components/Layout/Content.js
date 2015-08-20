import React, { Component, PropTypes } from 'react';
import StyleSheet from 'react-style';

var styles = StyleSheet.create({
  width: '82%',
  margin: '48px auto'
});

export default class Content extends Component{
  render() {
    const { children } = this.props;
    return (
      <main style={styles} className='mdl-layout__content'>
        <div className='page-content'>
          {children}
        </div>
      </main>
    );
  }
}

Content.propTypes = {
  children: PropTypes.any
}
