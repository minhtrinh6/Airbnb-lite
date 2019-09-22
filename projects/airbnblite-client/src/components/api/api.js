import React from 'react';
import axios from 'axios';

export const addProperty = (property, history) => {
  return axios
    .post('/properties/add', {
      name: property.name,
      type: property.type,
      hostEmail: property.hostEmail,
      numberOfGuests: property.numberOfGuests
    })
    .then(res => {
      return axios.patch(`/users/${property.hostID}`, {
        userType: "Host"
      })
    })
    .then(res => history.push("/properties"))
    .catch(err => {
      console.log(err)
    })
};

export const login = user => {
  return axios
    .post('/users/signin', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('jwtToken', response.data.token);
    })
    .catch(err => {
      console.log(err)
    })
  }

  export const getProperties = () => {
    return axios
      .get('/properties')
      .then(response => {
        var data = []
        Object.keys(response.data).forEach(function (key) { 
          var val = response.data[key]
          data.push([val.name, val._id, val.type, val.numberOfGuests, val.hostEmail])
        })
        return data
      })
  }

  export const getYourProperties = property => {
    return axios
      .get('/your-properties', {
        params: { 
          hostEmail: property.hostEmail
        }
      })
      .then(response => {
        var data = []
        Object.keys(response.data).forEach(function (key) { 
          var val = response.data[key]
          data.push([val._id, val.name, val.guestEmail, val.type, val.numberOfGuests])
        })
        return data
      })
  }

  export const getYourStays = property => {
    return axios
      .get('/your-stays', {
        params: { 
          guestEmail: property.guestEmail
        }
      })
      .then(response => {
        var data = []
        Object.keys(response.data).forEach(function (key) { 
          var val = response.data[key]
          data.push([val._id, val.name, val.guestEmail, val.type, val.numberOfGuests])
        })
        return data
      })
  }

  export const rent = (guestEmail, id) => {
    return axios
        .patch(`/properties/${id}`, {
            guestEmail: guestEmail,
            isRented: true
        }
        )
        .then((response) => {
            console.log(response)
        })
}

export const unrent = (id) => {
  return axios
      .patch(`/properties/${id}`, {
          guestEmail: '',
          isRented: false
      }
      )
      .then((response) => {
          console.log(response)
      })
}

export const deleteProperty = (id) => {
  axios
      .delete(`/properties/${id}`)
      .then((response) => {
          console.log(response)
      })
      .catch((response) => {
          console.log(response)
      })
}

