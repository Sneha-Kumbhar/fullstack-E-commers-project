import Navbar from './Components/Navbar';
import Overview from './Components/Overview';
import Sidebar from './Components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css';
import Employee from './Employee';




function App() {
  
  return(
    <>
        <Router>
      <Navbar />
      <Container fluid>
        <Row>
          
          <Col xs={12} md={2} className="mb-3">
            <Sidebar />
          </Col>


          <Col xs={12} md={10}>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/employee" element={<Employee />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>

    </>
  )
}
 
export default App;
