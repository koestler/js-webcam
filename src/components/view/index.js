import { h } from 'preact';
import style from './style.css';
import Image from "../image";

const View = ({title, name, cameras}) => {
	return (
		<div class={style.profile}>
			<h1>{title}</h1>
			<ul>
				{cameras.map(camera => <li>
					<Image viewName={name} cameraName={camera} />
				</li>)}
			</ul>
		</div>
	);
}

export default View;
