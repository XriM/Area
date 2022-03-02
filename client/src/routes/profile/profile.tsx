import "../../App.css";
import { Button, Card, Form, FloatingLabel, Row, Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { UserResponse, User } from "../../helper/types";
import { NavbarLogged, deleteAccount, signout, getUser, TrelloSignin, GithubSignin,
  RedditSignin, YoutubeSignin, OutlookSignin } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

let id = "";

export default function Profile() {
  return (
    <>
    <div className="area" >
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <NavbarLogged />
      <Body />
    </div>
    </>
  );
}

function Body() {
  let navigate = useNavigate();

  const [Email, setEmail] = useState<string>("email@live.fr");
  const [Password, setPassword] = useState<string>("Password123");
  const [Username, setUsername] = useState<string>("USERNAME");

  useEffect(() => {
    async function fetchProfile() {
      const result = await getUser();
      if (result.id !== "") {
        setEmail(result.email);
        setPassword(result.password);
        setUsername(result.username);
      }
      else if (result.id === "") {
        navigate("/");
      }
    }
    //fetchProfile();
  }, []);

  return (
    <>
    <Row>
      <Col>
      <div className="profile__content">
        <Card className="profile__card" style={{ width: '22rem' }}>
          <Card.Img variant="top" style={{maxWidth: '600px', maxHeight: '400px'}} src="https://i.insider.com/61cc84b94710b10019c77960?width=700" />
          <Card.Body>
            <Card.Title>{Username}</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                  <Form.Control
                    disabled
                    type="text"
                    value={Email}
                  />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Password"
                    className="mb-3"
                  >
                  <Form.Control
                    disabled
                    type="text"
                    value={Password}
                  />
                  </FloatingLabel>
                </Form.Group>
              </Form>
            </Card.Text>
            <Button variant="danger" className="secondary__btn__color" onClick={ async () => {
              const result = await signout();
              if (result === 0) {
                navigate("/");
              }
            }}>Signout</Button>
            <br/>
            <Button variant="danger" className="secondary__btn__color" style={{ marginTop: 10 }} onClick={ async () => {
              const result = await deleteAccount();
              if (result === 0) {
                navigate("/");
              }
            }}>Delete account</Button>
          </Card.Body>
        </Card>
      </div>
      </Col>
      <Col>
        <ProfileServices />
      </Col>
    </Row>
    </>
  );
}

function ProfileServices() {
  let navigate = useNavigate();

  return (
    <div className="profile__services">
      <Card className="profile__card" style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>My services</Card.Title>
          <Card.Text>
            <div className="row__services">
            <Row>
              <Col md={10}>
                <a><Image fluid={true} srcSet="data:image/png;base64,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"  style={{width: 50, height: '1rem', objectFit: 'cover'}}></Image>Outlook</a>
              </Col>
              <Col md={1}>
                <Button className="principal__btn__color" onClick={ () => { navigate("/outlook-onedrive") }}><FontAwesomeIcon icon={faLink} style={{color: 'white'}}/></Button>
              </Col>
            </Row>
            </div>
            <div className="row__services">
            <Row>
              <Col md={10}>
                <a><Image fluid={true} srcSet="https://logo-marque.com/wp-content/uploads/2021/02/Trello-Embleme.jpg" style={{width: 50}}></Image>Trello</a>
              </Col>
              <Col md={1}>
                <TrelloSignin/>
              </Col>
            </Row>
            </div>
            <div className="row__services">
            <Row>
              <Col md={10}>
                <a><Image fluid={true} srcSet="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" style={{width: 50, height: '1rem', objectFit: 'cover'}}></Image>Youtube</a>
              </Col>
              <Col md={1}>
                <YoutubeSignin/>
              </Col>
            </Row>
            </div>
            <div className="row__services">
            <Row>
              <Col md={10}>
                <a><Image fluid={true} srcSet="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" style={{width: 50, height: '1rem', objectFit: 'cover'}}></Image>Github</a>
              </Col>
              <Col md={1}>
                <GithubSignin/>
              </Col>
            </Row>
            </div>
            <div className="row__services">
            <Row>
              <Col md={10}>
                <a><Image fluid={true} srcSet="https://cdn-icons-png.flaticon.com/512/1384/1384067.png" style={{width: 50, height: '1rem', objectFit: 'cover'}}></Image>Reddit</a>
              </Col>
              <Col md={1}>
                <RedditSignin/>
              </Col>
            </Row>
            </div>
            <div className="row__services">
            <Row>
              <Col md={10}>
                <a><Image fluid={true} srcSet="https://ih1.redbubble.net/image.1121504414.0314/pp,840x830-pad,1000x1000,f8f8f8.jpg" style={{width: 50, height: '1rem', objectFit: 'cover'}}></Image>OneDrive</a>
              </Col>
              <Col md={1}>
                <Button className="principal__btn__color" onClick={ () => { navigate("/outlook-onedrive") }}><FontAwesomeIcon icon={faLink} style={{color: 'white'}}/></Button>
              </Col>
            </Row>
            </div>
          </Card.Text>
          
        </Card.Body>
      </Card>
    </div>
  );
}