import React from 'react'
import {Image,Form,Button,Row,Col, Container} from 'react-bootstrap'
const FormContainer = ({children}) => {
    console.log(children);
    console.log("IN FORC");
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                         {children}
                      </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
