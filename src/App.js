//Created by Damian Wykowski
import bck from './bck.jpg';
import { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

//bootstrap components
import { 
  Container,
  Navbar,
  Nav,
  Card,
  Row,
  Col,
  Image,
  Alert,
  Button,
  Accordion,
 } from 'react-bootstrap';

 //bootstrap icons
 import { 
   Sun,
   Thermometer,
   Wind,
   Sunrise,
   Sunset,
   Clouds,
   ArrowBarDown,
 } from 'react-bootstrap-icons';

 //photo 
 function HeroHeader(){
   return(
     <div>
       <Container>
        <Image className="" src={bck}  style={{height:'40vh',width:'100%',  objectFit:'cover'}} alt="Photo by Jake Givens on Unsplash"  fluid />
       </Container>
     </div>
   );
 }

 //maim nav in the top of website
function Navigation() {
  return (
    <Container>
      <Navbar bg="light"   className="mb-4" expand="lg">
        <Navbar.Brand href="#home"><Sun className="ms-4"/>Pogoda dziś</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto text-center">
              <Nav.Link href="#warning">Ostrzeżenia</Nav.Link>
              <Nav.Link href="#info">Informacje</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

function WeatherBanner(){
    
    const [cityName,setCityName] = useState('0');
    const [wind,setWind] = useState('0');
    const [temperature,setTemperature] = useState('0');
    const [sunRise,setSunRise] = useState('0');
    const [sunSet,setSunSet] = useState('0');
    const [clouds,setClouds] = useState('0');
    const [pressure,setPressure] = useState('0');
  
    //get forecasr data form forecast server ( fetch from JSon file ) and save it in react hooks
    useEffect(()=>{
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=53.405&lon=22.7979&appid=98f49e52613ffa7567adfd62f1f1a9a9')
        .then(response => response.json())
        .then(data => {
          setCityName(data.name);
          setWind(data.wind.speed);
          setTemperature(data.main.temp);
          setSunRise(data.sys.sunrise);
          setSunSet(data.sys.sunset);
          setClouds(data.clouds.all);
          setPressure(data.main.pressure);
        })
        .catch((error) => {
          console.error(error);
        });
    },[]);

    //weather banner where we show all weather eleements
    return(
     <Container >
       <Row className="justify-content-md-center">
         <Col>
            <Card className="text-center mx-auto" bg="info" style={{ width: 'auto' }}>
            <Card.Header >Aktualna Pogoda</Card.Header>
              <Card.Body>
                <Card.Title>{cityName}</Card.Title>
                <Card.Text>
                  <Thermometer/>{" "+(temperature - 273.15).toFixed(0)+" *C"}
                </Card.Text>
                <Card.Text>
                  <Wind/> {(wind/1,84)+" km/h"}
                </Card.Text>
              </Card.Body>
              <Card.Footer> 
                <Sunrise className="ms-4"/>{(sunRise/3600/100000).toFixed(2)}
                <Sunset className="ms-4"/>{(sunSet/3600/100000).toFixed(2)}
                <Clouds className="ms-4"/>{clouds+" %"}
                <ArrowBarDown className="ms-4"/>{pressure+" hPa"}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

//all warning components contains all components "Alerts"
function Warnings(){
  return(
    <div>
      <Container>
        <h1 className="text-center mt-4" id="warning">Ostrzeżenia meteorologiczne</h1>
        <Row className="justify-content-md-center">
          <Alerts 
            title="Burza z gradem!"
            desc="Przewidywana burza z gradem!"/>
          <Alerts 
            title="Porywy wiatru."
            desc="Porywy Wiatru dochodzące do 70 km/h"/>
          <Alerts 
            title="Przerwy w dostawie prądu."
            desc="Porywy Wiatru mogą uszkodzić linie energetyczne"/>
        </Row>
      </Container>
    </div>
  );
}

//single components to use in component "Warning"
function Alerts(props) {
  const [show, setShow] = useState(true);
  return (
      <Col md="4">
        <Alert  className="mt-4" show={show} variant="danger">
          <Alert.Heading>{props.title}</Alert.Heading>
          <p>{props.desc}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Zamknij
            </Button>
          </div>
        </Alert>
      </Col>
  );
}

//components contains all "Articles" components
function Articles(){
  return(
    <Container>
      <h1 className="ms-4 mt-4" id="info">Ważne informacje</h1>
      <Accordion>
        <Articl
          title="Zachowanie podczas silnego wiatru"
          desc=" is simply dummy text of the prinng and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."/>
        <Articl
            title="Zachowanie podczas upałów"
            desc=" is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."/>
        <Articl
            title="Zachowanie podczas burzy i gradu"
            desc=" i simply dummy texttt of the priing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."/>
      </Accordion>
    </Container>
  );
}

//simple  reusable component to use in  Articles coponent
function Articl(props){
  return(
    <Accordion.Item>
          <Accordion.Header>{props.title}</Accordion.Header>
          <Accordion.Body>{props.desc}</Accordion.Body>
        </Accordion.Item>
  );
}

export  {
  Navigation,
  WeatherBanner,
  HeroHeader,
  Warnings,
  Articles,
};