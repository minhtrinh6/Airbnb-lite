import React from 'react';
import { Jumbotron, Carousel, Card, CardDeck } from 'react-bootstrap';
import './Home.css';
import NY from './images/NewYork.jpg';
import SF from './images/SF.jpg';
import Paris from './images/Paris.jpeg';
import London from './images/London.jpeg';
import Miami from './images/Miami.jpeg';
import Rome from './images/Rome.jpeg';
import Toronto from './images/Toronto.jpeg';
import Barcelona from './images/Barcelona.jpeg';
import Tokyo from './images/Tokyo.jpeg';
import SunriseBeach from './images/SunriseBeach.jpeg';
import Skiing from './images/Skiing.jpeg';
import Hiking from './images/Hiking.jpeg';
import Rockclimbing from './images/Rockclimbing.jpeg';
import Diving from './images/Diving.jpeg';

const Home = () => {
  return (
    <div>
    <Jumbotron className="home">
  <h1 className="titleHome">BUnB</h1>
  <p className="bodyHome">
    Find where you can Be You.
  </p>
</Jumbotron>
<div className="container">
<h1>Recommended for you</h1>
<Carousel>
  <Carousel.Item>
  <CardDeck>
  <Card>
    <Card.Img variant="top" src={NY} />
    <Card.Body>
      <Card.Title>New York</Card.Title>
      <Card.Text>
        $128/night average
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src={SF} />
    <Card.Body>
      <Card.Title>San Francisco</Card.Title>
      <Card.Text>
        $163/night average
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src={Paris} />
    <Card.Body>
      <Card.Title>Paris</Card.Title>
      <Card.Text>
        $106/night average
      </Card.Text>
    </Card.Body>
  </Card>
</CardDeck>
  </Carousel.Item>
  <Carousel.Item>
  <CardDeck>
  <Card>
    <Card.Img variant="top" src={London} />
    <Card.Body>
      <Card.Title>London</Card.Title>
      <Card.Text>
        $113/night average
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src={Miami} />
    <Card.Body>
      <Card.Title>Miami</Card.Title>
      <Card.Text>
        $123/night average
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src={Rome} />
    <Card.Body>
      <Card.Title>Rome</Card.Title>
      <Card.Text>
        $84/night average
      </Card.Text>
    </Card.Body>
  </Card>
</CardDeck>
  </Carousel.Item>
  <Carousel.Item>
  <CardDeck>
  <Card>
    <Card.Img variant="top" src={Toronto} />
    <Card.Body>
      <Card.Title>Toronto</Card.Title>
      <Card.Text>
        $87/night average
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src={Barcelona} />
    <Card.Body>
      <Card.Title>Barcelona</Card.Title>
      <Card.Text>
        $88/night average
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src={Tokyo} />
    <Card.Body>
      <Card.Title>Tokyo</Card.Title>
      <Card.Text>
        $84/night average
      </Card.Text>
    </Card.Body>
  </Card>
</CardDeck>
  </Carousel.Item>
</Carousel>
</div>

<div className="container" style={{paddingTop: "50px", paddingBottom: "100px"}}>
<h2>Top-rated experiences</h2>
<CardDeck>
  <Card>
    <Card.Img variant="top" src={SunriseBeach} />
    <Card.Body>
      <Card.Title>Sunrise + Wild Beaches!</Card.Title>
      <Card.Text>
        From $62/person
      </Card.Text>
      <Card.Text>
        Jacksonville, FL
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src={Hiking} />
    <Card.Body>
      <Card.Title>Race the Sun! Morning Hike + Sunrise</Card.Title>
      <Card.Text>
        From $35/person
      </Card.Text>
      <Card.Text>
        Yosemite National Park, California
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src={Rockclimbing} />
    <Card.Body>
      <Card.Title>Rock Climbing for Beginners</Card.Title>
      <Card.Text>
        From $100/person
      </Card.Text>
      <Card.Text>
        Shawangunk Ridge, New York
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src={Diving} />
    <Card.Body>
      <Card.Title>Magical Reef</Card.Title>
      <Card.Text>
      From $40/person
      </Card.Text>
      <Card.Text>
      Bali, Indonesia
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src={Skiing} style={{height: "305px"}} />
    <Card.Body>
      <Card.Title>Black Diamond Skiing</Card.Title>
      <Card.Text>
        From $150/person
      </Card.Text>
      <Card.Text>
        Zermatt, Switzerland
      </Card.Text>
    </Card.Body>
  </Card>
  
</CardDeck>
</div>
</div>
  )
}

export default Home