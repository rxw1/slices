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
  cardBar: {
    // backgroundColor: 'rgba(165, 165, 165, 0.38)',
    alignItems: 'right',
    boxSizing: 'border-box',
    display: 'flex',
    height: '42px',
    position: 'absolute'
  },
  barIconLove: {
    width: '28px',
    color: 'rgba(170,39,96,0.42)',
  },
  barIconLoveStrong: {
    width: '28px',
    color: 'rgba(170,39,96,1)',
  },
  barIcon: {
    width: '28px',
    color: 'rgba(33,33,33,0.5)',
  }
});

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const heart = this.props.liked ? styles.barIconLoveStrong : styles.barIconLove;
    const { sliceID, select, like, download } = this.props;
    return (
      <div style={styles.fragmentCard} className="mdl-card mdl-shadow--2dp">
        <div style={styles.cardBar} className="mdl-card__actions mdl-card--border">
          <div className='mdl-layout-spacer'></div>
          <i onClick={this.props.like.bind(this, sliceID)} style={heart} className="material-icons">favorite</i>
          <i onClick={download} style={styles.barIcon} className="material-icons">save</i>
          <i onClick={select} style={styles.barIcon} className="material-icons">add</i>
        </div>

        <div className="mdl-card__supporting-text mdl-card--expand">
          {this.props.children}
        </div>

      </div>
    );
  }
}

Card.propTypes = {
  select: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired
}

Card.contextTypes = {
  router: PropTypes.object.isRequired
};

          // <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          //   select
          // </a>
          // <a onClick={like} className="mdl-button mdl-js-button mdl-js-ripple-effect">
          //   like
          // </a>
          // <a onClick={select} className="mdl-button mdl-js-button mdl-js-ripple-effect">
          //   download
          // </a>
