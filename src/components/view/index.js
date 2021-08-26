import { h } from 'preact';
import style from './style.css';
import Image from "../image";

const View = ({title, name, cameras}) => {
	return (
		<div class="content">
			<h1>{title}</h1>
			<ul class={style.images}>
				{cameras.map(camera => <li key={camera}>
					<Image viewName={name} cameraName={camera} />
				</li>)}
			</ul>
		</div>
	);
}

export default View;
