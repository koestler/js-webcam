import React from 'react'
import { Footer, Container, Content } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const FooterComponent = () => {
  return (
    <Footer>
      <Container>
        <Content style={{ textAlign: 'center' }}>
          <p>
            <strong>js-webcam</strong> by <a href='https://github.com/koestler/'>Lorenz</a>.
            The source code is available under <a href='https://github.com/koestler/js-webcam/blob/main/LICENSE'>MIT</a> on <a href='https://github.com/koestler/js-webcam'><FontAwesomeIcon icon={faGithub} /></a>.
          </p>
        </Content>
      </Container>
    </Footer>
  )
}

export default FooterComponent