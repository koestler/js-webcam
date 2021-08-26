import { h } from 'preact';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from "preact/hooks";

const Image = ({viewName, cameraName}) => {
	const [play, setPlay] = useState(false)
	const [hide, setHide] = useState(false)

	return (
		<article class="message is-dark">
			<div className="message-header">
				<p>{cameraName}</p>
				{hide ? null : <a onClick={() => setPlay(!play)}>
					<FontAwesomeIcon icon={play ? faStop : faPlay}  />
				</a>}
				<a  onClick={() => setHide(!hide)} >
					<FontAwesomeIcon icon={hide ? faEyeSlash : faEye} />
				</a>
			</div>
			{hide ? null :
				<div className="message-body">
					<img src={`/api/v0/images/${viewName}/${cameraName}.jpg`} alt={name} />
				</div>
			}
		</article>
	);
}

export default Image;
