import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
const Footer = () => {
    return (
        <footer>

            <Container>
                <Row>
                {/* py is padding on y axis */}
                    <Col className='text-center py-3'>
                        Copyrigt &copy; E-COm
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
