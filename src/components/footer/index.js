import { h } from 'preact';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
	return	<footer class="footer">
  <div class="content has-text-centered">
    <p>
		<strong>js-webcam</strong> by <a href="https://github.com/koestler/">Lorenz</a>.
		The source code is available under <a href="https://github.com/koestler/js-webcam/blob/main/LICENSE">MIT</a> on <a href="https://github.com/koestler/js-webcam"><FontAwesomeIcon icon={faGithub} /></a>.
    </p>
  </div>
</footer>
}

export default Footer;
