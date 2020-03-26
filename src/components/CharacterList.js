import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Character from './Character';
import Config from '../config';

class CharacterList extends Component {
	static propTypes = {
		handleCharSwitch: PropTypes.func.isRequired,
		handlePopup: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			characters: [],
			newCharName: "",
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleCharChange = this.handleCharChange.bind(this);
		this.addCharacter = this.addCharacter.bind(this);
	}

	componentDidMount() {
		this.getCharacters();
	}

	getCharacters() {
		fetch(Config.baseURL + "characters", { method: "GET" })
		 .then(res => res.json())
		 .then(
			 (result) => {
				 let chars = [];
				 for(var i in result) {
					 let char = result[i];
					 let charToAdd = {
						 active: i === '0',
						 name: char.name,
					 }
					 chars.push(charToAdd);
				 }
				 this.setState({ characters: chars });
			 },
			 (error) => {
					console.log(error);
          this.setState({
            error
          });
        }
      );
	}

	addCharacter() {
		const { handlePopup } = this.props;
		const { newCharName } = this.state;

		let formData = new FormData();
		formData.append('name', newCharName);

		fetch(Config.baseURL + "characters", { method: "POST", body: formData })
		 .then(
			 (res) => {
					console.log(res);
					if(res.status === 200) {
						handlePopup(true, newCharName, "");
					} else {
						handlePopup(true, newCharName, res.statusText);
					}

          this.setState({
            error: res.statusText,
          });
        }
      );

		this.getCharacters();
	}

	handleCharChange(event) {
		const { handleCharSwitch } = this.props;

		let state = this.state;
		for (var index in state.characters) {
			if (state.characters[index].name === event.target.id) {
        state.characters[index].active = true;
    	} else {
				state.characters[index].active = false;
			}
		}
		this.setState(state);

		handleCharSwitch(event.target.id);
	}

	handleChange(event) {
		const value = event.target.value;
		this.setState({ newCharName: value });
	}

  render() {
		const { characters, newCharName } = this.state;

		console.log(characters);

    return (
			<Row className="characters">
				{characters.map((char) => { return ( <Character key={char.name} name={char.name} selected={char.active} onClick={this.handleCharChange}/> ); })}
				<Form>
					<Form.Group controlId="newCharName">
						<Form.Label className="form-item-label">Character name</Form.Label>
						<Form.Control size="sm" type="text" value={newCharName} onChange={this.handleChange}/>
					</Form.Group>
					<Button variant="primary" onClick={this.addCharacter}>
						Add character
					</Button>
				</Form>
			</Row>
		);
  }
}

export default CharacterList;
