import React, {useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {Button} from "react-bulma-components";

const Image = ({viewName, cameraName}) => {
	const [play, setPlay] = useState(false)
	const [hide, setHide] = useState(false)

	return (
		<article className="message is-dark">
			<div className="message-header">
				<p>{cameraName}</p>
				{hide ? null : <Button onClick={() => setPlay(!play)}>
					<FontAwesomeIcon icon={play ? faStop : faPlay}  />
				</Button>}
				<Button onClick={() => setHide(!hide)} >
					<FontAwesomeIcon icon={hide ? faEyeSlash : faEye} />
				</Button>
			</div>
			{hide ? null :
				<div className="message-body">
					<img src={`/api/v0/images/${viewName}/${cameraName}.jpg`} alt={cameraName} />
				</div>
			}
		</article>
	);
}

export default Image;
