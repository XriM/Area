import { useState }  from 'react';
import "../../App.css";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";

import { UserResponse } from "../../helper/types";
import { signup } from "../exports";

function ShowSignup() {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [actualEmail, setEmail] = useState<string>("");
  const [actualPasswd, setPasswd] = useState<string>("");
  const input_user: UserResponse = { id: "", email: "", password: "" };

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    const result = await signup(actualEmail, actualPasswd);
    if (result === true) {
      handleClose();
      setEmail("");
      setPasswd("");
    }
  };

  return (
    <>
      <Button variant="outline-light" className="signupButton" onClick={handleShow}>
        Signup
      </Button>

      <Modal show={show} onHide={handleClose} noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
              <Form.Control
                required
                type="text"
                value={actualEmail}
                onChange={(e) => {
                  input_user.email = e.target.value;
                  setEmail(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3"
              >
              <Form.Control
                required
                type="password"
                value={actualPasswd}
                onChange={(e) => {
                  input_user.password = e.target.value;
                  setPasswd(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a minimum 8 characters password.
              </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button
            variant="primary"
            type="submit"
            >
              Signup
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <a style={{ opacity: 0.8 }}>Area Entreprise</a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { ShowSignup };
