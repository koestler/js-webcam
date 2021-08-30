import React from 'react';

import Image from "../image";

const View = ({title, name, cameras}) => {
	return (
		<div className="content">
			<div className="block">
				<h2 className="title">{title}</h2>
			</div>
			<ul className="columns">
				{cameras.map(camera => <li key={camera} className="column">
					<Image viewName={name} cameraName={camera} />
				</li>)}
			</ul>
		</div>
	);
}

export default View;
