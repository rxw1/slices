import React, { Component, PropTypes } from 'react';
import StyleSheet from 'react-style';

var languagesStyle = StyleSheet.create({
  'listStyleType': 'none'
});

export default class Slices extends Component {
  render() {
  	const slices = this.props.slices.map((slice, idx) => {
  		const instances = slice.instances.map(instance => {
  			return <li>{instance}</li>;
  		});

      const language = slice.language.map(lang => {
        return <li>{lang}</li>;
      });

  		const uses = slice.uses.map(use => {
  			return <li style={languagesStyle}>{use}</li>;
  		});

  		return (
  			<div key={idx} >
  				<h3>{slice.sliceID}<br /><small>{slice.id}</small></h3>
  				<pre>
	  				<code>{slice.fragment}</code>
  				</pre>
  				<ul>
  					{instances}
					</ul>
          <ul>
            {language}
          </ul>
          <ul>
            {uses}
          </ul>
          <hr />
				</div>
  		);
  	})

    return (
      <div>{slices}</div>
    );
  }

}

Slices.propTypes = {
  slices: PropTypes.array.isRequired
};
