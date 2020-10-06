import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAppState } from "../state";
import { Button } from "@material-ui/core";

export default function NavigationBar() {
  const history = useHistory();
  const { isAuthenticated, logout } = useAppState();

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          College Space
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              as={Link}
              to="/notes"
              onClick={() => history.push("/notes")}
            >
              Notes
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/announcements"
              onClick={() => history.push("/announcements")}
            >
              Announcements
            </Nav.Link>
            {isAuthenticated() ? (
              <React.Fragment>
                {" "}
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  onClick={() => history.push("/dashboard")}
                >
                  Dashboard
                </Nav.Link>
                <Button
                  variant="container"
                  color="primary"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
