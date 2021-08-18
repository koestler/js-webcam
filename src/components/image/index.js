import { h } from 'preact';
import style from './style.css';

const Image = ({viewName, cameraName}) => {
	return (
		<img class={style.image} src={`/api/v0/images/${viewName}/${cameraName}.jpg`} alt={name} />
	);
}

export default Image;
