import { h } from 'preact';

const Image = ({viewName, cameraName}) => {
	return (
		<article class="message is-dark">
			<div className="message-header">
	<p>{cameraName}</p>
			</div>
			<div className="message-body">
			<img src={`/api/v0/images/${viewName}/${cameraName}.jpg`} alt={name}/>
			</div>
		</article>
	);
}

export default Image;
