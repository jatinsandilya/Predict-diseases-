import React, { Component } from 'react';
import {
	Grid,
	List,
	Button,
	Icon,
	Card,
	Image,
	Label,
	Checkbox,
	Divider,
	Message,
	Segment,
	Statistic
} from 'semantic-ui-react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer
} from 'recharts';

import VisitScore from '../visitScoreMeter';

import './style.css';
import temperature from '../../assets/temperature.png';
import bp from '../../assets/bp.png';
import cholesterol from '../../assets/cholesterol.png';
import weight from '../../assets/weight.png';
import heart from '../../assets/heart.png';
import respiratory from '../../assets/respiratory.png';
import medicine from '../../assets/medicine.png';
import lifestyle from '../../assets/lifestyle.png';
import sign from '../../assets/sign.png';
import historical from '../../assets/historical.png';
import social from '../../assets/social.png';

const scoreData = [
	{ month: 'Jan', score: 60 },
	{ month: 'Feb', score: 30 },
	{ month: 'Mar', score: 20 },
	{ month: 'Apr', score: 40 },
	{ month: 'May', score: 30 },
	{ month: 'Jun', score: 40 },
	{ month: 'Jul', score: 20 },
	{ month: 'Aug', score: 30 },
	{ month: 'Sep', score: 40 },
	{ month: 'Oct', score: 10 },
	{ month: 'Nov', score: 30 },
	{ month: 'Dec', score: 10 }
];

