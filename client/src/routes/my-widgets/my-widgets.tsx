import "../../App.css";
import { Button, Card, Form, FloatingLabel, Row, Col, ButtonGroup, ToggleButton, CardGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { UserResponse, User } from "../../helper/types";
import { deleteArea, getArea, getAreas, NavbarLogged } from "..";

var arrTriggers : JSX.Element[] = [];
var arrReactions : string[] = [];

export default function MyWidgets() {
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
  const [Name, setName] = useState<string>("Tell me when my friend is logged on steam");
  const [ActionName, setActionName] = useState<string>("Steam");
  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: 'Active', value: '1' },
    { name: 'Inactive', value: '2' },
  ];
  
  const [ReactionNames, setReactionNames] = useState<Array<string>>(["Discord pm", "Discord Webkook"]);
  const [Areas, setAreas] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    async function fetchArea() {
      const result = await getAreas();
      
      // if (result.id[0] === "error") {
      //   navigate("/");
      // } to kick user if not logged

      if (result.length > 0) {
        for(let i = 0; i < result.length; i++) {
          for (let j = 0; j < result[i].reactionName[j].length; j++) {
            arrReactions.push(result[i].reactionName[j]);
          }
          setReactionNames(arrReactions);
          arrTriggers.push(
            <div key={result[i].id} className="trigger__card">
              <Card className="profile__card" style={{ width: '30rem' }}>
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }}>{result[i].name}</Card.Title>
                  <br/>
                  <Card.Text>
                    <Row>
                      <Col>
                        <p><a style={{ fontWeight: 'bold' }}>Action:</a> {result[i].actionName}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p><a style={{ fontWeight: 'bold' }}>Reactions:</a> {ReactionNames.join(' / ')}</p>
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    <Row><Col md={10} style={{marginTop: 5}}>
                    <ButtonGroup>
                      {radios.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          id={`radio-${idx}`}
                          type="radio"
                          variant={idx % 2 ? 'outline-danger' : 'outline-primary'}
                          name="radio"
                          value={radio.value}
                          checked={radioValue === radio.value}
                          onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                          {radio.name}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>
                    </Col>
                    <Col md={1} style={{marginTop: 5}}>
                    <Button variant="danger" onClick={ async () => {
                      const result = await deleteArea("");
                      if (result === 0) {
                        window.location.reload();
                      }
                    }}><FontAwesomeIcon icon={faTrash} style={{color: 'white'}}/></Button>
                    </Col></Row>
                  </small>
                </Card.Footer>
              </Card>
            </div>
          );
        }
      }
      setAreas(arrTriggers);
    }
    fetchArea();
  }, []);

  return (
    <>
    <CardGroup>

    {/* test purposes */}
    <div className="trigger__card">
      <Card className="profile__card" style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{Name}</Card.Title>
          <br/>
          <Card.Text>
            <Row>
              <Col>
                <p><a style={{ fontWeight: 'bold' }}>Action:</a> {ActionName}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p><a style={{ fontWeight: 'bold' }}>Reactions:</a> {ReactionNames.join(' / ')}</p>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <small className="text-muted">
          <Row>
            <Col md={10} style={{marginTop: 5}}>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-danger' : 'outline-primary'}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
            <Col md={1} style={{marginTop: 5}}>
              <Button variant="danger" onClick={ async () => {
                const result = await deleteArea("");
                if (result === 0) {
                  window.location.reload();
                }
              }}><FontAwesomeIcon icon={faTrash} style={{color: 'white'}}/></Button>
            </Col>
          </Row>
        </small>
        </Card.Footer>
      </Card>
    </div>
    <div className="trigger__card">
      <Card className="profile__card" style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{Name}</Card.Title>
          <br/>
          <Card.Text>
            <Row>
              <Col>
                <p><a style={{ fontWeight: 'bold' }}>Action:</a> {ActionName}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p><a style={{ fontWeight: 'bold' }}>Reactions:</a> {ReactionNames.join(' / ')}</p>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <small className="text-muted">
          <Row><Col md={10} style={{marginTop: 5}}>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-danger' : 'outline-primary'}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          </Col>
          <Col md={1} style={{marginTop: 5}}>
          <Button variant="danger" onClick={ async () => {
            const result = await deleteArea("");
            if (result === 0) {
              window.location.reload();
            }
          }}><FontAwesomeIcon icon={faTrash} style={{color: 'white'}}/></Button>
          </Col></Row>
        </small>
        </Card.Footer>
      </Card>
    </div>
    {/* test purposes */}

    {Areas}

    </CardGroup>
    </>
  );
}