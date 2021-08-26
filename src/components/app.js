import { h } from 'preact';
import { Router, route } from 'preact-router';

import Header from './header';
import { CubeGrid } from 'styled-loaders'

import {useState, useEffect} from "preact/hooks";
import View from "./view";

const App = () => {
	const [config, setConfig] = useState(null)
	useEffect(() => {
		fetch(`/api/v0/config`)
			.then(res => res.json())
			.then(data => setConfig(data))
	}, []);

	if (config === null) {
		return <div id="app">
			<CubeGrid />
		</div>
	}

	return (
		<div id="app">
			<Header title={config.projectTitle} views={config.views} />
			<Router>
				{ config.views.map(view => <View key={view.name} path={`/${view.name}`} {...view} />)}
				<DefaultRoute default views={config.views} />
			</Router>
		</div>
	)
}

const DefaultRoute = ({views}) => {
	if (views.count < 1) {
		return (
	<div class="content">
		<h1>Empty</h1>
		<p>No views are defined. Check your config.yaml</p>
	</div>
);
	}

	const defaultView = views[0]
	route(`/${defaultView.name}`, true)
	return null
}

export default App;
