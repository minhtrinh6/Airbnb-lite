import React, {Component} from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navigation extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  render() {
    const SignUpSignIn = () => {
      return (
      <Navbar.Text>
        <Link to="/login">Sign In</Link> | <Link to="/register">Sign Up</Link>
      </Navbar.Text>
      )
    }
  
    const SignOut = () => {
      return (
      <Button onClick={this.onLogoutClick} >Sign Out</Button>
      )
    }
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand as={Link} to="/" >BUnB</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/properties">Stays</Nav.Link>
              <Nav.Link as={Link} to="/properties/add">Become a Host</Nav.Link>
              <Nav.Link as={Link} to="/stays">Booked</Nav.Link>
            </Nav>
        <Nav className="justify-content-end">
        <Nav.Link as={Link} to="/dashboard">Profile</Nav.Link>
        {localStorage.jwtToken ? <SignOut /> : <SignUpSignIn />}
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
}

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navigation));
