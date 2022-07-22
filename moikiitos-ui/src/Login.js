import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    let nav = useNavigate();

    const handleClick = () => {
        if (validate()) {
            login();
        }
    }

    const validate = () => {
        if (!email || email === "") {
            setResponseMessage("Email is required")
            return false;
        }
        if (!password || password === "") {
            setResponseMessage("Password is required")
            return false;
        }
        return true;
    }

    const login = async() => {
        const options = {
            method: 'GET',
            headers:  new Headers({ 
                'Content-Type': 'application/json'
            }),
        }
        await fetch("http://localhost:8080/login?email="+email+"&password="+password, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                sessionStorage.setItem("member_id", data.id);
                sessionStorage.setItem("member_name", data.name);
                nav('/feed')
            });
    }

    return (
        <Container>
            <Row><Col>Login</Col></Row>
            <Row>
                <Col>
                    <input type="text" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Col>
            </Row>
            <Row><Col>{responseMessage}</Col></Row>
            <Row>
                <Col>
                    <Button onClick={handleClick}>Login</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={() => nav("/register")}>Register</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;