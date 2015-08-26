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
    this.selectSlice = this.selectSlice.bind(this);
  }

  selectSlice(sliceID) {
    this.props.selectSlice(sliceID);
    this.context.router.transitionTo(`/slices/${sliceID}`)
  }

  render() {
    const { sliceID } = this.props;
    return (
      <div style={styles.fragmentCard} className="mdl-card mdl-shadow--4dp" onClick={this.selectSlice.bind(null, sliceID)}>
        <div style={styles.fragment} className="mdl-card__supporting-text mdl-card--expand">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
}

Card.contextTypes = {
  router: PropTypes.object.isRequired
};
