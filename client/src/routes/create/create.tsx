import "../../App.css";
import { Button, Card, Form, Row, Col, Accordion, FloatingLabel, Modal, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { UserResponse, User } from "../../helper/types";
import { deleteArea, getArea, getAreas, NavbarLogged } from "..";

var reaction : Array<string> = [];
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

  const [finalAction, setAction] = useState<string>("Gmail");
  const [reactions, setReactions] = useState<Array<string>>(["discord ping", "whatsapp"]);

  function GmailAction() {
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
    const [actualPrice, setPrice] = useState<string>("");
    var currency : string = "";
    var price : string = "";

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
              <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
              <Form.Control required type="text" value={actualPrice}
                onChange={(e) => {
                  price = e.target.value;
                  setPrice(e.target.value);
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
              setPrice("");
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
    const [actualTemperature, setTemperature] = useState<string>("");
    var currency : string = "";
    var price : string = "";

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
                  currency = e.target.value;
                  setCity(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Temperature" className="mb-3">
              <Form.Control required type="text" value={actualTemperature}
                onChange={(e) => {
                  price = e.target.value;
                  setTemperature(e.target.value);
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
              setTemperature("");
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
              reaction.push("TrelloCard");
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
              reaction.push("DiscordWebhook");
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
              reaction.push("DiscordWebhook");
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
              reaction.push("Sheets");
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
              reaction.push("Whatsapp");
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
              reaction.push("Gmail");
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
                  <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://gowizyou.com/wp-content/uploads/2020/10/gmail-icon.png" />
                  <Card.Body>
                    <Card.Title>Gmail</Card.Title>
                    <GmailAction/>
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
            </Accordion.Body>
          </Accordion.Item>
          {/* Reactions */}
          <Accordion.Item eventKey="1">
            <Accordion.Header><a style={{color: '#FE9455', fontWeight: 'bold'}}>Add reaction(s) <a style={{fontStyle: 'italic', color: 'lightgrey'}}>Selected : {reactions.join(' / ')}</a></a></Accordion.Header>
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
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://gowizyou.com/wp-content/uploads/2020/10/gmail-icon.png" />
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
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>

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
