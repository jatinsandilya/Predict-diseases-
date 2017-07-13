import React, { Component } from 'react';
import {
	Grid,
	Button,
	Icon,
	Image,
	Label,
	Menu,
	Dropdown
} from 'semantic-ui-react';

import logo from '../../assets/logo.png';
import avatar from '../../assets/userAvatar.png';

import './style.css';

const trigger = (
	<span>
		<Image avatar src={avatar} /> Hi, John Doe
	</span>
);

export default class PDHeader extends Component {
	render() {
		return (
			<Grid columns={16} className="pdHeader">
				<Grid.Column mobile={8} computer={4} className="logo">
					<Button icon>
						<Icon name="bars" />
					</Button>
					<Image src={logo} />
				</Grid.Column>
				<Grid.Column mobile={4} computer={8} className="productName">
					<h3>Predict Diseases</h3>
				</Grid.Column>
				<Grid.Column mobile={4} computer={4} className="userInfo">
					<div className="borderedIcon" style={{ padding: '5px 10px' }}>
						<Icon name="search" />
					</div>
					<div className="borderedIcon" style={{ border: 0 }}>
						<Menu size="mini" icon>
							<Menu.Item as="a">
								<Icon name="bell" />
								<Label color="teal" floating>1</Label>
							</Menu.Item>
						</Menu>
					</div>
					<div
						className="borderedIcon"
						style={{ borderRight: 0, borderLeft: '1px solid #000' }}
					>
						<Dropdown trigger={trigger} pointing="top left" icon={null} />
					</div>
				</Grid.Column>
			</Grid>
		);
	}
}
