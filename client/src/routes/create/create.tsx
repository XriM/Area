import "../../App.css";
import { Button, Card, Form, Row, Col, Accordion, FloatingLabel, Modal, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { UserResponse, User } from "../../helper/types";
import { deleteArea, getArea, getAreas, NavbarLogged } from "..";

var reaction : string = "";
var action : string = "";

export default function CreateTrigger() {
  return (
    <>
    <div className="area__cover">
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [finalAction, setAction] = useState<string>("Outlook");
  const [finalReaction, setReaction] = useState<string>("discord ping");

  function OutlookAction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Action</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Gmail configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This action triggers when you receive an <a style={{fontWeight: 'bold'}}>important</a> email. Please connect your email if not already done on your profile page.
          <br/>
          <br/>
          <Button variant="primary" className="secondary__btn__color" style={{marginBottom: 20}} onClick= { () => {
            // gmail oauth
          }}>Link your gmail account</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              action = "Gmail";
              handleClose();
            }}
            >
              Select Action
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick={handleClose}>
              Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function CryptoAction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualCurrency, setCurrency] = useState<string>("");
    const [actualMaxValue, setMaxValue] = useState<string>("");
    const [actualMinValue, setMinValue] = useState<string>("");
    var currency : string = "";
    var maxValue : string = "";
    var minValue : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Action</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crypto-currencies configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This action triggers when a choosen <a style={{fontWeight: 'bold'}}>crypto-currency</a> hits the <a style={{fontWeight: 'bold'}}>value</a> you asked for.
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Currency" className="mb-3">
              <Form.Control required type="text" value={actualCurrency}
                onChange={(e) => {
                  currency = e.target.value;
                  setCurrency(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Price Max" className="mb-3">
              <Form.Control required type="text" value={actualMaxValue}
                onChange={(e) => {
                  maxValue = e.target.value;
                  setMaxValue(e.target.value);
                }}/>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Price Min" className="mb-3">
              <Form.Control required type="text" value={actualMinValue}
                onChange={(e) => {
                  minValue = e.target.value;
                  setMinValue(e.target.value);
                }}/>
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              action = "Crypto";
              handleClose();
            }}>
              Select Action
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setCurrency("");
              setMaxValue("");
              setMinValue("");
              handleClose();
            }}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function SteamAction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualGame, setGame] = useState<string>("");
    var gameId : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Action</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Steam configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This action triggers how much players are connected on a specific <a style={{fontWeight: 'bold'}}>game</a> every 5 minutes. Please enter the <a style={{fontWeight: 'bold'}}>ID</a> of the game that you want to monitor.
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Game ID" className="mb-3">
              <Form.Control required type="text" value={actualGame}
                onChange={(e) => {
                  gameId = e.target.value;
                  setGame(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              action = "Steam";
              handleClose();
            }}>
              Select Action
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setGame("");
              handleClose();
            }}>
              Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function WeatherAction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualCity, setCity] = useState<string>("");
    const [actualTemperatureMin, setTemperatureMin] = useState<string>("");
    const [actualTemperatureMax, setTemperatureMax] = useState<string>("");
    var city : string = "";
    var temperatureMin : string = "";
    var temperatureMax : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Action</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Weather configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This action triggers when a choosen <a style={{fontWeight: 'bold'}}>temperature</a> is reached in a <a style={{fontWeight: 'bold'}}>city</a>.
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="City" className="mb-3">
              <Form.Control required type="text" value={actualCity}
                onChange={(e) => {
                  city = e.target.value;
                  setCity(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Temperature Max" className="mb-3">
              <Form.Control required type="text" value={actualTemperatureMax}
                onChange={(e) => {
                  temperatureMax = e.target.value;
                  setTemperatureMax(e.target.value);
                }}/>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Temperature Min" className="mb-3">
              <Form.Control required type="text" value={actualTemperatureMin}
                onChange={(e) => {
                  temperatureMin = e.target.value;
                  setTemperatureMin(e.target.value);
                }}/>
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              action = "Weather";
              handleClose();
            }}>
              Select Action
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setCity("");
              setTemperatureMin("");
              setTemperatureMax("");
              handleClose();
            }}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function GithubAction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualRepo, setRepo] = useState<string>("");
    var repoUrl : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Action</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Github configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This action triggers when something happens on a specific <a style={{fontWeight: 'bold'}}>repository</a>. Please enter the <a style={{fontWeight: 'bold'}}>link</a> of the repository you want to monitor.
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Repository link" className="mb-3">
              <Form.Control required type="text" value={actualRepo}
                onChange={(e) => {
                  repoUrl = e.target.value;
                  setRepo(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              action = "Github";
              handleClose();
            }}>
              Select Action
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setRepo("");
              handleClose();
            }}>
              Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function TrelloReaction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualTitle, setTitle] = useState<string>("");
    const [actualDescription, setDescription] = useState<string>("");
    const [actualBoard, setBoard] = useState<string>("");
    const [actualList, setList] = useState<string>("");
    var title : string = "";
    var description : string = "";
    var board : string = "";
    var list : string = "";

    var boards : Array<string> = [];
    var lists : Array<string> = [];

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Reaction</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Trello configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This Reaction will create a card in the board and list you desire.
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Board ID" className="mb-3">
              <Form.Control required type="text" value={actualBoard}
                onChange={(e) => {
                  board = e.target.value;
                  setBoard(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="List ID" className="mb-3">
              <Form.Control required type="text" value={actualList}
                onChange={(e) => {
                  list = e.target.value;
                  setList(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
              <Form.Control required type="text" value={actualTitle}
                onChange={(e) => {
                  title = e.target.value;
                  setTitle(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
              <Form.Control as="textarea" value={actualDescription}
                onChange={(e) => {
                  description = e.target.value;
                  setDescription(e.target.value);
                }}/>
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              reaction = "TrelloCard";
              handleClose();
            }}>
              Select Reaction
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setTitle("");
              setDescription("");
              handleClose();
            }}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function DiscordWebhookReaction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualWebhook, setWebhook] = useState<string>("");
    const [actualMessage, setMessage] = useState<string>("");
    var webhook : string = "";
    var message : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Reaction</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Discord webhook configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This Reaction will send a <a style={{fontWeight: 'bold'}}>webhook</a> in your server.
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Webhook link" className="mb-3">
              <Form.Control required type="text" value={actualWebhook}
                onChange={(e) => {
                  webhook = e.target.value;
                  setWebhook(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea" label="Message" className="mb-3">
              <Form.Control as="textarea" value={actualMessage}
                onChange={(e) => {
                  message = e.target.value;
                  setMessage(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              reaction = "DiscordWebhook";
              handleClose();
            }}>
              Select Reaction
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setWebhook("");
              setMessage("");
              handleClose();
            }}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function DiscordMessageReaction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualUser, setUser] = useState<string>("");
    const [actualMessage, setMessage] = useState<string>("");
    var user : string = "";
    var message : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Reaction</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Discord message configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This Reaction will send a <a style={{fontWeight: 'bold'}}>message</a> to a user.
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="User#0000" className="mb-3">
              <Form.Control required type="text" value={actualUser}
                onChange={(e) => {
                  user = e.target.value;
                  setUser(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea" label="Message" className="mb-3">
              <Form.Control as="textarea" value={actualMessage}
                onChange={(e) => {
                  message = e.target.value;
                  setMessage(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              reaction = "DiscordWebhook";
              handleClose();
            }}>
              Select Reaction
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setUser("");
              setMessage("");
              handleClose();
            }}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function SheetsReaction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualSheetID, setSheetID] = useState<string>("");
    const [actualText, setText] = useState<string>("");
    var sheetID : string = "";
    var text : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Reaction</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Google sheets configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This Reaction will add a new row to the <a style={{fontWeight: 'bold'}}>spreadsheet</a> you desire.
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Spreedsheet ID" className="mb-3">
              <Form.Control required type="text" value={actualSheetID}
                onChange={(e) => {
                  sheetID = e.target.value;
                  setSheetID(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea" label="Text" className="mb-3">
              <Form.Control as="textarea" value={actualText}
                onChange={(e) => {
                  text = e.target.value;
                  setText(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              reaction = "Sheets";
              handleClose();
            }}>
              Select Reaction
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setSheetID("");
              setText("");
              handleClose();
            }}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function WhatsappReaction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualNumber, setNumber] = useState<string>("");
    const [actualText, setText] = useState<string>("");
    var number : string = "";
    var text : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Reaction</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Whatsapp configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This Reaction will send a <a style={{fontWeight: 'bold'}}>whatsapp message</a> to any number.
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Phone number with +XX at the start" className="mb-3">
              <Form.Control required type="text" value={actualNumber}
                onChange={(e) => {
                  number = e.target.value;
                  setNumber(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea" label="Text" className="mb-3">
              <Form.Control as="textarea" value={actualText}
                onChange={(e) => {
                  text = e.target.value;
                  setText(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              reaction = "Whatsapp";
              handleClose();
            }}>
              Select Reaction
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setNumber("");
              setText("");
              handleClose();
            }}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function GmailReaction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualEmail, setEmail] = useState<string>("");
    const [actualText, setText] = useState<string>("");
    var email : string = "";
    var text : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Reaction</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Email configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This Reaction will send an <a style={{fontWeight: 'bold'}}>email</a> to any adress.
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Email receiver" className="mb-3">
              <Form.Control required type="text" value={actualEmail}
                onChange={(e) => {
                  email = e.target.value;
                  setEmail(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea" label="Text" className="mb-3">
              <Form.Control as="textarea" value={actualText}
                onChange={(e) => {
                  text = e.target.value;
                  setText(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              reaction = "Gmail";
              handleClose();
            }}>
              Select Reaction
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setEmail("");
              setText("");
              handleClose();
            }}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  return (
    <>
    <Container>
      <br/>
      <Row>
        <Accordion defaultActiveKey={['0']}>
          {/* Action */}
          <Accordion.Item eventKey="0">
            <Accordion.Header><a style={{color: '#2C8DF1', fontWeight: 'bold'}}>Select an action to trigger <a style={{fontStyle: 'italic', color: 'lightgrey'}}>Selected : {action}</a></a></Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="data:image/png;base64,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" />
                    <Card.Body>
                      <Card.Title>Outlook</Card.Title>
                      <OutlookAction/>
                    </Card.Body>
                  </Card>
                  </Col>
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="http://pngimg.com/uploads/bitcoin/bitcoin_PNG48.png" />
                    <Card.Body>
                      <Card.Title>Crypto-currencies</Card.Title>
                      <CryptoAction/>
                    </Card.Body>
                  </Card>
                </Col> 
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://www.isnotdown.com/assets/pics/steam.png" />
                    <Card.Body>
                      <Card.Title>Steam</Card.Title>
                      <SteamAction/>
                    </Card.Body>
                  </Card>
                </Col>
              
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://icones.pro/wp-content/uploads/2021/07/icone-meteo-bleue.png" />
                    <Card.Body>
                      <Card.Title>Weather</Card.Title>
                      <WeatherAction/>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={1} style={{marginTop: 5}}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
                    <Card.Body>
                      <Card.Title>Github</Card.Title>
                      <GithubAction/>
                    </Card.Body>
                  </Card>
                </Col> 
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          {/* Reactions */}
          <Accordion.Item eventKey="1">
            <Accordion.Header><a style={{color: '#FE9455', fontWeight: 'bold'}}>Add reaction(s) <a style={{fontStyle: 'italic', color: 'lightgrey'}}>Selected : {reaction}</a></a></Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://logo-marque.com/wp-content/uploads/2021/02/Trello-Embleme.jpg" />
                    <Card.Body>
                      <Card.Title>Trello</Card.Title>
                      <Card.Text>Add a Trello card on your board</Card.Text>
                        <TrelloReaction/>
                    </Card.Body>
                  </Card>
                  </Col>
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://is3-ssl.mzstatic.com/image/thumb/Purple126/v4/b1/3f/3d/b13f3d08-4dc8-f637-348d-9750e7b2c15b/source/512x512bb.jpg" />
                    <Card.Body>
                      <Card.Title>Google sheets</Card.Title>
                      <Card.Text>Add a row on your spreadsheet</Card.Text>
                        <SheetsReaction/>
                    </Card.Body>
                  </Card>
                </Col> 
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Discord_Logo_sans_texte.svg/1818px-Discord_Logo_sans_texte.svg.png" />
                    <Card.Body>
                      <Card.Title>Discord</Card.Title>
                      <Card.Text>Get ping by private message</Card.Text>
                        <DiscordMessageReaction/>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Discord_Logo_sans_texte.svg/1818px-Discord_Logo_sans_texte.svg.png" />
                    <Card.Body>
                      <Card.Title>Discord</Card.Title>
                      <Card.Text>Receive a webhook in your server</Card.Text>
                        <DiscordWebhookReaction/>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row style={{marginTop: 5}}>
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="data:image/png;base64,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" />
                    <Card.Body>
                      <Card.Title>Email</Card.Title>
                      <Card.Text>Receive an email</Card.Text>
                        <GmailReaction/>
                    </Card.Body>
                  </Card>
                  </Col>
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png" />
                    <Card.Body>
                      <Card.Title>Whatsapp</Card.Title>
                      <Card.Text>Receive a whatsapp text</Card.Text>
                        <WhatsappReaction/>
                    </Card.Body>
                  </Card>
                </Col> 
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="" />
                    <Card.Body>
                      <Card.Title>Other</Card.Title>
                      <Card.Text>Add a line on your spreadsheet</Card.Text>
                      <Button variant="primary" className="principal__btn__color" onClick= { () => {
                        handleShow();
                      }}>Configure Reaction</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      <br/>
    </Container>

    <Row>
      <Col md={12} className="centered__bottom__buttons">
        <Button variant="primary" className="secondary__btn__color" style={{marginBottom: 20}} onClick= { () => {
          handleShow();
        }}>Add an AREA</Button>
      </Col>
    </Row>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
