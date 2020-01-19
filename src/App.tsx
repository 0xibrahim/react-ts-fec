import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import Home from './components/Home';
import NewRequest from './containers/NewRequest';

const App: React.FC = () => {
  return (
    <Container fluid={true}>
      <Row bsPrefix="row justify-content-md-center">
        <Col md="10">      
            <Route path="/" exact component={Home}/>  
            <Route path="/new-request" component={NewRequest}/>              
        </Col>    
      </Row>
    </Container>
  );
}

export default App;
