import "../../App.css";
import { Button, Card, Form, FloatingLabel, Row, Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { UserResponse, User } from "../../helper/types";
import { NavbarLogged, deleteAccount, signout, getUser, Trello, Github } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { SheetsSignin } from "../../helper/services/sheets";

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
                <Button className="principal__btn__color"><FontAwesomeIcon icon={faLink} style={{color: 'white'}}/></Button>
              </Col>
            </Row>
            </div>
            <div className="row__services">
            <Row>
              <Col md={10}>
                <a><Image fluid={true} srcSet="https://logo-marque.com/wp-content/uploads/2021/02/Trello-Embleme.jpg" style={{width: 50}}></Image>Trello</a>
              </Col>
              <Col md={1}>
                <Trello/>
              </Col>
            </Row>
            </div>
            <div className="row__services">
            <Row>
              <Col md={10}>
                <a><Image fluid={true} srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAApVBMVEX///8ipGaOzq8ajloAn1xtbnFpam3I49S84c4AnVhnaGu13MgAn13i8+sOoF9kZWkrp2v5/fuVz7Hr9/FatIRfYGTx8fHBwcLLy8xQtIJUq4KGh4mbm534+PiGy6lxcnWxsbMAjFLX7ePb29ySk5V5enzExMV8xJ+oqKrh4eKCg4Wtra/g4OBwwpqs2cLr6+sfm2FAnnEsom1UVVkAmU6i1rxBsHq/hCkpAAAKEElEQVR4nO2da3ubuBKAcTZSap3ESpoK6AEWNlwW42TZ3fT0//+0MyNxi21S20BN43k/9GlkYZu3IzQSQ2NZBEEQBEEQBEEQBEEQBEEQBEEQBEEQxAXyeHcE5/6yM+PxZXV7OMsv/zn3F54VN6vV4ghWv798OvdXnhF3y2Pkob6rF4q/hpejYk/rI38Nj7fH2dP6yF/N05Fj1+gjfxWfrk/Sd/Xy17m/+Sw4VR/Fn+ZkfRR/yOn6KP6sQfoo/obpo/gbpo/ib5i+i4+/gfouPf6G6rvw+Bus77Ljb7i+i/Y3gr5L9jeGvgv2N4q+y/U3jr6L9TeSvkv1N5a+C/U3mr7L9He8vpcefRfp72h9i6+fD/a3dpIiTD3fDYZ8xbIsBx0/JcfrW/SN3qurP9/4e/ak4IwxziWPTv+GgeLKHXiWk3GCvvt+f934yxW440JKAQplWp76DQPF5EfSt1j0Xv4+N/EXFBKkhb7jZptCcsbDUwfgx9O3+vuf//bw741530QwEdZnDcOYU/R1+Pu3Hv4w238byaTf+ZjN+uRv+BH19foz+krJRDLSN/yQ+vr8GX0+Z+lY3/Bj6uvxp/UF7P0zDnYSOdveaiibhq6+YLvbuTld32LRqy+WjPd+YhCFUkqWtyZcDxpkEjcNcaIg39kEcRQ5rb7ASaGbF+++5fkYom+fP63PEdzv+8CYQUYDCF6HVIIJIqSIqj4ml7pBpr6URaOvDKXpNtZFdQwG6dvjT+vLuYjqD7ATvwECLlZgToYCVFRriVQwLkMGyqSnG3zMGHmIySLjXq2vhBWM4Ck4FMU5RO1nmL5df1qfz4VTf0CpeI16tmyIHxWVge2GkBhiLugLSHHKIChzyHU20ODCyOeuHawT0NjqK0DvxraCDPpH57K1w0B9O/5M9Ik2+hp9EFIxvMJ4lQImnMMwXMvGRiaZgvgMGatWKNi51uc2E0jCmTo5Bx+bofq2/e1c++rBm4C+tQV/1HEZhEwF1ka0KY4OWph2mom2M3h9LdsqcxjRQjnWTBisbyuB0fqe4Yy3PwjCjNtl94WcQzgWnXG+lqAoEm2XnDf6UvwDZmQB18loPunLcH1v/Zm0GWaCbOuDHMFCDK02nc4kGAlxSFfYjBegrO0CUVzrCxnPU8m5LIZtHo7MCPre+DP6IIS2d1hSJnLrWYLDGq0v7STYJQZbLnr06X1D//S18ySMoa/rz+gLJF61ukQSL/iBmR0MPocWuN5t6gZXgmEHrn21+aQdvAVM2XMatRWj6Ov4q3ZcIPsQXudkQYrA2cRMt5qSYyRix7ofzCUxzNSsnrbhr40+iOe633o28+5Y+lp/lT5YOcAUWU8KmMKZ/dK4yVPs0OTNKedmJzrQsaYTE6HHs5128j4bVBY6KsuQz2biHUtf46/WZ+WwvJAq2USRnypcQJiYweS4cOI4F9WGIM7IMnfdCNcY2MeGDFElmRthqtimzRH+e2wyB9ckr89nsrXDWPpqf40+KxMC73UIfbtIFvUIxdMXEpdo1SiOoQPHOyKcP79tEGFHn+Xr5R6+286sfj5G01cl0K0+K9iEkKYBUqWdE86gVcCatxmBdqIkNKjEbhvgOCEdM3W8SrM6dpjEZpXOJvZG1bfY0gfEkZ8kubN1rY8dx4m7eU2ZOU7WnVXXcFxUWh7H1Uscx+a1wM0TP/o4G1Z7/P0xZqlzCrnyiG83AaPqW4yiL/aqRLqc8za9YVx9ixH0+YqHZrR7vM0JZ8rI+hbD9ZW4qRzFcZZyXOfNm7H1XQ8fvI5JbXCzNPxx7/OyV9/9wewcejvC1OEyfbODS2/mQ3e/vuXdw4FYX6bQZwVOErLUn/m0gezV93jw4dPo+3WYTp8du/HMdufGZyp96wSv/jI1A9D2kt4bv780E+nL8C4tru+VTj1sxUereZkV/fr+7PzvTNdX2PK0XLVc68N79LmKcZZnTlLVqdnq+JKh2P2lp46uvlWlr9NppQ/v0Zdynug9AVfgDvIp+gImX8c7zamYRB9uuFfv74i8PE1fytRYJzkdk+iLZXNHw5SUkT7rKH1btip9wdYTGvZWWV9g2+3rb/TZ63k+29Gv72V53bA0+r51Wpb68P36AtHWYmhAX2GVPleK+7WGYJNyxYuo6fTsh1KGpswv8v2Qcd/39V1Mt5BKMX9Gu8w1/fqePnV4wpaHmy768J6pQ98Q6pwtJC5JrCTe4hDMRFyMG/SQ2khW9fMVZoqCK5x0PL3qhR4FDmOJj4dwrqKfpuVQJsr7Urx/5mV1pOHgDZWfOb6qasZjxeBn1wGdUu/u+eAnijPogGV+CQvxvnjIPF3Cxp3YhVfm93TRVKuOHG+dSZWYZZutWFXLEutqAyw3EHHVUd/dzWAc65/LsBr4zbUPjtUBG6twPjd4KyZb85YbHKrVgLPb0gGf4wb8pq0ALLhc66Ki6oZSLLTIZubV103zyvxmj359V19bvv8PW+6+d5q+6sPf3XGJE17dzsXoqxozieLStpAlE1jVp9qKwJRxu5u4QKDmc934eydx6bxyvZO4rG714T/YsLI9U5QBU0ddMeSiPtTpVRR4O80RLK0bTM1aq8+B0OVFPqsblDXTLNpacsFYgPrq4IpR3xqrv1t0WZpof8YpopM2O0ziXfO24Hc+TK0Php5a68Sl+tnoU8zLnAYXroV802lYv111BFkC9iAXmt3Fb5o176YtjkywBHdbH0y8b58ucKTYKlzZXrQ953y85+RG4x19ne2petXRtty+t2GVynbRUeyLPmxtZgP8y3N7cbSqioxWXz0lc7wOzIt+fQ+PHR50526LSW7263Nlk4bAMOXBrr5INrqcV7/UU3EdfqmuHjKF9/gOyWv1SsFPfyp4IqbJ+woIFL1CcENdVbqjz4IVmdkRdIxqWIWYEnvb40KbTZkp28XCSD3rrnmT/cyGafTZjOOT+Ak+QpUG+/RhVaRINjn0MEuxDazWwnyTwPo21V5h3SzCMNKJi0ocrIuc36K3X9/jzuB9OHTwwuWqkOZZIumhC1vJRp8yEp4FFuvhlkGV0G3w8SNok0l1gcPnEATWGTiq2l2YX8lGv74v35YN3z5jy1On5d0NK8RNQgUBaNzYSRJV7WWem4V/EKUC8pd2Gas3rNLOc6mRl3rmTlOecnivX2rDqvuLPFZ60XZk3hcEP5ond3r0H/HD9zoPE+q7BEjfIA7brK+vfded3Xp9OOnr0/dms17/craHbov5dVmkr0/fQZA+0jcA0jcI0jeIffpWv38+lO+kb4+/g9k5lPQNgvSRvsMhfYMgfYMgfYMgfYMgfYMgfYMgfYO4IX1DuBtZ3/Lp3Gf0c/k6rr77c5/PT+bm2N/t/i7Lyxq7wF8j+lt+PvfZ/Hxu7q9H4v7Tuc/lLNzdjMKFzRoEQRAEQRAEQRAEQRAEQRAEQRAEQRDET+f/VKQZes9zobYAAAAASUVORK5CYII=" style={{width: 50}}></Image>Google sheets</a>
              </Col>
              <Col md={1}>
                <SheetsSignin/>
              </Col>
            </Row>
            </div>
            <div className="row__services">
            <Row>
              <Col md={10}>
                <a><Image fluid={true} srcSet="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" style={{width: 50, height: '1rem', objectFit: 'cover'}}></Image>Github</a>
              </Col>
              <Col md={1}>
                <Github/>
              </Col>
            </Row>
            </div>
          </Card.Text>
          
        </Card.Body>
      </Card>
    </div>
  );
}