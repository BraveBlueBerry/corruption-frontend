import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import Config from '../config';

class MyCard extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		ilvl: PropTypes.number.isRequired,
		hps: PropTypes.number.isRequired,
		corruption: PropTypes.number.isRequired,
		src: PropTypes.string,
		removeItem: PropTypes.func.isRequired,
	}

  render() {
		const { title, ilvl, hps, corruption, src, removeItem } = this.props;

    return (
			<Container className="my-card-container">
				<Row>
					<Col xs={2} className="my-card-image-container">
						{ src && <Image src={src} className="my-card-image"/> }
					</Col>
					<Col xs={9}>
						<Row className="my-card-title">
							{title}
						</Row>
						<Row className="my-card-text">
							<Col>
								Ilvl: {ilvl}
							</Col>
							<Col>
								HPS: {hps}
							</Col>
							<Col>
								Corruption: {corruption}
							</Col>
						</Row>
					</Col>
					<Col xs={1}>
						<Image src={Config.removeIcon} style={{ width: '30px', height: '30px', marginRight: '10px' }} onClick={() => { removeItem() }}/>
					</Col>
				</Row>
			</Container>
		);
  }
}

export default MyCard;
