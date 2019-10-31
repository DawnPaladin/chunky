import PropTypes from 'prop-types';
import React from 'react';
import * as Icon from 'react-feather';
import network from './network';

export default class ToggleShowCompleted extends React.Component {
	static propTypes = {
		showCompletedTasks: PropTypes.bool.isRequired,
		userId: PropTypes.number.isRequired,
	};
	constructor(props) {
		super(props);
		this.state = { showCompletedTasks: this.props.showCompletedTasks }
		window.showCompletedTasks = this.props.showCompletedTasks;
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange() {
		const newState = !this.state.showCompletedTasks;
		this.setState({ showCompletedTasks: newState });
		window.showCompletedTasks = newState;
		network.patch('/change_show_completed_tasks.json', { show_completed_tasks: newState });
	}
	render() {
		return <button className="toggle-show-completed-button" onClick={this.handleChange}>
			{ this.state.showCompletedTasks === true && <Icon.ToggleRight size="16" className="feather switch-on"  /> }
			{ this.state.showCompletedTasks === false && <Icon.ToggleLeft size="16" className="feather switch-off" /> }
			Show Completed (Alt-C)
		</button>
	}
}
