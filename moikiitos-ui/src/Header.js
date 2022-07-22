import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import  { useNavigate } from 'react-router-dom'

function Header() {
    let nav = useNavigate();

    const logout = () => {
        console.log("logout");
        sessionStorage.removeItem("member_id");
        nav('/login')
    }

    return(
        <Container>
            <Row className="border">
                <Col><h1>Moi Kiitos</h1></Col>
                <Col className="col-2"><Button variant="secondary" size="sm" onClick={logout}>Logout</Button></Col>
            </Row>
        </Container>
    )
}

export default Header;