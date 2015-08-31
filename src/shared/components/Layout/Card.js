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
  cardBar1: {
    alignItems: 'right',
    boxSizing: 'border-box',
    display: 'flex',
    height: '42px',
    position: 'absolute'
  },
  cardBar2: {
    alignItems: 'right',
    boxSizing: 'border-box',
    display: 'flex',
    height: '42px',
    position: 'absolute',
    top: '32px',
    borderTop: 'none'
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
    this.selectOrUnselect = this.selectOrUnselect.bind(this);
  }

  selectOrUnselect() {
    let func;
    let icon;
    if (this.props.isSelected) {
      func = this.props.clearSelect;
      icon = 'clear';
    } else {
      func = this.props.select;
      icon = 'add';
    }
    return <i onClick={func.bind(this, sliceID)} style={styles.barIcon} className="material-icons">{icon}</i>;
  }

  render() {
    const heart = this.props.liked ? styles.barIconLoveStrong : styles.barIconLove;
    const { sliceID, select, like, download, upvote, downvote, upvotes, clearSelect, isSelected } = this.props;
    return (
      <div style={styles.fragmentCard} className="mdl-card mdl-shadow--2dp">

        <div style={styles.cardBar1} className="mdl-card__actions mdl-card--border">
          <div className='mdl-layout-spacer'></div>
          <span>{upvotes || ''}</span>
          <i onClick={downvote.bind(this, sliceID)} style={styles.barIcon} className="material-icons">keyboard_arrow_down</i>
          <i onClick={upvote.bind(this, sliceID)} style={styles.barIcon} className="material-icons">keyboard_arrow_up</i>
          {this.selectOrUnselect}
        </div>

        <div style={styles.cardBar2} className="mdl-card__actions mdl-card--border">
          <div className='mdl-layout-spacer'></div>
          <i onClick={like.bind(this, sliceID)} style={heart} className="material-icons">favorite</i>
          <i onClick={download} style={styles.barIcon} className="material-icons">save</i>
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
  download: PropTypes.func.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  clearSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
}

Card.contextTypes = {
  router: PropTypes.object.isRequired
}
