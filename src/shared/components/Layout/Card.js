import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import StyleSheet from 'react-style';

var styles = StyleSheet.create({
  fragmentCard: {
    width: '100%',
    margin: '8px 0',
    minHeight: '0px',
    border: '2px solid #aaa'
  },
  fragment: {
    margin: '12px'
  }
});

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sliceID, selectSlice } = this.props;
    return (
      <div style={styles.fragmentCard} className="mdl-card mdl-shadow--4dp">
        <div style={styles.fragment} className="mdl-card__supporting-text mdl-card--expand">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  selectSlice: PropTypes.func.isRequired
}

Card.contextTypes = {
  router: PropTypes.object.isRequired
};
