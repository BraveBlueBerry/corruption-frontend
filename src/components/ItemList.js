import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Item from './Item';

import Config from '../config';

class ItemList extends Component {
	static propTypes = {
		character: PropTypes.string.isRequired,
		handlePopup: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			items: [],
			newItemName: '',
			newItemIlvl: '',
			newItemHPS: '',
			newItemCorruption: '',
			newItemSlot: Config.slots[0],
			itemAddedShow: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getItems = this.getItems.bind(this);
	}

	componentDidMount() {
		this.getItems();
	}

	getItems() {
		fetch(Config.baseURL + "items", { method: "GET" })
		 .then(res => res.json())
		 .then(
			 (result) => {
				 this.setState({
					 items: result
				 });
			 },
			 (error) => {
					console.log(error);
          this.setState({
            error
          });
        }
      );
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.id;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		const { character, handlePopup } = this.props;
		const { newItemName, newItemIlvl, newItemHPS, newItemCorruption, newItemSlot } = this.state;
		let formData = new FormData();
		formData.append('name', newItemName);
		formData.append('ilvl', newItemIlvl);
		formData.append('hps', newItemHPS);
		formData.append('corruption', newItemCorruption);
		formData.append('slot', newItemSlot);
		formData.append('character', character);

		fetch(Config.baseURL + "items", { method: "POST", body: formData })
		 .then(
			 (res) => {
					console.log(res);
					if(res.status === 200) {
						handlePopup(true, newItemName, "");
					} else {
						handlePopup(true, newItemName, res.statusText);
					}

          this.setState({
            error: res.statusText,
          });
        }
      );

		this.getItems();
	}

  render() {
		const { character } = this.props;
		const { items, newItemName, newItemIlvl, newItemHPS, newItemCorruption, newItemSlot } = this.state;
    return (
			<ListGroup >
				<Button variant="primary" onClick={this.handleSubmit}>
					Add Item
				</Button>
				<Form>
					<Form.Group as={Row} controlId="newItemName">
						<Form.Label column sm={3} className="form-item-label">Item name</Form.Label>
						<Col sm={9}>
							<Form.Control size="sm" type="text" value={newItemName} onChange={this.handleChange}/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="newItemIlvl">
						<Form.Label column sm={3} className="form-item-label">ilvl</Form.Label>
						<Col sm={9}>
							<Form.Control size="sm" type="text" value={newItemIlvl} onChange={this.handleChange}/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="newItemHPS">
						<Form.Label column sm={3} className="form-item-label">HPS</Form.Label>
						<Col sm={9}>
							<Form.Control size="sm" type="text" value={newItemHPS} onChange={this.handleChange}/>
						</Col>					</Form.Group>
					<Form.Group as={Row} controlId="newItemCorruption">
						<Form.Label column sm={3} className="form-item-label">Corruption</Form.Label>
						<Col sm={9}>
							<Form.Control size="sm" type="text" value={newItemCorruption} onChange={this.handleChange}/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="newItemSlot">
						<Form.Label column sm={3} className="form-item-label">Slot</Form.Label>
						<Col sm={9}>
							<Form.Control size="sm" as="select" value={newItemSlot} onChange={this.handleChange}>
								{Config.slots.map((slot) => <option key={slot}>{slot}</option>)}
							</Form.Control>
						</Col>
					</Form.Group>
				</Form>
				{items && items.map((item) => {
					if(item.character === character) {
						return (
							<ListGroup.Item style={{ padding: 0 }} key={item.id}>
								<Item
									id={item.id}
									name={item.name}
									ilvl={item.ilvl}
									hps={item.hps}
									slot={item.slot}
									corruption={item.corruption}
									refreshItemList={this.getItems}
								/>
							</ListGroup.Item>
						);
					}
				})}
			</ListGroup>
		);
  }
}

export default ItemList;
