import PropTypes from 'prop-types';
import React, { Component } from 'react';

import MyCard from './MyCard';
import Config from '../config';

class Item extends Component {
	constructor(props) {
		super(props);
		this.removeItem = this.removeItem.bind(this);
	}

	static propTypes = {
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		ilvl: PropTypes.number.isRequired,
		hps: PropTypes.number.isRequired,
		slot: PropTypes.string.isRequired,
		corruption: PropTypes.number.isRequired,
		refreshItemList: PropTypes.func.isRequired,
	}

	removeItem() {
		const { id, name, refreshItemList } = this.props;
		console.log('Removing item: ' + name);

		fetch(Config.baseURL + "items/" + id, { method: "DELETE" })
		 .then(
			 (res) => {
					console.log(res);
					refreshItemList();
        }
      );
	}

  render() {
		const { name, ilvl, hps, slot, corruption } = this.props;

    return (
			<MyCard
				title={name}
				ilvl={ilvl}
				hps={hps}
				corruption={corruption}
				src={Config.images[slot]}
				removeItem={this.removeItem}
			/>
		);
  }
}

export default Item;
