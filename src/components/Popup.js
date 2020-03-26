import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';

class Popup extends Component {
	static propTypes = {
		show: PropTypes.bool.isRequired,
		error: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		handlePopup: PropTypes.func.isRequired,
	}

  render() {
		const { name, error, show, handlePopup } = this.props;
		let classString = "";
		if(!show) {
			classString += "popup-not-visible"
		}

    return (
			<div className={"popup-visible " + classString}>
				<Alert variant={error ? "danger" : "success"} onClose={()=> { handlePopup(false, "", "") }} dismissible>
					<p> Adding item {name} went {error ? "wrong" : "successfully"}. {error ? "Error: " + error : ""}</p>
				</Alert>
			</div>
		);
  }
}

export default Popup;
