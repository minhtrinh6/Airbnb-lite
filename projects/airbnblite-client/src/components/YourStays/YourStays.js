import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { unrent, getYourStays } from '../api/api';
import { Jumbotron, Card, Button, CardColumns } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import House from '../../StockHouse.jpg';
import './YourStays.css'



var decoded= {}
var email = ''
if(localStorage.jwtToken) {
 decoded = jwt_decode(localStorage.jwtToken)
 email = decoded.email
}


class YourStays extends Component {
  constructor() {
    super() 
    this.state = {
      guestEmail: '',
      items: []
    }
  }

  
  componentDidMount () {
    this.getAll()
  }

  getAll = () => {
    const yourStays = {
      guestEmail: email
    };
    getYourStays(yourStays).then(data => { 
      this.setState (
        {
          items: [...data]
        }
      )
    })
  }


  onUnrent = (itemid, e) => {
    e.preventDefault()
    unrent(itemid).then(() => {
      this.getAll()
    })
  }

render() {
    const { user } = this.props.auth;
    return (
      <div>
        <Jumbotron className="jumbotron4">
          <h1 className="title">Booked Stays</h1>
          <p className="body">
          Check below for information regarding your travel accommodations. 
          </p>
        </Jumbotron>
        <div className='container'>
        <CardColumns id="card-column">
        {this.state.items.map((item, index) => (
          <Card id="card-card">
            <Card.Img variant="top" src={House} />
              <Card.Body>
                <Card.Title>{item[1]}</Card.Title>
                  <Card.Text>Description: {item[3]}</Card.Text>
                  <Card.Text>Max Guests: {item[4]}</Card.Text>
                  <Button variant="primary" onClick={this.onUnrent.bind(this, item[0])}>Unrent</Button>
              </Card.Body>
          </Card>
        ))}
      </CardColumns>
      </div>
      </div>
    );
  }
}
YourStays.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {  }
)(YourStays);