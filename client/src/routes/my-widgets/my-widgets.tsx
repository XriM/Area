import "../../App.css";
import { Button, Card, Form, FloatingLabel, Row, Col, ButtonGroup, ToggleButton, CardGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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
  const [Name, setName] = useState<string>("Area X");
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
          var checkbox = "checkbox" + i;
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
                    <CheckBoxWrapper>
                      <CheckBox id={checkbox} type="checkbox" />
                      <CheckBoxLabel htmlFor={checkbox} />
                    </CheckBoxWrapper>
                    </Col>
                    <Col md={1} style={{marginTop: 5}}>
                    <Button variant="danger" className="secondary__btn__color" onClick={ async () => {
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
          <Card.Text>
            <br/>
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
              <CheckBoxWrapper>
                <CheckBox id="checkbox" type="checkbox" />
                <CheckBoxLabel htmlFor="checkbox" />
              </CheckBoxWrapper>
            </Col>
            <Col md={1}>
              <Button variant="danger" className="secondary__btn__color" onClick={ async () => {
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
          <Row>
            <Col md={10} style={{marginTop: 5}}>
            <CheckBoxWrapper>
              <CheckBox id="checkbox1" type="checkbox" />
              <CheckBoxLabel htmlFor="checkbox1" />
            </CheckBoxWrapper>
          </Col>
          <Col md={1}>
          <Button variant="danger" className="secondary__btn__color" onClick={ async () => {
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

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;