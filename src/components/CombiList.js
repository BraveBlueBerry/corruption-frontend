import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Item from './Item';

import Config from '../config';

class CombiList extends Component {
	static propTypes = {
		character: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			items: [],
			maxCorruption: 58,
			corruptionResistance: 52,
			totalHealing: 0,
			totalCorruption: 0,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		if(event.target.id === "formMaxCorruption"){
			this.setState({ maxCorruption: event.target.value})
		} else if (event.target.id === "formCorruptionResistance") {
			this.setState({ corruptionResistance: event.target.value})
		};
	}

	handleSubmit(event) {
		const { character } = this.props;
		const { maxCorruption, corruptionResistance } = this.state;
		event.preventDefault();

		const corruption = parseInt(maxCorruption) + parseInt(corruptionResistance);
		fetch(Config.baseURL + "combination/" + corruption + "/" + character, { method: "GET" })
		 .then(res => res.json())
		 .then(
			 (result) => {
				 let totalHealing = 0;
				 let totalCorruption = 0;
				 for (var key in result) {
		 			if (result.hasOwnProperty(key)) {
						 totalHealing += result[key].hps;
						 totalCorruption += result[key].corruption;
		     	}
		 		}
				totalCorruption -= corruptionResistance;
				 this.setState({
					 items: result,
					 totalHealing,
					 totalCorruption,
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

  render() {
		const { items, maxCorruption, corruptionResistance, totalHealing, totalCorruption } = this.state;
    return (
			<div style={{ textAlign: 'left' }}>
				<Form>
					<Row>
						<Col xs={6}>
						<Form.Group controlId="formMaxCorruption">
								<Form.Label>Max corruption</Form.Label>
								<Form.Control type="text" placeholder="Enter max corruption" value={maxCorruption} onChange={this.handleChange}/>
						</Form.Group>
						</Col>
						<Col xs={6}>
							<Form.Group controlId="formCorruptionResistance">
								<Form.Label>Corruption Resistance</Form.Label>
								<Form.Control type="text" placeholder="Enter Corruption resistance" value={corruptionResistance} onChange={this.handleChange}/>
							</Form.Group>
						</Col>
					</Row>
					<Button variant="primary" type="submit" onClick={this.handleSubmit}>
				    Make Combi
				  </Button>
				</Form>
				<hr style={{ borderColor:'white' }}/>
				<div>
					<Form>
						<Row>
							<Col sm={6}>
								<Form.Group controlId="totalHealth">
									<Form.Label>Total healing: </Form.Label>
									<Form.Control disabled type="text" value={totalHealing} />
								</Form.Group>
							</Col>
							<Col sm={6}>
								<Form.Group controlId="totalCorruption">
									<Form.Label>Total corruption: </Form.Label>
									<Form.Control disabled type="text" value={totalCorruption} />
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</div>
				{items && items.map((item) => (
					<Item
						key={item.id}
						id={item.id}
						name={item.name}
						ilvl={item.ilvl}
						hps={item.hps}
						slot={item.slot}
						corruption={item.corruption}
					/>
				))}
			</div>
		);
  }
}

export default CombiList;
