import "../../App.css";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";

import { UserResponse } from "../../helper/types";
import { signin } from "../exports";

function ShowLogin() {
  const navigate = useNavigate();

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [successAlert, setShowAlert] = useState<boolean>(false);

  const [actualEmail, setEmail] = useState<string>("");
  const [actualPasswd, setPasswd] = useState<string>("");
  const input_user: UserResponse = { id: "", email: "", password: ""};

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
    setShowAlert(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    const result = await signin(actualEmail, actualPasswd);
    if (result !== "") {
      handleClose();
      setEmail("");
      setPasswd("");
      navigate("/profile");
    }
  };

  return (
    <>
      <Button
        variant="outline-light"
        className="loginButton"
        onClick={handleShow}
      >
        Signin
      </Button>

      <Modal show={show} onHide={handleClose} noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Signin</Modal.Title>
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
              </FloatingLabel>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Signin
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <a style={{ opacity: 0.8 }}>Area Enterprise</a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { ShowLogin };
