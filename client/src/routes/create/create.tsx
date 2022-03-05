import "../../App.css";
import { Button, Card, Form, Row, Col, Accordion, FloatingLabel, Modal, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faUser, faQuestion } from "@fortawesome/free-solid-svg-icons";

import { NavbarLogged, TrelloSignin, YoutubeSignin, createArea, getUser } from "..";

var name : string = "";
var reaction : string = "";
var action : string = "";
var actionId : string = "";
var reactionId : string = "";
var config : any = {};

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
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [actualName, setName] = useState<string>("");

  useEffect(() => {
    async function checkIfLogged() {
      const result = await getUser();
      if (result.id === "") {
        navigate("/");
      }
    }
    checkIfLogged();
  }, []);

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
          <Modal.Title>Outlook configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This action triggers when you receive an <a style={{fontWeight: 'bold'}}>important</a> email. Please login to your account.
          <br/>
          <br/>
          <Button variant="primary" className="principal__btn__color" style={{marginBottom: 20}}><FontAwesomeIcon icon={faLink} style={{color: 'white'}} onClick= { () => {
            navigate('/outlook-onedrive-create');
          }}/></Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              action = "Received email";
              actionId = "1";
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
        <Modal.Body style={{textAlign: 'center'}}>This action triggers when a choosen <a style={{fontWeight: 'bold'}}>crypto-currency</a> hits a <a style={{fontWeight: 'bold'}}>value</a> in the <a style={{fontWeight: 'bold'}}>range</a> you asked for. Please check the available pairs by clicking on the above button.
          <br/>
          <br/>
          <Button variant="primary" className="principal__btn__color" style={{marginBottom: 20}}><FontAwesomeIcon icon={faQuestion} style={{color: 'white'}} onClick= { () => {
            window.open('https://support.kraken.com/hc/en-us/articles/201893658-Currency-pairs-available-for-trading-on-Kraken');
          }}/></Button>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Currency -- format PAIR1/PAIR2" className="mb-3">
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
              action = "CryptoCurrency price changed";
              actionId = "7";
              config['crypto'] = actualCurrency;
              config['value_min'] = actualMinValue;
              config['value_max'] = actualMaxValue;
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
    const [actualMaxValue, setMaxValue] = useState<string>("");
    const [actualMinValue, setMinValue] = useState<string>("");
    var gameId : string = "";
    var maxValue : string = "";
    var minValue : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Action</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Steam configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This action triggers how much players are connected on a specific <a style={{fontWeight: 'bold'}}>game</a> every 5 minutes. Please enter the <a style={{fontWeight: 'bold'}}>ID</a> of the game that you want to monitor and the desired <a style={{fontWeight: 'bold'}}>range</a>.
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

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Players Max" className="mb-3">
              <Form.Control required type="text" value={actualMaxValue}
                onChange={(e) => {
                  maxValue = e.target.value;
                  setMaxValue(e.target.value);
                }}/>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Players Min" className="mb-3">
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
              action = "Steam players changed";
              actionId = "6";
              config['steam'] = actualGame;
              config['players_min'] = actualMinValue;
              config['players_max'] = actualMaxValue;
              handleClose();
            }}>
              Select Action
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setGame("");
              setMinValue("");
              setMaxValue("");
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
        <Modal.Body style={{textAlign: 'center'}}>This action triggers when a <a style={{fontWeight: 'bold'}}>temperature</a> is reached in the asked <a style={{fontWeight: 'bold'}}>range</a> in a <a style={{fontWeight: 'bold'}}>city</a>.
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
              action = "Weather changed";
              actionId = "5";
              config['city'] = actualCity;
              config['temp_min'] = actualTemperatureMin;
              config['temp_max'] = actualTemperatureMax;
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
    const [actualOwner, setOwner] = useState<string>("");
    var repoUrl : string = "";
    var owner : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Action</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Github configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This action triggers when something happens on a specific <a style={{fontWeight: 'bold'}}>repository</a>. Please enter the <a style={{fontWeight: 'bold'}}>link</a> of the repository you want to monitor and its <a style={{fontWeight: 'bold'}}>owner</a>. Please login to your account on your <a style={{fontWeight: 'bold'}}>profile</a> page.
          <br/>
          <br/>
          <Button variant="dark" className="principal__btn__color" onClick={() => { navigate('/profile') }}><FontAwesomeIcon icon={faUser} style={{color: 'white'}}/></Button>
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
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Owner name" className="mb-3">
              <Form.Control required type="text" value={actualOwner}
                onChange={(e) => {
                  owner = e.target.value;
                  setOwner(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              action = "Github repo starred";
              actionId = "4";
              config['github'] = actualRepo;
              config['owner'] = actualOwner;
              handleClose();
            }}>
              Select Action
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setRepo("");
              setOwner("");
              handleClose();
            }}>
              Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function YoutubeAction() {
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
          <Modal.Title>Youtube configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This action triggers when your <a style={{fontWeight: 'bold'}}>subscribers</a> count changes. Please login to your account.
          <br/>
          <br/>
          <YoutubeSignin where="/create"/>
          <br/>
          <br/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              action = "Youtube subscribers changed";
              actionId = "2";
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

  function RedditAction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualSubreddit, setSubreddit] = useState<string>("");
    var subreddit : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Action</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reddit configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This action triggers when the <a style={{fontWeight: 'bold'}}>subscribers</a> count of a desired subreddit changes. Please login to your account on your <a style={{fontWeight: 'bold'}}>profile</a> page.
          <br/>
          <br/>
          <Button variant="dark" className="principal__btn__color" onClick={() => { navigate('/profile') }}><FontAwesomeIcon icon={faUser} style={{color: 'white'}}/></Button>
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Subreddit name -- example : r/france" className="mb-3">
              <Form.Control required type="text" value={actualSubreddit}
                onChange={(e) => {
                  subreddit = e.target.value;
                  setSubreddit(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              action = "Subreddit subscriber";
              actionId = "3";
              config['subreddit'] = actualSubreddit;
              handleClose();
            }}>
              Select Action
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setSubreddit("");
              handleClose();
            }}>
              Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function OneDriveAction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualDrive, setDrive] = useState<string>("");
    var drive : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Action</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>OneDrive configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This action triggers when an action happens on a folder of your <a style={{fontWeight: 'bold'}}>drive</a>. Leave the field blank if you wish to monitor all your OneDrive. Please login to your account.
          <br/>
          <br/>
          <Button className="principal__btn__color" onClick={ () => { navigate("/onedrive") }}><FontAwesomeIcon icon={faLink} style={{color: 'white'}}/></Button>
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Drive folder name" className="mb-3">
              <Form.Control required type="text" value={actualDrive}
                onChange={(e) => {
                  drive = e.target.value;
                  setDrive(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              action = "File added";
              actionId = "8";
              config['drive'] = actualDrive;
              handleClose();
            }}>
              Select Action
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setDrive("");
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

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Reaction</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Trello configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This Reaction will create a card in the board and list you desire. Please login to your account. Then to find the board ID and list ID, go to your Trello board, add <a style={{fontWeight: 'bold'}}>.json</a> at the end, the first ID is the board ID and to find the list ID go to the field <a style={{fontWeight: 'bold'}}>actions</a> and you'll see all your lists.
          <br/>
          <br/>
          <TrelloSignin/>
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
              reaction = "Add trello card";
              reactionId = "2";
              config['idBoard'] = actualBoard;
              config['idList'] = actualList;
              config['name'] = actualTitle;
              config['description'] = actualDescription;
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

    const [actualWebhookId, setWebhookId] = useState<string>("");
    const [actualWebhookToken, setWebhookToken] = useState<string>("");
    var webhookId : string = "";
    var webhookToken : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Reaction</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Discord webhook configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This Reaction will send a <a style={{fontWeight: 'bold'}}>webhook</a> in your server. The 'webhook id is the <a style={{fontWeight: 'bold'}}>first</a> part of your webhook url and the 'webhook token' is the <a style={{fontWeight: 'bold'}}>second</a> part.
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Webhook ID" className="mb-3">
              <Form.Control required type="text" value={actualWebhookId}
                onChange={(e) => {
                  webhookId = e.target.value;
                  setWebhookId(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Webhook token" className="mb-3">
              <Form.Control type="text" value={actualWebhookToken}
                onChange={(e) => {
                  webhookToken = e.target.value;
                  setWebhookToken(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="principal__btn__color"
            onClick = { () => {
              reaction = "Send Discord message";
              reactionId = "4";
              config['discord'] = actualWebhookId;
              config['url_token'] = actualWebhookToken;
              handleClose();
            }}>
              Select Reaction
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setWebhookId("");
              setWebhookToken("");
              handleClose();
            }}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  function EmailReaction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualReceiver, setReceiver] = useState<string>("");
    const [actualCopy, setCopy] = useState<string>("");
    const [actualSubject, setSubject] = useState<string>("");
    const [actualMessage, setMessage] = useState<string>("");
    var receiver : string = "";
    var copy : string = "";
    var subject : string = "";
    var message : string = "";

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
              <FloatingLabel controlId="floatingTextarea" label="Receiver email(s) -- separate each email by a ," className="mb-3">
              <Form.Control required as="textarea" value={actualReceiver}
                onChange={(e) => {
                  receiver = e.target.value;
                  setReceiver(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea" label="In copy email(s) -- separate each email by a ," className="mb-3">
              <Form.Control as="textarea" value={actualCopy}
                onChange={(e) => {
                  copy = e.target.value;
                  setCopy(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Subject" className="mb-3">
              <Form.Control required type="text" value={actualSubject}
                onChange={(e) => {
                  subject = e.target.value;
                  setSubject(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea" label="Text-only content" className="mb-3">
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
              reaction = "Send email";
              reactionId = "1";
              config['to'] = actualReceiver;
              config['cc'] = actualCopy;
              config['subject'] = actualSubject;
              config['message'] = actualMessage;
              handleClose();
            }}>
              Select Reaction
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setReceiver("");
              setCopy("");
              setSubject("");
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

  function GithubReaction() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [actualRepo, setRepo] = useState<string>("");
    const [actualOwner, setOwner] = useState<string>("");
    const [actualTitle, setTitle] = useState<string>("");
    const [actualMessage, setMessage] = useState<string>("");
    var repoUrl : string = "";
    var owner : string = "";
    var title : string = "";
    var message : string = "";

    return (
      <>
      <Button variant="primary" className="principal__btn__color" onClick= { () => {
        handleShow();
      }}>Configure Reaction</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Github configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>This reaction will open an <a style={{fontWeight: 'bold'}}>issue</a> in your desired <a style={{fontWeight: 'bold'}}>repository</a>. Please enter the <a style={{fontWeight: 'bold'}}>link</a> of the repository you want to send the issues to, its <a style={{fontWeight: 'bold'}}>owner</a> and title, content of the issue. Please login to your account on your <a style={{fontWeight: 'bold'}}>profile</a> page.
          <br/>
          <br/>
          <Button variant="dark" className="principal__btn__color" onClick={() => { navigate('/profile') }}><FontAwesomeIcon icon={faUser} style={{color: 'white'}}/></Button>
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

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Owner name" className="mb-3">
              <Form.Control required type="text" value={actualOwner}
                onChange={(e) => {
                  owner = e.target.value;
                  setOwner(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingInput" label="Issue title" className="mb-3">
              <Form.Control required type="text" value={actualTitle}
                onChange={(e) => {
                  title = e.target.value;
                  setTitle(e.target.value);
                }}
              />
              </FloatingLabel>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea" label="Issue text-only content" className="mb-3">
              <Form.Control required as="textarea" value={actualMessage}
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
              action = "Send Git issue";
              reactionId = "3";
              config['github'] = actualRepo;
              config['owner'] = actualOwner;
              config['title'] = actualTitle;
              config['message'] = actualMessage;
              handleClose();
            }}>
              Select Action
            </Button>
            <Button variant="primary" style={{marginLeft: 5}} className="principal__cancel__color" onClick = { () => {
              setRepo("");
              setOwner("");
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
            <Accordion.Header><a style={{color: '#2C8DF1', fontWeight: 'bold'}}>Select an action to trigger</a></Accordion.Header>
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
                <Col md={3} style={{marginTop: 5}}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
                    <Card.Body>
                      <Card.Title>Github</Card.Title>
                      <GithubAction/>
                    </Card.Body>
                  </Card>
                </Col> 
                <Col md={3} style={{marginTop: 5}}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://ih1.redbubble.net/image.1121504414.0314/pp,840x830-pad,1000x1000,f8f8f8.jpg" />
                    <Card.Body>
                      <Card.Title>OneDrive</Card.Title>
                      <OneDriveAction/>
                    </Card.Body>
                  </Card>
                </Col> 
                <Col md={3} style={{marginTop: 5}}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" />
                    <Card.Body>
                      <Card.Title>Youtube</Card.Title>
                      <YoutubeAction/>
                    </Card.Body>
                  </Card>
                </Col> 
                <Col md={3} style={{marginTop: 5}}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://cdn-icons-png.flaticon.com/512/1384/1384067.png" />
                    <Card.Body>
                      <Card.Title>Reddit</Card.Title>
                      <RedditAction/>
                    </Card.Body>
                  </Card>
                </Col> 
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          {/* Reactions */}
          <Accordion.Item eventKey="1">
            <Accordion.Header><a style={{color: '#FE9455', fontWeight: 'bold'}}>Select a reaction to execute</a></Accordion.Header>
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
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
                    <Card.Body>
                      <Card.Title>Github</Card.Title>
                      <Card.Text>Open an issue on a repo</Card.Text>
                      <GithubReaction/>
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
                <Col md={3}>
                  <Card className="text-center" style={{ width: '18rem', alignItems: 'center' }}>
                    <Card.Img variant="top" style={{ width: '10rem', height: '10rem', objectFit: 'cover' }} src="data:image/png;base64,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" />
                    <Card.Body>
                      <Card.Title>Email</Card.Title>
                      <Card.Text>Receive an email</Card.Text>
                        <EmailReaction/>
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

    <Form className="centered__bottom__buttons">
      <Form.Group className="mb-3">
        <FloatingLabel controlId="floatingInput" label="Area name" className="mb-3">
        <Form.Control required type="text" value={actualName}
          onChange={(e) => {
            name = e.target.value;
            setName(e.target.value);
          }}
        />
        </FloatingLabel>
      </Form.Group>
    </Form>
    <Row>
      <Col md={12} className="centered__bottom__buttons">
        <Button variant="primary" className="secondary__btn__color" style={{marginBottom: 20}} onClick= { async () => {
          const result = await createArea(config, name, actionId, reactionId);

          if (result === 0) {
            alert("Area successfully created.");
            navigate("/triggers");
          }
          setName("");
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
