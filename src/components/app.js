import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import { CubeGrid } from 'styled-loaders'

import {useState, useEffect} from "preact/hooks";
import View from "./view";

const App = () => {
	const [config, setConfig] = useState(null)
	useEffect(() => {
		fetch(`/api/v0/config`)
			.then(res => new Promise(resolve => setTimeout(() => resolve(res), 500)))
			.then(res => res.json())
			.then(data => setConfig(data))
	}, []);

	if (config === null) {
		return <div id="app">
			<CubeGrid />
		</div>
	}

	console.log(config)

	return (
		<div id="app">
			<Header title={config.projectTitle} views={config.views} />
			<Router>
				{ config.views.map(view => <View key={view.name} path={`/${view.name}`} {...view} />)}
			</Router>
		</div>
	)
}

export default App;
