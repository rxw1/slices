import React, { Component, PropTypes } from 'react';
import StyleSheet from 'react-style';
var styles = StyleSheet.create({
  main: {
    marginTop: '12px',
    marginRight: '324px',
    marginLeft: '24px',
  }
});

export default class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className='mdl-layout__content' style={styles.main}>
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
