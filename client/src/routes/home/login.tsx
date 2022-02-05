import "../../App.css";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";

import { UserResponse } from "../../helper/types";
import { signin } from "..";

function ShowLogin() {
  const navigate = useNavigate();

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [actualEmail, setEmail] = useState<string>("");
  const [actualPasswd, setPasswd] = useState<string>("");
  const input_user: UserResponse = { id: "", email: "", password: "", username: ""};

  return (
    <>
      <Button
        variant="light"
        className="secondary__btn__color"
        onClick={handleShow}
      >
        Signin
      </Button>

      <Modal show={show} onHide={handleClose}>
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
              className="principal__btn__color"
              onClick={ async () => {
                const result = await signin(actualEmail, actualPasswd);
                if (result !== "") {
                  handleClose();
                  setEmail("");
                  setPasswd("");
                  navigate("/profile");
                }
              }}
            >
              Signin
            </Button>
            <Button
            variant="primary" style={{marginLeft: 5}} className="principal__cancel__color"
            onClick={handleClose}>
              Cancel
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
