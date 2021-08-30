import React, {useEffect, useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Button} from "react-bulma-components";
import Header from './components/header';
import View from "./components/view";
import Footer from "./components/footer";

const App = () => {
	const [config, setConfig] = useState(null)
	useEffect(() => {
		fetch(`/api/v0/config`)
			.then(res => res.json())
			.then(data => setConfig(data))
	}, []);

	if (config === null) {
		return <div id="app">
			<Button loading={true} />
		</div>
	}

	return (
		<div id="app">
			<BrowserRouter>
			<Header title={config.projectTitle} views={config.views} />

				<Switch>
				{ config.views.map(view =>
					<Route key={view.name} path={`/${view.name}`}>
					<View {...view} />
				</Route>
				)}
				<DefaultRoute default views={config.views} />
				</Switch>
			<Footer />
			</BrowserRouter>
		</div>
	)
}

const DefaultRoute = ({views}) => {
	if (views.count < 1) {
		return (
	<div className="content">
		<h1>Empty</h1>
		<p>No views are defined. Check your config.yaml</p>
	</div>
);
	}

	const defaultView = views[0]
	return <Redirect to={`/${defaultView.name}`} />
}

export default App;
