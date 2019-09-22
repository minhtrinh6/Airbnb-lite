import React, { Component } from 'react';
import { getProperties, rent } from '../api/api';
import { Jumbotron, Card, Button, CardColumns } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import House from '../../StockHouse.jpg';
import './Properties.css';

var decoded= {}
var gEmail = ''
if(localStorage.jwtToken) {
 decoded = jwt_decode(localStorage.jwtToken)
 gEmail = decoded.email
}


class PropertyList extends Component {
  constructor() {
    super() 
    this.state = {
      id: '',
      name: '',
      type: '',
      hostEmail: '',
      guestEmail: '',
      isRented: false,
      numberOfGuests: '1',
      items: []
    }
  }

  componentDidMount () {
    this.getAll()
  }

  getAll = () => {
    getProperties().then(data => { 
      this.setState (
        {
          items: [...data]
        }
      )
    })
  }

  onRent = (itemid, e) => {
    e.preventDefault()
    rent(gEmail, itemid).then(() => {
      this.getAll()
    })
  }

  render () {
    return (
      <div>
      <Jumbotron className="jumbotron2">
        <h1 className="title1">Available Houses!</h1>
        <p className="body1">
          Travel the world with BUnB
        </p>
      </Jumbotron>
      <div className="container">
      <CardColumns id="card-column">
        {this.state.items.map((item, index) => (
          <Card id="card-card">
            <Card.Img variant="top" src={House} />
              <Card.Body>
                <Card.Title>{item[0]}</Card.Title>
                  <Card.Text>Description: {item[2]}</Card.Text>
                  <Card.Text>Max Guests: {item[3]}</Card.Text>
                  <Card.Text>Host Contact: {item[4]}</Card.Text>
                  <Button variant="primary" onClick={this.onRent.bind(this, item[1])}>Rent!</Button>
              </Card.Body>
          </Card>
        ))}
      </CardColumns>
      </div>
      </div>
    )
  }
}
export default PropertyList
