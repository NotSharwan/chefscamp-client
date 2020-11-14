import React, { Component } from "react";
import "./ranklist.css";
import Cookie from "js-cookie";
import axios from "axios";

class Ranklist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			data: null,
		};
		
		this.componentDidMount = this.componentDidMount.bind(this);
		this.renderTableData = this.renderTableData.bind(this);
		this.renderTableHeader = this.renderTableHeader.bind(this);
	}
	componentDidMount() {
		document.title = `Ranklist ${this.props.match.params.contestCode}-Chef'sCamp`;
		let userName = Cookie.get("userName");
		axios
			.get(
				`/api/rankings/${this.props.match.params.contestCode}/${userName}`
			)
			.then(res => {
				this.setState({ loaded: true, data: res.data });
			});
	}
	renderTableData() {
		return this.state.data.result.data.content.map((user, index) => {
			return (
      			// eslint-disable-next-line
				<tr key={index} style={(index%2===0 ? this.props.userDetails.themeBool == 0  ? {backgroundColor: "#36454f"} : {backgroundColor: '#f8f8f8'} : null)}>
					<td>{user.rank}</td>
					<td>{user.username}</td>
					<td>{+parseFloat(user.totalScore).toFixed(3)}</td>
				</tr>
			);
		});
	}

	renderTableHeader() {
		let header = ["#", "user name", "total score"];
		return header.map((key, index) => {
			return <th key={index}>{key.toUpperCase()}</th>;
		});
	}

	render() {
		if (this.state.loaded) {
			return (
				<div style={{ boxShadow: "0px 0px 15px 5px rgba(0,0,0,.35)", borderRadius: "10px", margin: "15px" }}>
					<table id="ranklist">
						<caption style={{ textAlign: "left" }}>Ranklist</caption>
						<tbody>
							<tr>{this.renderTableHeader()}</tr>
							{this.renderTableData()}
						</tbody>
					</table>
				</div>
			);
		} else {
			return (
				<div
					style={{
						boxShadow: "0px 0px 15px 5px rgba(0,0,0,.35)", borderRadius: "10px", margin: "15px", padding: "5px",
						height: "350px",
						paddingTop: "350px",
						fontSize: "30px"
					}}
				>
					<strong>Loading . . .</strong>
				</div>
			);
		}
	}
}

export default Ranklist;
