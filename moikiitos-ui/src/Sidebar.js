import React, {useEffect, useState} from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Sidebar({setActive, followingCount, followerCount}) {
    const [name, setName] = useState("");

    useEffect(() => {
        setName(sessionStorage.getItem("member_name"));
    }, []);

    return(
        <Container>
            <Row><Col><Button variant="primary" onClick={() => setActive('main')}>{name}</Button></Col></Row>
            <hr />
            <Row><Col><Button variant="info" onClick={() => setActive('following')}>Following: {followingCount}</Button></Col></Row>
            <br />
            <Row><Col><Button variant="info" onClick={() => setActive('follower')}>Followers: {followerCount}</Button></Col></Row>
        </Container>
    );
}

export default Sidebar;