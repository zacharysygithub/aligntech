import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    let nav = useNavigate();

    const handleClick = () => {
        if (validate()) {
            registerMember();
        }
    }

    const validate = () => {
        if (!name || name === "") {
            setResponseMessage("Name is required")
            return false;
        }
        if (!email || email === "") {
            setResponseMessage("Email is required")
            return false;
        }
        if (!password || password === "") {
            setResponseMessage("Password is required")
            return false;
        }
        if (password !== confirm) {
            setResponseMessage("Password does not match")
            return false;
        }

        return true;
    }

    const registerMember = async() => {
        const body = {
            "name": name,
            "email": email,
            "password": password 
        };

        console.log(body);

        const options = {
            method: 'POST',
            headers:  new Headers({ 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(body)
        }
        await fetch("http://localhost:8080/register", options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setName("");
                setEmail("");
                setPassword("");
                setConfirm("");
                setResponseMessage("Member Successfully Registered")
                sessionStorage.setItem("member_id", data.id);
                sessionStorage.setItem("member_name", data.name);
                nav("/feed");
            });
    }

    return (
        <Container>
            Welcome
            <Row><Col><input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /></Col></Row>
            <Row><Col><input type="text" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /></Col></Row>
            <Row><Col><input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></Col></Row>
            <Row><Col><input type="password" id="confirm" placeholder="Password Confirmation" value={confirm} onChange={(e) => setConfirm(e.target.value)} /></Col></Row>
            <Row><Col>{responseMessage}</Col></Row>
            <Row><Col><Button onClick={handleClick}>Submit</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={() => nav("/login")}>Cancel</Button></Col></Row>
        </Container>
    );
}

export default Register