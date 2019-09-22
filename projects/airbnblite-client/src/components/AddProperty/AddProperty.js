import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProperty } from '../api/api';
import { Form, Button, Jumbotron } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import './AddProperty.css';

var decoded= {}
var host = ''
var HID = ''
if(localStorage.jwtToken) {
 decoded = jwt_decode(localStorage.jwtToken)
 host = decoded.email
 HID = decoded.id
}


class AddProperty extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type: "",
      hostEmail: "",
      hostID: "",
      numberOfGuests: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const newProperty = {
      name: this.state.name,
      type: this.state.type,
      hostEmail: host,
      hostID: HID,
      numberOfGuests: this.state.numberOfGuests
    };
    addProperty(newProperty, this.props.history); 
  };
render() {

  return (
    <div>
      <Jumbotron className="jumbotron3">
        <h1 className="title">Become a Host!</h1>
        <p className="body">
          Fill out the property registration form below to list your place!
        </p>
        <p className="body" >
          Earn up to $4,288/month hosting in Boston
        </p>
      </Jumbotron>
    <div className="container" >
    <Form noValidate onSubmit={this.onSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control 
        type="name" 
        placeholder="Property Name" 
        onChange={(e) => this.setState({name: e.target.value })}
        value={this.state.name} />

      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Type</Form.Label>
        <Form.Control 
        type="name" 
        placeholder="Rental type (e.g. Condo)" 
        onChange={(e) => this.setState({type: e.target.value })}
        value={this.state.type} />
      </Form.Group>
      <Form.Group controlId="formBasicConfirmPassword">
        <Form.Label>Number of Guests</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Maximum number of guests" 
        onChange={(e) => this.setState({numberOfGuests: e.target.value })}
        value={this.state.numberOfGuests} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
  )
} 
}

AddProperty.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProperty }
)(withRouter(AddProperty));