export default class PatientDashboard extends Component {
	render() {
		return (
			<div>
				<Grid className="patientInfo">
					<Grid.Column mobile={10}>
						<List horizontal>
							<List.Item>
								<strong>Patient: </strong>
								John Doe
							</List.Item>
							<List.Item>
								<strong>Gender: </strong>
								Male
							</List.Item>
							<List.Item>
								<strong>Age: </strong>
								32
							</List.Item>
							<List.Item>
								<strong>Height: </strong>
								5.9"
							</List.Item>
						</List>
					</Grid.Column>
					<Grid.Column mobile={6} textAlign="right">
						<strong>Patient Dashboard</strong>
					</Grid.Column>
				</Grid>
				<Grid className="miniLinks">
					<Grid.Column mobile={13} verticalAlign="middle">
						<List divided horizontal>
							<List.Item as="a">
								<List.Content>Set a Reminder</List.Content>
							</List.Item>
							<List.Item as="a">
								<List.Content>Lab Reminder</List.Content>
							</List.Item>
							<List.Item as="a">
								<List.Content>Patient Document</List.Content>
							</List.Item>
							<List.Item as="a">
								<List.Content>Patient Communication</List.Content>
							</List.Item>
							<List.Item as="a">
								<List.Content>Reserve Next Appointment</List.Content>
							</List.Item>
							<List.Item as="a">
								<List.Content>Set Health Goals</List.Content>
							</List.Item>
							<List.Item as="a">
								<List.Content>Share Dashboard with Patients</List.Content>
							</List.Item>
						</List>
					</Grid.Column>
					<Grid.Column mobile={3} textAlign="right" verticalAlign="middle">
						<Button
							color="facebook"
							size="mini"
							content="Connect with"
							icon="facebook"
							labelPosition="right"
							compact
						/>
					</Grid.Column>
				</Grid>
				<Grid className="visitInfo">
					<Grid.Row>
						<Grid.Column mobile={16} computer={8} className="previousVisit">
							<p className="headerTitle">Previous Visit</p>
							<br />
							<div>
								<List horizontal>
									<List.Item>
										<Image src={temperature} />
										<List.Content verticalAlign="top">
											<List.Header>Body Temperature</List.Header>
											<p>98.2 F</p>
										</List.Content>
									</List.Item>
									<List.Item>
										<Image src={heart} />
										<List.Content verticalAlign="top">
											<List.Header>Heart Rate</List.Header>
											<p>110 BPM</p>
										</List.Content>
									</List.Item>
									<List.Item>
										<Image src={weight} />
										<List.Content verticalAlign="top">
											<List.Header>Weight</List.Header>
											<p>72 KG</p>
										</List.Content>
									</List.Item>
								</List>
								<List horizontal size="mini">
									<List.Item>
										<Image src={cholesterol} />
										<List.Content verticalAlign="top">
											<List.Header>Cholesterol</List.Header>
											<p>HDL 40</p>
											<p>LDL 180</p>
											<p>VDL 130</p>
										</List.Content>
									</List.Item>
									<List.Item>
										<Image src={respiratory} />
										<List.Content verticalAlign="top">
											<List.Header>Respiratory Rate</List.Header>
											<p>Breathe Per Minute 14</p>
										</List.Content>
									</List.Item>
									<List.Item>
										<Image src={bp} />
										<List.Content verticalAlign="top">
											<List.Header>Blood Pressure</List.Header>
											<p>HDL 40</p>
											<p>LDL 180</p>
										</List.Content>
									</List.Item>
								</List>
							</div>
						</Grid.Column>
						<Grid.Column
							mobile={16}
							tablet={8}
							computer={4}
							className="lastVisit"
							textAlign="center"
						>
							<p className="headerTitle">Last Visit</p>
							<p className="subtitle">February 17, 2017</p>
							<div>
								<VisitScore ref={lastVisit => (this.lastVisit = lastVisit)} />
							</div>
							<p className="headerTitle">Score: 35</p>
						</Grid.Column>
						<Grid.Column
							mobile={16}
							tablet={8}
							computer={4}
							className="todayVisit"
							textAlign="center"
						>
							<p className="headerTitle">Today</p>
							<p className="subtitle">March 17, 2017</p>
							<div>
								<VisitScore
									ref={todayVisit => (this.todayVisit = todayVisit)}
								/>
							</div>
							<p className="headerTitle">Score: 20</p>
							<p className="subtitle">Change in score: 15</p>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row style={{ padding: '0 30px', marginBottom: 20 }}>
						<p className="headerTitle">Active Medication</p>
					</Grid.Row>
					<Grid.Row
						style={{ padding: '0 30px', marginBottom: 20 }}
						className="activeMedication"
					>
						<Grid.Column mobile={16} computer={10}>
							<List divided horizontal>
								<List.Item>
									<Image src={medicine} />
								</List.Item>
								<List.Item>
									<List.Content verticalAlign="middle">
										<p>Zestril 10mg</p>
										<p>Oral Tablet</p>
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Content verticalAlign="middle">
										<p>Zestril 10mg</p>
										<p>Oral Tablet</p>
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Content verticalAlign="middle">
										<p>Zestril 10mg</p>
										<p>Oral Tablet</p>
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Content verticalAlign="middle">
										<p>Zestril 10mg</p>
										<p>Oral Tablet</p>
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Content verticalAlign="middle">
										<p>Zestril 10mg</p>
										<p>Oral Tablet</p>
									</List.Content>
								</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column mobile={16} computer={6} className="recommendation">
							<p className="nextVisit">Next Visit: April 14, 2017</p>
							<Button color="teal" size="mini" compact>Recommendation</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Grid style={{ padding: '0 30px' }} className="scoreChartContainer">
					<Grid.Row stretched>
						<Grid.Column mobile={16} computer={12}>
							<div className="cardBlock">
								<p className="headerTitle">Score History</p>

								<ResponsiveContainer width="100%" height={200}>
									<AreaChart
										data={scoreData}
										margin={{ top: 10, right: 0, left: 0, bottom: 30 }}
									>
										<XAxis
											dataKey="month"
											axisLine={false}
											tickLine={false}
											padding={{ left: 20 }}
										/>
										<YAxis hide />
										<Tooltip />
										<Area
											type="monotone"
											dataKey="score"
											stroke="#129BA3"
											fill="#95DFDC"
										/>
									</AreaChart>
								</ResponsiveContainer>
							</div>
						</Grid.Column>
						<Grid.Column mobile={16} computer={4} className="stats">
							<Segment className="statBlue">
								<Statistic
									horizontal
									value="25"
									label="times checked into a restaurant since last check-up"
									size="large"
								/>
							</Segment>
							<Segment className="statBlack">
								<Statistic
									horizontal
									value="05"
									label="times &quot;Feeling Sick&quot; status posted since last check-checkup"
									size="large"
								/>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Grid style={{ padding: '0 30px' }} columns={4}>
					<Grid.Row stretched>
						<Grid.Column
							mobile={16}
							computer={4}
							className="cardBlockContainer"
						>
							<div className="cardBlock">
								<Label className="headerTitleLabel">
									<Image src={lifestyle} spaced="right" />
									<p>Lifestyle</p>
								</Label>
								<p className="cardContent">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</p>
								<p className="cardPercent">80%</p>
								<p className="cardContent">
									10% of lifestyle risk score contributes to overall risk prediction
								</p>
								<a href="#" className="adjustPercent">Adjust Percentage</a>
							</div>
							<div className="poor">POOR</div>
						</Grid.Column>
						<Grid.Column
							mobile={16}
							computer={4}
							className="cardBlockContainer"
						>
							<div className="cardBlock">
								<Label className="headerTitleLabel">
									<Image src={sign} spaced="right" />
									<p>Signs & Symptoms</p>
								</Label>
								<p className="cardContent">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</p>
								<p className="cardPercent">80%</p>
								<p className="cardContent">
									10% of lifestyle risk score contributes to overall risk prediction
								</p>
								<a href="#" className="adjustPercent">Adjust Percentage</a>
							</div>
							<div className="good">POOR</div>
						</Grid.Column>
						<Grid.Column
							mobile={16}
							computer={4}
							className="cardBlockContainer"
						>
							<div className="cardBlock">
								<Label className="headerTitleLabel">
									<Image src={historical} spaced="right" />
									<p>Historical Medical Data</p>
								</Label>
								<p className="cardContent">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</p>
								<p className="cardPercent">80%</p>
								<p className="cardContent">
									10% of lifestyle risk score contributes to overall risk prediction
								</p>
								<a href="#" className="adjustPercent">Adjust Percentage</a>
							</div>
							<div className="poor">POOR</div>
						</Grid.Column>
						<Grid.Column
							mobile={16}
							computer={4}
							className="cardBlockContainer"
						>
							<div className="cardBlock">
								<Label className="headerTitleLabel">
									<Image src={social} spaced="right" />
									<p>Social Media</p>
								</Label>
								<p className="cardContent">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</p>
								<p className="cardPercent">80%</p>
								<p className="cardContent">
									10% of lifestyle risk score contributes to overall risk prediction
								</p>
								<a href="#" className="adjustPercent">Adjust Percentage</a>
							</div>
							<div className="poor">POOR</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Grid style={{ padding: '0 30px' }} columns={3} stackable>
					<Grid.Row stretched>
						<Grid.Column>
							<div className="cardBlock goals">
								<p className="headerTitle">Health Goals</p>
								<List selection divided verticalAlign="middle">
									<List.Item>
										<List.Content floated="right">
											<Checkbox toggle className="chkbox" />
										</List.Content>
										<List.Content>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
										</List.Content>
									</List.Item>
									<List.Item>
										<List.Content floated="right">
											<Checkbox toggle className="chkbox" />
										</List.Content>
										<List.Content>
											Ut enim ad minim veniam, quis nostrud xercitation ullamco laboris nisi ut aliquip
										</List.Content>
									</List.Item>
									<List.Item>
										<List.Content floated="right">
											<Checkbox toggle className="chkbox" />
										</List.Content>
										<List.Content>
											Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
										</List.Content>
									</List.Item>
									<List.Item>
										<List.Content floated="right">
											<Checkbox toggle className="chkbox" />
										</List.Content>
										<List.Content>
											Deserunt mollit anim id est laborum
										</List.Content>
									</List.Item>
									<List.Item>
										<List.Content floated="right">
											<Checkbox toggle className="chkbox" />
										</List.Content>
										<List.Content>
											Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
										</List.Content>
									</List.Item>
								</List>
							</div>
						</Grid.Column>
						<Grid.Column>
							<div className="cardBlock listRecommendations">
								<p className="headerTitle">Recommendation</p>
								<List ordered>
									<List.Item>
										Warning Symptoms
										<div className="space" />
									</List.Item>
									<List.Item>
										Physician Notes
										<div className="space" />
									</List.Item>
								</List>
							</div>
						</Grid.Column>
						<Grid.Column>
							<div className="cardBlock preventive">
								<p className="headerTitle">Steps for Preventive Care</p>
								<List divided verticalAlign="middle">
									<List.Item>
										<List.Content floated="right">
											<Button icon="pencil" />
											<Button icon="trash" />
										</List.Content>
										<List.Content>
											Excepteur sint occaecat cupidatat non proident
										</List.Content>
									</List.Item>
									<List.Item>
										<List.Content floated="right">
											<Button icon="pencil" />
											<Button icon="trash" />
										</List.Content>
										<List.Content>
											Excepteur sint occaecat cupidatat non proident
										</List.Content>
									</List.Item>
									<List.Item>
										<List.Content floated="right">
											<Button icon="pencil" />
											<Button icon="trash" />
										</List.Content>
										<List.Content>
											Excepteur sint occaecat cupidatat non proident
										</List.Content>
									</List.Item>
								</List>
								<Divider horizontal>
									<Button
										circular
										icon="add circle"
										className="addPreventive"
									/>
								</Divider>
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Grid style={{ padding: '0 30px' }} columns={1}>
					<Grid.Column mobile={16}>
						<Message color="black" className="subscriptionMsg">
							Your current subscription is valid till April 2017
						</Message>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}
