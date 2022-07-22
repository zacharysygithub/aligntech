import React, {useState} from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function InputPanel({id, refreshFeed}) {
    const [message, setMessage] = useState("");

    const handleClick = () => {
        postMessage();
    };

    const postMessage = async() => {
        const body = {
            "memberId": id,
            "message": message,
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

        await fetch("http://localhost:8080/feed/postMessage", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setMessage("");
            refreshFeed();
        });
    };

    return(
        <>
            <Container>
                <Row>
                    <Col>
                        <input type="text" id="message" placeholder="Type something here..." value={message} onChange={(e) => setMessage(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="secondary" size="sm" onClick={handleClick}>Post</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default InputPanel