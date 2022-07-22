import Header from "./Header"
import Sidebar from "./Sidebar";
import React, {useEffect, useState} from "react";
import  { useNavigate } from 'react-router-dom'

import InputPanel from './InputPanel'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Feed() {
    const [id, setId] = useState();
    const [activeScreen, setActiveScreen] = useState("main");
    const [postDetails, setPostDetails] = useState([]);
    const [lastRefreshTime, setLastRefreshTime] = useState("1900-01-01T00:00:00.000Z");

    const [followings, setFollowings] = useState([]);
    const [followers, setFollowers] = useState([]);

    let nav = useNavigate();

    useEffect(() => {
        let loginId = sessionStorage.getItem("member_id");
        if (loginId) {
            setId(loginId);
        } else {
            nav('/login')
        }
    }, []);

    useEffect(() => {
        if (id) {
            refreshFeed();
            refreshSubs();
        }
    }, [id])

    useEffect(() => {
        if (id) {
            refreshFeed();
            refreshSubs();
        }
    }, [activeScreen]);

    const refreshFeed = async() => {
        const options = {
            method: 'GET',
            headers:  new Headers({ 
                'Content-Type': 'application/json'
            }),
        };

        await fetch("http://localhost:8080/feed/posts?id="+id+"&timestamp="+lastRefreshTime, options)
            .then(response => response.json())
            .then(data => {
                console.log(lastRefreshTime)
                console.log(data);
                if (data.length > 0) {
                    // setPostDetails([...data, ...postDetails]);
                    setPostDetails(data);
                    //setLastRefreshTime(data[0].timestamp);
                }
            });
    }

    const refreshSubs = async() => {
        const options = {
            method: 'GET',
            headers:  new Headers({ 
                'Content-Type': 'application/json'
            }),
        };

        await fetch("http://localhost:8080/subs/members?id="+id, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.length > 0) {
                    setFollowings(data);
                    let temp = [];
                    [...data].forEach(d => {
                        if (d.followerOfMember) {
                            temp.push(d);
                        }
                    });
                    setFollowers(temp);
                }
            });
    }

    const unfollow = async(memberId, followMemberId) => {
        console.log("UNFOLLOW", memberId, followMemberId);

        const body = {
            "memberId": memberId,
            "followMemberId": followMemberId
        };

        const options = {
            method: 'POST',
            headers:  new Headers({ 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(body)
        }
        await fetch("http://localhost:8080/subs/unfollow", options)
            .then(response => response.json())
            .then(data => {
                setLastRefreshTime("1900-01-01T00:00:00.000Z");
                refreshSubs();
            });
    }

    const follow = async(memberId, followMemberId) => {
        console.log("FOLLOW", memberId, followMemberId);

        const body = {
            "memberId": memberId,
            "followMemberId": followMemberId
        };

        const options = {
            method: 'POST',
            headers:  new Headers({ 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(body)
        }
        await fetch("http://localhost:8080/subs/follow", options)
            .then(response => response.json())
            .then(data => {
                setLastRefreshTime("1900-01-01T00:00:00.000Z");
                refreshSubs();
            });
    }

    const FeedPanel = () => {
        return (<>
            <Container>
            {
                postDetails && postDetails.map((detail, index) => {
                    let color = 'border bg-success';
                    if (detail.memberId == id) color = 'border bg-info';
                    return(
                        detail.memberId == id ?
                            <Row key={detail.id} className={color}>
                                <Col>{detail.message}</Col>
                                <Col className="col-2 border">{detail.name}</Col>
                            </Row>
                        :
                            <Row key={detail.id} className={color}>
                                <Col className="col-2 border">{detail.name}</Col>
                                <Col>{detail.message}</Col>
                            </Row>
                    )
                })
            }
            </Container>
        </>);
    };

    const FollowingPanel = () => {
        const [filter, setFilter] = useState("");

        return (<>
            <Container>
                <Row>
                    <Col><input type="text" id="filter" placeholder="Search by name/email" value={filter} onChange={(e) => setFilter(e.target.value)} /></Col>
                </Row>
                {
                    followings && followings.filter(f => f.followName.includes(filter) || f.followEmail.includes(filter) || filter === '').map((following, index) => {
                        let isFollow = following.followedByMember;
                        let color = 'border bg-muted';
                        if (isFollow) color = 'border bg-info';
                        return(
                            <Row key={following.followMemberId} className={color}>
                                <Col className="col-2 border">{following.followName}</Col>
                                <Col>{following.followEmail}</Col>
                                <Col className="col-1">{isFollow ? 
                                    <Button variant="danger" size="sm" onClick={() => unfollow(following.memberId, following.followMemberId)}>Unfollow</Button>
                                    : 
                                    <Button variant="info" size="sm" onClick={() => follow(following.memberId, following.followMemberId)}>Follow</Button>
                                }</Col>
                            </Row>
                        )
                    })
                }
            </Container>
        </>);
    }

    const FollowerPanel = () => {
        const [filter, setFilter] = useState("");

        return (<>
            <Container>
                <Row>
                    <Col><input type="text" id="filter" placeholder="Search by name/email" value={filter} onChange={(e) => setFilter(e.target.value)} /></Col>
                </Row>
                {
                    followers && followers.filter(f => f.followName.includes(filter) || f.followEmail.includes(filter) || filter === '').map((follower, index) => {
                        let isFollow = follower.followedByMember;
                        let color = 'border bg-muted';
                        if (isFollow) color = 'border bg-info';
                        return(
                            <Row key={follower.followMemberId} className={color}>
                                <Col className="col-2 border">{follower.followName}</Col>
                                <Col>{follower.followEmail}</Col>
                                <Col className="col-1">{isFollow ? 
                                    <Button variant="danger" size="sm" onClick={() => unfollow(follower.memberId, follower.followMemberId)}>Unfollow</Button>
                                    : 
                                    <Button variant="info" size="sm" onClick={() => follow(follower.memberId, follower.followMemberId)}>Follow</Button>
                                }</Col>
                            </Row>
                        )
                    })
                }
            </Container>
        </>);
    }

    return(
        <>
            <Container>
                <Row>
                    <Col><Header /></Col>
                </Row>
                <Row>
                    <Col className="col-2 border"><Sidebar setActive={setActiveScreen} 
                        followingCount={followings.filter(f => f.followedByMember).length} 
                        followerCount={followers.length} />
                    </Col>
                    {activeScreen === 'main' ? 
                        <Col>
                            <Container>
                                <Row><InputPanel id={id} refreshFeed={refreshFeed} /></Row>
                                <Row><FeedPanel /></Row>
                            </Container>
                        </Col>
                        :
                        activeScreen === 'following' ?
                        <Col>
                            <Container>
                                <Row><FollowingPanel /></Row>
                            </Container>
                        </Col>              
                        :
                        <Col>
                            <Container>
                                <Row><FollowerPanel /></Row>
                            </Container>
                        </Col>              
                    }
                </Row>
            </Container>
        </>
    );
}

export default Feed;