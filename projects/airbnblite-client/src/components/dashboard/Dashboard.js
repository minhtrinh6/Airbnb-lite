import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getYourProperties, deleteProperty } from '../api/api';
import { Jumbotron, Card, Button, CardColumns } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import House from '../../StockHouse.jpg';
import './Dashboard.css';



var decoded= {}
var email = ''
if(localStorage.jwtToken) {
 decoded = jwt_decode(localStorage.jwtToken)
 email = decoded.email
}


class Dashboard extends Component {
  constructor() {
    super() 
    this.state = {
      hostEmail: '',
      items: []
    }
  }

  
  componentDidMount () {
    this.getAll()
  }

  getAll = () => {
    const yourProperties = {
      hostEmail: email
    };
    getYourProperties(yourProperties).then(data => { 
      this.setState (
        {
          items: [...data]
        }
      )
    })
  }

  onDelete = (itemid, e) => {
    e.preventDefault()
    deleteProperty(itemid)

    var data = [...this.state.items]
    data.filter((item, index) => {
        if (item[0] === itemid) {
            data.splice(index, 1)
        }
        return true
    })
    this.setState({ items: [...data] })
  }

render() {
    const { user } = this.props.auth;
return (
  <div>
  <Jumbotron className="jumbotron5">
    <h1 className="title5">Your Homes</h1>
    <p className="body5"> 
      Check below to see your listings and guests!
    </p>
  </Jumbotron>
  <div className="container">
        <CardColumns>
        {this.state.items.map((item, index) => (
          <Card id="card-card">
            <Card.Img variant="top" src={House} />
              <Card.Body>
                <Card.Title>{item[1]}</Card.Title>
                  <Card.Text>Guest Contact: {item[2]}</Card.Text>
                  <Card.Text>Description: {item[3]}</Card.Text>
                  <Card.Text>Max Guests: {item[4]}</Card.Text>
                  <Button variant="primary" onClick={this.onDelete.bind(this, item[0])}>Delete Property</Button>
              </Card.Body>
          </Card>
        ))}
      </CardColumns>
      </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {  }
)(Dashboard);