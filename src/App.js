import React, { Component } from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ItemList from './components/ItemList';
import CombiList from './components/CombiList';
import CharacterList from './components/CharacterList';
import Popup from './components/Popup'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/item.css';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
			activeChar: "Maysunny",
      showPopup: false,
      error: "",
      itemName: "",
		}

		this.handleCharSwitch = this.handleCharSwitch.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
	}

  handleCharSwitch(activeChar) {
    this.setState({
      activeChar: activeChar,
    });
  }

  handlePopup(show, itemName, error) {
    console.log(show);
    console.log(itemName);
    console.log(error);
    this.setState({
      showPopup: show,
      error: error,
      itemName: itemName,
    })
  }

  render() {
    const { activeChar, showPopup, error, itemName } = this.state;

    return (
      <div className="App">
        <Popup show={showPopup} error={error} name={itemName} handlePopup={this.handlePopup} />
        <header className="App-header">
          <CharacterList handleCharSwitch={this.handleCharSwitch} handlePopup={this.handlePopup} />
          <Container>
            <Row>
              <Col xs={6} sm={4}>
                <ItemList character={activeChar} handlePopup={this.handlePopup} />
              </Col>
              <Col xs={6} sm={8}>
                <CombiList character={activeChar} />
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
