import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Image from 'react-bootstrap/Image';

import Config from '../config';

class Item extends Component {

	static propTypes = {
		name: PropTypes.string,
		selected: PropTypes.bool,
		onClick: PropTypes.func.isRequired,
	}

	static defaultProps = {
		name: "default",
		selected: false,
	}

  render() {
		const { name, selected, onClick } = this.props;

    return (
			<div>
				<Image
					id={name}
					src={Config.charImg[name] ? Config.charImg[name] : Config.charImg['default']}
					className={"character-img " + (selected ? "character-img-selected" : "")}
					key={name}
					onClick={onClick}
				/>
			</div>
		);
  }
}

export default Item;
