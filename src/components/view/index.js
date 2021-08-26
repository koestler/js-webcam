import { h } from 'preact';
import Image from "../image";

const View = ({title, name, cameras}) => {
	return (
		<div class="content">
			<div class="block">
				<h2 class="title">{title}</h2>
			</div>
			<ul class="columns">
				{cameras.map(camera => <li key={camera} class="column">
					<Image viewName={name} cameraName={camera} />
				</li>)}
			</ul>
		</div>
	);
}

export default View;
